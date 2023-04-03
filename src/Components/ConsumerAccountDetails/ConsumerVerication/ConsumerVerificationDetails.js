import * as React from 'react';
import { FormGroup } from '@mui/material';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Checkbox,
  Stack,
  FormControlLabel,
  MuiButton
} from '@oasis/react-core';
import { ColorPallete } from '../../../theme/ColorPallete';
import { connect } from 'react-redux';
import { consumerVerifyData } from './ConsumerVerification.Data';
import ConsumerDetails from '../../../../Icons/ConsumerDetails.svg';
import {
  convertTimestamptoUSA,
  scrollTop,
  returnValueOrDefault
} from '../../Common/commonfunctions';
import {
  UPDATECONSUMERVERIFICATION,
  GETVERIFICATIONQUESTIONNAIRE
} from '../../../Actions/ConsumerDetails/ActionCreators';
import { GETALLCOUNTRIES } from '../../../Actions/StaticData/ActionCreators';
import ConsumerVerification_02 from '../../../../Icons/BlurImages/ConsumerVerification_02.png';
import ConsumerVerification_03 from '../../../../Icons/BlurImages/ConsumerVerification_03.png';
import ContactInformation from '../GeneralInformation/ContactInformation/ContactInformation';
import {
  GETEMAILTYPES,
  GETADDRESSTYPES,
  GETPHONETYPES
} from '../../../../src/Actions/ConsumerDetails/ContactInformation/ActionCreators';

function ConsumerVerificationDetails(props) {
  const [state, setState] = React.useState({
    name: false,
    dateOfBirth: false,
    ssn: false,
    address: false,
    email: false
  });
  const [miniMiranda, setMiniMiranda] = React.useState(false);
  const [verifyBtnDisabled, setverifyBtnDisabled] = React.useState(true);
  const miniMirandaText =
    'This is a communication from a debt collector. This is an attempt to collect a debt and any information obtained will be used for that purpose.';

  const { name, dateOfBirth, ssn, address, email } = state;

  React.useEffect(() => {
    if (!(props.consumerSkipVerification && props.consumerVerification)) {
      props.GETVERIFICATIONQUESTIONNAIRE(localStorage.getItem('customerId'));
    }
    setTimeout(() => {
      setState({
        name: false,
        dateOfBirth: false,
        ssn: false,
        address: false,
        email: false
      });
      setMiniMiranda(false);
    }, 200);
  }, [localStorage.getItem('responsibleId')]);

  ///////GET ALL STATES IS BEING CALLED IN PARENT COMPONENT (PROTECTED ROUTES)
  React.useEffect(() => {
    props.GETEMAILTYPES();
    props.GETALLCOUNTRIES();
    props.GETADDRESSTYPES();
    props.GETPHONETYPES();
  }, [localStorage.getItem('responsibleId')]);

  const handleChangeMiranda = (event) => {
    setMiniMiranda(event.target.checked);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const handleSkipVerification = (event) => {
    let request = {
      context: 'CONSUMER',
      category: 'CONSUMER_VERIFICATION',
      entityId: localStorage.getItem('customerId'),
      type: 'CONSUMER_VERIFICATION_SKIPPED'
    };
    props.UPDATECONSUMERVERIFICATION(request, false);
  };

  const handleVerifyConsumer = () => {
    const arr = {};
    let obj = state;
    Object.entries(obj).forEach((entry) => {
      const [key, value] = entry;
      if (value) {
        switch (key) {
          case 'ssn': {
            arr[key] = props?.consumerverifieddetails[key]
              ? (props?.consumerverifieddetails[key]).replaceAll('*', '')
              : '';
            break;
          }
          case 'dateOfBirth': {
            arr[key] = props?.consumerverifieddetails[key]
              ? (props?.consumerverifieddetails[key]).substr(0, 10)
              : '';
            break;
          }
          case 'name': {
            arr[key] = {
              firstName: returnValueOrDefault(props?.consumerverifieddetails['firstName'], ''),
              middleName: returnValueOrDefault(props?.consumerverifieddetails['middleName'], ''),
              lastName: returnValueOrDefault(props?.consumerverifieddetails['lastName'], '')
            };
            break;
          }
          case 'address': {
            arr[key] = {
              address1: returnValueOrDefault(
                props?.consumerverifieddetails?.primaryAddress?.address1,
                ''
              ),
              address2: returnValueOrDefault(
                props?.consumerverifieddetails?.primaryAddress?.address2,
                ''
              ),
              city: returnValueOrDefault(props?.consumerverifieddetails?.primaryAddress?.city, ''),
              stateCode: returnValueOrDefault(
                props?.consumerverifieddetails?.primaryAddress?.stateCode,
                ''
              ),
              countryCode: returnValueOrDefault(
                props?.consumerverifieddetails?.primaryAddress?.countryCode,
                ''
              ),
              zipCode: returnValueOrDefault(
                props?.consumerverifieddetails?.primaryAddress?.zipCode,
                ''
              )
            };
            break;
          }
          case 'email': {
            arr[key] = returnValueOrDefault(props?.consumerverifieddetails[key], '');
            break;
          }
        }
      }
    });
    let request = {
      context: 'CONSUMER',
      category: 'CONSUMER_VERIFICATION',
      entityId: localStorage.getItem('customerId'),
      type: 'CONSUMER_VERIFIED',
      data: arr
    };
    props.UPDATECONSUMERVERIFICATION(request, true);
    scrollTop();
  };

  React.useEffect(() => {
    const checkedOption = [name, dateOfBirth, ssn, address, email].filter((v) => v).length >= 2;
    if (checkedOption && miniMiranda) {
      setverifyBtnDisabled(false);
    } else {
      setverifyBtnDisabled(true);
    }
  }, [state, miniMiranda]);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '8px',
            marginRight: '12px'
          }}>
          <Grid container style={{ padding: '8px 16px', alignItems: 'center' }}>
            <Grid
              item
              xs={11.3}
              sx={{ display: 'flex', marginTop: '8px' }}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Grid style={{ marginLeft: '15px', marginTop: '4px' }} item xs={0.4}>
                <img src={ConsumerDetails} />
              </Grid>
              <Grid item xs={8.5}>
                <Typography
                  style={{
                    fontSize: '16px',
                    paddingLeft: '5px',
                    color: '#444444',
                    fontFamily: 'poppins'
                  }}>
                  Consumer Details
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{
              border: 'solid 0.5px #A6A6A6',
              margin: '0px 27px 0px 24px',
              position: 'relative'
            }}></div>
          <Grid
            container
            style={{
              padding: '8px 24px',
              display: 'grid'
            }}>
            <div style={{ marginBottom: '8px' }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: ColorPallete.Color.Black,
                  fontSize: '14px',
                  fontFamily: 'poppins'
                }}>
                Please verify at least 2 of the below pieces of information to continue.
              </Typography>
            </div>
            <FormGroup>
              {consumerVerifyData.map((data) => {
                return (
                  <div key={`${data.id}_${data.accessor}`}>
                    <Typography fontSize="12px" sx={{ paddingBottom: '6px' }}>
                      <div style={{ fontFamily: 'poppins' }}>{data.label}</div>
                    </Typography>
                    <FormControlLabel
                      sx={{
                        color: ColorPallete.Color.Black,
                        marginBottom: '4px',
                        marginTop: '-8px',
                        fontFamily: 'poppins !important',
                        wordBreak: 'break-all'
                      }}
                      control={
                        <Checkbox
                          checked={state[data.accessor]}
                          onChange={handleChange}
                          name={data.name}
                        />
                      }
                      label={
                        data.accessor == 'dateOfBirth'
                          ? convertTimestamptoUSA(props.consumerverifieddetails[data.name])
                          : props.consumerverifieddetails[data.name]
                      }
                    />
                  </div>
                );
              })}
            </FormGroup>
            <div style={{ marginBottom: '8px' }}>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '14px', color: ColorPallete.Color.Black }}
                style={{ marginBottom: '0px', fontFamily: 'poppins' }}>
                Verify that you have read the mini miranda to the consumer and that they have agreed
                to it.
              </Typography>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'block', fontSize: '4px', fontFamily: 'poppins' }}>
                <Typography sx={{ fontSize: '12px' }}>
                  Mini Miranda
                  <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
                </Typography>
              </div>
              <Stack direction="row" spacing={2}>
                <FormGroup>
                  <FormControlLabel
                    sx={{ paddingLeft: '2px' }}
                    control={
                      <Checkbox
                        checked={miniMiranda}
                        onChange={handleChangeMiranda}
                        name="miniMiranda"
                      />
                    }
                    label={miniMirandaText}
                  />
                </FormGroup>
              </Stack>
            </div>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '25px'
            }}>
            <MuiButton
              variant="outlined"
              size="small"
              onClick={handleSkipVerification}
              style={{
                fontFamily: 'Poppins',
                fontSize: '14px',
                lineHeight: '21px',
                height: '29px',
                textTransform: 'capitalize',
                color: ColorPallete.Button.Secondary
              }}>
              Skip Verification
            </MuiButton>

            <MuiButton
              disabled={verifyBtnDisabled}
              onClick={handleVerifyConsumer}
              style={{
                fontFamily: 'Poppins',
                fontSize: '14px',
                lineHeight: '21px',
                height: '29px',
                textTransform: 'capitalize'
              }}
              type="submit"
              variant="contained"
              size="small">
              Verify Consumer
            </MuiButton>
          </Stack>
          <br />
          <br />
        </Paper>
      </Box>

      <Box sx={{ width: '100%' }}>
        <ContactInformation />
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '8px',
            backdropFilter: 'blur(5px)',
            backgroundColor: ColorPallete.Color.Blur
          }}>
          <img width="100%" src={ConsumerVerification_02} />
        </Paper>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '8px',
            backdropFilter: 'blur(5px)',
            backgroundColor: ColorPallete.Color.Blur
          }}>
          <img width="100%" src={ConsumerVerification_03} />
        </Paper>
      </Box>
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    consumerPersonalInfo: state.ConsumerDetailsReducer.consumerPersonalInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UPDATECONSUMERVERIFICATION: async (value, responsibleId) => {
      await dispatch(UPDATECONSUMERVERIFICATION(value, responsibleId));
    },
    GETVERIFICATIONQUESTIONNAIRE: async (uuid) => {
      await dispatch(GETVERIFICATIONQUESTIONNAIRE(uuid));
    },
    GETEMAILTYPES: async () => {
      await dispatch(GETEMAILTYPES());
    },
    GETADDRESSTYPES: async () => {
      await dispatch(GETADDRESSTYPES());
    },
    GETPHONETYPES: async () => {
      await dispatch(GETPHONETYPES());
    },
    GETALLCOUNTRIES: async () => {
      await dispatch(GETALLCOUNTRIES());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerVerificationDetails);
