import React, { useEffect, useState } from 'react';
import useHomeStyles from '../../Home.styles';
import { connect } from 'react-redux';
import  CallView  from './Dashboard/CallView.js';
import TopMenu from '../TopSubMenu/TopSubMenu';
import WelcomeDash from './Dashboard/Welcomedash';
import QueueViewComponent from './Dashboard/QueueViewComponent'
import { capitalizeFirstLetter } from '@oasis/js-utils';
import { User } from '@oasis/js-data';

function DefaultPage(props) {
  const agentName = capitalizeFirstLetter(User.name()).split(" ")?.[0];
  const homeStyles = useHomeStyles();
  const [dataList , setdataList] = useState([]);

  useEffect(() => {
    if (props.kpiCallWrapdata.length > 0) {
      const callwrapList = props.kpiCallWrapdata.map(({ inbound, outbound }) => {
        const newArr = [];
        if (outbound) {
          newArr.push({ key: 1, name: 'OUTBOUND CALLS', value: outbound.completed });
        }
        if (inbound) {
          newArr.push({ key: 2, name: 'INBOUND CALLS', value: inbound.completed });
        }
        return newArr;
      });
      if (callwrapList.length !== dataList.length) {
        setdataList(...callwrapList);
      }
    }
  }, [props.kpiCallWrapdata, dataList.length]);


  return (
    <div className={homeStyles.MainLayout}>
      <TopMenu/>
       <WelcomeDash value={agentName}/>
       <div style={{display: 'flex'}}>
      {dataList.map((data)=>
        [<>
        <div style={{
          marginLeft: '8px',
          marginRight: '8px',
          marginTop: '12px'}}>
            <CallView name={data.name} value={data.value}/>
        </div>
        </>]
      )}
       </div>
       <div style={{ marginLeft: '8px',
          marginRight: '8px', marginTop: '15px'}}>
       <QueueViewComponent/>
       </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    searchConsumer: state.ConsumerDetailsReducer.searchConsumer,
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData,
    kpiCallWrapdata: state.ConsumerDetailsReducer.kpiCallWrapdata
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETCONSUMERPERSONALINFO: async (responsibleId) => {
      await dispatch(GETCONSUMERPERSONALINFO(responsibleId));
    },
    GETSEARCHCONSUMERDATA: async (searchKey, searchMethod) => {
      await dispatch(GETSEARCHCONSUMERDATA(searchKey, searchMethod));
    },
    CONSUMERVERIFICATION: async (value) => {
      await dispatch(CONSUMERVERIFICATION(value));
    },
    CONSUMERSKIPVERIFICATION: async (value) => {
      await dispatch(CONSUMERSKIPVERIFICATION(value));
    },
    CURRENTACCOUNTNUMBER: async (value) => {
      await dispatch(CURRENTACCOUNTNUMBER(value));
    },
    GETRELATIONSHIPTYPESDATA: async () => {
      await dispatch(GETRELATIONSHIPTYPESDATA());
    },
    ALERT_LIST_ALL: async () => {
      await dispatch(ALERT_LIST_ALL({}));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
