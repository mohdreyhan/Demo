import { extractImagePath } from '../Common/commonfunctions';
export const HistoryStatus = {
  IN_PROCESS: 'IN PROGRESS',
  FINISHED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REMEDIATE: 'REMEDIATE'
};
export const HistoryStatusClass = {
  IN_PROCESS: 'inprogress',
  FINISHED: 'completed',
  CANCELLED: 'cancelled',
  REMEDIATE: 'remediate'
};
export const HistoryBusinessProcessStatus = {
  STARTED: 'IN_PROCESS',
  COMPLETED: 'FINISHED',
  CANCELLED: 'CANCELLED',
  REMEDIATE: 'REMEDIATE'
};
export const ButtonsActions = {
  SAVE: 'save',
  TEMP: 'temp',
  CANCEL: 'cancelAction',
  CLOSE: 'close',
  CONFIRM: 'Confirm',
  PREVIOUS: 'Previous',
  SUBMIT_FORM: 'submit_form',
  VIEW_SUMMARY: 'viewSummary',
  CLOSE_IN_TITLE: "closeInTitle"
};
export const FormObjectTypes = { values: 'values', errors: 'errors', errorMsg: 'errorMsg' };
export const QuestionFiledType = {
  checkbox: 'Checkbox',
  dropDown: 'DropDown',
  radio: 'Radio',
  textArea: 'TextArea',
  readOnly: 'ReadOnly',
  textField: 'TextField',
  hideField: 'HideField'
};
export const PopupPropsActions = {
  businessFormPreview: 'businessFormPreview',
  history: 'history',
  businessForm: 'businessForm',
  deletePopup: 'deletePopup',
  cancelBusinessProcess: 'cancelBusinessProcess',
  accessDenied: 'accessDenied',
  thankyou: 'thankyou',
  frequency: 'frequency',
  renderNextForm: 'renderNextForm',
  loadingComponent: 'loadingComponent',
  viewSummary: 'viewSummary'
};

export const ThankyouComponentProps = {
  showCancel: true,
  action: 'thankyou',
  showNext: false,
  leftButton: false,
  showButton: false,
  showConfirm: false,
  beforeCancel: false,
  afterTitleIconSrc: '',
  showTemp: false,
  showViewSummary: [{ title: 'View Summary', action: 'viewSummary', type: 'button' }]
};

export const surveyScheduleStatusActive = 'ACTIVE';

export const sortRecord = (record1, record2, sortOrder = 'lessthan') => {
  if (sortOrder == 'lessthan') {
    return record1 < record2 ? 1 : 0;
  } else {
    return record1 > record2 ? 1 : 0;
  }
};

export const HistoryDefaultPopupProps = {
  title: 'Action History',
  icon: extractImagePath('history-blue.png'),
  showCancel: true,
  action: 'history',
  maxWidth: 'md',
  leftButton: null
};

export const checkDataType = (dataType) => {
  let allDataTypes = ['Currency', 'Integer', 'Percentage', 'Decimal'];
  return allDataTypes.includes(dataType) ? 'number' : 'text';
};

export const sortByDisplayOrder = (items) => {
  return items.sort((a, b) => (a.displayOrder > b.displayOrder ? 1 : -1));
};

export const setGroupAnswerFormat = (answerData, groupData) => {
  let validateFormat = [];
  groupData.map((sampleData) => {
    let questionArray = [];
    sampleData.questions.map((question) => {
      let answerVal = answerData[question.id] ?? '';
      if (answerVal && typeof answerVal === 'object') {
        let answerSet = Object.keys(answerVal).filter((key) => answerVal[key]);
        questionArray.push({ id: question.id, answer: answerSet.join(',') });
      } else {
        questionArray.push({ id: question.id, answer: answerVal });
      }
    });
    validateFormat.push({ questions: questionArray, id: sampleData.id });
  });
  return validateFormat;
};

export const nestedIfCaseHandle = (condition, trueValue, falseValue) => {
  if (condition) {
    return trueValue;
  } else {
    return falseValue;
  }
};

export const quickSurveyFlowIntancesSortHandler = (quickSurveyFlowIntances) => {
  return quickSurveyFlowIntances.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    else if (a.priority > b.priority) return 1;
    else return a.name > b.name ? 1 : -1;
  });
};

export const handleOrCase = (case1, case2) => {
  return case1 || case2;
};

export const handleAndCase = (case1, case2) => {
  return case1 && case2;
};

export const arrayToStringConvert = (arraySet, joiner) => {
  if (nestedIfCaseHandle(arraySet, typeof arraySet === 'object', false)) {
    let answerVal = Object.keys(arraySet).filter((key) => arraySet[key]);
    return answerVal.join(joiner);
  }
  return arraySet;
};

export const styles = {
  viewSummaryImageSrc: {
    height: '15px',
    marginLeft: '10px'
  }
};
