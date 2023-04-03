import * as React from 'react';
import { connect } from 'react-redux';
import SelectButton from '../../../../Common/AEComponents/DropDown/SelectButton.js';
import TextFieldComp from '../../../../Common/AEComponents/TextField/TextFieldComp.js';
import MoreButton from '../../../../Common/AEComponents/More/MoreButton.js';
import { AliasInformationFormData } from './AddAlias.Data.js';
import { Grid, MuiButton } from '@oasis/react-core';
import { ColorPallete } from '../../../../../theme/ColorPallete.js';
import { extractImagePath } from '../../../../Common/commonfunctions.js';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { handleOptionsData, nestedIfCaseHandle } from '../../../../Common/commonfunctions';
import useStyles from '../PersonalDetails.style';
import addGrey from "../../../../../../Icons/addGrey.png";

function AddAlias(props) {
  const [formData, setFormData] = React.useState(AliasInformationFormData);

  React.useEffect(() => {
    if (props.aliasTypes?.length > 0) {
      const types = [];
      props.aliasTypes.forEach((type) => {
        types.push({ ...type, displayName: type.description + ' (' + type.code + ')' });
      });
      const arr = handleOptionsData(AliasInformationFormData, 'typeId', types);
      setFormData(arr);
    }
  }, [props.aliasTypes]);

  const handleOnchange = (event, index) => {
    let newData = [...props.aliasData];
    let newItem = {
      ...newData[index],
      [event.target.name]: event.target.value
    };
    newData[index] = newItem;
    props.setAliasData(newData);
  };

  const addAlias = () => {
    let emptyObject = {
      typeId: null,
      name: ''
    };
    let newData = [...props.aliasData, emptyObject];
    props.setAliasData(newData);
  };

  const deleteAlias = (index) => {
    props.aliasData.splice(index, 1);
    let originalData = [...props.aliasData];
    props.setAliasData(originalData);
    props.setError(
      props.errorValue
        .filter((f) => f.index !== index)
        .map((f) => {
          if (f.index > index) {
            return {
              ...f,
              index: f.index - 1
            };
          }
          return {
            ...f
          };
        })
    );
  };

  return (
    <AliasForm
      aliasData={props.aliasData}
      formData={formData}
      addAlias={addAlias}
      handleOnchange={handleOnchange}
      deleteAlias={deleteAlias}
      errorValue={props.errorValue}
    />
  );
}

const AliasForm = (props) => {
  const styles = useStyles();
  return (
    <>
      {props.aliasData.length > 0 && (
        <div className={styles.consumerDetailsTitle} style={{ marginLeft: '2px' }}>
          Alias Information
        </div>
      )}
      {props.aliasData?.map((alias, index) => {
        return (
          <Grid
            container
            key={index}
            sx={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: `1px solid ${ColorPallete.Border.Primary}`,
              marginBottom: '10px'
            }}>
            {props.formData.map((data, i) => {
              return (
                <Grid
                  item
                  xs={data.xs}
                  key={i}
                  sx={{ paddingBottom: '10px', paddingRight: '10px' }}>
                  <div>
                    {data.label}{' '}
                    {data.required && (
                      <span
                        style={{
                          color: ColorPallete.Border.Tertiary,
                          marginLeft: '-4px'
                        }}>
                        *
                      </span>
                    )}
                  </div>
                  <div>
                    {data.type == 'input' && (
                      <TextFieldComp
                        data={data}
                        captureInputs={props.handleOnchange}
                        editValues={alias}
                        error={
                          props.errorValue && props.errorValue.filter((err) => err.index == index)
                        }
                        errorText={
                          props.errorValue && props.errorValue.filter((err) => err.index == index)
                        }
                        others={{ sendIndex: true, index: index }}
                      />
                    )}
                    {data.type == 'select' && (
                      <div key={Math.random()}>
                        <SelectButton
                          data={data}
                          captureInputs={props.handleOnchange}
                          editValues={alias}
                          error={
                            props.errorValue && props.errorValue.filter((err) => err.index == index)
                          }
                          errorText={
                            props.errorValue && props.errorValue.filter((err) => err.index == index)
                          }
                          others={{ sendIndex: true, index: index }}
                        />
                        </div>
                    )}
                  </div>
                </Grid>
              );
            })}
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '10px',
                alignItems: 'center'
              }}>
              <MoreButton
                moreButtonCustom={{
                  icon: <DeleteOutlineIcon style={{ color: ColorPallete.Color.AlertBackground }} />
                }}
                handleClick={props.deleteAlias}
                others={{ index: index, title: 'Delete' }}
                styles={{
                  backgroundColor: ColorPallete.FormInput.backgroundColor,
                  ':hover': {
                    backgroundColor: ColorPallete.FormInput.backgroundColor
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      })}
      <MuiButton
        variant="text"
        sx={{
          display: 'flex',
          px: 1,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: 'unset'
          },
          ":disabled": {
            backgroundColor: 'unset !important'
          }
        }}
        onClick={props.addAlias}
        disabled={props.aliasData?.length >= 3 ? true : false}>
        <img src={nestedIfCaseHandle(props.aliasData?.length >= 3,addGrey,extractImagePath('add.png'))} style={{ paddingRight: '5px' }} height={'18'} />
        <div style={{ fontFamily: 'poppins', textTransform: 'capitalize', fontSize: '16px' }}>
          Add Alias
        </div>
      </MuiButton>
    </>
  );
};

function mapStateToProps(state) {
  return {
    aliasTypes: state.ConsumerDetailsReducer.aliasTypes
  };
}

export default connect(mapStateToProps, null)(AddAlias);
