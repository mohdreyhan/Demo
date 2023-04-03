import React from 'react';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogStructureHeader,
  dialogDataFooter,
  dialogStructureFooter,
  statusFormDatas
} from './AddStatusPrioritization.Data';
import { Grid } from '@oasis/react-core';
import TextFieldComp from '../../../Common/AEComponents/TextField/TextFieldComp';
import { renderLabel } from '../../../Common/CommonFunctions/CommonFunctionForm';
import SelectButton from '../../../Common/AEComponents/DropDown/SelectButton';
import {
  addNewKey,
  handleOptionsData,
  returnValueOrDefault,
  validateError
} from '../../../Common/commonfunctions';
import { addStatusAPIcall } from '../../ApiAction';

const AddStatusPrioritization = (props) => {
  const { statusCodesRes } = props;
  const [statusFormData, setStatusFormData] = React.useState(statusFormDatas);
  const [addStatusFormInputs, setStatusFormInputs] = React.useState({});
  const [status, setStatus] = React.useState([]);
  const [errorValue, setError] = React.useState([]);

  React.useEffect(() => {
    let sortedRes = statusCodesRes;
    if (statusCodesRes.length > 0) {
      sortedRes = statusCodesRes
        ?.filter((e) => e.isActive)
        ?.sort((a, b) => {
          if (a.description < b.description) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
    }
    const newRes = addNewKey(sortedRes, 'id', 'uuid');
    const arr = handleOptionsData(statusFormData, 'statusCodeUUID', newRes);
    const newArr = arr.map((item) => {
      if (item.accessor == 'priority') {
        return {
          ...item,
          inputProps: { ...item.inputProps, max: props.tableData.numberOfPriority }
        };
      } else {
        return { ...item };
      }
    });
    setStatus(newRes);
    setStatusFormData(newArr);
    setStatusFormInputs({ priority: props.tableData.numberOfPriority });
  }, [statusCodesRes, props.tableData]);

  const handleChange = (event) => {
    const obj = {
      ...addStatusFormInputs,
      [event.target.name]: event.target.value
    };
    if (obj.statusCodeUUID) {
      status.forEach((data) => {
        if (data.id == obj.statusCodeUUID) {
          if (data.accountHolderPhaseId) {
            obj.phase = data.accounHolderPhaseName;
          } else {
            obj.phase = '';
          }
        }
      });
    }
    setStatusFormInputs(obj);
  };

  const validateRequiredFields = (data, errorArr) => {
    if (
      data.accessor == 'priority' &&
      addStatusFormInputs.priority > props.tableData.numberOfPriority
    ) {
      errorArr.push({
        fieldName: data.name,
        text: `Maximum Priority Allowable is ${props.tableData.numberOfPriority}`
      });
    }
    if (data.required) {
      if (data.accessor == 'priority' && addStatusFormInputs[data.accessor] == 0) {
        recordErrors(data, errorArr);
      }
      if (
        (data.type == 'select' || data.type == 'input') &&
        (addStatusFormInputs[data.accessor] == null ||
          addStatusFormInputs[data.accessor] == undefined ||
          ((data.accessor == 'criteriaDescription' || data.accessor == 'criteria') &&
            addStatusFormInputs[data.accessor]?.trim().length == 0))
      ) {
        recordErrors(data, errorArr);
      }
    }
  };

  const recordErrors = (data, errorArr) => {
    errorArr.push({
      fieldName: data.name,
      text: `Please ${data.type == 'select' ? 'Select' : 'Enter'} ${data.label}`
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let errorArr = [];
    statusFormData.forEach((data) => {
      validateRequiredFields(data, errorArr);
    });
    setError(errorArr);
    if (errorArr.length == 0) {
      delete addStatusFormInputs.phase;
      await addStatusAPIcall(
        addStatusFormInputs,
        props.showDialog,
        props.handleDialog,
        props.getStatusCodeData
      );
    }
  };

  return (
    <PopUp
      popupWidth={'md'}
      showDialog={props.showDialog}
      handleDialog={props.handleDialog}
      dialogDataHeader={dialogDataHeader}
      dialogStructureHeader={dialogStructureHeader}
      dialogDataFooter={dialogDataFooter}
      dialogStructureFooter={dialogStructureFooter}
      formName="addStatus">
      <AddStatusForm
        StatusFormData={statusFormData}
        addStatusFormInputs={addStatusFormInputs}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
        errorValue={errorValue}
      />
    </PopUp>
  );
};

const AddStatusForm = (props) => {
  return (
    <form
      id="addStatus"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container sx={{ marginTop: '-15px' }} rowSpacing={1}>
        {props.StatusFormData &&
          props.StatusFormData.map((data) => {
            return (
              <Grid
                item
                xs={data.xs}
                key={data.id}
                sx={{ paddingBottom: '10px' }}
                style={returnValueOrDefault(data.style, {})}>
                {renderLabel(data)}
                {data.type == 'input' && (
                  <>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChange}
                      sx={data.sx}
                      rows={data.rows}
                      multiline={data.multiline}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      editValues={props.addStatusFormInputs}
                    />
                  </>
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    validateError={validateError}
                  />
                )}
              </Grid>
            );
          })}
      </Grid>
    </form>
  );
};

export default AddStatusPrioritization;
