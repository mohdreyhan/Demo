import React from 'react';
import { Grid, TextField, FormControl, Box } from '@mui/material';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditRestrictionFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditRestrictions.Data';
import { ColorPallete } from '../../../../theme/ColorPallete';

const dialogStyle = {
  '& .MuiPaper-root.MuiDialog-paper': { maxWidth: '720px', borderRadius: '8px' }
};
const getHelperText = (props, data) => {
  if (data.required && props.errorValue?.length > 0) {
    let err = props?.errorValue?.find((error) => error.fieldName === data.name);
    return err?.text;
  }
  return '';
};

const EditRestrictions = (props) => {
  const formRef = React.useRef();
  const formData = [];
  const [tableRowData, setTableRowData] = React.useState({});
  const [errorValue, setError] = React.useState([]);

  React.useEffect(() => {
    setTableRowData(props.tableRowData);
  }, [props.tableRowData]);

  React.useEffect(() => {
    setError('');
  }, [props.showDialog]);

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const internalArr = [];
    let validInput = true;

    if (tableRowData.deliveryDays === '') {
      internalArr.push({
        fieldName: 'deliveryDays',
        text: 'Please enter Delivery Days'
      });
      validInput = false;
      setError(internalArr);
    }

    if (tableRowData.validationPeriodWaitDays === '') {
      internalArr.push({
        fieldName: 'validationPeriodWaitDays',
        text: 'Please enter Validation Period Wait Days'
      });
      validInput = false;
      setError(internalArr);
    }

    if (validInput) {
      props.handleDialog(!props.showDialog);
    }
  };

  return (
    <>
      <PopUp
        dialogStyle={dialogStyle}
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="editRestrictionForm"
        style={{ padding: '0px 24px 0px 24px ' }}>
        <EditRestrictionForm
          //EditRestrictionFormData={EditRestrictionFormData}
          EditRestrictionFormData={formData}
          handleFormSubmit={handleFormSubmit}
          handleChange={handleChange}
          formRef={formRef}
          tableRowData={tableRowData}
          errorValue={errorValue}
        />
      </PopUp>
    </>
  );
};

const EditRestrictionForm = (props) => {
  return (
    <form
      id="editRestrictionForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {React.Children.toArray(
          EditRestrictionFormData.map((data) => {
            let errorData = [];
            if (props?.errorValue)
              errorData = props?.errorValue?.filter((error) => error.fieldName === data.name);
            return (
              <Box sx={{ width: '100%' }} key={data.id}>
                <Grid item xs={data.xs}  sx={{ paddingBottom: '10px' }}>
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px'
                    }}>
                    {data.label}
                    {data.required && (
                      <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
                    )}
                  </div>
                  <div>
                    {data.type == 'input' ? (
                      <FormControl required={data.required} fullWidth>
                        <TextField
                          autoFocus={true}
                          InputProps={{
                            inputMode: 'numeric',
                            inputProps: { min: 0, step: 1 }
                          }}
                          autoComplete="off"
                          name={data.name}
                          size={data.size ?? ''}
                          disabled={data.disabled ?? false}
                          onChange={props.handleChange}
                          value={props.tableRowData[data.accessor]}
                          onInput={props.handleCount}
                          type={data.fieldType}
                          onKeyPress={data.onKeyPress && data.onKeyPressFn}
                          sx={{
                            '& .MuiOutlinedInput-input': {
                              padding: '6px 8px 5px 8px'
                            },
                            '& .MuiFormHelperText-root': {
                              whiteSpace: 'nowrap'
                            },
                            input: {
                              '& ::placeholder': {
                                textOverflow: 'ellipsis !important',
                                color: ColorPallete.Text.Secondary,
                                fontFamily: 'poppins'
                              },

                              color: ColorPallete.Color.Black,
                              fontSize: '14px',
                              opacity: 1,
                              fontFamily: 'poppins'
                            }
                          }}
                          style={{
                            backgroundColor: data.disabled ? ColorPallete.Button.Tertiary : '',
                            padding: '2px 0px 0px 2px !important'
                          }}
                          error={errorData.length > 0}
                          helperText={getHelperText(props, data)}
                        />
                      </FormControl>
                    ) : (
                      <div></div>
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
              </Box>
            );
          })
        )}
      </Grid>
    </form>
  );
};

export default EditRestrictions;
