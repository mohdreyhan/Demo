import React from 'react';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders, menuOptions } from './ViewCustomField.data';
import './dynamicTable.css';
// import moreVerticalDots from '../../../../../Icons/MoreVertical.png'
const ViewCustomField = (props) => {
  const [customFieldData, setCustomFieldData] = React.useState([]);

  const restructureData = (data) => {
    return data.map((e) => {
      let temp = Object.assign({}, e);
      temp.actions = menuOptions['edit'];
      return temp;
    });
  };

  const modifyData = (tempArray, arrayData)=> {
if(arrayData.length>0)
{
   //const moreIcon = <img src={moreVerticalDots} style = {{height: '21px',marginTop: '15px'}} />
  arrayData.map((data)=> {
    tempArray.push({...data,
      // moreIcon:moreIcon,
      locationName: data.location.locationName,
      dataType: data.dataType.dataType,
      groupName: data.group.groupName})
  })
}
setCustomFieldData(tempArray);
  }

  React.useEffect(() => {
    const temp = [];
    modifyData(temp, props.customFieldsData)
  }, [props.customFieldsData]);

  return (
    <DynamicTable
      headers={TableHeaders}
      rows={restructureData(customFieldData)}
      showActions={true}
      showPaging={false}
    />
  );
};

export default ViewCustomField;
