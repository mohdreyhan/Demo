import React from 'react';
import { DynamicTable, Paper, Button, Stack, Loader } from '@oasis/react-core';
import {
  PositionedMenuEditItemsActivate,
  PositionedMenuEditItemsDeactivate
} from '../CallWrapUp.Data';
import { TableHeaders } from './CallWrapUpView.Data';
import { ColorPallete } from '../../../../theme/ColorPallete';
import WarningAmber from '../../../../../Icons/WarningAmberEllipse.svg';
import { connect } from 'react-redux';
import { GETCALLWRAPUPDATA, GETCALLMETHODS } from '../../../../Actions/StaticData/ActionCreators';

function ViewAlert(props) {
  const [loading, setLoading] = React.useState(true);
  const [callWrapUpData, setData] = React.useState([]);

  const showEmptyTile = (type) => {
    return (
      <>
        <img height="132px" src={WarningAmber} width="132px" marginBottom="24px" />

        <div
          style={{
            color: ColorPallete.Button.Primary,
            fontSize: '20px',
            marginBottom: '28px'
          }}>{`There are no  ${type} created.`}</div>
        <Button
          style={{
            backgroundColor: ColorPallete.Button.Primary,
            color: ColorPallete.Color.White
          }}
          variant="outlined"
          onClick={() => props.handleDialog(!props.showDialog, 'addAlert')}>
          {`Add New Call Outcomes`}
        </Button>
      </>
    );
  };

  React.useEffect(() => {
    setLoading(true);
    props.GETCALLWRAPUPDATA();
    props.GETCALLMETHODS();
  }, []);

  React.useEffect(() => {
    if (props.callWrapUpData.length > 0) {
      setLoading(false);
      const wrapupData = props.callWrapUpData?.map((p) => {
        if (p.active) {
          p.actions = PositionedMenuEditItemsActivate.map((item) => item.label);
        } else {
          p.actions = PositionedMenuEditItemsDeactivate.map((item) => item.label);
        }
        p.data = props.data;
        const callmethods = p.methods.map(
          (pm) => props.callMethodsData.find((pc) => pc.id === pm.id)?.name
        );
        return {
          ...p,
          callmethods: callmethods != '' && callmethods != ' ' ? callmethods.toString() : 'NA',
          description:
            p.description == 'null' || p.description == '' || p.description == ' '
              ? 'NA'
              : p.description
        };
      });

      setData(wrapupData);
    }
  }, [props.callWrapUpData, props.callMethodsData]);

  if (loading) {
    return <Loader />;
  }
  if (props?.callWrapUpData?.length > 0) {
    return (
      <DynamicTable
        headers={TableHeaders}
        rows={callWrapUpData}
        showActions={true}
        actions={props.actions}
        onRowAction={props.handleClick}
        showPaging={false}
      />
    );
  }
  return (
    <Paper
      style={{
        padding: '50px',
        height: '347px',
        display: 'grid',
        alignItems: 'center'
      }}>
      <Stack sx={{ alignItems: 'center' }}>{showEmptyTile('call dispositions')}</Stack>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    callWrapUpData: state.StaticDataReducer.callWrapUpData,
    callMethodsData: state.StaticDataReducer.callMethodsData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETCALLWRAPUPDATA: async () => {
      await dispatch(GETCALLWRAPUPDATA());
    },
    GETCALLMETHODS: async () => {
      await dispatch(GETCALLMETHODS());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAlert);
