import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import {
  convertTimestamptoUSA,
  convertTimestamptoUSATime,
  getssn,
  matchAddressSet,
  nestedIfCaseHandle,
  phoneNumberFormat,
  returnValueOrDefault
} from '../Common/commonfunctions';
import {
  getMatchRecordWithId,
  historyConsentSet,
  historyContactUpdates
} from './ConsumerHistory/ConsumerHistory.Data';
import {
  businessProcessStatuses,
  channelCommunicationType,
  consumerVerificationStatuses,
  consumerNameSet,
  BPStatus,
  BPFormStatus
} from './History/AccountHistory.Data';

const getActiveInActiveText = (res) => {
  return nestedIfCaseHandle(res?.data?.active, 'Active', 'InActive');
};

// == Get history search api response ===
export const getActivitySearchRecords = async (
  postData,
  newStates,
  newCountriesData,
  spokeToList,
  phoneTypes = [],
  emailTypes = [],
  addressTypes = [],
  completedBPIDs = []
) => {
  try {
    const apiResponse = await ApiServices('account-activity', 'Activity Records Fetched').post(
      `/activities/search`,
      postData
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      let activities = validatedResponse.activities
        ? await setActivitiesObject(
            validatedResponse.activities,
            newStates,
            newCountriesData,
            spokeToList,
            phoneTypes,
            emailTypes,
            addressTypes,
            completedBPIDs
          )
        : [];
        return {completedBPIDs: activities.completedBPIDs, activities: activities.activities };
    }
  } catch (error) {
    console.error(error);
    handleNetworkError(error);
    return {};
  }
};

const consumerEntityDetails = (spokeToList, entityId) => {
  if (spokeToList?.value?.length) {
    return spokeToList.value
      ?.filter((obj, index) => {
        return index === spokeToList.value?.findIndex((o) => obj.customerId == o.customerId);
      })
      ?.filter((filterItem) => entityId == filterItem.customerId);
  }
  return [];
};

const addressSetDetails = (address, newStates, newCountriesData) => {
  let addressSet = {};
  if (nestedIfCaseHandle(address, () => Object.keys(address)?.length > 0, false)) {
    addressSet = { ...address };
  }
  if (addressSet?.stateCode) {
    let states = getMatchRecordWithId(addressSet?.stateCode, newStates);
    addressSet = { ...addressSet, state: states?.[0]?.name };
  }
  if (addressSet?.countryCode) {
    let allCountries = getMatchRecordWithId(addressSet?.countryCode, newCountriesData);
    addressSet = { ...addressSet, country: allCountries?.[0]?.name };
  }
  return addressSet;
};

export const setActivitiesObject = async (
  activities,
  newStates,
  newCountriesData,
  spokeToList,
  phoneTypes,
  emailTypes,
  addressTypes,
  completedBPIDs
) => {
  let userIds = activities
    ?.map((res1) => {
      return nestedIfCaseHandle(res1.userId, res1.userId, null);
    })
    ?.filter((value, index, arraySet) => {
      return nestedIfCaseHandle(arraySet.indexOf(value) == index, value, false);
    });

  let userDetails = { users: [] };
  if (nestedIfCaseHandle(userIds, userIds?.length > 0, false)) {
    userDetails = await getAgentDetailsByIds(userIds);
  }

  let sampleBPIDs = completedBPIDs;

  let activityArray = activities?.map((res) => {
    let agent = 'System';
    if (res.userId && userDetails?.users?.find((u) => u.uid == res.userId)) {
      let userValues = userDetails?.users?.find((u) => u.uid == res.userId);
      agent = returnValueOrDefault(
        `${returnValueOrDefault(userValues?.firstName, '')} ${returnValueOrDefault(
          userValues?.lastName,
          ''
        )}`,
        'System'
      );
    }
    let switchReturn = '';
    switch (res.category) {
      case 'BUSINESS_PROCESS':
        let statusVal = businessProcessStatuses[res.type];
        if (res.data.status) {
          let formStatus = BPFormStatus[res?.data?.status];
          let businessProcessStatus = BPStatus[res?.data?.businessProcessStatus];
          statusVal = {
            ...businessProcessStatus,
            formStatus: formStatus?.status,
            formStatusCode: formStatus?.statusCode
          };
        }
        let checkForButton = true;
        if (['FORM_COMPLETED','FORM_CANCELLED'].includes(res.type)){
          sampleBPIDs.push(res?.data?.businessProcessInstanceId)
        }
        if (['FORM_STARTED'].includes(res.type) && sampleBPIDs.includes(res?.data?.businessProcessInstanceId)) {
          checkForButton = false;
        }
        switchReturn = {
          id: res.id,
          category: res.category,
          action: nestedIfCaseHandle(
            ['FORM_STARTED', 'FORM_COMPLETED', 'FORM_CANCELLED'].includes(res.type),
            'Business Process',
            statusVal?.action
          ),
          createdOn: convertTimestamptoUSATime(res.createdOn, false),
          agentName: returnValueOrDefault(agent, 'System'),
          businessName: nestedIfCaseHandle(
            ['FORM_STARTED', 'FORM_COMPLETED', 'FORM_CANCELLED'].includes(res.type),
            res?.data?.businessProcessName,
            res?.data?.name
          ),
          responsiblePartyName: res?.data?.responsiblePartyName,
          formNameLabel: nestedIfCaseHandle(
            ['FORM_STARTED', 'FORM_COMPLETED', 'FORM_CANCELLED'].includes(res.type),
            'Form Name',
            ''
          ),
          formName: res?.data?.scheduleName,
          formStatusLabel: 'Status',
          surveyFlowId: res?.data?.surveyFlowId,
          allowClick: nestedIfCaseHandle(checkForButton, nestedIfCaseHandle(['FORM_STARTED', 'FORM_COMPLETED', 'FORM_CANCELLED1'].includes(res.type), true, false), false),
          scheduleId: res?.data?.scheduleId,
          stepId: res?.data?.id,
          ...statusVal
        };
        break;
      case 'CONTACT_UPDATES':
        switchReturn = historyContactUpdates(
          res,
          phoneTypes,
          emailTypes,
          addressTypes,
          newStates,
          newCountriesData,
          agent
        );
        break;
      case 'CHANNEL_COMMUNICATIONS':
        const contactDetails = () => {
          if (res?.data?.address) {
            let typeOfValueAddress = addressTypes?.map((eventTypeTmp) => {
              return {
                ...eventTypeTmp,
                name: eventTypeTmp.name.replace('Address', '')
              };
            });
            let typeValueAddress = nestedIfCaseHandle(
              res?.data?.address?.typeId,
              typeOfValueAddress?.filter((type) => type.id == res?.data?.address?.typeId),
              ''
            )[0];
            let isPrimary = nestedIfCaseHandle(res.data.address?.isDefault, '(Primary)', '');
            let typeSet = nestedIfCaseHandle(typeValueAddress, `- ${typeValueAddress?.name}`, '');
            let address = nestedIfCaseHandle(
              res?.data.address,
              matchAddressSet(res?.data?.address, ','),
              ''
            );
            address = nestedIfCaseHandle(address, `${address} ${typeSet} ${isPrimary}`, '');
            return nestedIfCaseHandle(address, address, 'N/A');
          }
          if (res?.data?.phone) {
            let typeValuePhone = nestedIfCaseHandle(
              res?.data?.phone?.typeId,
              phoneTypes?.filter((type) => type.id == res?.data?.phone?.typeId),
              ''
            )[0];
            let isPrimary = nestedIfCaseHandle(res?.data?.phone?.isDefault, '(Primary)', '');
            let typeSet = nestedIfCaseHandle(typeValuePhone, `- ${typeValuePhone?.name}`, '');
            let phone = nestedIfCaseHandle(
              res?.data?.phone,
              phoneNumberFormat(res?.data?.phone?.number),
              ''
            );
            phone = nestedIfCaseHandle(phone, `${phone} ${typeSet} ${isPrimary}`, '');
            return nestedIfCaseHandle(phone, phone, 'N/A');
          }
          if (res?.data?.email) {
            let typeOfValueEmails = emailTypes?.map((type) => {
              return {
                ...type,
                name: type.name == 'HomeEmail' ? 'Personal' : type.name.replace('Email', '')
              };
            });
            let typeValueEmail = nestedIfCaseHandle(
              res?.data.email?.typeId,
              typeOfValueEmails?.filter((type) => type.id == res?.data?.email?.typeId),
              ''
            )[0];
            let isPrimary = nestedIfCaseHandle(res?.data?.email?.isDefault, '(Primary)', '');
            let typeSet = nestedIfCaseHandle(typeValueEmail, `- ${typeValueEmail?.name}`, '');
            let email = nestedIfCaseHandle(res?.data?.email, res?.data?.email?.emailAddress, '');
            email = nestedIfCaseHandle(email, `${email} ${typeSet} ${isPrimary}`, '');
            return nestedIfCaseHandle(email, email, 'N/A');
          }
          return 'N/A';
        };

        switchReturn = {
          id: res.id,
          category: res.category,
          action: 'Channel Communication',
          date: convertTimestamptoUSATime(res.createdOn, false),
          status: res.status,
          agentName: returnValueOrDefault(agent, 'System'),
          templateName: `${channelCommunicationType[res.type]} - ${res.data.template}`,
          responsiblePartyName: res.data.responsiblePartyName,
          contactDetails: contactDetails(),
          clientReference: 'Client Reference',
          clientReferenceID: res.data.originalAccountNumber
        };
        break;
      case 'CONSUMER_MATCHING':
        switchReturn = {
          id: res.id,
          category: res.category,
          action: 'Account Matched',
          date: convertTimestamptoUSATime(res.timestamp, false),
          creationDateLabel: 'Creation Date ',
          creationDateValue: `${convertTimestamptoUSATime(res.createdOn, false)}`,
          accountNoLabel: 'Account No ',
          accountNoValue: `${res.data.accounts[0]?.accountNum}`,
          consumerNameLabel: 'Name ',
          consumerNameValue: `${res.data.firstName} ${res.data.lastName}`,
          apiResponse: res
        };
        break;
      case 'CONSUMER_VERIFICATION':
        let status = consumerVerificationStatuses[res.type];
        let consumerEntity = consumerEntityDetails(spokeToList, res.entityId);
        let addressSet = addressSetDetails(res?.data?.address, newStates, newCountriesData);

        switchReturn = {
          id: res.id,
          category: res.category,
          action: 'Consumer Verification',
          createdOn: convertTimestamptoUSATime(res.createdOn, false),
          status: status.status,
          statusCode: status.statusCode,
          agentName: returnValueOrDefault(agent, 'System'),
          responsiblePartyName: nestedIfCaseHandle(
            consumerEntity.length > 0,
            consumerNameSet(consumerEntity?.[0]?.firstName, '', consumerEntity?.[0]?.lastName),
            'N/A'
          ),
          verifiedFields: {
            nameLabel: nestedIfCaseHandle(res?.data?.name, 'Name', ''),
            name: consumerNameSet(
              res?.data?.name?.firstName,
              res?.data?.name?.middleName,
              res?.data?.name?.lastName
            ),
            dobLabel: nestedIfCaseHandle(res?.data?.dateOfBirth, 'DOB', ''),
            dob: convertTimestamptoUSA(res?.data?.dateOfBirth),
            ssnLabel: nestedIfCaseHandle(res?.data?.ssn, 'SSN', ''),
            ssn: getssn(res?.data?.ssn),
            addressLabel: nestedIfCaseHandle(res?.data?.address, 'Address', ''),
            address: matchAddressSet(addressSet, ','),
            emailLabel: nestedIfCaseHandle(res?.data?.email, 'Email', ''),
            email: nestedIfCaseHandle(res?.data?.email, res?.data?.email?.toLowerCase(), '')
          }
        };
        break;
      case 'CONSENT':
        switchReturn = historyConsentSet(res, phoneTypes, emailTypes, agent);
        break;
      case 'TIE_UNTIE':
        let consumerEntityData;
        if (spokeToList?.value?.length) {
          consumerEntityData = spokeToList.value?.filter(
            (spokeData) => res?.entityId == spokeData.id
          );
        }
        switchReturn = {
          id: res?.id,
          category: res.category,
          action: nestedIfCaseHandle(res.type == 'ACCOUNT_TIE', 'Account Tied', 'Account Untied'),
          creationDateLabel: 'Creation Date',
          creationDateValue: convertTimestamptoUSATime(res.createdOn, false),
          accountNumberLabel: 'Account No',
          accountNumber: nestedIfCaseHandle(
            res.type == 'ACCOUNT_TIE',
            `${res?.data?.tieFrom?.[0]?.toString()}`,
            `${res?.data?.unTiedAccount?.[0]?.toString()}`
          ),
          completedByLabel: 'Completed By',
          completedByNameValue: returnValueOrDefault(agent, 'System'),
          responsiblePartyName: nestedIfCaseHandle(
            consumerEntityData.length > 0,
            consumerNameSet(
              consumerEntityData?.[0]?.firstName,
              '',
              consumerEntityData?.[0]?.lastName
            ),
            ''
          ),
          tieFrom: `${res?.data?.tieFrom?.[0]?.toString()}`,
          tieTo: res?.data?.tieTo,
          untiedAccount: `${res?.data?.unTiedAccount?.[0]?.toString()}`,
          untiedFrom: res?.data?.unTiedFrom
        };
        break;
      default:
        switchReturn = res;
        break;
    }
    return switchReturn;
  });
  return {
    activities: activityArray,
    completedBPIDs: sampleBPIDs
  }
};

export const paymentSinglePageApi = async (paymentId) => {
  try {
    const apiResponse = await ApiServices('consumer-financial').get(
      `/consumer-financial/payment/${paymentId}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

export const bpConsumerHistorySet = async (stepId, responsibleId,data) => {
  
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/steps/${stepId}?responsibleId=${responsibleId}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return [validatedResponse?.surveyFlowStep];
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

// --------------------------GET ACCOUNT BALANCE ----------------------------------------------------
export const fetchAccountBalance = async (accountId) => {
  try {
    const apiResponse = await ApiServices('consumer-financial').get(
      `/consumer-financial/account/${accountId}/balance`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* -------------------------- GET SINGLE PAYMENT INFO ---------------------------------------*/
export const getSinglePagePaymentApi = async (accountID) => {
  try {
    const apiResponse = await ApiServices('consumer-financial').get(
      `/consumer-financial/account/payments/${accountID}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};

/* -------------------------- GET AGENT DETAILS BY UIDS ---------------------------------------*/
export const getAgentDetailsByIds = async (uids) => {
  try {
    const apiResponse = await ApiServices('account-profile').get(`/v1/users/user-details/${uids}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};
