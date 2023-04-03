import * as React from 'react';
import { Grid, TextField, FormControl } from '@mui/material';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditAlertFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './CallWrapEdit.Data';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { connect } from 'react-redux';
import { EDITCALLWRAPUP } from '../../../../Actions/StaticData/ActionCreators';
import MultiSelectBox from '../../../Common/AEComponents/MultiSelect/MultiSelectBox';

const getHelperText = (props, data) => {
  if (data.required && props.errorValue?.length > 0 && props.errorValue?.includes(data.name)) {
    return props.errorText.text;
  }
  return '';
};

function CallWrapEdit(props) {
  const formRef = React.useRef();
  const formData = [];
  const [tableRowData, setTableRowData] = React.useState({});
  const [count, setCount] = React.useState(1);
  const [errorText, setErrorText] = React.useState({});
  const [errorValue, setError] = React.useState([null]);

  const [multiSelectError, setMultiSelectError] = React.useState('');
  const [callWrapUpType, setCallWrapUpType] = React.useState([]);

  React.useEffect(() => {
    const allTypes = props?.tableRowData?.callmethods.split(',');
    const allSelectedType = props?.callMethodsData
      .filter((c) => allTypes.includes(c.name))
      .map((d) => {
        return {
          label: d.name,
          value: d.id
        };
      });
    setCount(props?.tableRowData?.description.length);
    setCallWrapUpType([...allSelectedType]);
  }, []);

  React.useEffect(() => {
    setTableRowData(props.tableRowData);
  }, [props.tableRowData, props.callMethodsData]);

  React.useEffect(() => {
    setError('');
    setMultiSelectError('');
  }, [props.showDialog]);

  const handleCount = (e) => {
    setCount(e.target.value.length);
    setError('');
  };

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let internalArr = [];
    let validInput = true;
    const form = formRef;

    tableRowData.description = tableRowData.description?.trim();
    const dublicateData = props.callWrapUpData.some(
      (val) =>
        val.description.toLowerCase().trim() === tableRowData.description.toLowerCase().trim() &&
        val.id != props.tableRowData.id
    );
    if (tableRowData.description?.trim() === '' || dublicateData) {
      internalArr.push('description');
      setErrorText({
        fieldName: 'description',
        text: dublicateData
          ? 'Call Wrapup description already exist'
          : 'Please enter call wrap-up description'
      });
      validInput = false;
      setError(internalArr);
    }
    if (count > 20) {
      internalArr.push('description');
      setErrorText({
        fieldName: 'description',
        text: 'Call Wrapup description length is more than 20'
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
        id: tableRowData.id,
        active: tableRowData['active'],
        description: tableRowData.description,
        methods: callWrapUpType.map((c) => {
          return {
            id: c.value
          };
        })
      };

      props.EDITCALLWRAPUP(form, dataToSave, props.handleDialog, props.showDialog);
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
        formName="editAlertForm">
        <EditAlertForm
          EditAlertFormData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          CALLWRAPUPTYPES={props.callMethodsData}
          setCallWrapUpType={setCallWrapUpType}
          handleChange={handleChange}
          tableRowData={tableRowData}
          handleCount={handleCount}
          errorValue={errorValue}
          errorText={errorText}
          count={count}
          callWrapUpType={callWrapUpType}
          multiSelectError={multiSelectError}
          setMultiSelectError={setMultiSelectError}
        />
      </PopUp>
    </>
  );
}

const EditAlertForm = (props) => {
  return (
    <form
      id="editAlertForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {React.Children.toArray(
          EditAlertFormData.map((data) => {
            return (
              <Grid
                item
                xs={data.xs}
                key={`callwrap_${data.accessor}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}
                  {data.required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
                </div>
                <div>
                  {data.type == 'input' ? (
                    <FormControl required={data.required} fullWidth>
                      <TextField
                        autoFocus={true}
                        inputProps={{ maxLength: 50 }}
                        autoComplete="off"
                        name={data.name}
                        placeholder={data.placeholder ?? ''}
                        size={data.size ?? ''}
                        disabled={data.disabled ?? false}
                        onChange={props.handleChange}
                        value={props.tableRowData[data.accessor]}
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
                        helperText={getHelperText(props, data)}
                      />
                    </FormControl>
                  ) : (
                    <div></div>
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
    callWrapUpData: state.StaticDataReducer.callWrapUpData,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    callMethodsData: state.StaticDataReducer.callMethodsData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITCALLWRAPUP: async (form, editAlertInputs, handleDialog, showDialog) => {
      await dispatch(EDITCALLWRAPUP(form, editAlertInputs, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CallWrapEdit);
