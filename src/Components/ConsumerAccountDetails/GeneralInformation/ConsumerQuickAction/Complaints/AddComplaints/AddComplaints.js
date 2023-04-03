import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddComplaintFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddComplaints.data.js';
import { ADDCOMPLAINTS } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import {validateError, validateHelperText, handleOptionsData} from '../../../../../Common/commonfunctions.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';

function AddComplaints(props) {

  const [addComplaintInputs, setAddComplaintInputs] = React.useState({});
  const [formData, setFormData] = React.useState([]); 
  const [errorValue, setError] = React.useState([]);
  const [DialogDataFooterData , setDialogDataFooterData] = React.useState(dialogDataFooter);

  const handleDisabled = ()=>{
    let footerValue = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton')
      {footerData.disabled = true;
     return footerData;}
      else { return { ...footerData }; } });
     setDialogDataFooterData(footerValue);
  }

  React.useEffect(()=>{
    let footerValues = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton')
      {footerData.disabled = false;
     return footerData;}
      else { return { ...footerData }; } });
     setDialogDataFooterData(footerValues);
  },[])

  React.useEffect(() => {
    const arr = handleOptionsData(AddComplaintFormData, 'reasonId', props.complaintTypes);
    setFormData(arr);
  }, [props.complaintTypes]);

   const handleChange = (event) => {
    const obj = {
      ...addComplaintInputs,
      [event.target.name]: event.target.value
    };

    setAddComplaintInputs(obj);
};

const validateRequiredFields = (data, errorArr) => {
 
  if (data.required) {
    if (
      (data.type == 'select' || data.type == 'date' ) &&
      (addComplaintInputs[data.accessor] == null ||
        addComplaintInputs[data.accessor] == undefined)
    ) {
      recordErrors(data, errorArr);
    }
  }
};

const recordErrors = (data, errorArr) => {
  errorArr.push({
    fieldName: data.name,
    text: `Please enter ${data.label}`
  });
};
const handleFormSubmit = async (event) => {
  event.preventDefault();
  let errorArr = [];
  AddComplaintFormData.forEach((data) => {
      validateRequiredFields(data, errorArr);
    });
    setError(errorArr);
    if(errorArr.length == 0){
    handleDisabled();
    await props.ADDCOMPLAINTS(
    [addComplaintInputs],
    localStorage.getItem('customerId'),
    localStorage.getItem('responsibleId'),
    props.handleDialog,
    props.showDialog,
    props.navigateToGenInfo);
    }
};
return (
  <>
    <PopUp
      showDialog={props.showDialog}
      handleDialog={props.handleDialog}
      dialogDataHeader={dialogDataHeader}
      dialogStructureHeader={dialogStructureHeader}
      dialogDataFooter={DialogDataFooterData}
      dialogStructureFooter={dialogStructureFooter}
      formName="addComplaint">
      <AddComplaintForm
        AddComplaintFormData={formData}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
        errorValue={errorValue}
      />
    </PopUp>
  </>
);
}
const AddComplaintForm = (props) => {
    return (
      <form
        id="addComplaint"
        onSubmit={(event) => props.handleFormSubmit(event)}
        novalidate="novalidate">
        <Grid container>
            {props.AddComplaintFormData &&
            props.AddComplaintFormData.map((data) => {
              return (
                <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '16px' }}>
                  {renderLabel(data)}
                  {data.type == 'select' && (
                    <SelectButton data={data} captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    validateError={validateError}
                  validateHelperText={validateHelperText} />
                  )}
                  {data.type == 'date' && (
                    <ResponsiveDatePicker 
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    validateError={validateError}
                  validateHelperText={validateHelperText}
                     />
                  )}
                   {data.type == 'radio' && (
                    <RadioButtonGroup data={data} captureInputs={props.handleChange} />
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
      complaintTypes: state.StaticDataReducer.complaintTypes
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      ADDCOMPLAINTS: async (
        addComplaintInputs,
        customerId,
        responsibleId,
        handleDialog,
        showDialog,
        navigateToGenInfo,
      ) => {
        await dispatch(
          ADDCOMPLAINTS(addComplaintInputs, customerId,
             responsibleId, handleDialog, showDialog,navigateToGenInfo,
             )
        );
      }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AddComplaints);