import * as React from 'react';
import { connect } from 'react-redux';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders } from './ViewAddress.Data';
import { ApiServices } from '@oasis/js-data';
import { validateResponse, capitalizeFirstLetter } from '@oasis/js-utils';
import { restructureArray } from '../../../../../Common/restructureData.js';

const ViewAddress = (props) => {
  const { menuItems, data } = props;
  const [addressList, setaddressList] = React.useState([]);

  const modifyAddress = (modifiedAddress) => {
    modifiedAddress.forEach((address) => {
      if (address.address2) {
        address.address = address.address1 + ' ' + address.address2;
        return address.address;
      } else {
        address.address = address.address1;
        return address.address;
      }
    });
  };

  const modifyDefault = (modifiedAddress) => {
    modifiedAddress.forEach((address) => {
      if (address.isDefault === true ) {
        address.isDefault = 'Yes';
        return address.isDefault;
      } else {
        address.isDefault = 'No';
        return address.isDefault;
      }
    });
  };

  const modifyCountry = (modifiedAddress) => {
    modifiedAddress.forEach((address) =>
      props.countriesData.forEach((country) => {
        if (address.countryCode == country.id) {
          address.countryCode = country.name;
          return address.countryCode;
        }
      })
    );
  };

  const modifyComaker = (modifiedAddress) => {
    modifiedAddress.forEach((address) => {
      if (address.source && address.source.toLowerCase() !== 'comaker') {
        address.source = capitalizeFirstLetter(address.source.toLowerCase());
      } else if (address.source && address.source.toLowerCase() == 'comaker') {
        address.source = 'Co-Maker';
      }
      return address.source;
    });
  };

  const modifySource = (modifiedAddress) => {
    modifiedAddress.forEach((address) => {
      props.consumerDemographicSource?.forEach((type) => {
        if (type.id == address.sourceRefId) {
          address.source = type.source;
        }
      });
      //// SET ROW ACTIONS
      address.actions = menuItems;
      address.data = data;
    });
  };
  

  const modifyState = (modifiedAddress) => {
    if (modifiedAddress.length > 0) {
      modifiedAddress.forEach(async (address) => {
        if (address.countryCode) {
          const apiResponse = await ApiServices('static-data').get(`/states/${address.stateCode}`);
          const validatedResponse = validateResponse(apiResponse);
          if (apiResponse?.status === 200 && validatedResponse) {
            address.stateCode = validatedResponse.code;
            return address.stateCode;
          }
        }
      });
    }
  };
  React.useEffect(() => {
    if (props.addressData?.length > 0) {
      ////////////// MODIFY TYPES
      let modifiedAddress = [];

      restructureArray(props.addressData, TableHeaders, true).forEach((address) =>
        props.addressTypes.forEach((type) => {
          if (type.id == address.typeId) {
            modifiedAddress.push({
              ...address,
              typeId: type.name.replace('Address', '')
            });
          }
        })
      );
      //// MODIFY ADDRESS
      modifyAddress(modifiedAddress);

      ////// MODIFY STATE
      modifyState(modifiedAddress);
      ///////MODIFY COUNTRY
      modifyCountry(modifiedAddress);

      ///////MODIFY DEMOGRAPHIC CONSUMER SOURCE
      modifySource(modifiedAddress);

      ///////MODIFY COMAKER
      modifyComaker(modifiedAddress);

      //// MODIFY Default
      modifyDefault(modifiedAddress);

      ////SET ACTIONS

      ////SET MODIFIED ADDRESS IN STATE
      setTimeout(() => {
        setaddressList(modifiedAddress);
      }, 1000);
    } else {
      setaddressList([]);
    }
  }, [props.addressData]);
  
  let headerLength = TableHeaders.length;

  if (!(props.consumerSkipVerification || props.consumerVerification)) {
    const style = {
      header: {
        right: 'unset',
        paddingLeft: '0px',
        zIndex: 0
      }
    };
    TableHeaders[headerLength - 1].style = style;
  } else {
    delete TableHeaders[headerLength - 1].style;
  }

  return (
    <>
      <DynamicTable
        headers={TableHeaders}
        rows={addressList}
        showActions={props.consumerSkipVerification || props.consumerVerification ? true : false}
        actions={props.actions}
        onRowAction={props.handleClick}
        showPaging={false}
        showFilter={props.consumerSkipVerification || props.consumerVerification ? true : false}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    addressData: state.ContactInfoReducer.addressData,
    addressTypes: state.ContactInfoReducer.addressTypes,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.statesData,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}

export default connect(mapStateToProps, null)(ViewAddress);
