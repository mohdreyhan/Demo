import {
  QUICKACTIONSURVEYFLOWS,
  APICALLSTATUS,
  FORMGROUPDATA,
  CURRENTSTEPDATA,
  HISTORYBPDATA,
  FORMGROUPANSWERS,
  SELECTEDFORMID,
  CANCELBPDATA,
  SETTINGCANCELBPDATA,
  CURRENTPORTFOLIOID,
  CURRENTRESPONSIBLEID,
  EXECUTEBUSINESSPROCESS
} from './Actions';
import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import {
  handleOrCase,
  nestedIfCaseHandle,
  quickSurveyFlowIntancesSortHandler,
  surveyScheduleStatusActive
} from '../../Components/BusinessProcess/Business.Data';

/* --------------------- GET ALL SURVEY SCHEDULES -------------------------------*/

export const GETALLSURVEYFLOWS = (portfolioId, responsibleId) => async (dispatch) => {
  try {
    dispatch(APICALLSTATUS(true));
    const apiResponse = await ApiServices('account').get(
      `v1/survey-schedules?portfolioId=${portfolioId}&responsibleId=${responsibleId}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.surveySchedules) {
      let filtersurveySchedules = validatedResponse?.surveySchedules?.filter((surveySchedule) =>
        handleOrCase(surveySchedule?.status == 'ACTIVE', surveySchedule?.hasActiveInstance)
      );
      let quickSurveyFlowIntances = [];
      for (const element of filtersurveySchedules) {
        const surveyFlowsRes = await fetchSurveyFlows(responsibleId, element?.id);
        let hasActiveInstanceSurvey = surveyFlowsRes;
        if (element.status != 'ACTIVE') {
          hasActiveInstanceSurvey = surveyFlowsRes.filter((f) => f.hasActiveInstance);
        }
        for (const surveyElement of hasActiveInstanceSurvey) {
          let temp = {
            ...surveyElement,
            status: '',
            surveyScheduleStatus: element.status,
            frequencyMinutes: nestedIfCaseHandle(
              surveyElement.frequencyMinutes,
              surveyElement.frequencyMinutes,
              0
            ),
            flowFrequency: nestedIfCaseHandle(
              surveyElement.flowFrequency,
              surveyElement.flowFrequency,
              0
            ),
            isInProgress: []
          };
          let flowInstanceRes = await fetchFlowIntances(responsibleId, surveyElement.id);
          let sortResponse = flowInstanceRes.filter(
            (filterObject) => filterObject.status.toLowerCase() == 'in_process'
          );
          if (sortResponse.length) {
            temp = { ...temp, status: sortResponse?.[0]?.status, isInProgress: sortResponse };
          }
          quickSurveyFlowIntances = [...quickSurveyFlowIntances, temp];
        }
      }
      let quickSurveyFlowIntancesSortData =
        quickSurveyFlowIntancesSortHandler(quickSurveyFlowIntances);

      dispatch(QUICKACTIONSURVEYFLOWS(quickSurveyFlowIntancesSortData));
      dispatch(APICALLSTATUS(false));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- Cancel Business Process Instance ----*/

export const POSTCANCELBPINSTANCE =
  (surveyFlowInstanceId, historyId, quickActionSurveyFlows) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Business Process Cancelled').post(
        `v1/survey-flow-instances/${surveyFlowInstanceId}/cancel`,
        {}
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse?.id) {
        if (validatedResponse.step) {
          let quickActionMapData = quickActionSurveyFlows?.map((record) => {
            if (record.id == historyId) {
              if (record.surveyScheduleStatus == surveyScheduleStatusActive) {
                return { ...record, isInProgress: [], status: validatedResponse.status };
              }
            } else {
              return record;
            }
          });
          let quickActionData = quickActionMapData.filter((valset) => valset);
          quickActionData = quickSurveyFlowIntancesSortHandler(quickActionData);
          dispatch(QUICKACTIONSURVEYFLOWS(quickActionData));
        }
        dispatch(CANCELBPDATA(validatedResponse));
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

export const SETCANCELBPDATA = (data) => async (dispatch) => {
  try {
    dispatch(SETTINGCANCELBPDATA(data));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- Create Business Process Instance ----*/

export const UPDATEQUICKYACTIONSURVEYFLOWS = (businessProcesses) => async (dispatch) => {
  try {
    let sortSurveyFlows = businessProcesses?.sort((a, b) => {
      return b.status === 'IN_PROCESS' ? 1 : -1;
    });
    dispatch(QUICKACTIONSURVEYFLOWS(sortSurveyFlows));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSurveyFlows = async (responsibleId, scheduleId) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/survey-schedules/${scheduleId}/survey-flows?responsibleId=${responsibleId}&&evaluateAccountCriteria=${true}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.surveyFlows) {
      return validatedResponse?.surveyFlows;
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const fetchFlowIntances = async (responsibleId, flowId) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/survey-flows/${flowId}/survey-flow-instances?responsibleId=${responsibleId}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.surveyFlowInstances) {
      return validatedResponse?.surveyFlowInstances;
    }
  } catch (error) {
    handleNetworkError(error);
    console.error(error);
  }
};

/* --------------------- Get FORM Group Data for Business Process Instance ----*/

export const GETBPFORMGROUPDATA = (responsibleId, surveyId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/survey/${surveyId}/groups?responsibleId=${responsibleId}`,
      {}
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.groups) {
      dispatch(FORMGROUPDATA(validatedResponse?.groups));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- Set user answer data ----*/

export const SETGROUPANSWERDATA = (answerData) => async (dispatch) => {
  try {
    await dispatch(FORMGROUPANSWERS(answerData));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- Set user answer data ----*/

export const RESETGROUPDATA = (groupData) => async (dispatch) => {
  try {
    await dispatch(FORMGROUPDATA([]));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- Get FORM Group Data for Business Process Instance ----*/

export const SETHISTORYBPDATA = (historyData) => async (dispatch) => {
  try {
    dispatch(HISTORYBPDATA(historyData));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- Set current step data ----*/

export const SETCURRENTSTEPDATA = (stepData) => async (dispatch) => {
  try {
    await dispatch(CURRENTSTEPDATA(stepData));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- Set Selected Form ID ----*/

export const SETSELECTEDFORMID = (formId) => async (dispatch) => {
  try {
    await dispatch(SELECTEDFORMID(formId));
  } catch (error) {
    console.log(error);
  }
};

export const SETCURRENTPORTFOLIOID = (portfolioId) => async (dispatch) => {
  try {
    await dispatch(CURRENTPORTFOLIOID(portfolioId));
  } catch (error) {
    console.log(error);
  }
};

export const SETCURRENTRESPONSIBLEID = (responsibleId) => async (dispatch) => {
  try {
    await dispatch(CURRENTRESPONSIBLEID(responsibleId));
  } catch (error) {
    console.log(error);
  }
};

export const SETEXECUTEBUSINESSPROCESS = (businessId) => async (dispatch) => {
  try {
    await dispatch(EXECUTEBUSINESSPROCESS(businessId));
  } catch (error) {
    console.log(error);
  }
};
