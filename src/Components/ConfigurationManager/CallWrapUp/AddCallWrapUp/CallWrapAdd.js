import * as React from 'react';
import { Grid, TextField, FormControl } from '@mui/material';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddAlertFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './CallWrapData';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { connect } from 'react-redux';
import { CALLWRAPUPINPUTS } from '../../../../Actions/StaticData/Actions';
import RadioButtonGroup from '../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import MultiSelectBox from '../../../Common/AEComponents/MultiSelect/MultiSelectBox';
import { ADDCALLWRAPUPDATA } from '../../../../Actions/StaticData/ActionCreators';

function AddCallWrapUp(props) {
  const formRef = React.useRef();
  const [count, setCount] = React.useState(0);
  const formData = [];
  const [errorText, setErrorText] = React.useState({});
  const [inputValue, setInputValue] = React.useState({
    description: '',
    radio: true
  });
  const [errorValue, setError] = React.useState([null]);
  const [multiSelectError, setMultiSelectError] = React.useState('');
  const [callWrapUpType, setCallWrapUpType] = React.useState([]);

  React.useEffect(() => {
    setInputValue(props.addCallWrapUpInputs);
  }, [props.addCallWrapUpInputs]);

  React.useEffect(() => {
    setError('');
    setCount(0);
    setMultiSelectError('');
    setCallWrapUpType([]);
  }, [props.showDialog]);

  const handleCount = (e) => {
    setCount(e.target.value.length);
    setError('');
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let internalArr = [];
    let validInput = true;
    const form = formRef;

    inputValue.description = inputValue.description?.trim();
    const dublicateData = props.callWrapUpData.some(
      (val) => val.description.toLowerCase().trim() === inputValue.description.toLowerCase().trim()
    );
    if (!count || count > 20 || inputValue.description?.trim() === '' || dublicateData) {
      internalArr.push('description');
      const descError =
        count > 20
          ? 'Call wrap-up description length is more than 20'
          : 'Please enter call wrap-up description';
      setErrorText({
        fieldName: 'description',
        text: dublicateData ? 'Call wrap-up description already exist' : descError
      });
      validInput = false;
      setError(internalArr);
    }
    if (callWrapUpType.length === 0) {
      setMultiSelectError('Please select call wrap-up method');
      validInput = false;
    }

    if (validInput) {
      const dataToSave = {
        description: inputValue.description,
        active: inputValue.radio,
        methods: callWrapUpType.map((c) => {
          return {
            id: c.value
          };
        })
      };

      props.ADDCALLWRAPUPDATA(form, dataToSave, props.handleDialog, props.showDialog);
    }
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
        formName="addAlertForm">
        <AddAlertForm
          AddAlertFormData={formData}
          CALLWRAPUPINPUTS={props.CALLWRAPUPINPUTS}
          CALLWRAPUPTYPES={props.callMethodsData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          errorText={errorText}
          handleCount={handleCount}
          count={count}
          callWrapUpType={callWrapUpType}
          multiSelectError={multiSelectError}
          setMultiSelectError={setMultiSelectError}
          setCallWrapUpType={setCallWrapUpType}
        />
      </PopUp>
    </>
  );
}
const AddAlertForm = (props) => {
  const validateHelperText = (data, errorValue) => {
    let value;
    if (errorValue?.length > 0) {
      errorValue.forEach((error) => {
        if (error.fieldName == data.name) {
          value = error.text;
        }
      });
    }
    return value;
  };
  return (
    <form
      id="addAlertForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {React.Children.toArray(
          AddAlertFormData.map((data) => {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${data.accessor}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}
                  {data.required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
                </div>
                <div>
                  {data.type === 'input' && (
                    <FormControl required={data.required} fullWidth>
                      <TextField
                        autoFocus={true}
                        inputProps={{ maxLength: 50 }}
                        autoComplete="off"
                        name={data.name}
                        placeholder={data.placeholder ?? ''}
                        size={data.size ?? ''}
                        disabled={data.disabled ?? false}
                        onChange={props.CALLWRAPUPINPUTS}
                        onInput={props.handleCount}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '6px 8px 5px 8px'
                          },
                          input: {
                            '& ::placeholder': {
                              textOverflow: 'ellipsis !important',
                              color: ColorPallete.Text.Secondary
                            }
                          }
                        }}
                        style={{
                          backgroundColor: data.disabled ? ColorPallete.Button.Tertiary : '',
                          padding: '2px 0px 0px 2px !important'
                        }}
                        error={props.errorValue?.length > 0}
                        helperText={
                          data.required &&
                          props.errorValue?.length > 0 &&
                          props.errorValue?.includes(data.name)
                            ? props.errorText.text
                            : ''
                        }
                      />
                    </FormControl>
                  )}
                  {data.type == 'radio' && (
                    <RadioButtonGroup
                      data={data}
                      captureInputs={props.CALLWRAPUPINPUTS}
                      validateHelperText={validateHelperText}
                    />
                  )}
                  {data.type == 'multiSelect' && (
                    <MultiSelectBox
                      options={props.CALLWRAPUPTYPES?.map((cwp) => {
                        return {
                          label: cwp.name,
                          value: cwp.id
                        };
                      })}
                      placeholder={data.placeholder}
                      labelaccessor={data.labelaccessor}
                      valueaccessor={data.valueaccessor}
                      value={props.callWrapUpType}
                      onChange={(e) => {
                        props.setCallWrapUpType(e.target.value);
                        props.setMultiSelectError('');
                      }}
                      errorMessage={props.multiSelectError}
                    />
                  )}
                </div>
                <div>
                  <span
                    style={{
                      color: ColorPallete.Text.Secondary,
                      marginTop: '10px'
                    }}></span>
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    addCallWrapUpInputs: state.StaticDataReducer.addCallWrapUpInputs,
    callWrapUpData: state.StaticDataReducer.callWrapUpData,
    callMethodsData: state.StaticDataReducer.callMethodsData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    CALLWRAPUPINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(CALLWRAPUPINPUTS(name, value));
    },
    ADDCALLWRAPUPDATA: async (form, dataToSave, handleDialog, showDialog) => {
      await dispatch(ADDCALLWRAPUPDATA(form, dataToSave, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCallWrapUp);
