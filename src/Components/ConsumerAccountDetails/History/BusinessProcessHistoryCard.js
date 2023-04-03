import { Grid, Box, Typography, MuiButton } from '@oasis/react-core';
import { ColorPallete } from '../../../theme/ColorPallete';
import { extractImagePath, nestedIfCaseHandle } from '../../Common/commonfunctions';
import { Status } from './AccountHistory.Data';
import StatusLabel from './ContactHistory/StatusLabel';

const BusinessProcessHistoryCard = (props) => {
  const { data, handleOnClick } = props;
  return (
    <Box
      component="div"
      sx={{
        minHeight: '80px',
        flexGrow: 1,
        border: '1px solid #E0E0DF',
        boxShadow: '2px 2px 7px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        mt: 1
      }}>
      <Grid
        container
        spacing={2}
        sx={{
          padding: '0px !important',
          margin: '0px'
        }}>
        <Grid
          item
          sx={{
            padding: '0px !important',
            margin: '0px',
            width: '32px'
          }}>
          <Typography
            sx={{
              backgroundColor: ColorPallete.Color.LightBlue,
              color: ColorPallete.Color.White,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRadius: '4px 0px 0px 4px'
            }}>
            <img style={{ width: '50%' }} src={extractImagePath('account_tree_white.png')} />
          </Typography>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid
            item
            xs
            container
            direction={'column'}
            sx={{ paddingRight: '16px', paddingBottom: '16px' }}>
            <Box component={'div'} sx={{ justifyContent: 'space-between', display: 'flex' }}>
              <Box>
                <Box
                  component={'label'}
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: ColorPallete.Text.Primary,
                    marginRight: '5px'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.action
                  }}></Box>
                <Box
                  component={'span'}
                  sx={{
                    fontSize: '12px',
                    color: ColorPallete.Text.Secondary
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.createdOn
                  }}></Box>
              </Box>
              <Box>
                <StatusLabel
                  key={`status_${data.id}`}
                  data={{ statusCode: data.statusCode, status: data.status }}
                />
              </Box>
            </Box>
            <Box component={'div'} sx={{ justifyContent: 'space-between', display: 'flex', mt: 1 }}>
              <Box>
                <Box
                  component={'span'}
                  sx={{
                    color: ColorPallete.Text.Primary,
                    fontSize: '14px'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `${data.responsiblePartyName}`
                  }}></Box>
              </Box>
              <Box
                sx={{
                  color: ColorPallete.Text.Secondary,
                  fontSize: '12px'
                }}
                dangerouslySetInnerHTML={{
                  __html: `Completed By: ${data.agentName}`
                }}></Box>
            </Box>
            <Box component={'div'} sx={{ justifyContent: 'space-between', display: 'flex', mt: 1 }}>
              <Box>
                <Box
                  component={'span'}
                  sx={{
                    color: ColorPallete.Text.Primary,
                    fontSize: '14px',
                    marginRight: '5px',
                    fontWeight: '700',
                    lineHeight: '18px'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: data.businessName
                  }}></Box>
              </Box>
            </Box>
            {data?.formNameLabel ? (
              <>
                <Box
                  component={'div'}
                  sx={{ justifyContent: 'flex-start', display: 'flex', mt: 1, ml: 2 }}>
                  <Box
                    component={'span'}
                    sx={{
                      color: ColorPallete.Text.Primary,
                      fontSize: '12px',
                      marginRight: '5px',
                      fontWeight: '700'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${data?.formNameLabel}`
                    }}></Box>
                  <Box
                    component={'span'}
                    sx={{
                      color: ColorPallete.Text.Primary,
                      fontSize: '12px'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${data?.formName}`
                    }}></Box>
                </Box>

                <Box
                  component={'div'}
                  sx={{ justifyContent: 'flex-start', display: 'flex', mt: 1, ml: 2 }}>
                  <Box
                    component={'span'}
                    sx={{
                      color: ColorPallete.Text.Primary,
                      fontSize: '12px',
                      marginRight: '5px',
                      fontWeight: '700'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${data?.formStatusLabel}`
                    }}></Box>
                  <StatusLabel
                    key={`status_${data.id}`}
                    data={{ statusCode: data.formStatusCode, status: data.formStatus }}
                  />
                </Box>
                <Box
                  component={'div'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center !important',
                    justifyContent: 'flex-end'
                  }}>
                  {data.allowClick && (
                    <MuiButton
                      variant="outlined"
                      style={{
                        textTransform: 'none',
                        padding: '2px 4px'
                      }}
                      onClick={handleOnClick}>
                      <div
                        style={{
                          color: ColorPallete.Button.Secondary,
                          fontSize: '14px',
                          fontWeight: 400
                        }}>
                        {nestedIfCaseHandle(
                          data.formStatusCode == Status.pending,
                          'Update Business Process',
                          'View Details'
                        )}
                      </div>
                    </MuiButton>
                  )}
                </Box>
              </>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessProcessHistoryCard;
