import {
  convertTimestamptoUSATime,
  nestedIfCaseHandle,
  phoneNumberFormat,
  returnValueOrDefault
} from '../../Common/commonfunctions';
import {
  consentUpdateStatus,
  consentValue,
  contactUpdateAddressAlign,
  contactUpdatedKeyTypes,
  contactUpdatesTypes,
  matchAddressSet
} from '../History/AccountHistory.Data';

export const getMatchRecordWithId = (id, records) => {
  if (!id || Object.keys(records).length == 0) {
    return [];
  }
  return records?.filter((item) => item.id == id);
};

const changedValue = (val, item, replaceKey) => {
  if (item == 'active') {
    return nestedIfCaseHandle(val, 'Active', 'Inactive');
  } else if (item == 'typeName') {
    return nestedIfCaseHandle(val == 'HomeEmail', 'Personal', val.replace(replaceKey, ''));
  } else if (typeof val == 'boolean') {
    return nestedIfCaseHandle(val, 'Yes', 'No');
  } else {
    return nestedIfCaseHandle(item == 'number', phoneNumberFormat(val), val);
  }
};
const replaceExistedObjectKey = (objectData, objKey, objVal, existedVal, replaceKeyVal) => {
  if (existedVal) {
    objectData = {
      ...objectData,
      [objKey]: {
        ...objVal,
        typeName: existedVal?.replace(replaceKeyVal, '')
      }
    };
  }

  return objectData;
};

export const historyContactUpdates = (
  res,
  phoneTypes,
  emailTypes,
  addressTypes,
  newStates,
  newCountriesData,
  agent
) => {
  let type = nestedIfCaseHandle(res.type, contactUpdatesTypes[res.type], '');
  let eventType = phoneTypes;
  let replaceKey = 'Phone';
  let addressFromValue = '';
  let addressToValue = '';
  let responseData = res?.data;
  if (['EMAIL_ADDED', 'EMAIL_UPDATED'].includes(type)) {
    eventType = emailTypes;
    replaceKey = 'Email';
  } else if (['ADDRESS_ADDED', 'ADDRESS_UPDATED'].includes(res.type)) {
    eventType = addressTypes;
    replaceKey = 'Address';
    let addressRecNew = responseData?.new;
    addressRecNew = contactUpdateAddressAlign(responseData?.new, newStates, newCountriesData);
    addressToValue = matchAddressSet(addressRecNew, ',');
    if (res.type == 'ADDRESS_UPDATED') {
      let addressRecold = responseData?.old;
      addressRecold = contactUpdateAddressAlign(responseData?.old, newStates, newCountriesData);
      addressFromValue = matchAddressSet(addressRecold, ',');
    }
  }
  let typeOfValue = eventType?.map((eventTypeTmp) => {
    return {
      ...eventTypeTmp,
      name: eventTypeTmp.name.replace(replaceKey, '')
    };
  });
  let toTypeOfValue = typeOfValue?.filter((fltType) => fltType.id == responseData?.new?.typeId);
  responseData = replaceExistedObjectKey(
    responseData,
    'new',
    responseData?.new,
    responseData?.new?.typeName,
    replaceKey
  );
  responseData = replaceExistedObjectKey(
    responseData,
    'old',
    responseData?.old,
    responseData?.old?.typeName,
    replaceKey
  );

  const fromValue = nestedIfCaseHandle(
    responseData?.new?.number,
    phoneNumberFormat(res.data.new.number),
    returnValueOrDefault(responseData?.new?.emailAddress, addressToValue)
  );

  const defaultArray = [
    'number',
    'emailAddress',
    'address1',
    'address2',
    'stateCode',
    'zipCode',
    'city'
  ];
  const isChanged = nestedIfCaseHandle(res.data.changed, true, false);
  const isDefaultValueChanged = res.data.changed?.some((item) => defaultArray.includes(item));
  let defaultValue = {
    val: `${fromValue} - ${returnValueOrDefault(
      toTypeOfValue?.[0]?.name,
      responseData?.new?.typeName
    )}${nestedIfCaseHandle(responseData?.new?.isDefault, ' (Primary)', '')} - ${nestedIfCaseHandle(
      responseData?.new?.active,
      'Active',
      'Inactive'
    )}`,
    type: type.value
  };

  let values = {};
  if (responseData?.changed) {
    if (addressToValue) {
      const addressChangeKeys = [
        'address1',
        'address2',
        'stateCode',
        'zipCode',
        'city',
        'countryCode'
      ];
      const isAddressUpdated = res.data.changed?.some((item) => addressChangeKeys.includes(item));
      if (isAddressUpdated) {
        values = {
          'Address Updated_label': 'Address Updated',
          'Address Updated_fromValue': addressFromValue,
          'Address Updated_toValue': addressToValue
        };
      }
    }
    responseData?.changed?.map((item) => {
      if (contactUpdatedKeyTypes[item]) {
        let keySetterif = {
          [`${contactUpdatedKeyTypes[item]}_label`]: contactUpdatedKeyTypes[item],
          [`${contactUpdatedKeyTypes[item]}_fromValue`]: changedValue(
            responseData?.old?.[item],
            item,
            replaceKey
          ),
          [`${contactUpdatedKeyTypes[item]}_toValue`]: changedValue(
            responseData?.new?.[item],
            item,
            replaceKey
          )
        };
        values = {
          ...values,
          ...keySetterif
        };
      }
    });
  } else {
    let keySetterelse = {
      [`${type.value}_label`]: type.value,
      [`${type.value}_fromValue`]: defaultValue.val
    };
    values = {
      ...values,
      ...keySetterelse
    };
  }
  if (nestedIfCaseHandle(isDefaultValueChanged, !isChanged, false)) {
    defaultValue = {};
  }
  return {
    id: res.id,
    category: res?.category,
    action: `Contact Update (${type.typeName})`,
    createdOn: convertTimestamptoUSATime(res?.createdOn, false),
    consumerName: returnValueOrDefault(responseData?.responsiblePartyName, 'N/A'),
    agentName: returnValueOrDefault(agent, 'System'),
    type: type?.value,
    data: values,
    isChanged: isChanged,
    isDefaultValueChanged: isDefaultValueChanged,
    defaultValue: defaultValue
  };
};

export const historyConsentSet = (res, phoneTypes, emailTypes, agent) => {
  const isChanged = nestedIfCaseHandle(res.data.changed, true, false);
  const consentUpdateValues = isChanged
    ? res.data.changed
        .map((item) => {
          if (consentValue[item]) {
            return {
              fromValue: nestedIfCaseHandle(res?.data?.old?.[item] == 'YES', 'Yes', 'No'),
              toValue: nestedIfCaseHandle(res?.data?.new?.[item] == 'YES', 'Yes', 'No'),
              consentValue: consentValue[item]
            };
          }
        })
        .filter((item) => item)
    : Object.keys(res.data.new)
        .map((item) => {
          if (consentValue[item]) {
            return {
              fromValue: nestedIfCaseHandle(res?.data?.new[item] == 'YES', 'Yes', 'No'),
              consentValue: consentValue[item]
            };
          }
        })
        .filter((item) => item);

  const consentDataTypes = nestedIfCaseHandle(res.data.number, phoneTypes, emailTypes);
  let replaceKey = nestedIfCaseHandle(res.data.number, 'Phone', 'Email');

  const refactoredTypes = consentDataTypes?.map((type) => {
    return {
      ...type,
      name: type.name.replace(replaceKey, '')
    };
  });
  const typeOfValue = refactoredTypes.filter((type) => type.id == res.data.typeId);

  return {
    id: res.id,
    category: res.category,
    action: 'Consent',
    date: convertTimestamptoUSATime(res.timestamp, false),
    status: consentUpdateStatus[res.type].status,
    statusCode: consentUpdateStatus[res.type].statusCode,
    responsiblePartyName: returnValueOrDefault(res?.data?.responsiblePartyName, 'N/A'),
    agentName: returnValueOrDefault(agent, 'System'),
    consentType: nestedIfCaseHandle(res.data.number, 'Phone Number', 'Email Address'),
    value: returnValueOrDefault(res.data.emailAddress, phoneNumberFormat(res?.data?.number)),
    typeOfValue: returnValueOrDefault(typeOfValue[0]?.name, 'N/A'),
    isChanged: isChanged,
    consent: consentUpdateValues
  };
};
