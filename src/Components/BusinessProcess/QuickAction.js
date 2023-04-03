import * as React from 'react';
import {
  Autocomplete,
  Avatar,
  Grid,
  TextField,
  CircularProgress,
  Stack,
  Paper,
  Popover,
  Typography,
  Chip,
  HistoryIcon,
  ArrowDropDownIcon,
  ClearIcon,
  styled,
  Tooltip,
  tooltipClasses,
  MenuItem,
  Box
} from '@oasis/react-core';

import {
  ADDDECEASEDINPUTS,
  ADDCOURTINPUTS,
  ADDEXECUTORINPUTS
} from '../../Actions/ConsumerDetails/Actions';
import PopUp from '../Common/DialogModals/PopUp';
import History from './History/History';
import { ColorPallete } from '../../theme/ColorPallete';
import {
  HistoryDefaultPopupProps,
  ButtonsActions,
  PopupPropsActions,
  styles,
  handleOrCase,
  handleAndCase,
  ThankyouComponentProps
} from './Business.Data';
import {
  createBusinessProcessInstace,
  getCurrentStepSurveyInstance,
  getSurveyAllDetails,
  getViewSummaryData
} from './ApiAction';
import DeletePopup from './History/DeletePopup';
import { connect } from 'react-redux';
import {
  GETALLSURVEYFLOWS,
  GETBPFORMGROUPDATA,
  SETCURRENTSTEPDATA,
  SETSELECTEDFORMID,
  UPDATEQUICKYACTIONSURVEYFLOWS,
  SETGROUPANSWERDATA,
  SETCURRENTPORTFOLIOID,
  SETCURRENTRESPONSIBLEID,
  RESETGROUPDATA
} from '../../Actions/BusinessProcess/ActionCreators';
import CancelBusinessProcess from './CancelBusinessProcess';
import useStyles from '../../Styles/BusinessProcessStyle';
import { User } from '@oasis/js-data';
import BusinessFormPreview from './BusinessForm/BusinessFormPreview';
import AccessDeniedPopup from './AccessDeniedPopup';
import Thankyou from './Thankyou';
import FrequencyLimit from './BusinessForm/FrequencyLimit';
import BusinessForm from './BusinessForm/BusinessForm';
import AddDeceased from './DeceasedForm/AddDeceased';
import {
  extractImagePath,
  nestedIfCaseHandle,
  returnValueOrDefault
} from '../Common/commonfunctions';
import EditDeceased from './DeceasedForm/EditDeceased';
import ViewSummary from './ViewSummary';
import { TRIGGERPOPUP } from '../../Actions/ConsumerDetails/ConsumerQuickActions/Actions';
import eye from '../../Images/eye.png';
import { useNavigate } from 'react-router-dom';
import { EXECUTEBUSINESSPROCESS } from '../../Actions/BusinessProcess/Actions';

const handleDialogOutSide = (value, props) => {
  if (!value) {
    props.ADDDECEASEDINPUTS();
    props.ADDCOURTINPUTS();
    props.ADDEXECUTORINPUTS();
  }
};

function QuickAction(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [showPopup, setshowPopup] = React.useState(false);
  const [popupAction, setPopupAction] = React.useState({});
  const [inProgressCount, setInProgressCount] = React.useState(0);
  const [businessProcesses, setBusinessProcesses] = React.useState([]);
  const [surveyAllDetails, setSurveyAllDetails] = React.useState([]);
  const [deleteRecordData, setSetDeleteRecordData] = React.useState([]);
  const [cancelledData, setCancelledData] = React.useState([]);
  const [runSaveAction, setRunSaveAction] = React.useState(0);
  const [runTempAction, setRunTempAction] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [formBusinessProcess, setFormBusinessProcess] = React.useState({});
  const openPopover = Boolean(anchorEl);
  const classes = useStyles();
  const [loadingForm, setLoadingForm] = React.useState(false);
  const hasFeature = User.hasFeature('Allow Business process management');
  const [callSubmitPreviewForm, setCallSubmitPreviewForm] = React.useState(0);
  const [nextItemObj, setNextItemObj] = React.useState(null);
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showEditdeceased, setshowEditdeceased] = React.useState(false);
  const [consumerData, setconsumerData] = React.useState([]);
  const [viewSummaryData, setViewSummaryData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setconsumerData(nestedIfCaseHandle(props.consumerDemographics[0]?.isDeceased, true, false));
  }, [props.consumerDemographics]);

  React.useEffect(() => {
    if (hasFeature) {
      handleQuickActionApiRequest();
    }
  }, [localStorage.getItem('responsibleId'), props.portfolioId]);

  React.useEffect(() => {
    if (props?.externalBusinessData?.surveyFlowId && businessProcesses?.length) {
      let selectedRec = [];
      selectedRec = businessProcesses
        ?.map((m1) => {
          if (m1?.id == props?.externalBusinessData?.surveyFlowId) {
            return m1;
          }
        })
        ?.filter((f1) => f1);
      if (selectedRec.length) {
        props.EXTERNALBUSINESSPROCESS({});
        handleInputChange(selectedRec[0]);
      }
    }
  }, [props.externalBusinessData, businessProcesses]);

  React.useEffect(() => {
    if (
      handleAndCase(
        props.quickActionSurveyFlows.length > 0,
        nestedIfCaseHandle(localStorage.getItem('responsibleId'), props.portfolioId, false)
      )
    ) {
      setBusinessProcesses(props.quickActionSurveyFlows);
    }
  }, [props.quickActionSurveyFlows]);

  React.useEffect(() => {
    let count = 0;
    businessProcesses.forEach((flow) => handleAndCase(flow.isInProgress.length > 0, count++));
    setInProgressCount(count);
  }, [businessProcesses]);

  const handleDialog = (value) => {
    handleDialogOutSide(value, props);
    setShow(false);
  };
  const handleDialogEdit = () => {
    setshowEditdeceased(false);
  };

  const handleQuickActionApiRequest = async () => {
    if (handleOrCase(localStorage.getItem('responsibleId') == null, props.portfolioId == null)) {
      await props.UPDATEQUICKYACTIONSURVEYFLOWS([]);
      setBusinessProcesses([]);
    } else if (
      handleAndCase(
        handleAndCase(localStorage.getItem('responsibleId'), props.portfolioId),
        handleOrCase(
          handleOrCase(
            props.quickActionSurveyFlows.length == 0,
            localStorage.getItem('responsibleId') != props.currentResponsibleId
          ),
          props.portfolioId != props.currentPortfolioId
        )
      )
    ) {
      props.SETCURRENTRESPONSIBLEID(localStorage.getItem('responsibleId'));
      props.SETCURRENTPORTFOLIOID(props.portfolioId);
      await props.GETALLSURVEYFLOWS(props.portfolioId, localStorage.getItem('responsibleId'));
    }
  };

  const handleHistoryPopup = () => {
    setshowPopup(!showPopup);
    setPopupAction(HistoryDefaultPopupProps);
  };

  const handleViewSummaryDataSet = async (PopupPropsActions) => {
    let summaryResponse = await getViewSummaryData(
      formBusinessProcess.isInProgress?.[0]?.id,
      localStorage.getItem('responsibleId')
    );
    setViewSummaryData(summaryResponse);
    setPopupAction({
      title: 'View Summary',
      action: PopupPropsActions.viewSummary,
      showCancel: true,
      icon: eye,
      styles: styles
    });
  };

  const handleButtonResponse = async (action, comp, actionType) => {
    switch (action) {
      case ButtonsActions.VIEW_SUMMARY:
        setPopupAction({
          title: 'View Summary',
          action: PopupPropsActions.loadingComponent,
          showCancel: false,
          icon: eye,
          styles: styles
        });
        handleViewSummaryDataSet(PopupPropsActions);
        break;
      case ButtonsActions.TEMP:
        if (hasFeature) {
        setRunTempAction(runTempAction + 1);
          return;
        }
        setPopupAction({
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          action: 'accessDenied',
          showButton: false,
          maxWidth: 'sm',
          showTemp: false
        });
        break;
      case ButtonsActions.SAVE:
        saveButtonhandler();
        break;
      case ButtonsActions.CANCEL:
        if (hasFeature) {
          updatePopupProps({
            cancelRecord: formBusinessProcess?.isInProgress?.[0],
            businessProcessId: formBusinessProcess?.id,
            failedPage: nestedIfCaseHandle(comp, comp, ''),
            popupProps: {
              title: formBusinessProcess.name,
              showButton: false,
              beforeCancel: false,
              showCancel: false,
              action: 'cancelBusinessProcess',
              afterTitleIconSrc: null,
              maxWidth: 'sm',
              showNext: false,
              leftButton: false,
              showConfirm: false,
              showTemp: false
            }
          });
          return;
        }
        setPopupAction({
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          action: 'accessDenied',
          showButton: false,
          maxWidth: 'sm',
          showNext: false,
          leftButton: false
        });
        break;
      case ButtonsActions.CONFIRM:
        setCallSubmitPreviewForm(callSubmitPreviewForm + 1);
        break;
      case ButtonsActions.CLOSE:
      case ButtonsActions.PREVIOUS:
        previousButtonHandler(action, comp, actionType);
        break;
      case ButtonsActions.SUBMIT_FORM:
        if (hasFeature) {
          setIsSubmitForm(true);
          setRunSaveAction(runSaveAction + 1);
          return;
        }
        setPopupAction({
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          action: 'accessDenied',
          showButton: false,
          maxWidth: 'sm',
          showTemp: false
        });

        break;
      case ButtonsActions.CLOSE_IN_TITLE:
        if (comp == 'viewSummary') {
          setPopupAction({
            ...ThankyouComponentProps,
            title: formBusinessProcess?.name,
            icon: extractImagePath('account_tree.png')
          });
          return;
        }
        setshowPopup(false);
        break;
    }
  };

  const saveButtonhandler = () => {
    if (hasFeature) {
      setIsSubmitForm(false);
      setRunSaveAction(runSaveAction + 1);
      return;
    }
    setPopupAction({
      title: formBusinessProcess?.name,
      icon: extractImagePath('account_tree.png'),
      showCancel: false,
      action: 'accessDenied',
      showButton: false,
      maxWidth: 'sm',
      showTemp: false
    });
  };

  const previousButtonHandler = (action, comp, actionType) => {
    if (handleAndCase(comp == 'accessDenied', actionType == 'cancelActionInForm')) {
      updatePopupProps({ popupProps: { action: PopupPropsActions.businessForm } });
      return;
    }
    if (handleAndCase(comp == 'accessDenied', actionType != 'unauthorized')) {
      updatePopupProps({ popupProps: HistoryDefaultPopupProps });
      return;
    }
    if (action == ButtonsActions.CLOSE) {
      if (comp == 'viewSummary') {
        setPopupAction({
          ...ThankyouComponentProps,
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png')
        });
        return;
      }
      setshowPopup(false);
    }
    if (handleAndCase(action == ButtonsActions.PREVIOUS, comp == 'businessFormPreview')) {
      setRunSaveAction(0);
      setRunTempAction(0);
      setPopupAction({
        title: formBusinessProcess?.name,
        icon: extractImagePath('account_tree.png'),
        action: 'businessForm',
        showTemp: [
          nestedIfCaseHandle(
            surveyAllDetails.allowTempSave,
            {
              title: nestedIfCaseHandle(
                surveyAllDetails?.tempSaveButtonText?.length,
                surveyAllDetails?.tempSaveButtonText,
                'Temp'
              ),
              action: 'temp',
              type: 'button'
            },
            null
          )
        ],
        //leftButton: [surveyAllDetails.allowTempSave ? { title: surveyAllDetails.tempSaveButtonText.length ? surveyAllDetails.tempSaveButtonText : "Temp", action: "temp", type: "button"} : null],
        showButton: nestedIfCaseHandle(
          !surveyAllDetails.allowConfirm,
          { title: surveyAllDetails.submitButtonText },
          false
        ),
        afterTitleIconSrc: extractImagePath('info.png'),
        handleAfterTitleIconSrcResponse: handleAfterTitleIconSrcResponse,
        showConfirm: nestedIfCaseHandle(
          surveyAllDetails?.allowConfirm,
          [
            {
              title: surveyAllDetails.confirmButtonText,
              variant: 'outlined',
              action: 'Confirm',
              nextAction: ButtonsActions.SAVE,
              type: 'button',
              disabled: false
            }
          ],
          null
        ),
        beforeCancel: [
          nestedIfCaseHandle(
            surveyAllDetails.allowCancel,
            {
              title: nestedIfCaseHandle(
                surveyAllDetails?.cancelButtonText?.length,
                surveyAllDetails?.cancelButtonText,
                'Cancel Action'
              ),
              variant: 'outlined',
              color: 'red',
              action: 'cancelAction',
              type: 'button',
              failedPage: PopupPropsActions.businessForm
            },
            null
          )
        ]
      });
    }
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const handleAfterTitleIconSrcResponse = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInputChange = async (itemObj) => {
    if (itemObj?.id) {
      if (itemObj?.isBusinessprocess === false) {
        switch (itemObj.componentToRender) {
          case 'deceased':
            let deceasedShowStatus = nestedIfCaseHandle(!consumerData, true, false);
            setShow(deceasedShowStatus);
            break;
          case 'incarcerated':
          case 'ligitious':
          case 'dispute':
          case 'bankruptcy':
          case 'complaint':
            if (!itemObj.disabled) {
              props.TRIGGERPOPUP(itemObj);
            }
            break;
        }
      } else {
        handleBusinessProcess(itemObj);
      }
    }
  };

  const handleBusinessProcess = async (itemObj) => {
    setSurveyAllDetails([]);
    setRunSaveAction(0);
    setRunTempAction(0);
    setCallSubmitPreviewForm(0);
    props.SETSELECTEDFORMID(itemObj.id);
    props.SETGROUPANSWERDATA([]);
    props.RESETGROUPDATA([]);
    let stepId = itemObj?.isInProgress?.[0]?.id;
    let formBPData = itemObj;

    if (!itemObj?.isInProgress?.length) {
      let newPendingObj = [];

      let newSchudleObj = await createBusinessProcessInstace(
        localStorage.getItem('responsibleId'),
        itemObj.id
      );
      stepId = newSchudleObj?.id;

      if (newSchudleObj?.step?.id) {
        newPendingObj.push({
          cancelBy: null,
          createDate: newSchudleObj.entryDate,
          id: newSchudleObj.id,
          lastUpdateDate: newSchudleObj.entryDate,
          name: newSchudleObj.name,
          startBy: newSchudleObj.startBy,
          status: newSchudleObj.status
        });
        formBPData = await updatePendingRecordObject(itemObj?.id, newPendingObj);
      } else if (newSchudleObj?.errorText) {
        setshowPopup(!showPopup);
        setPopupAction({
          title: itemObj?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: true,
          action: PopupPropsActions.frequency,
          showButton: false,
          maxWidth: 'sm',
          actionType: null,
          leftButton: false,
          errorText: newSchudleObj?.errorText
        });
      } else {
        setshowPopup(!showPopup);
        setPopupAction({
          title: itemObj?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: true,
          action: 'accessDenied',
          showButton: false,
          maxWidth: 'sm',
          actionType: 'unauthorized',
          leftButton: [
            {
              title: 'Previous',
              variant: 'outlined',
              action: 'Previous',
              nextAction: 'Previous',
              type: 'button',
              disabled: false
            }
          ],
          noAccessTitle: newSchudleObj.noAccessTitle,
          noAccessText: newSchudleObj.noAccessText
        });
      }
    }
    stepIdHandler(stepId, formBPData, itemObj);
  }

  const BootstrapTooltip = styled(({ className, ...prop }) => (
    <Tooltip
      {...prop}
      classes={{ popper: className }}
      placement="bottom"
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-35, 0]
            }
          }
        ]
      }}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'Poppins',
      maxWidth: '208px',
      padding: '7px 12px;'
    }
  }));

  const stepIdHandler = async (stepId, formBPData, itemObj) => {
    if (stepId) {
      setNextItemObj(formBPData);
      let stepResponse = await getCurrentStepSurveyInstance(
        localStorage.getItem('responsibleId'),
        stepId
      );
      props.SETCURRENTSTEPDATA(stepResponse);
      //setFormBusinessProcess({ ...formBPData, stepResponse })
      if (stepResponse?.survey?.id) {
        let tmpSurveyDetails = await getSurveyAllDetails(
          localStorage.getItem('responsibleId'),
          stepResponse?.survey?.id
        );
        setFormBusinessProcess({ ...formBPData, stepResponse, surveyDetails: tmpSurveyDetails });
        setPopupAction({
          title: itemObj?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          action: 'businessForm',
          scheduleId: itemObj.id,
          showButton: nestedIfCaseHandle(
            !tmpSurveyDetails.allowConfirm,
            { title: tmpSurveyDetails.submitButtonText },
            false
          ),
          afterTitleIconSrc: extractImagePath('info.png'),
          handleAfterTitleIconSrcResponse: handleAfterTitleIconSrcResponse,
          //showNext: (tmpSurveyDetails.allowNext && [{ title: tmpSurveyDetails.nextButtonText, variant: "contained", action: "Next", nextAction: "Next", type: "button", disabled: true }]) || null,
          showTemp: [
            nestedIfCaseHandle(
              tmpSurveyDetails.allowTempSave,
              {
                title: nestedIfCaseHandle(
                  tmpSurveyDetails?.tempSaveButtonText?.length,
                  tmpSurveyDetails?.tempSaveButtonText,
                  'Temp'
                ),
                action: 'temp',
                type: 'button'
              },
              null
            )
          ],
          showConfirm: nestedIfCaseHandle(
            tmpSurveyDetails.allowConfirm,
            [
              {
                title: tmpSurveyDetails.confirmButtonText,
                variant: 'outlined',
                action: 'Confirm',
                nextAction: ButtonsActions.SAVE,
                type: 'button',
                disabled: false
              }
            ],
            null
          ),
          beforeCancel: [
            nestedIfCaseHandle(
              tmpSurveyDetails.allowCancel,
              {
                title: nestedIfCaseHandle(
                  tmpSurveyDetails?.cancelButtonText?.length,
                  tmpSurveyDetails?.cancelButtonText,
                  'Cancel Action'
                ),
                variant: 'outlined',
                color: 'red',
                action: 'cancelAction',
                type: 'button',
                failedPage: PopupPropsActions.businessForm
              },
              null
            )
          ]
          //{ src: PrintIcon, action: "print", nextAction: "showSubmit", type: "image" }
        });
        setshowPopup(true);
        setLoadingForm(true);
        setSurveyAllDetails(tmpSurveyDetails);
        await props.GETBPFORMGROUPDATA(
          localStorage.getItem('responsibleId'),
          stepResponse?.survey?.id
        );
      } else {
        setFormBusinessProcess({ ...formBPData, stepResponse });
        setshowPopup(true);
        setPopupAction({
          title: itemObj?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: true,
          action: 'accessDenied',
          showButton: false,
          maxWidth: 'sm',
          actionType: 'unauthorized',
          leftButton: false,
          showTemp: false,
          noAccessTitle: stepResponse.noAccessTitle,
          noAccessText: stepResponse.noAccessText
        });
      }
    }
    setLoadingForm(false);
  };

  const updatePopupProps = (popupUpdatedAction) => {
    let tmp = { ...popupAction, ...popupUpdatedAction.popupProps };
    switch (tmp.action) {
      case 'deletePopup':
        setSetDeleteRecordData({
          ...popupUpdatedAction?.deleteRecord,
          historyId: popupUpdatedAction.historyId
        });
        break;
      case 'cancelBusinessProcess':
        setCancelledData({
          ...popupUpdatedAction?.cancelRecord,
          businessProcessId: popupUpdatedAction.businessProcessId,
          failedPage: popupUpdatedAction.failedPage
        });
        break;
      case 'renderNextForm':
        handleInputChange(nextItemObj);
        setOpen(false);
        break;
      case 'businessForm':
        setPopupAction({
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          action: 'businessForm',
          scheduleId: formBusinessProcess.id,
          showButton: nestedIfCaseHandle(
            !formBusinessProcess.surveyDetails.allowConfirm,
            { title: formBusinessProcess.surveyDetails.submitButtonText },
            false
          ),
          // showButton: { title: formBusinessProcess.surveyDetails.submitButtonText },
          afterTitleIconSrc: extractImagePath('info.png'),
          handleAfterTitleIconSrcResponse: handleAfterTitleIconSrcResponse,
          showConfirm: nestedIfCaseHandle(
            formBusinessProcess.surveyDetails.allowConfirm,
            [
              {
                title: formBusinessProcess?.surveyDetails?.confirmButtonText,
                variant: 'outlined',
                action: 'Confirm',
                nextAction: ButtonsActions.SAVE,
                type: 'button',
                disabled: false
              }
            ],
            null
          ),
          showTemp: [
            nestedIfCaseHandle(
              formBusinessProcess.surveyDetails.allowTempSave,
              {
                title: nestedIfCaseHandle(
                  formBusinessProcess.surveyDetails.tempSaveButtonText.length,
                  formBusinessProcess?.surveyDetails?.tempSaveButtonText,
                  'Temp'
                ),
                action: 'temp',
                type: 'button'
              },
              null
            )
          ],
          beforeCancel: [
            nestedIfCaseHandle(
              formBusinessProcess.surveyDetails.allowCancel,
              {
                title: nestedIfCaseHandle(
                  formBusinessProcess?.surveyDetails?.cancelButtonText.length,
                  formBusinessProcess?.surveyDetails?.cancelButtonText,
                  'Cancel Action'
                ),
                variant: 'outlined',
                color: 'red',
                action: 'cancelAction',
                type: 'button',
                failedPage: 'businessForm'
              },
              null
            )
          ]
        });
        return;
      case PopupPropsActions.businessFormPreview:
        setPopupAction({
          title: formBusinessProcess?.name,
          icon: extractImagePath('account_tree.png'),
          showCancel: false,
          showButton: false,
          action: PopupPropsActions.businessFormPreview,
          afterTitleIconSrc: extractImagePath('info.png'),
          showConfirm: [
            {
              title: nestedIfCaseHandle(
                surveyAllDetails.submitButtonText,
                surveyAllDetails.submitButtonText,
                'Submit'
              ),
              action: 'Confirm',
              nextAction: 'Confirm',
              type: 'button',
              disabled: false
            }
          ],
          beforeCancel: [
            nestedIfCaseHandle(
              surveyAllDetails.allowCancel,
              {
                title: nestedIfCaseHandle(
                  surveyAllDetails?.cancelButtonText?.length,
                  surveyAllDetails?.cancelButtonText,
                  'Cancel Action'
                ),
                variant: 'outlined',
                color: 'red',
                action: 'cancelAction',
                failedPage: 'businessFormPreview',
                type: 'button'
              },
              null
            )
          ],
          leftButton: [
            nestedIfCaseHandle(
              surveyAllDetails.allowPrevious,
              {
                title: nestedIfCaseHandle(
                  surveyAllDetails?.previousButtonText?.length,
                  surveyAllDetails?.previousButtonText,
                  'Previous'
                ),
                variant: 'outlined',
                action: ButtonsActions.PREVIOUS,
                nextAction: ButtonsActions.PREVIOUS,
                type: 'button',
                disabled: false
              },
              null
            )
          ]
        });
        return;
    }
    setPopupAction(tmp);
  };
  const updatePendingRecordObject = async (id, obj) => {
    let tmpformBPData = {};
    let tempBP = businessProcesses.map((processVal) => {
      if (processVal.id == id) {
        tmpformBPData = { ...processVal, isInProgress: obj };
        let flowInstance = nestedIfCaseHandle(
          processVal?.surveyFlows?.length > 0,
          processVal.surveyFlows,
          []
        );
        flowInstance.push(obj[0]);
        let sortResponse = flowInstance?.sort((a, b) => {
          return new Date(b.lastUpdateDate).getTime() - new Date(a.lastUpdateDate).getTime();
        });
        return {
          ...processVal,
          status: obj[0].status,
          surveyFlows: sortResponse,
          isInProgress: obj
        };
      }
      return processVal;
    });
    await props.UPDATEQUICKYACTIONSURVEYFLOWS(tempBP);
    return tmpformBPData;
  };

  const filterOptions = (options, state) => {
    let newOptions = [];
    options.forEach((element) => {
      if (element.name.toLowerCase().includes(state.inputValue.toLowerCase())) {
        element.isBusinessprocess = true;
        newOptions.push(element);
      }
    });

    newOptions.push({
      name: 'Deceased',
      isBusinessprocess: false,
      id: 1,
      isInProgress: [],
      componentToRender: 'deceased',
      disabled: false,
      flag: 'isDeceased'
    });
    newOptions.push({
      name: 'Incarcerated',
      isBusinessprocess: false,
      id: 2,
      isInProgress: [],
      componentToRender: 'incarcerated',
      disabled: false,
      flag: 'isIncarcerated'
    });
    newOptions.push({
      name: 'Litigious',
      isBusinessprocess: false,
      id: 3,
      isInProgress: [],
      componentToRender: 'ligitious',
      disabled: false,
      flag: 'isLitigious'
    });
    newOptions.push({
      name: 'Dispute',
      isBusinessprocess: false,
      id: 4,
      isInProgress: [],
      componentToRender: 'dispute',
      disabled: false,
      flag: 'isDisputed'
    });
    newOptions.push({
      name: 'Bankruptcy',
      isBusinessprocess: false,
      id: 5,
      isInProgress: [],
      componentToRender: 'bankruptcy',
      disabled: false,
      flag: 'isBankrupted'
    });
    newOptions.push({
      name: 'Complaints',
      isBusinessprocess: false,
      id: 6,
      isInProgress: [],
      componentToRender: 'complaint',
      disabled: false
    });

    newOptions.forEach((option) => {
      props.consumerDemographics.forEach((data) => {
        option.disabled = nestedIfCaseHandle(data[option.flag], true, false);
        return option;
      });
    });

    newOptions.forEach((option) => {
      if (props.dependentsOfResponsible.length > 0) {
        const consumer = props.dependentsOfResponsible.find(
          (dependent) => dependent.id === localStorage.getItem('responsibleId')
        );
        if (option.flag in consumer && consumer[option.flag]) {
          option.disabled = true;
        }
      }
      return option;
    });
    return newOptions;
  };

  let dropDownIconOpenStyle = {
    borderRight: 1,
    borderColor: `${ColorPallete.Button.Tertiary}`,
    fontSize: '25px'
  };
  let dropDownIconClosedStyle = {
    borderLeft: 1,
    borderColor: `${ColorPallete.Button.Tertiary}`,
    fontSize: '25px'
  };

  const navigateToGenInfo = () => {
    navigate(`/consumer`);
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: '110px',
          padding: 2,
          background: `${ColorPallete.QuickActionContainer.backgroundColor}`,
          backgroundImage: `URL(${extractImagePath('shape.png')})`,
          backgroundSize: '100%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          color: `${ColorPallete.Color.White}`,
          fontFamily: 'Poppins',
          boxSizing: 'border-box',
          display: 'flex',
          alignContent: 'space-between',
          borderRadius: ' 8px 8px 0px 0px'
        }}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            fontWeight: '700'
          }}>
          <Grid item>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
                height: '26px',
                alignItems: 'center'
              }}>
              <Grid item>Quick Actions</Grid>
              {hasFeature && (
                <Grid item>
                  {props.apiCallStatus ? (
                    <CircularProgress
                      sx={{
                        color: `${ColorPallete.Color.White}`,
                        fontSize: '12px'
                      }}
                      style={{
                        width: '15px',
                        height: '15px'
                      }}
                    />
                  ) : (
                    <BootstrapTooltip title={'Business Processes in Progress'}>
                      <Avatar
                        sx={{
                          bgcolor: `${ColorPallete.Border.Panel}`,
                          color: `${ColorPallete.Color.Black}`,
                          fontSize: '12px',
                          width: 16,
                          height: 16
                        }}
                        alt="0">
                        {inProgressCount}
                      </Avatar>
                    </BootstrapTooltip>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item sx={{ cursor: 'pointer' }} onClick={handleHistoryPopup}>
            {businessProcesses.length > 0 && <HistoryIcon />}
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: '15px' }}>
          <Grid item xs={12}>
            <Autocomplete
              open={open}
              value={value}
              inputValue={inputValue}
              disabled={props.apiCallStatus}
              filterOptions={filterOptions}
              onOpen={(e) => {
                setOpen(
                  nestedIfCaseHandle(
                    inputValue.length >= 2,
                    true,
                    nestedIfCaseHandle(e.target.tagName === 'INPUT', false, true)
                  )
                );
              }}
              onClose={() => {
                setOpen(false);
              }}
              onChange={(e, val) => {
                setValue(val);
                handleInputChange(val);
              }}
              onInputChange={(e, val, reason) => {
                setInputValue(nestedIfCaseHandle(reason === 'reset', '', val));
                if (reason === 'reset') {
                  setValue(null);
                }
              }}
              disablePortal
              id="combo-box-demo"
              options={businessProcesses}
              popupIcon={
                <ArrowDropDownIcon
                  sx={nestedIfCaseHandle(open, dropDownIconOpenStyle, dropDownIconClosedStyle)}
                />
              }
              noOptionsText={
                <Grid
                  container
                  style={{
                    padding: '16px',
                    border: '1px solid',
                    borderColor: `${ColorPallete.Border.Primary}`
                  }}>
                  <Grid
                    item
                    sx={{ fontSize: '14px', color: `${ColorPallete.Color.Black}` }}
                    xs={12}>
                    <b>No Action Found</b>
                  </Grid>
                </Grid>
              }
              ListboxProps={{
                sx: {
                  maxHeight: 256,
                  border: '1px solid',
                  borderColor: `${ColorPallete.Border.Primary}`
                }
              }}
              //onChange={(event,value)=>(setinputValue(value.name))}
              //onInputChange={(event,value)=>(console.log(event.target,value.label))}
              getOptionLabel={(option) => option.id.toString()} //label
              renderOption={(optionProps, option, state) => {
                return (
                  //<Box {...optionProps} key={option.id}>
                  <Grid
                    container
                    {...optionProps}
                    style={{ paddingTop: 8, paddingBottom: 8, paddingRight: 16, paddingLeft: 16 }}>
                    <Grid disabled={true} item xs={12} value={option.id}>
                      <MenuItem
                        disabled={returnValueOrDefault(option?.disabled, false)}
                        sx={{
                          padding: '0px',
                          fontSize: '14px',
                          color: `${ColorPallete.Color.Black}`
                        }}>
                        {option.name}
                      </MenuItem>
                    </Grid>
                    {nestedIfCaseHandle(
                      option.isInProgress.length > 0,
                      option.isInProgress,
                      []
                    )?.map((item) => {
                      return (
                        <Grid
                          item
                          key={item.name}
                          xs={12}
                          sx={{
                            color: `${ColorPallete.Text.Secondary}`,
                            fontSize: '12px',
                            fontWeight: 400
                          }}>
                          {item.name}
                          <span> [In Progress] </span>
                        </Grid>
                      );
                    })}
                  </Grid>
                  //</Box>
                  // <div {...optionProps} key={option.id}>{option.name}</div>
                );
              }}
              size="small"
              sx={{
                backgroundColor: `${ColorPallete.Color.White}`,
                borderRadius: '3px',
                '&.MuiOutlinedInput-root': { borderColor: `${ColorPallete.Border.Primary}` }
              }}
              renderInput={(params) =>
                nestedIfCaseHandle(
                  businessProcesses.length > 0,
                  <TextField
                    {...params}
                    placeholder="Select An Action"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {nestedIfCaseHandle(
                            inputValue.length > 0,
                            <ClearIcon
                              onClick={() => {
                                setInputValue('');
                                setOpen(false);
                              }}
                              sx={{
                                marginRight: 4,
                                cursor: 'pointer',
                                color: ColorPallete.Color.DarkGrey
                              }}
                            />,
                            null
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />,
                  <TextField
                    {...params}
                    sx={{
                      '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                        backgroundColor: `${ColorPallete.Color.LightGrey}`
                      },
                      '& .Mui-disabled': {
                        backgroundColor: `${ColorPallete.Color.LightGrey} !important`
                      }
                    }}
                    placeholder="No Action Available"
                  />
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <PopUp
        title={popupAction.title}
        openPopUp={showPopup}
        setOpenPopUp={setshowPopup}
        imageSrc={popupAction.icon}
        leftButton={popupAction?.leftButton}
        beforeCancel={popupAction?.beforeCancel}
        showCancel={popupAction.showCancel}
        showButton={popupAction?.showButton}
        showConfirm={nestedIfCaseHandle(popupAction?.showConfirm, popupAction?.showConfirm, false)}
        showNext={nestedIfCaseHandle(popupAction?.showNext, popupAction?.showNext, false)}
        showTemp={nestedIfCaseHandle(popupAction?.showTemp, popupAction?.showTemp, false)}
        showViewSummary={nestedIfCaseHandle(
          popupAction?.showViewSummary,
          popupAction?.showViewSummary,
          false
        )}
        handleButtonResponse={handleButtonResponse}
        afterTitleIconSrc={nestedIfCaseHandle(
          popupAction?.afterTitleIconSrc,
          popupAction?.afterTitleIconSrc,
          ''
        )}
        handleAfterTitleIconSrcResponse={popupAction.handleAfterTitleIconSrcResponse}
        maxWidth={nestedIfCaseHandle(popupAction?.maxWidth, popupAction?.maxWidth, 'md')}
        action={popupAction.action}
        styles={popupAction.styles}
        actionType={popupAction.actionType}>
        {
          {
            [PopupPropsActions.history]: <History updatePopupProps={updatePopupProps} />,
            [PopupPropsActions.businessForm]: (
              <BusinessForm
                updatePopupProps={updatePopupProps}
                loading={loadingForm}
                surveyAllDetails={surveyAllDetails}
                runSaveAction={runSaveAction}
                runTempAction={runTempAction}
                isSubmitForm={isSubmitForm}
              />
            ),
            [PopupPropsActions.businessFormPreview]: (
              <BusinessFormPreview
                updatePopupProps={updatePopupProps}
                callSubmitPreviewForm={callSubmitPreviewForm}
              />
            ),

            [PopupPropsActions.viewSummary]: (
              <ViewSummary viewSummaryData={viewSummaryData?.steps} />
            ),
            [PopupPropsActions.deletePopup]: (
              <DeletePopup
                updatePopupProps={updatePopupProps}
                deleteRecordData={deleteRecordData}
                setPopupAction={setPopupAction}
              />
            ),
            [PopupPropsActions.cancelBusinessProcess]: (
              <CancelBusinessProcess
                setshowPopup={setshowPopup}
                updatePopupProps={updatePopupProps}
                cancelledData={cancelledData}
                setPopupAction={setPopupAction}
              />
            ),
            [PopupPropsActions.accessDenied]: (
              <AccessDeniedPopup
                setshowPopup={setshowPopup}
                actionType={popupAction.actionType}
                noAccessTitle={popupAction.noAccessTitle}
                noAccessText={popupAction.noAccessText}
              />
            ),
            [PopupPropsActions.thankyou]: <Thankyou formBusinessProcess={formBusinessProcess} />,
            [PopupPropsActions.frequency]: <FrequencyLimit errorText={popupAction?.errorText} />,
            [PopupPropsActions.loadingComponent]: (
              <div style={{ height: '70vh' }}>
                <Box sx={{ ml: '50%', mt: '20%', mb: '10%' }} style={{ height: '30px' }}>
                  <CircularProgress />
                </Box>
              </div>
            ),
            [PopupPropsActions.renderNextForm]: <div style={{ height: '70vh' }}></div>,
            [!popupAction.action]: <div style={{ height: '70vh' }}></div>
          }[popupAction.action]
        }
      </PopUp>
      <Popover
        formBusinessProcess={formBusinessProcess}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <Typography sx={{ p: 1, fontSize: '14px' }}>
          <Stack direction="row">
            <div style={{ color: ColorPallete.Color.DarkGrey }}>
              <Paper sx={{ pb: 1, pr: 1 }}>Task Name: </Paper>
              <Paper sx={{ pb: 1, pr: 1 }}>Status: </Paper>
              <Paper sx={{ pb: 1, pr: 1 }}>Step Info: </Paper>
              <Paper sx={{ pb: 1, pr: 1 }}>Entry Date: </Paper>
              <Paper sx={{ pb: 1, pr: 1 }}>Execution Date: </Paper>
              <Paper sx={{ pr: 1 }}>Executed By: </Paper>
            </div>
            <div style={{ color: ColorPallete.Color.Black }}>
              <Paper sx={{ pb: 1 }}>{formBusinessProcess?.name}</Paper>
              <Paper sx={{ pb: 1 }}>
                <Chip label="IN PROGRESS" className={classes.inprogress} />
              </Paper>
              <Paper sx={{ pb: 1 }}>{formBusinessProcess?.stepResponse?.name}</Paper>
              <Paper sx={{ pb: 1 }}>
                {nestedIfCaseHandle(
                  formBusinessProcess.isInProgress,
                  formBusinessProcess.isInProgress?.[0]?.createDate,
                  ''
                )}
              </Paper>
              <Paper sx={{ pb: 1 }}>
                {nestedIfCaseHandle(
                  formBusinessProcess.isInProgress,
                  formBusinessProcess.isInProgress?.[0]?.lastUpdateDate,
                  ''
                )}
              </Paper>
              <Paper>
                {nestedIfCaseHandle(
                  formBusinessProcess.isInProgress,
                  formBusinessProcess.isInProgress?.[0]?.startBy,
                  ''
                )}
              </Paper>
            </div>
          </Stack>
        </Typography>
      </Popover>

      <AddDeceased
        showDialog={show}
        handleDialog={handleDialog}
        navigateToGenInfo={navigateToGenInfo}
      />
      <EditDeceased
        showDialog={showEditdeceased}
        handleDialog={handleDialogEdit}
        tableRowData={nestedIfCaseHandle(props.deceasedInfo.length > 0, props.deceasedInfo, [])}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    apiCallStatus: state.BusinessProcessReducer.apiCallStatus,
    portfolioId: state.ConsumerDetailsReducer.portfolioId,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    quickActionSurveyFlows: state.BusinessProcessReducer.quickActionSurveyFlows,
    currentPortfolioId: state.BusinessProcessReducer.currentPortfolioId,
    currentResponsibleId: state.BusinessProcessReducer.currentResponsibleId,
    deceasedInfo: state.ConsumerDetailsReducer.deceasedInfo,
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    dependentsOfResponsible: state.ConsumerQuickActionsReducer.dependentsOfResponsible,
    viewSummary: state.BusinessProcessReducer.viewSummary,
    externalBusinessData: state.BusinessProcessReducer.externalBusinessData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    GETALLSURVEYFLOWS: async (portfolioId, responsibleId) => {
      await dispatch(GETALLSURVEYFLOWS(portfolioId, responsibleId));
    },
    UPDATEQUICKYACTIONSURVEYFLOWS: async (businessProcesses) => {
      await dispatch(UPDATEQUICKYACTIONSURVEYFLOWS(businessProcesses));
    },
    GETBPFORMGROUPDATA: async (responsibleId, surveyId) => {
      await dispatch(GETBPFORMGROUPDATA(responsibleId, surveyId));
    },
    SETCURRENTSTEPDATA: async (currentStepData) => {
      await dispatch(SETCURRENTSTEPDATA(currentStepData));
    },
    SETSELECTEDFORMID: async (formSelectedID) => {
      await dispatch(SETSELECTEDFORMID(formSelectedID));
    },
    SETGROUPANSWERDATA: async (answerData) => {
      await dispatch(SETGROUPANSWERDATA(answerData));
    },
    RESETGROUPDATA: async (answerData) => {
      await dispatch(RESETGROUPDATA(answerData));
    },
    SETCURRENTPORTFOLIOID: async (currentPortfolio) => {
      await dispatch(SETCURRENTPORTFOLIOID(currentPortfolio));
    },
    SETCURRENTRESPONSIBLEID: async (currentResponsible) => {
      await dispatch(SETCURRENTRESPONSIBLEID(currentResponsible));
    },
    ADDDECEASEDINPUTS: async () => {
      await dispatch(ADDDECEASEDINPUTS('', '', 'reset'));
    },
    ADDCOURTINPUTS: async () => {
      await dispatch(ADDCOURTINPUTS('', '', 'reset'));
    },
    ADDEXECUTORINPUTS: async () => {
      await dispatch(ADDEXECUTORINPUTS('', '', 'reset'));
    },
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    },
    EXTERNALBUSINESSPROCESS: async (value) => {
      await dispatch(EXECUTEBUSINESSPROCESS(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickAction);
