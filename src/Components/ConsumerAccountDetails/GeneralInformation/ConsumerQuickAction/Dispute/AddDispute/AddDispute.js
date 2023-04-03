import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddDisputeFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddDispute.Data.js';
import { ADDDISPUTE } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import { handleOptionsData } from '../../../../../Common/commonfunctions.js';

function AddDispute(props) {
  const [addDisputeInputs, setAddDisputeInputs] = React.useState({});
  const [formData, setFormData] = React.useState([]);

  React.useEffect(() => {
    const arr = handleOptionsData(AddDisputeFormData, 'reasonId', props.disputeReasons);
    setFormData(arr);
  }, [props.disputeReasons]);

  const handleChange = (event) => {
    const obj = {
      ...addDisputeInputs,
      [event.target.name]: event.target.value
    };
    setAddDisputeInputs(obj);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    delete addDisputeInputs.isDisputed;
    await props.ADDDISPUTE(
      addDisputeInputs,
      localStorage.getItem('customerId'),
      localStorage.getItem('responsibleId'),
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
        formName="addDispute">
        <AddDisputeForm
          AddDisputeFormData={formData}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </PopUp>
    </>
  );
}

const AddDisputeForm = (props) => {
  return (
    <form
      id="addDispute"
      onSubmit={(event) => props.handleFormSubmit(event)}
      novalidate="novalidate">
      <Grid container>
        {props.AddDisputeFormData &&
          props.AddDisputeFormData.map((data) => {
            return (
              <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '16px' }}>
                {renderLabel(data)}
                {data.type == 'radio' && (
                  <RadioButtonGroup data={data} captureInputs={props.handleChange} />
                )}
                {data.type == 'select' && (
                  <SelectButton data={data} captureInputs={props.handleChange} />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker data={data} captureInputs={props.handleChange} />
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
    disputeReasons: state.StaticDataReducer.disputeReasons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDDISPUTE: async (
      addDisputeInputs,
      customerId,
      responsibleId,
      handleDialog,
      showDialog,
      navigateToGenInfo,
    ) => {
      await dispatch(
        ADDDISPUTE(addDisputeInputs, customerId, responsibleId, handleDialog, showDialog,navigateToGenInfo)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDispute);
