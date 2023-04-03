import { capitalizeFirstLetter } from '@oasis/js-utils';
import {
  convertTimestamptoUSA,
  convertTimestamptoUSATime,
  formatCurrency,
  formatCurrencyAllowZero,
  formatPhoneNumber,
  getssn,
  zipCodeFormat,
  convertTimetoUTC
} from './commonfunctions';

export const convertNull = (temp, header, showNA) => {
  if (temp[header.property] == null || temp[header.property] == undefined) {
    if (showNA) {
      temp[header.property] = 'N/A';
    } else {
      temp[header.property] = '';
    }
  }
  return temp;
};

export const convertPhoneNumber = (temp, header) => {
  if (
    header.operation?.includes('formatPhoneNumber')
  ) {
    temp[header.property] = formatPhoneNumber('USA', temp[header.property]);
  }
  return temp;
};

export const convertTimeStampToDateTime = (temp, header) => {
  if (
    header.operation?.includes('convertTimestamptoUSATime')
  ) {
    temp[header.property] = convertTimestamptoUSATime(temp[header.property]);
  }
  return temp;
};

export const convertTimeStampToDate = (temp, header) => {
  if (
    header.operation?.includes('convertTimestamptoUSA')
  ) {
    temp[header.property] = convertTimestamptoUSA(temp[header.property]);
  }
  return temp;
};

export const capitalize = (temp, header) => {
  if (
    header.operation?.includes('capitalizeFirstLetter')
  ) {
    temp[header.property] = capitalizeFirstLetter(temp[header.property].toLowerCase());
  }
  return temp;
};

export const convertCurreny = (temp, header) => {
  if (
    header.operation?.includes('formatCurrency')
  ) {
    temp[header.property] = formatCurrency(temp[header.property]);
  }
  if (header.operation?.includes('formatCurrencyAllowZero')) {
    temp[header.property] = formatCurrencyAllowZero(temp[header.property]);
  }
  return temp;
};

export const refactorPhoneStatus = (temp, header) => {
  if (
    header.operation?.includes('convertPhoneStatus')
  ) {
    if (
      temp[header.property].toLowerCase() === 'verified' ||
      temp[header.property].toLowerCase() === 'good'
    ) {
      temp[header.property] = 'Good';
    } else if (
      temp[header.property].toLowerCase() === 'disconnected' ||
      temp[header.property].toLowerCase() === 'bad'
    ) {
      temp[header.property] = 'Bad';
    } else if (
      temp[header.property].toLowerCase() === 'wrong number' ||
      temp[header.property].toLowerCase() === 'wrong'
    ) {
      temp[header.property] = 'Wrong';
    } else if (
      temp[header.property].toLowerCase() === 'unverified' ||
      temp[header.property].toLowerCase() === 'unknown'
    ) {
      temp[header.property] = 'Unknown';
    } else if (temp[header.property].toLowerCase() === 'nevercall') {
      temp[header.property] = 'Never Call';
    }
  }
  return temp;
};

export const handleBooleanToYesNo = (temp, header) => {
  if (
    header.operation?.includes('convertBooleanYesNo')
  ) {
    temp[header.property] =
      temp[header.property] === true || temp[header.property] === 'Yes' ? 'Yes' : 'No';
  }
  return temp;
};

export const handleSsn = (temp, header) => {
  if (header.operation?.includes('getssn')) {
    temp[header.property] = getssn(temp[header.property]);
  }
  return temp;
};

export const handleBooleanToActiveInActive = (temp, header) => {
  if (
    header.operation?.includes('convertBooleanToActiveInActive')
  ) {
    temp[header.property] = temp[header.property] === true ? 'Active' : 'Inactive';
  }
  return temp;
};

export const handleBooleanToHistoricalCurrent = (temp, header) => {
  if (
    header.operation?.includes('convertBooleanToHistoricalCurrent')
  ) {
    temp[header.property] = temp[header.property] === true ? 'Historical' : 'Current';
  }
  return temp;
};

export const handleFalseStatus = (temp, header) => {
  if (header.operation?.includes('convertAllFalseToActive')) {
    temp[header.property] = 'Active';
  }
  return temp;
};

export const convertZipCode = (temp, header) => {
  if (header.operation?.includes('formatZipCode')) {
    temp[header.property] = zipCodeFormat(temp[header.property]);
  }
  return temp;
};

export const structureconvertTimetoUTC = (temp, header) => {
  if (header.operation?.includes('convertTimetoUTC')) {
    temp[header.property] = convertTimetoUTC(temp[header.property]);
  }
  return temp;
};

export const trimData = (temp, header) => {
  if (header.operation?.includes('trimData') && temp[header.property]) {
    temp[header.property] = temp[header.property].trim();
  }
  return temp;
};

export const restructureArray = (records, jsonData, showNA) => {
  return records?.map((data) => {
    let temp = { ...data };
    jsonData.forEach((header) => {
      trimData(temp, header);
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
      convertNull(temp, header, showNA);
    });
    return temp;
  });
};
