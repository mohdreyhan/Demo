import * as React from 'react';
import { Grid, TextField, Checkbox, TextareaAutosize } from '@mui/material';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditRelationshipInfoData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditRelationshipInfo.Data.js';
import { ColorPallete } from '../../../../theme/ColorPallete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function EditRelationshipInfo(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const arr = [];
    arr.push({
      ...formData[0],
      [event.target.name]: event.target.value
    });
    setFormData(arr);
  };

  React.useEffect(() => {
    setFormData(props.employerData);
  }, [props.employerData]);

  return (
    <>
      <PopUp
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureFooter={dialogStructureFooter}
        dialogDataFooter={dialogDataFooter}
        dialogStructureHeader={dialogStructureHeader}
        formName="reletionshipForm"
        popupWidth="md">
        <RelationshipForm
          EditRelationshipInfoData={EditRelationshipInfoData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          formData={formData}
          handleChange={handleChange}
        />
      </PopUp>
    </>
  );
}
export default EditRelationshipInfo;

const getInputTypeData = (data, props, relationShipData) => {
  if (data.type == 'input') {
    return (
      <TextField
        onChange={props.handleChange}
        size={data.size ?? ''}
        fullWidth
        name={data.name ?? ''}
        required={data.required}
        disabled={data.disabled}
        value={relationShipData[data?.accessor]}
        style={{
          backgroundColor: data.disabled ? '#E0E0DF' : '',
          outline: 'none',
          fontFamily: 'Poppins',
          fontStyle: 'normal'
        }}
      />
    );
  }
  return (
    <TextareaAutosize
      size={data.size ?? ''}
      fullWidth
      name={data.name ?? ''}
      required={data.required}
      disabled={data.disabled}
      style={{
        backgroundColor: data.disabled ? '#E0E0DF' : '',
        height: '122px',
        resize: 'none',
        overflow: 'auto',
        width: '-webkit-fill-available',
        fontFamily: 'Poppins',
        fontStyle: 'normal'
      }}
      value={relationShipData[data.accessor]}
      onDrag="false"
    />
  );
};

const RelationshipForm = (props) => {
  return (
    <form
      id="reletionshipForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}>
      <Grid container>
        {props.EditRelationshipInfoData.map((data) =>
          props.formData?.map((relationShipData) => {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${data.accessor}`}
                sx={{ paddingBottom: '10px' }}
                style={data.styles}>
                {data.type == 'checkbox' ? (
                  <div style={{ display: 'flex' }}>
                    <FormGroup>
                      <FormControlLabel
                        disableTypography={true}
                        control={
                          <Checkbox
                            onChange={props.handleChange}
                            style={{ paddingRight: 2, color: '#006FBA' }}
                            name={data.name ?? ''}
                            required={data.required}
                            disabled={data.disabled}
                            checked={relationShipData[data.accessor]}
                          />
                        }
                        label={data.label}
                      />
                    </FormGroup>
                  </div>
                ) : (
                  <>
                    <div>
                      {data.label}{' '}
                      {data.required && (
                        <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
                      )}
                    </div>
                    <div>{getInputTypeData(data, props, relationShipData)}</div>
                  </>
                )}
              </Grid>
            );
          })
        )}
      </Grid>
    </form>
  );
};
