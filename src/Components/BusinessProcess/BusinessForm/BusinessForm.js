import { useEffect, useState } from 'react';
import BPComponents from '../../Common/BPComponents';
import { ColorPallete } from '../../../theme/ColorPallete';
import { FormLayout } from '../../BusinessProcess/formlayout';
import { Alert, Box, CircularProgress, Grid } from '@oasis/react-core';
import useStyles from '../../../Styles/BusinessProcessStyle';
import { connect } from 'react-redux';
import {
  SETGROUPANSWERDATA,
  SETCANCELBPDATA,
  UPDATEQUICKYACTIONSURVEYFLOWS
} from '../../../Actions/BusinessProcess/ActionCreators';
import {
  setGroupAnswerFormat,
  sortByDisplayOrder,
  ButtonsActions,
  checkDataType,
  nestedIfCaseHandle,
  FormObjectTypes,
  QuestionFiledType,
  PopupPropsActions,
  surveyScheduleStatusActive,
  quickSurveyFlowIntancesSortHandler,
  ThankyouComponentProps
} from '../Business.Data';
import { checkAnswerValues, saveTempData } from '../ApiAction';
import { returnValueOrDefault } from '../../Common/commonfunctions';

export const validateErrorSet = (groupData, values) => {
  const errors = {};
  for (const { questions } of Object.values(groupData)) {
    questions.forEach(({ id, requireAnswer, answerType, minSize }) => {
      const value = values[id];
      if (requireAnswer) {
        if (answerType === QuestionFiledType.checkbox) {
          errors[id] = value && Object.values(value).some(Boolean) ? '' : 'Required';
        } else {
          errors[id] = value ? '' : 'Required';
        }
      }
      if (minSize > (value || '').length) {
        errors[id] = `Minimum ${minSize} character(s) required`;
      }
    });
  }
  return errors;
};


const BusinessForm = (props) => {
  const {
    updatePopupProps,
    loading,
    surveyAllDetails,
    runSaveAction,
    runTempAction,
    isSubmitForm
  } = props;
  const { values, handleOnchange, errors, setErrors, setValues } = FormLayout([{}]);
  const classes = useStyles();
  const [groupData, setGroupData] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);

  useEffect(() => {
    if (runSaveAction) {
      handleSubmit();
    }
  }, [runSaveAction]);

  useEffect(() => {
    if (runTempAction) {
      handleTempDataSubmit();
    }
  }, [runTempAction]);

  useEffect(() => {
    setGroupData(nestedIfCaseHandle(props.businessformData.length, props.businessformData, []));
    props.SETCANCELBPDATA(false);
  }, [props.businessformData]);

  useEffect(() => {
    let defaultSet = [];
    if (groupData.length) {
      groupData?.forEach((group) => {
        group?.questions?.forEach((question) => {
          if (question.answerType === QuestionFiledType.checkbox) {
            let checkedValues = [];
            if (question.userSavedValue) {
              let checkSavedArray = question?.userSavedValue?.split(',');
              question.answerOptions.forEach((optionVal) => {
                if (checkSavedArray.includes(optionVal.name)) {
                  checkedValues[optionVal.name] = true;
                }
              });
            } else {
              question.answerOptions.forEach((optionVal) => {
                if (optionVal.isDefault) {
                  checkedValues[optionVal.name] = true;
                }
              });
            }
            defaultSet[question?.id] = { ...checkedValues };
          } else if (
            question.answerType === QuestionFiledType.dropDown ||
            question.answerType === QuestionFiledType.radio
          ) {
            if (question.userSavedValue || question.prePopulateExpression) {
              defaultSet[question?.id] = nestedIfCaseHandle(
                question.userSavedValue,
                question.userSavedValue,
                question.prePopulateExpression
              );
            } else {
              question.answerOptions.forEach((optionVal) => {
                if (optionVal.isDefault) {
                  defaultSet[question?.id] = optionVal.value;
                }
              });
            }
          } else if (
            question.answerType === QuestionFiledType.textArea ||
            question.answerType === QuestionFiledType.textField ||
            question.answerType === QuestionFiledType.readOnly ||
            (question.answerType === QuestionFiledType.textField && question.dataType !== 'Date')
          ) {
            defaultSet[question?.id] = nestedIfCaseHandle(
              question.userSavedValue,
              question.userSavedValue,
              question.prePopulateExpression
            );
          } else if (
            question.answerType === QuestionFiledType.textField &&
            question.dataType === 'Date'
          ) {
            defaultSet[question?.id] = new Date(
              nestedIfCaseHandle(
                question.userSavedValue,
                question.userSavedValue,
                question.prePopulateExpression
              )
            );
          }
          defaultSet[question?.id] = nestedIfCaseHandle(
            props.formAnswerData && props.formAnswerData[question?.id],
            props.formAnswerData[question?.id],
            defaultSet[question?.id]
          );
        });
      });
      let tmp = { ...values, ...defaultSet };
      setValues(tmp);
    }
  }, [groupData]);

  const getObjValue = (type, property) => {
    switch (type) {
      case FormObjectTypes.values:
        return values[property];
      case FormObjectTypes.errors:
        return errors[property];
      case FormObjectTypes.errorMsg:
        if (validateErrors.length && validateErrors.some((error) => error.id == property)) {
          let indexVal = validateErrors.findIndex((error) => error.id == property);
          return validateErrors[indexVal].value;
        }
    }
  };

  const handleOnBlur = (event, id) => {
    let eventValue = event.target.value;
    if (typeof eventValue === 'object') {
      setErrors({
        ...errors,
        [`${event.target.name}`]: nestedIfCaseHandle(event.target.value, '', 'Required')
      });
    } else {
      setErrors({
        ...errors,
        [`${event.target.name}`]: nestedIfCaseHandle(
          event.target.value !== null && event.target.value.length > 0,
          '',
          'Required'
        )
      });
    }
    if (!event.target.value) {
      let indexVal = validateErrors.findIndex((error) => error.id == id);
      validateErrors.splice(indexVal);
    }
  };
  function validate() {
    let temp = validateErrorSet(groupData, values);
    setErrors({
      ...temp
    });

    return Object.values(temp).every((newValue) => newValue == '');
  }

  const handleTempDataSubmit = async () => {
    if (groupData.length) {
      let tempValue = setGroupAnswerFormat(values, groupData);

      let tempCheck1 =  tempValue.map((val)=> {
        return val?.questions?.map((valNew)=>{
          return valNew?.answer ? true: false;
        })
      })
      .filter((f1)=>f1)
      let filTempValue = tempValue?.[0]?.questions.filter((value) => value.answer !== '');
      if (tempCheck1?.length != 0) {
        setApiLoader(true);
        tempValue[0].questions = filTempValue;
        let requestData = {
          responsibleId: localStorage.getItem('responsibleId'),
          surveyId: props.currentStepData.survey?.id,
          groups: tempValue
        };
        if (props.currentStepData.id) {
          await saveTempData(props.currentStepData.id, requestData);
          props.SETGROUPANSWERDATA(values);
          setApiLoader(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    setShowAlertError(false);
    setValidateErrors([]);
    if (validate()) {
      setApiLoader(true);
      props.SETGROUPANSWERDATA(values);
      checkAnswerValidation();
    } else {
      setShowAlertError(true);
    }
  };

  const checkAnswerValidation = async () => {
    let requestData = {
      responsibleId: localStorage.getItem('responsibleId'),
      surveyId: props.currentStepData.survey?.id,
      validationOnly: true,
      groups: setGroupAnswerFormat(values, groupData)
    };
    if (props.currentStepData.id) {
      let response = await checkAnswerValues(props.currentStepData.id, requestData);
      let newErrors = [];
      response?.groups?.map((res) => {
        res?.questions?.map((quesitonVal) => {
          if (quesitonVal?.validationerrors?.length > 0) {
            newErrors.push({ id: quesitonVal?.id, value: quesitonVal?.validationerrors[0] });
          }
        });
      });
      setValidateErrors(newErrors);
      if (newErrors.length == 0) {
        if (!isSubmitForm) {
          updatePopupProps({
            popupProps: {
              showCancel: false,
              showButton: false,
              action: PopupPropsActions.businessFormPreview,
              showTemp: false,
              showConfirm: [
                {
                  title: 'Submit',
                  action: 'Confirm',
                  nextAction: 'Confirm',
                  type: 'button',
                  disabled: false
                }
              ],
              beforeCancel: [
                surveyAllDetails.allowCancel
                  ? {
                      title: surveyAllDetails?.cancelButtonText?.length
                        ? surveyAllDetails?.cancelButtonText
                        : 'Cancel Action',
                      variant: 'outlined',
                      color: 'red',
                      action: 'cancelAction',
                      failedPage: PopupPropsActions.businessFormPreview,
                      type: 'button'
                    }
                  : null
              ],
              leftButton: [
                surveyAllDetails.allowPrevious
                  ? {
                      title: surveyAllDetails?.previousButtonText?.length
                        ? surveyAllDetails?.previousButtonText
                        : 'Previous',
                      variant: 'outlined',
                      action: ButtonsActions.PREVIOUS,
                      nextAction: ButtonsActions.PREVIOUS,
                      type: 'button',
                      disabled: false
                    }
                  : null
              ]
            }
          });
        } else {
           props.businessformData.map((data) => {
            return {
              id: data.id,
              displayOrder: data.displayOrder,
              header: data.header,
              questionsInGroup: data.questions.map((item) => {
                return {
                  id: item.id,
                  answerType: item?.answerType,
                  dataType: item?.dataType,
                  questionText: item?.questionText
                };
              })
            };
          });
          let tmpRequest = { ...requestData, validationOnly: false };
          submitRequestBusinessForm(tmpRequest);
        }
      } else {
        setShowAlertError(true);
      }
      setApiLoader(false);
    }
  };

  const submitRequestBusinessForm = async (requestData) => {
    if (props.currentStepData.id) {
      let response = await checkAnswerValues(props.currentStepData.id, requestData);
      if (response.nextStepId) {
        updatePopupProps({
          popupProps: {
            action: PopupPropsActions.renderNextForm,
            showTemp: false
          }
        });
      } else if (response.isSubmitted) {
        let quickActionMapData = props.quickActionSurveyFlows?.map((record) => {
          if (record.id == props.selectedFormId) {
            if (record.surveyScheduleStatus == surveyScheduleStatusActive) {
              return { ...record, isInProgress: [], status: '' };
            }
          } else {
            return record;
          }
        });
        let updatedQuickAction = quickActionMapData.filter((valset) => valset);
        updatedQuickAction = quickSurveyFlowIntancesSortHandler(updatedQuickAction);
        props.UPDATEQUICKYACTIONSURVEYFLOWS(updatedQuickAction);
        updatePopupProps({
          popupProps: ThankyouComponentProps
        });
      }
    }
  };

  function handleDefault(data) {
    let newData = { ...values, ...data };
    setValues(newData);
  }

  return (
    <div key={`businessForm`} style={{ paddingRight: '10px', height: '70vh', overflowY: 'auto' }}>
      {!loading && surveyAllDetails?.showAgentIntroduction && (
        <div
          style={{ marginBottom: '20px', marginTop: '10px' }}
          dangerouslySetInnerHTML={{
            __html: surveyAllDetails?.agentIntroduction?.replace(/href/g, "target='_black' href")
          }}></div>
      )}
      {(Object.keys(errors).length > 0 || validateErrors.length > 0) && showAlertError && (
        <Alert
          className={classes.alert}
          severity="error"
          onClose={() => {
            setShowAlertError(false);
          }}>
          {validateErrors.length == 0 &&
            (Object.values(errors).filter((tempVal) => tempVal).length > 1
              ? 'Required fields are missing.'
              : 'A required field is missing.')}
          {validateErrors.length > 0 ? 'Field Validation Failed' : ''}
        </Alert>
      )}
      {groupData.length
        ? groupData?.map((group) => {
            let counter = 0;
            return (
              <div
                key={`process_${group?.displayOrder}_${group?.id}`}
                style={{ marginBottom: '20px' }}>
                <Grid container sx={{ p: 0 }}>
                  <Grid item xs={12}>
                    <Box component="div" className={classes.groupName}>
                      {group?.header}
                    </Box>
                  </Grid>
                </Grid>
                {group?.questions?.length > 0 &&
                  group?.questions?.map((question) => {
                    if (question.answerType === QuestionFiledType.textField) {
                      counter++;
                      if (question.dataType === 'Date') {
                        return (
                          <div key={`loop_${question.id}`}>
                            <BPComponents.DatePickerField
                              name={`${question.id}`}
                              label={`Q${counter}: ${question.questionText}`}
                              required={question.requireAnswer}
                              errorMsg={
                                getObjValue('errorMsg', question.id) ??
                                getObjValue('errors', question.id) ??
                                'Required'
                              }
                              size="small"
                              gridWidth="100%"
                              width="60%"
                              minDate={question.minDate}
                              maxDate={question.maxDate}
                              onChange={handleOnchange}
                              setErrors={setErrors}
                              onBlur={(event) => handleOnBlur(event, question.id)}
                              value={returnValueOrDefault(getObjValue('values', question.id), null)}
                              error={
                                getObjValue('errorMsg', question.id)
                                  ? true
                                  : nestedIfCaseHandle(
                                      getObjValue('errors', question.id),
                                      true,
                                      false
                                    )
                              }
                              errorColor={ColorPallete.Border.Tertiary}
                              text2={question.questionText2}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={`loop_${question.id}`}>
                            <BPComponents.TextInputField
                              name={`${question.id}`}
                              label={`Q${counter}: ${question.questionText}`}
                              required={question.requireAnswer}
                              errorMsg={
                                getObjValue('errorMsg', question.id) ??
                                getObjValue('errors', question.id) ??
                                'Required'
                              }
                              length={question.maxSize}
                              size="small"
                              gridWidth="100%"
                              width="60%"
                              onChange={handleOnchange}
                              onBlur={(event) => handleOnBlur(event, question.id)}
                              value={getObjValue('values', question.id)}
                              error={
                                getObjValue('errorMsg', question.id)
                                  ? true
                                  : nestedIfCaseHandle(
                                      getObjValue('errors', question.id),
                                      true,
                                      false
                                    )
                              }
                              inputProps={{ maxLength: question.maxSize }}
                              type={checkDataType(question.businessDataType)}
                              text2={question.questionText2}
                            />
                          </div>
                        );
                      }
                    } else if (question.answerType === QuestionFiledType.textArea) {
                      counter++;
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.TextAreaField
                            name={`${question.id}`}
                            label={`Q${counter}: ${question.questionText}`}
                            text2={question.questionText2}
                            required={question.requireAnswer}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            multiline={true}
                            length={question.maxSize}
                            size="small"
                            gridWidth="100%"
                            rows={question.rows}
                            width="100%"
                            onBlur={(event) => handleOnBlur(event, question.id)}
                            onChange={handleOnchange}
                            value={getObjValue('values', question.id)}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            errorColor={ColorPallete.Border.Tertiary}
                            type={checkDataType(question.businessDataType)}
                          />
                        </div>
                      );
                    } else if (question.answerType === QuestionFiledType.checkbox) {
                      counter++;
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.CheckboxField
                            name={`${question.id}`}
                            label={`Q${counter}: ${question.questionText}`}
                            required={question.requireAnswer}
                            items={sortByDisplayOrder(question.answerOptions)}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            onBlur={(event) => handleOnBlur(event, question.id)}
                            value={returnValueOrDefault(getObjValue('values', question.id), {})}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            onChange={handleOnchange}
                            setDefault={handleDefault}
                            errorColor={ColorPallete.Border.Tertiary}
                            text2={question.questionText2}
                          />
                        </div>
                      );
                    } else if (question.answerType === QuestionFiledType.radio) {
                      counter++;
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.RadioField
                            name={`${question.id}`}
                            label={`Q${counter}: ${question.questionText}`}
                            items={sortByDisplayOrder(question.answerOptions)}
                            required={question.requireAnswer}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            onBlur={(event) => handleOnBlur(event, question.id)}
                            onChange={handleOnchange}
                            value={getObjValue('values', question.id)}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            errorColor={ColorPallete.Border.Tertiary}
                            row={true}
                            text2={question.questionText2}
                          />
                        </div>
                      );
                    } else if (question.answerType === QuestionFiledType.dropDown) {
                      counter++;
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.Dropdown
                            name={`${question.id}`}
                            label={`Q${counter}: ${question.questionText}`}
                            required={question.requireAnswer}
                            items={sortByDisplayOrder(question.answerOptions)}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            gridWidth="100%"
                            width="60%"
                            onChange={handleOnchange}
                            onBlur={(event) => handleOnBlur(event, question.id)}
                            value={returnValueOrDefault(getObjValue('values', question.id), null)}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            errorColor={ColorPallete.Border.Tertiary}
                            text2={question.questionText2}
                          />
                        </div>
                      );
                    } else if (question.answerType === QuestionFiledType.readOnly) {
                      counter++;
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.TextInputField
                            name={`${question.id}`}
                            label={`Q${counter}: ${question.questionText}`}
                            required={question.requireAnswer}
                            disabled={true}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            length={question.maxSize}
                            size="small"
                            gridWidth="100%"
                            width="60%"
                            value={getObjValue('values', question.id)}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            errorColor={ColorPallete.Border.Tertiary}
                            text2={question.questionText2}
                          />
                        </div>
                      );
                    } else if (question.answerType === QuestionFiledType.hideField) {
                      return (
                        <div key={`loop_${question.id}`}>
                          <BPComponents.TextInputField
                            name={`${question.id}`}
                            label={`${question.questionText}`}
                            required={question.requireAnswer}
                            hidden={true}
                            errorMsg={
                              getObjValue('errorMsg', question.id) ??
                              getObjValue('errors', question.id) ??
                              'Required'
                            }
                            length={question.maxSize}
                            size="small"
                            gridWidth="100%"
                            width="60%"
                            value={getObjValue('values', question.id)}
                            error={
                              getObjValue('errorMsg', question.id)
                                ? true
                                : nestedIfCaseHandle(
                                    getObjValue('errors', question.id),
                                    true,
                                    false
                                  )
                            }
                            errorColor={ColorPallete.Border.Tertiary}
                            text2={question.questionText2}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })
        : ''}
      {loading ? (
        <Box sx={{ ml: '50%', mt: '20%', mb: '10%' }} style={{ height: '30px' }}>
          <CircularProgress />
        </Box>
      ) : (
        ''
      )}
      {!loading && surveyAllDetails?.showAgentPostText && (
        <div
          dangerouslySetInnerHTML={{
            __html: surveyAllDetails?.agentPostText?.replace(/href/g, "target='_black' href")
          }}></div>
      )}
      {apiLoader && (
        <Box className={classes.hisLoadMore}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    businessformData: state.BusinessProcessReducer.businessformData,
    currentStepData: state.BusinessProcessReducer.currentStepData,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    formAnswerData: state.BusinessProcessReducer.formAnswerData,
    quickActionSurveyFlows: state.BusinessProcessReducer.quickActionSurveyFlows,
    selectedFormId: state.BusinessProcessReducer.selectedFormId,
    viewSummary: state.BusinessProcessReducer.viewSummary
  };
}
function mapDispatchToProps(dispatch) {
  return {
    SETGROUPANSWERDATA: async (answerData) => {
      await dispatch(SETGROUPANSWERDATA(answerData));
    },
    SETCANCELBPDATA: async (data) => {
      await dispatch(SETCANCELBPDATA(data));
    },
    UPDATEQUICKYACTIONSURVEYFLOWS: async (updatedQuickAction) => {
      await dispatch(UPDATEQUICKYACTIONSURVEYFLOWS(updatedQuickAction));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);
