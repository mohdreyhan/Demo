import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';

// --------------------------GET Search key attorney list ----------------------------------------------------
export const fetchSearchAttorney = async (text) => {
  try {
    let apiResponse = await ApiServices('account').get(`/v1/attorneys/search?searchKey=${text}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse.attorneys;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};
