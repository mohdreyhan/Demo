import numeral from 'numeral';
import { capitalizeFirstLetter } from '@oasis/js-utils';
import WarningAmber from '../../../Icons/WarningAmberEllipse.svg';
import { Paper, Stack } from '@oasis/react-core';

export const convertDateTime = (inputtxt) => {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(inputtxt / 1000);
  return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
};

/*----------- mm/dd/yyyy ---------*/

export const convertTimestamptoUSA = (input) => {
  if (input) {
    let date = new Date(input);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  return null;
};

const getTimezoneOffset = (value) => value.getTimezoneOffset() * 60000;

export const convertTimetoUTC = (value) => {
  if (value) {
    const dateTime = new Date(value);
    const utcFromLocal = new Date(dateTime.getTime() + getTimezoneOffset(dateTime));
    return convertTimestamptoUSA(utcFromLocal);
  }
  return null;
};

export const convertTimestamptoUSATime = (input, localTime = true) => {
  if (input) {
    let date = new Date(input);
    if (localTime) {
      return (
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }) +
        ' ' +
        date.toLocaleTimeString()
      );
    }
    let hr = date.getHours();
    let min = nestedIfCaseHandle(
      date.getMinutes() < 10,
      '0' + date.getMinutes(),
      date.getMinutes()
    );
    let ampm = 'AM';
    if (hr > 12) {
      hr -= 12;
      ampm = 'PM';
    }
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) +
      ' ' +
      hr +
      ':' +
      min +
      ampm
    );
  }
  return null;
};

/*------------- 09/12/2022 at 5:10 PM ------------------*/

export const convertTimestamptoUSATimeNotes = (input, value = '') => {
  if (input && value == '') {
    let date = new Date(input);
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) +
      ' ' +
      'at' +
      ' ' +
      date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    );
  }
  if (input && value != '') {
    let date = new Date(input);
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) +
      ' ' +
      ' ' +
      date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    );
  }
  return null;
};

export const formatCurrency = (value, currencySymbol) => {
  if (!value) return null;
  if (!currencySymbol) {
    currencySymbol = '$';
  }
  return numeral(value).format(`(${currencySymbol}0,0.00)`);
};
export const formatCurrencyAllowZero = (value, allowZero = true, currencySymbol = '$') => {
  if (allowZero && (value == 0 || !value || value == '')) return currencySymbol + '0.00';
  if (!value) return null;
  return numeral(value).format(`(${currencySymbol}0,0.00)`);
};

export const getssn = (ssn) => {
  if (ssn) {
    return '*** ** ' + ssn.slice(-4);
  } 
    return '';
};

export const convertNull = (temp, header, showNA) => {
  if (temp[header.accessor] == null || temp[header.accessor] == undefined) {
    temp[header.accessor] = nestedIfCaseHandle(showNA, 'N/A', '');
  }
  return temp;
};

export const convertPhoneNumber = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('formatPhoneNumber')) {
    temp[header.accessor] = formatPhoneNumber('USA', temp[header.accessor]);
  }
  return temp;
};

export const convertZipCode = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('formatZipCode')) {
    temp[header.accessor] = zipCodeFormat(temp[header.accessor]);
  }
  return temp;
};

export const convertTimeStampToDateTime = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('convertTimestamptoUSATime')) {
    temp[header.accessor] = convertTimestamptoUSATime(temp[header.accessor]);
  }
  return temp;
};

export const convertTimeStampToDate = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('convertTimestamptoUSA')) {
    temp[header.accessor] = convertTimestamptoUSA(temp[header.accessor]);
  }

  return temp;
};

export const capitalize = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('capitalizeFirstLetter')) {
    temp[header.accessor] = capitalizeFirstLetter(data[header.accessor].toLowerCase());
  }
  return temp;
};

export const convertCurreny = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('formatCurrency')) {
    temp[header.accessor] = formatCurrency(temp[header.accessor]);
  }
  if (header.operation?.includes('formatCurrencyAllowZero')) {
    temp[header.accessor] = formatCurrencyAllowZero(temp[header.accessor]);
  }
  return temp;
};

export const refactorPhoneStatus = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('convertPhoneStatus')) {
    if (
      temp[header.accessor].toLowerCase() === 'verified' ||
      temp[header.accessor].toLowerCase() === 'good'
    ) {
      temp[header.accessor] = 'Good';
    } else if (
      temp[header.accessor].toLowerCase() === 'disconnected' ||
      temp[header.accessor].toLowerCase() === 'bad'
    ) {
      temp[header.accessor] = 'Bad';
    } else if (
      temp[header.accessor].toLowerCase() === 'wrong number' ||
      temp[header.accessor].toLowerCase() === 'wrong'
    ) {
      temp[header.accessor] = 'Wrong';
    } else if (
      temp[header.accessor].toLowerCase() === 'unverified' ||
      temp[header.accessor].toLowerCase() === 'unknown'
    ) {
      temp[header.accessor] = 'Unknown';
    } else if (temp[header.accessor].toLowerCase() === 'nevercall') {
      temp[header.accessor] = 'Never Call';
    }
  }
  return temp;
};

export const handleBooleanToYesNo = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('convertBooleanYesNo')) {
    if (temp[header.accessor] === true) {
      temp[header.accessor] = 'Yes';
    } else {
      temp[header.accessor] = 'No';
    }
  }
  return temp;
};

export const handleSsn = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('getssn')) {
    temp[header.accessor] = getssn(temp[header.accessor]);
  }
  return temp;
};

export const handleBooleanToActiveInActive = (temp, header) => {
  if (
    temp[header.accessor] !== '' &&
    header.operation?.includes('convertBooleanToActiveInActive')
  ) {
    temp[header.accessor] = temp[header.accessor] === true ? 'Active' : 'Inactive';
  }
  return temp;
};

export const handleBooleanToHistoricalCurrent = (temp, header) => {
  if (
    temp[header.accessor] !== '' &&
    header.operation?.includes('convertBooleanToHistoricalCurrent')
  ) {
    temp[header.accessor] = temp[header.accessor] === true ? 'Historical' : 'Current';
  }
  return temp;
};

export const handleFalseStatus = (temp, header) => {
  if (header.operation?.includes('convertAllFalseToActive')) {
    temp[header.accessor] = 'Active';
  }
  return temp;
};

export const structureconvertTimetoUTC = (temp, header) => {
  if (temp[header.accessor] !== '' && header.operation?.includes('convertTimetoUTC')) {
    temp[header.accessor] = convertTimetoUTC(temp[header.accessor]);
  }
  return temp;
};

export const trimData = (temp, header) => {
  if (header.operation?.includes('trimData') && temp[header.accessor]) {
    temp[header.accessor] = temp[header.accessor].trim();
  }
  return temp;
};

export const restructureArray = (records, jsonData, showNA) => {
  return records?.map((data) => {
    let temp = { ...data };
    jsonData.forEach((header) => {
      trimData(temp, header);
      convertNull(temp, header, showNA);
      convertPhoneNumber(temp, header);
      convertZipCode(temp, header);
      convertTimeStampToDate(temp, header);
      convertTimeStampToDateTime(temp, header);
      structureconvertTimetoUTC(temp, header);
      capitalize(temp, header);
      convertCurreny(temp, header);
      handleBooleanToYesNo(temp, header);
      refactorPhoneStatus(temp, header);
      handleSsn(temp, header);
      handleBooleanToActiveInActive(temp, header);
      handleBooleanToHistoricalCurrent(temp, header);
      handleFalseStatus(temp, header);
    });
    return temp;
  });
};

//NOSONAR
//(Financial way of validation)
// export const validateWebsite = (inputTxt) => {
//   if (!/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z.-]+(\/[a-zA-Z0-9#]+\/?)*$/.test(inputTxt.trim())) {
//     return {
//       result: false,
//       message: 'Invalid Website'
//     };
//   }
// };

export const validateWebsite = (inputTxt) => {
  // Regular expression for URL validation
  let urlRegex = new RegExp(
    '^' +
      // Protocol (optional)
      '(?:(?:https?|ftp)://)?' +
      // Domain name (required)
      '(?:\\S+(?::\\S*)?@)?' + // User credentials (optional)
      '(?:[a-zA-Z0-9\\-]+\\.)+' + // Subdomains (optional)
      // Top-level domain with mandatory .com or .co extension
      '(?:[a-zA-Z]{2,}(?:\\.com|\\.co|\\.))' +
      // Port number (optional)
      '(?::\\d{2,5})?' +
      // Path (optional)
      '(?:/\\S*)?' +
      '$',
    'i'
  );

  // Test the input URL against the regular expression
  if (!urlRegex.test(inputTxt.trim())) {
    return {
      result: false,
      message: 'Invalid Website'
    };
  }
};

export const validateEmail = (type, inputTxt) => {
  if (type === 'email') {
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(inputTxt.trim())) {
      return {
        result: false,
        message: 'Invalid email address'
      };
    }
  }
};
export const validatePhone = (type, inputTxt) => {
  if (type === 'phone' && inputTxt) {
    // !/^(\(\d{3}\) |\d{3}-)\d{3}-\d{4}$/ ///Donot remove this regex
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(inputTxt.trim())) {
      return {
        result: false,
        message: 'Invalid phone number'
      };
    } else if (inputTxt.replaceAll('0', '').trim().length === 2) {
      return {
        result: false,
        message: 'Phone Number cannot be all zeroes'
      };
    } else {
      return {
        result: true
      };
    }
  }
};

export const formatPhoneNumber = (type, inputTxt) => {
  if (inputTxt) {
    if (type == 'USA') {
      return inputTxt.replace(/^(\d{3})(\d{3})(\d{4})$/g, '($1) $2-$3');
    }
  }
};

export const phoneNumberFormat = (value) => {
  if (!value) return value;
  let phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const phoneNumberFormatSearch = (value, inputValue) => {
  if (!value) return value;
  let phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 3) return phoneNumber;
  else if (phoneNumberLength === 3) {
    if (/^[\+]?[(]?\d{3}[)]+$/g.test(value)) {
      return phoneNumber.slice(0, 2);
    } else return `(${phoneNumber.slice(0, 3)}) `;
  } else if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}`;
  } else
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const highlistbasedOnsearch = (searchValue, nameString) => {
  const keywordsString = searchValue.replace(/[-_)(]/g, '');
  const keywords = keywordsString.split(/\s/);
  const pattern = new RegExp(`(${keywords.join('|')})`, 'gi');
  const phrase = nameString;
  const result = phrase.replace(pattern, '<b>$1</b>');
  return result;

  //NOSONAR
  // return nameString.replace(
  //   new RegExp(`(${searchValue})`, "gi"),
  //   "<b>$1</b>"
  // );
};
export function highlightSearch(nameString, searchValue) {
  const startIndex = nameString.indexOf(searchValue);
  const endIndex = startIndex + searchValue.length;
  return (
    <>
      <b>
        {nameString.slice(0, startIndex)}
        {searchValue}
      </b>
      {nameString.slice(endIndex)}
    </>
  );
}

export const phoneNumberFormatSplitted = (phoneNumber, input) => {
  if (!phoneNumber) return phoneNumber;
  const inputNumber = input.replace(/[^\d]/g, '');
  const inputNumberLength = inputNumber.length;
  if (inputNumberLength < 4) return `${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  if (inputNumberLength < 7) {
    return `${phoneNumber.slice(inputNumberLength, 6)}-${phoneNumber.slice(6, 10)}`;
  }
  return `${phoneNumber.slice(inputNumberLength, 10)}`;
};

export const validatePrimaryField = (userInputs) => {
  if (!userInputs.active && userInputs.isDefault) {
    return {
      result: false,
      message: 'Cannot set inactive as primary record'
    };
  }
};

export const validateError = (data, errorValue = []) => {
  return errorValue.some((error) => error.fieldName == data.name);
};

export const validateHelperText = (data, errorValue = []) => {
  const value = errorValue.find((error) => error.fieldName == data.name);
  return value?.text;
};

export const scrollTop = (screenPage) => {
  if(screenPage=='configuremanager')
 { let elem2 = document.querySelector('.makeStyles-mainContainer-2');
  elem2.scrollTop = '0 px';
  elem2.scrollIntoView({ behavior: 'smooth' });
}
  if(screenPage=='account')
 { let elem = document.querySelector('.makeStyles-MainLayout-1');
  elem.scrollTop = '0 px';
  elem.scrollIntoView({ behavior: 'smooth' });
}
};

export const replaceTypes = (typesData, replacingValue) => {
  return typesData?.map((type) => {
    return { ...type, name: type.name.replace(replacingValue, '') };
  });
};

export const addNewKey = (typeData, newKey, existingKey) => {
  return typeData?.map((type) => {
    return { ...type, [newKey]: type[existingKey] };
  });
};

export const handleOptionsData = (formData, accessor, optionsData) => {
  const arr = [];
  formData?.forEach((data) => {
    if (data.accessor == accessor) {
      arr.push({ ...data, options: { optionsData: optionsData } });
    } else {
      arr.push({ ...data });
    }
  });
  return arr;
};

export const nestedIfCaseHandle = (condition, trueValue, falseValue) => {
  if (condition) {
    return trueValue;
  } else {
    return falseValue;
  }
};

export const andCondition = (condition1, condition2) => {
  return condition1 && condition2;
};

export const orCondition = (condition1, condition2) => {
  return condition1 || condition2;
};

export const checkNullorEmpty = (data) => {
  if (!data) {
    return false;
  } else {
    return data;
  }
};

export const sortByPrimaryStatus = (contactData) => {
  return contactData.sort((a, b) => {
    if (a.isDefault < b.isDefault) return 1;
    else if (a.isDefault > b.isDefault) return -1;
    else return a.active > b.active ? -1 : 1;
  });
};

export const getPrimaryRecord = (records) => {
  return records.filter((data) => data.isDefault);
};
export const refactorConsent = (consentValue, consentKey, consentDate, temp) => {
  if (consentValue === true || consentValue === 'Yes') {
    temp = {
      ...temp,
      [consentKey]: consentDate ? (
        <>
          <span style={{ fontWeight: 'bold' }}>{'Yes'} </span>({convertTimetoUTC(consentDate)})
        </>
      ) : (
        <>
          <span style={{ fontWeight: 'bold' }}>{'Yes'} </span>{' '}
        </>
      )
    };
  } else if (consentValue === false || consentValue == 'No') {
    temp = {
      ...temp,
      [consentKey]: 'No'
    };
  }
  return temp;
};

export const refactorDefault = (value, key, temp) => {
  if (value === true || value == 'Yes') {
    temp = {
      ...temp,
      [key]: 'Yes'
    };
  } else if (value === false || value == 'No') {
    temp = {
      ...temp,
      [key]: 'No'
    };
  }
  return temp;
};

export const refactoredSource = (consumerArr, value, key, temp) => {
  consumerArr.map((data) => {
    if (value == data.id) {
      temp = {
        ...temp,
        [key]: data.source
      };
    }
  });
  return temp;
};

export const refactorComaker = (value, key, temp) => {
  if (value && value.toLowerCase() !== 'comaker') {
    temp = {
      ...temp,
      [key]: capitalizeFirstLetter(value.toLowerCase())
    };
  } else if (value && value.toLowerCase() == 'comaker') {
    temp = {
      ...temp,
      [key]: 'Co-Maker'
    };
  }
  return temp;
};

export const refactorDateInConsentFields = (userInputs, value, property, submit) => {
  if (value) {
    if (submit) {
      return {
        ...userInputs,
        [property]: new Date().toISOString()
      };
    } else {
      return {
        ...userInputs,
        [property]: convertTimestamptoUSA(new Date())
      };
    }
  } else {
    return {
      ...userInputs,
      [property]: ''
    };
  }
};

export const validatePostalCode = (inputTxt, ErrMsg) => {
  inputTxt = zipCodeFormat(inputTxt);
  let msg = ErrMsg || 'Invalid zipcode';
  if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputTxt)) {
    return msg;
  } else {
    let newText = inputTxt.split('-');
    if (newText[0].replaceAll('0', '').trim().length === 0) {
      return msg;
    } else if (inputTxt.trim().length > 6) {
      if (newText[1].replaceAll('0', '').trim().length === 0) {
        return msg;
      }
    }
  }
  return '';
};

export const zipCodeFormat = (value) => {
  if (!value) return value;
  let postalCode = value.replace(/[^\d]/g, '');
  const postalCodeLength = postalCode.length;
  if (postalCodeLength < 6) return postalCode;
  return `${postalCode.slice(0, 5)}-${postalCode.slice(5, 9)}`;
};

export const zipCodeFormatSplitted = (value, input) => {
  let originalZipCode = value.replace(/[^\d]/g, '');
  let postalCode = input.replace(/[^\d]/g, '');
  const postalCodeLength = postalCode.length;
  if (!value) return value;
  if (value.length < 6) return `${originalZipCode.slice(postalCodeLength, 5)}`;
  if (postalCodeLength < 6)
    return `${originalZipCode.slice(postalCodeLength, 5)}-${originalZipCode.slice(5, 9)}`;
  return `${originalZipCode.slice(postalCodeLength, 9)}`;
};
export const returnValueOrDefault = (value, defaultVal) => {
  if (value) {
    return value;
  }
  return defaultVal;
};

export const returnValueOrDefaultNested = (conditions, trueValues, falseValue) => {
  let returnValue;
  conditions.forEach((condition, index) => {
    if (condition) {
      returnValue = trueValues[index];
    }
  });
  if (returnValue !== undefined) {
    return returnValue;
  } else {
    returnValue = falseValue;
    return returnValue;
  }
};

export const extractImagePath = (imageSrc) => {
  return `${window.location.origin}/images/${imageSrc}`;
};

export const matchAddressSet = (address, divider) => {
  let result = '';
  if (address?.address1 && address?.address1 != null) {
    result = result + address?.address1;
  }
  if (address?.addressLine1 && address?.addressLine1 != null) {
    result = result + address?.addressLine1;
  }
  if (address?.addressLine2 && address?.addressLine2 != null) {
    result = result + divider + ` ${address?.addressLine2}`;
  }
  if (address?.address2 && address?.address2 != null) {
    result = result + divider + ` ${address?.address2}`;
  }
  if (address?.city) {
    result = result + divider + ` ${address?.city}`;
  }
  if (address?.postalCode) {
    result = result + divider + ` ${zipCodeFormat(address?.postalCode)}`;
  }
  if (address?.zip) {
    const zip = zipCodeFormat(address?.zip);
    result = result + divider + ` ${zip}`;
  }
  if (address?.zipCode) {
    result = result + divider + ` ${zipCodeFormat(address?.zipCode)}`;
  }
  if (address?.state) {
    result = result + divider + ` ${address?.state}`;
  }
  if (address?.province) {
    result = result + divider + ` ${address?.province}`;
  }
  if (address?.country) {
    result = result + divider + ` ${address?.country}`;
  }
  return result.replace(/^,/, '');
};

export const changePopupHeading = (condition, titleToReplace, popupData, iconToReplace) => {
  if (condition) {
    return popupData.map((header) => {
      if (header.accessor == 'title') {
        header.label = titleToReplace;
        return header;
      } else if (header.accessor == 'icon') {
        header.label = iconToReplace;
        return header;
      } else {
        return { ...header };
      }
    });
  }
};

export const changeCountryNameToId = (inputs, states) => {
  return states.forEach((state) => {
    if (inputs.countryId == state.country.name) {
      inputs.countryId = state.country.id;
    }
  });
};

export const removeSpecialCharacters = (condition, value) => {
  if (condition && value.length > 0) {
    return value.replace(/[-_ )(]/g, '');
  }
};

export const validateAlphanumeric = (input) => {
  const isValid = /^[0-9a-zA-Z]+$/;
  return !(input && !input.match(isValid));
};

export const validateAlphaText = (input) => {
  const isValid = /^[a-zA-Z ]+$/;
  return !(input && !input.match(isValid));
};

export const validateAlphanumericWithSpace = (input) => {
  const isValid = /^[0-9a-zA-Z ]+$/;
  return !(input && !input.match(isValid));
};

export const findRelationShipType = (relationshipArray, relationId) => {
  let result = 'N/A';
  if (relationshipArray && relationshipArray.length > 0) {
    relationshipArray.map((item) => {
      result = item.id === relationId ? item.name : result;
    });
  }
  return result;
};

export const conditionBasedZipcodePattern = (formData, accessor, value) => {
  return formData
    .filter((data) => data.accessor == accessor)
    .map((form) => {
      if (value.length <= 5) {
        form.format = '######';
        form.mask = '';
      } else {
        form.format = '#####-####';
        form.mask = '_';
      }
    });
};

export const conditionBasedPhonePatternWithExt = (formData, accessor, value) => {
  return formData
    .filter((data) => data.accessor == accessor)
    .map((form) => {
      if (value.length < 10) {
        form.format = '(###) ###-####';
        form.mask = '_';
      } else {
        form.format = '(###) ###-####,#####';
        form.mask = '_';
      }
    });
};

export const defaultSorting = (data) => {
  let returnValue = '';
  data.forEach((value) => {
    if (value.defaultSorting) {
      returnValue = value.accessor;
    }
  });
  return returnValue;
};

export const defaultSortingOrder = (data) => {
  let returnValue = 'asc';
  data.forEach((value) => {
    if (value.defaultSortingOrder == 'desc') {
      returnValue = 'desc';
    }
  });
  return returnValue;
};

export const getDateInfo = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const todayDate = date.toISOString().substring(0, 10);
  const monthStartDate = `${year}-${month.toString().padStart(2, '0')}-01`;

  const weekStartDate = new Date(date);
  weekStartDate.setDate(day - dayOfWeek);

  const yearStartDate = `${year}-01-01`;

  return {
    todayDate,
    monthStartDate,
    weekStartDate: weekStartDate.toISOString().substring(0, 10),
    yearStartDate
  };
};

export const getMenuOptions = (icon, label) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img src={icon} />
      </div>
      <div style={{ paddingLeft: '5px', fontWeight: 400 }}>{label}</div>
    </div>
  );
};

export const addingDays = (days, array, attachment) => {
  if (attachment == 'Day') {
    return days?.map((day) => {
      array?.forEach((d) => {
        if (day.hasOwnProperty(d) && day[d] == 0) {
          day[d] = 'Same Day';
        } else if (day.hasOwnProperty(d) && day[d] == 1) {
          day[d] = `+${day[d]} ${attachment}`;
        } else if (day.hasOwnProperty(d) && day[d] > 0) {
          day[d] = `+${day[d]} ${attachment}s`;
        } else {
          day[d] = `${day[d]} ${attachment}s`;
        }
      });
      return day;
    });
  }
};
export const replaceString = (str) => {
  return str && str.replace(/[-_ )(]/g, '');
};

export const showEmptyTile = () => {
  return (
    <>
      <Paper
        style={{
          justifyContent: 'center',
          height: '271px',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'poppins',
          fontSize: '20px'
        }}>
        <Stack sx={{ alignItems: 'center' }}>
          <img height="90px" src={WarningAmber} width="90px" />
          <div style={{ paddingTop: '10px' }}>{`There are no records found.`}</div>
        </Stack>
      </Paper>
    </>
  );
};

