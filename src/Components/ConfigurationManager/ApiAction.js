import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import { restrictionsMockData } from './Restrictions/ViewRestrictions/ViewRestrictions.Data';

export const getStatusCodePriority = async () => {
  try {
    let apiResponse = await ApiServices('account-config').get(`status-code-priorities`);
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

export const addStatusAPIcall = async (addStatusFormInputs, showDialog, handleDialog, getStatusCodeData) => {
  try {
    let apiResponse = await ApiServices('account-config', 'Added Status Code Priority').post(`status-code-priorities`, addStatusFormInputs);

    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      getStatusCodeData();
      handleDialog(!showDialog);
      return validatedResponse;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
}

export const getStatusCode = async () => {
  try {
    let apiResponse = await ApiServices('account-config').get(`status-code`);

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

// == get restrictions Data ===
export const getRestrictionsAPIcall = async () => {
  return restrictionsMockData;
};

export const getCustomFields = async () => {
  try {
    let apiResponse = await ApiServices('static-data').get(`custom-fields`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse?.customFields;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};

export const addCustomFields = async (data, handleDialog, fetchCustomFields) => {
  try {
    let apiResponse = await ApiServices('static-data').post('custom-fields', data);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      handleDialog();
      fetchCustomFields();
      return validatedResponse;
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};


