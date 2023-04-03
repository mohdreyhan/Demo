import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddIncarceratedFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddIncarceration.Data.js';
import { ADDINCARCERATION } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators'
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';

function AddIncarceration(props) {
  const formRef = React.useRef();
  const [addincarInputs, setaddincarInputs] = React.useState({});

  const handleChange = (event) => {
    const obj = {
      ...addincarInputs,
      [event.target.name]: event.target.value
    };
    setaddincarInputs(obj)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef
    //NOSONAR
    await props.ADDINCARCERATION(
      form,
      addincarInputs,
      localStorage.getItem('customerId'),
      props.handleDialog,
      props.showDialog,
      props.navigateToGenInfo,
    );
  };

  return (
    <>
      <PopUp
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="addIncarceration">
        <AddAddressForm
          AddIncarceratedFormData={AddIncarceratedFormData}
          formRef={formRef}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </PopUp>
    </>
  );
}

const AddAddressForm = (props) => {

   return (
    <form
      id="addIncarceration"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container sx={{ marginTop: '-15px' }}>
        {props.AddIncarceratedFormData &&
          props.AddIncarceratedFormData.map((data) => {
            return (
              <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }}>
                {renderLabel(data)}
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.handleChange}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleChange}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    captureInputs={props.handleChange}
                  />
                )}
              </Grid>
            );
          })}
      </Grid>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    incarceratedInformation: state.ConsumerQuickActionsReducer.incarceratedInformation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDINCARCERATION: async (form, addincarInputs, customerId, handleDialog, showDialog,navigateToGenInfo) => {
      await dispatch(
        ADDINCARCERATION(form, addincarInputs, customerId, handleDialog, showDialog,navigateToGenInfo)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncarceration);
