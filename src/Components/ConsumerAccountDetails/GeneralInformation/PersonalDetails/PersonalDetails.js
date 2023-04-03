import * as React from 'react';
import { Grid, MuiButton } from '@oasis/react-core';
import { connect } from 'react-redux';
import useStyles from './PersonalDetails.style';
import { restructureArray, scrollTop } from '../../../Common/commonfunctions.js';
import { consumerDemoData, consumerAliasData } from './PersonalDetails.Data';
import {
  CONSUMERVERIFICATION,
  CONSUMERSKIPVERIFICATION
} from '../../../../Actions/ConsumerDetails/Actions';
import ViewAlias from './ViewAlias/ViewAlias';

function PersonalDetails(props) {
  const [consumerDemographics, setConsumerDemographics] = React.useState([]);
  const [consumerAlias, setConsumerAlias] = React.useState([]);

  React.useEffect(() => {
    if (props.consumerDemographics.length > 0) {
      setConsumerDemographics(props.consumerDemographics);
    }
  }, [props.consumerDemographics]);

  React.useEffect(() => {
    let modifiedAlias = [];
    if (props?.aliasData?.length > 0) {
      props.aliasData.length > 0 &&
        props.aliasData.forEach((alias) => {
          props?.aliasTypes?.forEach((type) => {
            if (alias.typeId == type.id) {
              props.aliasData.typeId = type.displayName;
              modifiedAlias.push({ ...alias, typeId: type.description + ' (' + type.code + ')' });
            }
          });
        });
    }
    setConsumerAlias(modifiedAlias);
  }, [props.aliasData, props.aliasTypes]);



  React.useEffect(() => {
    if (props.deceasedInfo.length > 0) {
      getState();
      props.deceasedInfo[0].deceased = 'Yes';
      props.deceasedInfo[0].caseNumber = props.deceasedInfo[0].courtInformation.caseNumber ?? '';
      props.deceasedInfo[0].fileDate = props.deceasedInfo[0].courtInformation.fileDate ?? '';

    }
  }, [props.deceasedInfo, props.statesData]);


  const getState = () => {
    props.statesData.length > 0 &&
      props.statesData.forEach((st) => {
        if (props.deceasedInfo[0].stateRefId == st.id) {
          props.deceasedInfo[0].stateRefId = st.code;
        }
        if (props.deceasedInfo[0].executor.stateRefId == st.id) {
          props.deceasedInfo[0].executor.stateRefId = st.code;
        }
        if (props.deceasedInfo[0].courtInformation.stateRefId == st.id) {
          props.deceasedInfo[0].courtInformation.stateRefId = st.code;
        }
      });
  };

  React.useEffect(() => {
    let modifiedAddress = [];
    props.consumerDemographics.forEach((demographics) => {
      if (demographics.languageReferenceId !== null) {
        props.preferedLanguages.forEach((langugage) => {
          if (langugage.id == demographics.languageReferenceId) {
            modifiedAddress.push({ ...demographics, languageReferenceId: langugage.name });
          }
        });
      } else {
        props.preferedLanguages.filter((language) => {
          if (language.isDefault) {
            modifiedAddress.push({ ...demographics, languageReferenceId: language.name });
          }
        });
      }
    });
    if (modifiedAddress.length > 0) {
      setConsumerDemographics(modifiedAddress);
    }
  }, [props.consumerDemographics]);

  const styles = useStyles();

  const handleVerifyConsumer = (event) => {
    props.CONSUMERVERIFICATION(false);
    props.CONSUMERSKIPVERIFICATION(false);
    scrollTop();
  };

  return (
    <>
      <Grid container sx={{ padding: '0px 24px 24px'}}>
        {restructureArray(consumerDemographics, consumerDemoData).map((consumerDemographicsData) =>
          consumerDemoData.map((data, index) => {
            return (
              <Grid item xs={4} key={`consumer_${index+1}`} className={styles.individualGridStyle}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>
                  {data.accessor == 'fullName'
                    ? `${consumerDemographicsData['firstName'] ?? ''} ${
                        consumerDemographicsData['middleName'] ?? ''
                      } ${consumerDemographicsData['lastName']}`
                    : consumerDemographicsData[data.accessor]}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
      {consumerAlias.length > 0 && (
        <ViewAlias consumerAlias={consumerAlias} consumerAliasData={consumerAliasData} />
      )}
      {props.consumerSkipVerification && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0px 24px 24px'            
          }}>
          <MuiButton
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
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    preferedLanguages: state.StaticDataReducer.preferedLanguages,
    deceasedInfo: state.ConsumerDetailsReducer.deceasedInfo,
    statesData: state.StaticDataReducer.getstates,
    aliasData: state.ConsumerDetailsReducer.aliasData,
    aliasTypes: state.ConsumerDetailsReducer.aliasTypes,
    deceasedInfoOriginal: state.ConsumerDetailsReducer.deceasedInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CONSUMERVERIFICATION: async (value) => {
      await dispatch(CONSUMERVERIFICATION(value));
    },
    CONSUMERSKIPVERIFICATION: async (value) => {
      await dispatch(CONSUMERSKIPVERIFICATION(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
