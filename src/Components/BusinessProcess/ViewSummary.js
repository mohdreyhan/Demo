import { Box, Grid } from '@oasis/react-core';
import React from 'react';
import useStyles from '../../Styles/BusinessProcessStyle';
import { ColorPallete } from '../../theme/ColorPallete';
import { convertTimestamptoUSA, nestedIfCaseHandle } from '../Common/commonfunctions';

export default function ViewSummary(props) {
  const classes = useStyles();
  return (
    <div
      key={`viewSummary`}
      style={{
        paddingRight: '10px',
        height: '70vh',
        overflowY: 'auto',
        paddingLeft: '10px',
        paddingBottom: '10px'
      }}>
      {props?.viewSummaryData?.map((viewSummary) => {       
        let groups = viewSummary.groups;
        return (
          <div key={`${viewSummary.name}`}>
            <Grid container sx={{ p: 0 }}>
              <Grid item xs={12}>
                <Box component="div" className={classes.formName}>
                  {viewSummary?.name}
                </Box>
              </Grid>
            </Grid>
            {groups?.map((group) => {
              let counter = 0;
              return (
                <div
                  key={`process_${group?.displayOrder}_${group?.id}`}
                  style={{ marginTop: '15px', marginBottom: '10px' }}>
                  <Grid container sx={{ p: 0 }}>
                    <Grid item xs={12}>
                      <Box component="div" className={classes.groupName}>
                        {group?.header}
                      </Box>
                    </Grid>
                  </Grid>

                  {group?.questions?.length > 0 &&
                    group?.questions?.map((question) => {
                      if (question.answerType !== 'HideField') {
                        counter++;
                        return (
                          <div key={`loop_${question.id}`}>
                            <Grid item xs={12} style={{ marginTop: '15px' }}>
                              <Box
                                component="div"
                                style={{
                                  fontSize: '12px',
                                  color: `${ColorPallete.Text.Primary}`
                                }}>
                                <div
                                  style={{ display: 'inline' }}
                                  dangerouslySetInnerHTML={{
                                    __html: `Q${counter}: ${question.questionText}`
                                  }}></div>
                              </Box>
                              <Box
                                component="div"
                                style={{
                                  marginTop: '5px',
                                  fontWeight: '400',
                                  color: `${ColorPallete.Color.Black}`
                                }}>
                                {nestedIfCaseHandle(
                                  question?.dataType === 'Date',
                                  question.answer,
                                  false
                                )
                                  ? convertTimestamptoUSA(`${question.answer}`)
                                  : `${nestedIfCaseHandle(
                                      question.answer.length,
                                      question.answer,
                                      '-'
                                    )}`}
                              </Box>
                            </Grid>
                          </div>
                        );
                      }
                    })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
