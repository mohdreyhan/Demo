import { ColorPallete } from '../../../theme/ColorPallete';
import { validateEmail, validatePostalCode, validateWebsite,removeSpecialCharacters } from '../commonfunctions';

export const renderLabel = (data, formType) => {
  if (formType) {
    return (
      <div>
        {formType == 'historical' ? data.label : data.currentLabel}
        {data.required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
      </div>
    );
  } else {
    return (
      <div>
        {data.label}
        {data.required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
      </div>
    );
  }
};

export const renderGridSize = (data, formType) => {
  if (formType == 'current') {
    return data.currentXs;
  } else {
    return data.xs;
  }
};

export const handleFieldWidth = (data) => {
  if (data.width) {
    return { width: data.width };
  } else {
    return {};
  }
};

export const renderGridStyles = (data) => {
  if (data.style) {
    return data.style;
  } else {
    return { paddingBottom: '10px' };
  }
};

export const validatePhoneNumber = (inputs, data, internalArr, errorMsg) => {
  if (inputs && data.operation?.includes('formatPhoneNumber')) {
    const replacedValue = inputs.replace(/[-_ )(]/g, '');
    if (replacedValue.length < 10 && replacedValue != 0) {
      return internalArr.push({
        fieldName: data.name,
        text: errorMsg ? errorMsg : 'Invalid Phone number'
      });
    }
  }
};

export const validateZipCode = (inputs, data, internalArr, ErrMsg) => {
  if (inputs && data.operation?.includes('formatZipcode')) {
    const response = validatePostalCode(inputs, ErrMsg);
    if (response && response != '') {
      return internalArr.push({
        fieldName: data.name,
        text: response
      });
    }
  }
};

export const validateEmailAddress = (inputs, data, internalArr) => {
  if (inputs && data.operation?.includes('formatEmailAddress')) {
    const response = validateEmail('email',inputs);
    if (response && !response.result) {
       internalArr.push({
        fieldName: data.name,
        text: response.message
      });
    }
  }
};

export const validateWebsiteFormField = (inputs, data, internalArr) => {
  if (inputs && data.operation?.includes('validateWebsite')) {
    const response = validateWebsite(inputs);
    if (response && !response.result) {
      internalArr.push({
        fieldName: data.name,
        text: response.message
      });
    }
  }
};


export const removeSpecialCharactersFormField =(form,finalObj)=>{
  if (
    form?.operation?.includes('formatPhoneNumber') ||
    form?.operation?.includes('formatZipcode')
  ) {
    finalObj[form.accessor] = removeSpecialCharacters(
      [form.accessor] in finalObj && finalObj[form.accessor],
      finalObj[form.accessor]
    );
  }
};