import React from 'react';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders, menuOptions } from './ViewStatusPrioritization.Data';

const ViewStatusPrioritization = (props) => {
  const [statusCodeData, setStatusCodeData] = React.useState([]);

  const restructureData = (data) => {
    return data.map((e) => {
      let temp = Object.assign({}, e);
      temp.actions = menuOptions['edit'];
      return temp;
    });
  };

  React.useEffect(() => {
    setStatusCodeData(props.statusCodeData);
  }, [props.statusCodeData]);

  return (
    <DynamicTable
      headers={TableHeaders}
      rows={restructureData(statusCodeData)}
      showActions={true}
      showPaging={false}
    />
  );
};

export default ViewStatusPrioritization;
