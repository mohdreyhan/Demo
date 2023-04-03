import { Box, Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import useStyles from '../../../Styles/BusinessProcessStyle';
import { convertTimestamptoUSA } from '../../Common/commonfunctions';
import { ColorPallete } from '../../../theme/ColorPallete';
import { useEffect } from 'react';
import {
  nestedIfCaseHandle,
  quickSurveyFlowIntancesSortHandler,
  setGroupAnswerFormat,
  surveyScheduleStatusActive,
  PopupPropsActions,
  ThankyouComponentProps,
  arrayToStringConvert,
  handleAndCase
} from '../Business.Data';
import { checkAnswerValues } from '../ApiAction';
import { UPDATEQUICKYACTIONSURVEYFLOWS } from '../../../Actions/BusinessProcess/ActionCreators';

const BusinessFormPreview = (props) => {
  const { updatePopupProps, callSubmitPreviewForm } = props;
  const classes = useStyles();

  useEffect(() => {
    if (callSubmitPreviewForm) {
      submitPreviewForm();
    }
  }, [callSubmitPreviewForm]);

  const submitPreviewForm = async () => {
    let requestData = {
      responsibleId: localStorage.getItem('responsibleId'),
      surveyId: props.currentStepData.survey?.id,
      validationOnly: false,
      groups: setGroupAnswerFormat(props.formAnswerData, props.businessformData)
    };
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
          return nestedIfCaseHandle(
            nestedIfCaseHandle(
              record.id == props.selectedFormId,
              record.surveyScheduleStatus == surveyScheduleStatusActive,
              false
            ),
            { ...record, isInProgress: [], status: '' },
            record
          );
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

  return (
    <div
      key={`businessFormPreview`}
      style={{ paddingRight: '10px', height: '70vh', overflowY: 'auto', paddingBottom: '10px' }}>
      {nestedIfCaseHandle(props.businessformData.length, props.businessformData, [])?.map(
        (group) => {
          let counter = 0;
          return (
            <div key={`process_${group?.displayOrder}_${group?.id}`} style={{ marginTop: '20px' }}>
              <Grid container sx={{ p: 0 }}>
                <Grid item xs={12}>
                  <Box component="div" className={classes.groupName}>
                    {group?.header}
                  </Box>
                </Grid>
              </Grid>

              {nestedIfCaseHandle(group?.questions?.length > 0, group?.questions, [])?.map(
                (question) => {
                  if (question.answerType !== 'HideField') {
                    counter++;

                    let value = nestedIfCaseHandle(
                      props.formAnswerData[question.id],
                      props.formAnswerData[question.id],
                      '-'
                    );
                    value = arrayToStringConvert(value, ',');
                    return (
                      <div key={`loop_${question.id}`}>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                          <Box
                            component="div"
                            style={{ fontSize: '12px', color: `${ColorPallete.Text.Primary}` }}>
                            <div
                              style={{ display: 'inline' }}
                              dangerouslySetInnerHTML={{
                                __html: `Q${counter}: ${question.questionText}`
                              }}></div>
                          </Box>
                          <Box component="div" style={{ marginTop: '5px', fontWeight: '600' }}>
                            {nestedIfCaseHandle(
                              handleAndCase(question.dataType === 'Date', value),
                              convertTimestamptoUSA(`${value}`),
                              `${nestedIfCaseHandle(value.length, value, '-')}`
                            )}
                          </Box>
                        </Grid>
                      </div>
                    );
                  }
                }
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    businessformData: state.BusinessProcessReducer.businessformData,
    formAnswerData: state.BusinessProcessReducer.formAnswerData,
    currentStepData: state.BusinessProcessReducer.currentStepData,
    quickActionSurveyFlows: state.BusinessProcessReducer.quickActionSurveyFlows,
    selectedFormId: state.BusinessProcessReducer.selectedFormId,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
   };
}
function mapDispatchToProps(dispatch) {
  return {
    UPDATEQUICKYACTIONSURVEYFLOWS: async (updatedQuickAction) => {
      await dispatch(UPDATEQUICKYACTIONSURVEYFLOWS(updatedQuickAction));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessFormPreview);
