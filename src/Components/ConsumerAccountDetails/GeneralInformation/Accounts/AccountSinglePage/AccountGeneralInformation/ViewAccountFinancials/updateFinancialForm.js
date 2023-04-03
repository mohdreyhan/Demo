import { Grid, MuiButton, Box, Controls } from '@oasis/react-core';
import { FormLayout, Form } from '../../../../../../Common/formLayout';
import SelectedValue from './selectedValues';
import { FinancialFormData, defaultSelectId } from './formData';
import useStyles from './useStyles';

const UpdateFinancials = ({
  handleClose,
  onAction,
  handleCreateandUpdate,
  FinancialFormPayloadData,
  errorMsg,
  contingencyFee,
  inActiveContingencyFee
}) => {
  const classes = useStyles();
  const { values, handlePropertyChange, errors, setErrors } = FormLayout(FinancialFormPayloadData);

  const getDisabled = (property) => {
    return property !== 'contingencyfee' && onAction === 'Update' ? true : false;
  };

  const getStyleClasses = (property) => {
    if (property === 'code') {
      return classes.toUppercase;
    }
  };

  const getSelectItems = (property) => {
    return property === 'contingencyfee' ? contingencyFee : false;
  };

  const getObjValue = (type, property) => {
    if (type === 'values') {
      return values[property];
    } else if (type === 'errors') {
      return errors[property];
    }
  };

  const getObjSelectedValue = (value) => {
    const status = contingencyFee.length > 0 || inActiveContingencyFee.length > 0;
    if (value !== defaultSelectId && status) {
      const active = contingencyFee.filter((item) => {
        return item.contingencyfeeId === value;
      });

      const Inactive = inActiveContingencyFee.filter((item) => {
        return item.contingencyfeeId === value;
      });

      const selectedContingencyFee = {};

      if (active.length > 0) {
        selectedContingencyFee['name'] = active[0].name;
        selectedContingencyFee['status'] = active[0].status;
      } else if (Inactive.length > 0) {
        selectedContingencyFee['name'] = Inactive[0].name;
        selectedContingencyFee['status'] = Inactive[0].status;
      }

      return selectedContingencyFee;
    } else {
      return {
        name: defaultSelectId,
        status: true
      };
    }
  };
  const validate = () => {
    let temp = {};
    if (values.contingencyfee == defaultSelectId) {
      temp.contingencyfee = 'Please Select a Contingency Fee';
    }
    if (values.interestrate == '') {
      temp.interestrate = 'Interest Rate is required';
    }
    if (values.interestbaseamount == '') {
      temp.interestbaseamount = 'Interest Base Amount is required';
    }
    setErrors({
      ...temp
    });
    return Object.values(temp).every((value) => value == '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleCreateandUpdate(values);
    }
  };

  return (
    <div className={classes.transactionCodeBox}>
      <Form onSubmit={handleSubmit} data-testid="update-fin-form">
        <Grid container spacing={2}>
          {FinancialFormData.map((field) => {
            if (field.type === 'input') {
              return (
                <Grid item xs={field.spacing} key={field.id}>
                  <Controls.TextInput
                    className={classes.textinputs}
                    key={field.id}
                    type={field.typeFomart}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    value={getObjValue('values', field.name)}
                    onChange={handlePropertyChange}
                    error={getObjValue('errors', field.name)}
                    styleElement={getStyleClasses(field.name)}
                    setlength={field.maxLength}
                    placeholder={field.placeHolder}
                    disabled={getDisabled(field.name)}
                  />
                </Grid>
              );
            }
            if (field.type === 'space') {
              return (
                <Grid item xs={field.spacing} key={field.id} className={classes.textgrid}></Grid>
              );
            }
            if (field.type === 'select') {
              return (
                <Grid item xs={field.spacing} key={field.id} className={classes.textgrid}>
                  <Controls.SelectField
                    className={classes.selectinputs}
                    defaultId={defaultSelectId}
                    key={field.id}
                    name={field.name}
                    label={field.label}
                    value={getObjValue('values', field.name)}
                    hiddenItems={inActiveContingencyFee}
                    items={getSelectItems(field.name)}
                    selectId={field.idaccessor}
                    selectValue={field.valueaccessor}
                    onChange={handlePropertyChange}
                    error={getObjValue('errors', field.name)}
                    required={field.required}
                    disabled={getDisabled(field.name)}
                    renderValue={(selected) => {
                      if (contingencyFee.length > 0 || inActiveContingencyFee.length > 0) {
                        return (
                          <SelectedValue
                            selected={selected}
                            name={getObjSelectedValue(selected).name}
                            selectedStatus={getObjSelectedValue(selected).status}
                          />
                        );
                      }
                    }}
                    MenuProps={{
                      className: classes.contingencyMenuitems
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-disabled': {
                        '& > fieldset': {
                          border: '1px solid #E0E0DF !important'
                        }
                      }
                    }}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
        {onAction !== 'View' ? (
          <Box className={classes.flexDiv1}>
            <MuiButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={values.status === false}
              className={classes.primarybuttonDiv}>
              {onAction === 'Update' ? 'Save' : 'Create'}
            </MuiButton>
            <MuiButton
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClose(false);
              }}
              className={classes.buttonDiv}>
              Cancel
            </MuiButton>
          </Box>
        ) : (
          ''
        )}
      </Form>
    </div>
  );
};

export default UpdateFinancials;
