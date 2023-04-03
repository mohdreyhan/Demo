import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import { HistoryBusinessProcessStatus } from './Business.Data';

// == Create Business Process Instance ===
export const createBusinessProcessInstace = async (responsibleId, flowId) => {
  try {
    const apiResponse = await ApiServices('account', 'Business Process Started').post(
      `v1/survey-flows/${flowId}/survey-flow-instance`,
      { responsibleId: responsibleId }
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    console.error(error);
    handleNetworkError(error);
    return {};
  }
};

//get flowinstance current step
export const getCurrentStepSurveyInstance = async (responsibleId, surveyFlowInstanceId) => {
  try {
    let response = await ApiServices('account').get(
      `v1/survey-flow-instances/${surveyFlowInstanceId}/current-step?responsibleId=${responsibleId}`,
      {}
    );
    return response?.data?.result?.surveyFlowStep;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// ==== Survey details =======
export const getSurveyAllDetails = async (responsibleId, surveyId) => {
  try {
    let apiResponse = await ApiServices('account').get(
      `v1/survey/${surveyId}?responsibleId=${responsibleId}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.survey) {
      return validatedResponse?.survey;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};

// ==== check group answers =======
export const checkAnswerValues = async (stepId, postData) => {
  try {
    let message = postData.validationOnly ? 'Form Validated' : 'Form Submitted';
    let apiResponse = await ApiServices('account', message).post(
      `v1/steps/${stepId}/submit`,
      postData
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};

// ==== Historyy Details =====

export const getHistoryDetails = async (responsibleId, offset, limit) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/responsibles/${responsibleId}/survey-flow-events?limit=${limit}&offset=${offset}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.surveyFlowEvents) {
      let historyData = [];
      for (const element of validatedResponse?.surveyFlowEvents) {
        let instanceData = {
          id: element?.step?.instance?.id,
          name: element?.step?.instance?.name,
          createdDate: element?.step?.instance?.createdDate,
          lastUpdatedDate: element?.step?.instance?.lastUpdatedDate,
          user: element?.user,
          status: element?.step?.instance?.status
        };

        if (HistoryBusinessProcessStatus[element?.status] == element?.step?.instance?.status) {
          historyData.push({
            ...element?.step?.instance?.flow,
            status:
              HistoryBusinessProcessStatus[element?.status] ?? element?.step?.instance?.status,
            instanceData: [instanceData]
          });
        }

        // } else {
        //     let index = historyData.findIndex(his => his.id == scheduleId);
        //     let instanceSurveyData = historyData[index].instanceData;
        //     instanceSurveyData.push(instanceData);
        //     historyData[index] = {
        //         ...historyData[index],
        //         instanceData: instanceSurveyData
        //     }
        // }
      }
      return historyData;
    } else {
      return [];
    }
  } catch (error) {
    handleNetworkError(error);
    return [];
  }
};

// ==== save temp data =======
export const saveTempData = async (stepId, tempData) => {
  try {
    let apiResponse = await ApiServices('account').post(`v1/steps/${stepId}/temp-save`, tempData);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};

// ==== View summary data =======
export const getViewSummaryData = async (surveyFlowInstanceId, responsibleId) => {
  try {
    let apiResponse = await ApiServices('account').get(
      `v1/survey-flow-instances/${surveyFlowInstanceId}/steps?responsibleId=${responsibleId}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};
