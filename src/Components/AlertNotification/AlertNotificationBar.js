import React, { useState } from 'react';
import { Paper, Stack, Box, styled, WarningAmberIcon } from '@oasis/react-core';
import { ColorPallete } from '../../theme/ColorPallete';
import { connect } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: ColorPallete.Color.AlertBackground,
  fontSize: '16px',
  font: 'Poppins',
  fontStyle: 'normal !important',
  padding: theme.spacing('4px'),
  textAlign: 'center',
  color: ColorPallete.Color.White,
  alignContent: 'center',
  lineHeight: '24px',
  borderRadius: 'unset',
  height: '32px',
  marginTop: '0px !important'
}));

function AlertNotificationBar(props) {
  const [alertLists, setalertLists] = useState([]);

  React.useEffect(() => {
    let allAccountAlerts = [];
    props.alertTypes?.forEach((val) => {
      if (val.active) {
        const isAlertsAddedToAccount = props.alertlists.some((a) => a.refrenceId === val.id);
        if (isAlertsAddedToAccount) allAccountAlerts.push(val);
      }
    });
    setalertLists(allAccountAlerts);
  }, [props.alertlists, props.alertTypes]);

  return (
    <>
      {alertLists.length > 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            m: 0.7,
            backgroundColor: ColorPallete.Border.Panel,
            borderRadius: '0px!important',
            zIndex: 99,
            width: '99.2%',
            margin: 'auto',
            top: 0,
            position: 'sticky'
          }}>
          {alertLists
            ?.map(({ description, id }, index) => [
              <>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="center"
                  bgcolor={ColorPallete.Color.AlertBackground}
                  height="32px"
                  style={{ paddingButtom: '15px', margin: '4px' }}>
                  <Item key={id} sx={{ display: 'flex' }}>
                    <WarningAmberIcon sx={{ ml: '8px', mr: '8px' }} />
                    <span>{description}</span>
                  </Item>
                </Stack>
              </>
            ])
            .reverse()}
        </Box>
      ) : (
        <></>
      )}
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertNotificationBar);
