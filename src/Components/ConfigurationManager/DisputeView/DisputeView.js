import * as React from 'react';
import { connect } from 'react-redux';
import { Box, Paper, Grid, Typography, Loader, DynamicTable } from '@oasis/react-core';
import { TableHeaders } from './DisputeView.Data';
import { ColorPallete } from '../../../theme/ColorPallete';
import { GETDISPUTEREASON } from '../../../Actions/StaticData/ActionCreators';
import connect_without_contact from '../../../../Icons/connect_without_contact.png';

function DisputeView(props) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    props.GETDISPUTEREASON();
    setTimeout(() => setLoading(false), 100);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} elevation={10}>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            padding: '0px 24px'
          }}>
          <Grid
            sx={{
              display: 'flex',
              borderBottom: '1px solid',
              borderBottomColor: ColorPallete.Border.Primary,
              height: '60px',
              width: '100%',
              alignItems: 'center'
            }}>
            <Grid item sx={{ display: 'flex' }}>
              <img src={connect_without_contact} />
            </Grid>
            <Grid item sx={{ display: 'flex' }}>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  paddingLeft: '8px',
                  color: ColorPallete.Text.Primary,
                  width: '100%'
                }}>
                Dispute
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <DynamicTable
            headers={TableHeaders}
            rows={props.disputeReasons}
            showActions={false}
            showPaging={false}
            showFilter={false}
          />
      </Paper>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    disputeReasons: state.StaticDataReducer.disputeReasons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETDISPUTEREASON: async () => {
      await dispatch(GETDISPUTEREASON());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisputeView);
