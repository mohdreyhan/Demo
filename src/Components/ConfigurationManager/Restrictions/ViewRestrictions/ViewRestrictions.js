import React from 'react';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders, PositionedMenuEditItems } from './ViewRestrictions.Data';
import { addingDays } from '../../../Common/commonfunctions';
import './ViewRestrictions.css';

const ViewRestrictions = (props) => {
  const [restrictionsData, setRestrictionsData] = React.useState([]);

  const restructureList = (list) => {
    const newList = addingDays(list, ['deliveryDays', 'validationPeriodWaitDays'], 'Day');
    return newList.map((item) => {
      let temp = Object.assign({}, item);
      temp.actions =
        temp.status == 'active' || 'default'
          ? PositionedMenuEditItems?.['edit'].map((item) => item.label)
          : PositionedMenuEditItems?.['view'].map((item) => item.label);
      return temp;
    });
  };

  React.useEffect(() => {
    setRestrictionsData(restructureList(props.restrictionsData));
  }, [props.restrictionsData]);

  return (
    <DynamicTable
      headers={TableHeaders}
      rows={restrictionsData}
      showActions={true}
      showPaging={false}
      actions={props.actions}
      onRowAction={props.handleClick}
    />
  );
};

export default ViewRestrictions;
