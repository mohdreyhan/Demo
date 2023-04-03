import * as React from 'react';
import {
  ExpandMore,
  Accordion,
  AddIcon,
  AccordionSummary,
  MuiButton,
  AccordionDetails,
  Grid,
  Box,
  Typography,
  IconButton,
  styled,
  Tooltip,
  Button,
  tooltipClasses
} from '@oasis/react-core';
import { connect } from 'react-redux';
import NotificationIcon from '../../../../../Icons/notifications.svg';
import AddIcon2 from '../../../../../Icons/AddIcon2.svg';
import { ColorPallete } from '../../../../theme/ColorPallete';
import DividerComp from '../../../Common/AEComponents/Divider/DividerComp.js';
import SelectButton from '../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  ADDALERTNOTIIFICATION,
  DELETEALERTNOTIFICATION
} from '../../../../Actions/ConsumerDetails/ActionCreators';

const returnAccordianDisplayType = (accountAlert = [], showAddaNote = false) => {
  return accountAlert.length > 0 || showAddaNote ? 'block' : 'none';
};

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'Poppins',
    maxWidth: 550
  }
}));

const getAccountAlertsView = (props, value, handleremoveChange) => {
  if (value?.description) {
    return (
      <div key={`note_${value.id}`}>
        <Box>
          <Grid container wrap="nowrap" spacing={1} sx={{ mb: 1 }}>
            <Grid
              item
              xs={10}
              style={{
                color: ColorPallete.Text.Secondary,
                fontSize: '12px',
                marginTop: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px 16px 8px',
                gap: '8px'
              }}>
              <Grid item xs zeroMinWidth>
                <Typography
                  style={{
                    color: ColorPallete.Color.Black,
                    paddingLeft: '3px',
                    overflowWrap: 'break-word'
                  }}>
                  {value?.description}
                </Typography>
              </Grid>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  margin: 3,
                  padding: 0
                }}>
                <MuiButton
                  style={{
                    color: ColorPallete.Button.Secondary,
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'capitalize',
                    fontFamily: 'poppins',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '1.75',
                    letterSpacing: '0.02857em',
                    minWidth: '64px'
                  }}
                  onClick={() =>
                    handleremoveChange(value?.id, localStorage.getItem('responsibleId'))
                  }>
                  Remove Alert
                </MuiButton>
              </div>
            </Grid>
          </Grid>
        </Box>
        {value?.description && (
          <DividerComp
            orientation="horizontal"
            styles={{
              width: '100%',
              background: ColorPallete.Button.Tertiary,
              marginTop: '12px',
              marginBottom: '12px'
            }}
          />
        )}
      </div>
    );
  }
};

function Alerts(props) {
  const [accountAlert, setaccountAlert] = React.useState([]);

  const [rotation, setRotation] = React.useState('rotate(180deg)');
  const [expandAlert, setExpandAlert] = React.useState(true);
  const [disableAddicon, setdisableAddicon] = React.useState(false);
  const [showAddaNote, setAddaNote] = React.useState(false);
  const [addValue, setAddValue] = React.useState('');

  const [Optionsdata, setOptionsdata] = React.useState([]);

  const menuprops = {
    style: {
      width: '20ch',
      margin: '6px 0px 0px 0px'
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    PaperProps: {
      sx: {
        '& .MuiMenuItem-root:hover': {
          backgroundColor: ColorPallete.AccordionSummary.backgroundColor
        },
        '& .MuiMenuItem-root.Mui-selected:hover': {
          backgroundColor: ColorPallete.AccordionSummary.backgroundColor
        },
        '& .MuiMenuItem-root': {
          fontFamily: 'poppins',
          fontSize: '13px',
          fontWeight: '400',
          textAlign: 'left'
        }
      }
    },
    getContentAnchorEl: null
  };

  const rotateExpandIcon = () => {
    setExpandAlert(!expandAlert);
    setAddaNote(false);
    setdisableAddicon(false);
    if (rotation == 'unset') {
      setRotation('rotate(180deg)');
      return true;
    }
    setRotation('unset');
  };

  const handleInputfield = (event) => {
    setAddValue(event.target.value);
  };

  const handleSaveChange = (responsibleId, event) => {
    if (addValue != '') {
      let newAlertObj = [{ referenceId: addValue }];
      props.ADDALERTNOTIIFICATION(responsibleId, newAlertObj);
    }

    setAddaNote(false);
    setAddValue('');
    setdisableAddicon(false);
  };

  const AddIconClick = () => {
    setdisableAddicon(true);
    if (!expandAlert) {
      setRotation('rotate(180deg)');
      setExpandAlert(!expandAlert);
      setAddaNote(!showAddaNote);
      setdisableAddicon(!disableAddicon);
      return true;
    }
    setAddaNote(!showAddaNote);
    setdisableAddicon(!disableAddicon);
  };

  const handleremoveChange = (id, responsibleId) => {
    props.DELETEALERTNOTIFICATION(responsibleId, id);
  };

  React.useEffect(() => {
    const activeAlertoptions = props.alertTypes?.filter((val) => val.active) || [];

    const accountAlerts =
      activeAlertoptions.filter((val) => {
        return props.alertlists?.some((a) => {
          return a.refrenceId === val.id;
        });
      }) || [];

    const options = activeAlertoptions.map((val) => {
      const isAlertsAddedToAccount = props.alertlists?.some((a) => a.refrenceId === val.id);

      return {
        ...val,
        disabled: isAlertsAddedToAccount
      };
    });
    setaccountAlert(accountAlerts);
    setOptionsdata(options);
  }, [props.alertlists, props.alertTypes]);

  const getAddIcon = () => {
    if (accountAlert.length < 5) {
      return (
        <IconButton sx={{ padding: '3px' }} onClick={() => AddIconClick()}>
          <img
            src={AddIcon2}
            style={{
              height: '12px',
              width: '18px',
              pointerEvents: 'auto'
            }}
          />
        </IconButton>
      );
    }

    return (
      <BootstrapTooltip
        enterTouchDelay={0}
        enterDelay={0}
        leaveTouchDelay={0}
        placement="bottom-start"
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            You can only add upto 5 alerts
          </div>
        }>
        <AddIcon
          style={{
            cursor: 'default',
            pointerEvents: 'auto',
            color: ColorPallete.Color.DarkGrey,
            fontSize: '20px'
          }}
        />
      </BootstrapTooltip>
    );
  };

  return (
    <>
      <Accordion
        disableGutters
        expanded={expandAlert}
        sx={{
          pointerEvents: 'none',
          '&.MuiPaper-root': {
            '&.MuiAccordion-root': {
              borderBottom: `1px solid ${ColorPallete.Border.Panel}`,
              borderRadius: "0px !important",
            }
          }
        }}>
        <AccordionSummary
          sx={{
            '& .MuiAccordionSummary-content': {
              margin: '5px 0 !important'
            }
          }}>
          <Grid container>
            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignSelf: 'center'
              }}>
              <img src={NotificationIcon} style={{ height: '20px', alignSelf: 'center' }} />
              <div>Alerts</div>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Grid item xs={4} />
            {!disableAddicon ? (
              getAddIcon()
            ) : (
              <BootstrapTooltip
                enterTouchDelay={0}
                enterDelay={0}
                leaveTouchDelay={0}
                placement="bottom-start"
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    You can't add more than 1 alert simultaneously
                  </div>
                }>
                <AddIcon
                  style={{
                    cursor: 'default',
                    pointerEvents: 'auto',
                    paddingRight: '0px',
                    color: ColorPallete.Color.DarkGrey,
                    fontSize: '20px'
                  }}
                />
              </BootstrapTooltip>
            )}
            <IconButton sx={{ padding: '3px' }} onClick={() => rotateExpandIcon()}>
              <ExpandMore
                sx={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  color: ColorPallete.Button.Primary,
                  transform: `${rotation}`
                }}
              />
            </IconButton>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pointerEvents: 'auto',
            display: returnAccordianDisplayType(accountAlert, showAddaNote),
            paddingBottom: '0px',
            paddingTop: '0px'
          }}>
          {showAddaNote && (
            <div style={{ marginBottom: '10px' }}>
              <Box
                sx={{
                  '& > :not(style)': { m: 1 },
                  backgroundColor: ColorPallete.AccordionSummary.backgroundColor,
                  marginLeft: '-16px',
                  marginRight: '-16px',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 4px 4px 8px'
                }}>
                <div style={{ paddingLeft: '6px' }}>
                  <DividerComp
                    orientation="horizontal"
                    styles={{
                      width: '100%',
                      background: ColorPallete.Button.Tertiary,
                      marginBottom: '9px'
                    }}
                  />
                  <SelectButton
                    data={{
                      options: {
                        optionsData: Optionsdata || []
                      }
                    }}
                    captureInputs={handleInputfield}
                    placeholder={'Select Alert'}
                    menuprops={menuprops}
                    selectDropdown={''}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MuiButton
                      onClick={() => handleSaveChange(localStorage.getItem('responsibleId'))}
                      style={{
                        color: ColorPallete.Button.Secondary,
                        textTransform: 'capitalize',
                        fontFamily: 'poppins',
                        fontWeight: 500,
                        lineHeight: '1.75',
                        letterSpacing: '0.02857em',
                        fontSize: '14px',
                        minWidth: '64px'
                      }}>
                      Add Alert
                    </MuiButton>
                  </div>
                </div>
              </Box>
              <DividerComp
                orientation="horizontal"
                styles={{
                  width: '100%',
                  background: ColorPallete.Button.Tertiary
                }}
              />
            </div>
          )}
          <DividerComp
            orientation="horizontal"
            styles={{
              width: '100%',
              background: ColorPallete.Button.Tertiary,
              marginTop: '12px',
              marginBottom: '12px'
            }}
          />
          <div style={{ maxHeight: '350px', overflow: 'auto' }}>
            {accountAlert
              ?.map((value) => getAccountAlertsView(props, value, handleremoveChange))
              .reverse()}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {
    alertTypes: state.StaticDataReducer.alertData, // alert types from config manager
    alertlists: state.ConsumerDetailsReducer.alertlists // consumer related alerts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDALERTNOTIIFICATION: async (responsibleId, newAlertObj) => {
      await dispatch(ADDALERTNOTIIFICATION(responsibleId, newAlertObj));
    },
    DELETEALERTNOTIFICATION: async (responsibleId, id) => {
      await dispatch(DELETEALERTNOTIFICATION(responsibleId, id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
