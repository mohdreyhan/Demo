import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Grid, Controls, MultiSelect } from '@oasis/react-core';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  DROP_DOWN_TEXT,
  NoCharacterLimitRequired,
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter,
  CustomRequiredOption,
} from './AddCustomField.data.js';
import { CharacterStyle, CommonInputStyle } from './AddCustomField.style.js';
import { addCustomFields } from '../../ApiAction';
function AddCustomField(props) {
  
  const handleFormSubmit = (val) => {
    const payload = Object.assign({
      fieldName: val.fieldName.trim(),
      internalLabel: val.internalLabel,
      isRequired: val.isRequired === "Yes",
      characterLimit: val.characterLimit,
      location: { id: val.location },
      dataType: { id: val.dataType },
      group: val?.group && val?.group != '0' ? { id: val.group } : undefined,
      editableBy: val?.editableBy,
      viewableBy: val?.viewableBy
    }, val?.options ? { options: val.options.split(",").map(opt => ({ value: opt.trim() })) } : {})
    addCustomFields(payload, props.handleDialog, props.fetchCustomFields);
  }
  return (
    <>
      <PopUp
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="addCustomFieldForm">
        <AddCustomFieldForm
          handleFormSubmit={handleFormSubmit}
        />
      </PopUp>
    </>
  );
}

const AddCustomFieldForm = ({ handleFormSubmit }) => {
  const [charLimit, setCharLimit] = React.useState(0);
  const [selectedDataType, setSelectedDataType] = React.useState();

  const locations = useSelector(state => state.StaticDataReducer.customFieldLocations);
  const dataTypes = useSelector(state => state.StaticDataReducer.customFieldDataTypes);

  const initialState = {
    isRequired: 'Yes'
  };
  function converFieldNameToLabel(str) {
    return str?.trim().split(" ").map(word => word.trim().replace(/(?:^\w|[A-Z]|\b\w)/g, function(char, index) {
      return index === 0 ? char.toLowerCase() : char.toUpperCase();
    })).join(" ").replace(/\s+/g, '_');
  }

  const findSpecificDataType = (id) => {
    return dataTypes.find(dt => dt.id === id)
  }
  const validationSchema = yup.object().shape({
    fieldName: yup.string().required("Enter Field Name").max(30, 'Not More than 30 Character'),
    internalLabel: yup.string().required("Auto Populate on Field Name Change"),
    location: yup.string().min(2, "Please Select Correct Location").required("Please Select Location"),
    dataType: yup.string().min(2, "Please Select Correct DataType").required("Please Select DataType"),
    isRequired: yup.string().required("Choose Required Option"),
  }).when((_, schema) => {
    if (selectedDataType?.type === DROP_DOWN_TEXT) {
      return schema.shape({
        options: yup.string().required("Enter Drop Down value")
          .test('options', 'Leading or Trailing comma and space not allowed', value => !(/(^[,\s]+)|([,\s]+$)/.test(value)))
          .test('options', "Only Alphanumeric Allowed", value =>/^([a-zA-Z0-9\s]+,?\s*)+$/.test(value))
          .test('options', "Not more than character limit", value => {
            const optArr = value?.split(",");
            const result = optArr?.every(opt => opt.trim().length <= charLimit);
            return result
          })
      });
    }
  }).when((_, schema) => {
    if (!NoCharacterLimitRequired.includes(selectedDataType?.type)) {
      return schema.shape({
        characterLimit: yup.number().required("Enter Character Limit")
          .max(+selectedDataType?.defaultCharacterLimit ?? 0, selectedDataType?.defaultCharacterLimit ? `Not Allowed More than ${selectedDataType?.defaultCharacterLimit}` : "Please Select data type first"),
      });
    }
  });

  const { control, handleSubmit, reset, clearErrors, formState: { errors, }, setValue } = useForm({ mode:'onSubmit', reValidateMode: 'onSubmit', defaultValues: initialState, resolver: yupResolver(validationSchema)});

  useEffect(() => {
    reset()
  }, []);

  const renderInputElement = () => {
    return (
      <Grid item xs={12} style={{ width: "100%" }}>
        <Controller
          name={"options"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Controls.TextInput
              onChange={onChange}
              required
              multiline={true}
              name={"options"}
              value={value}
              label={"Enter Dropdown Values"}
              style={{ width: "80%" }}
              error={errors?.options?.message}
              placeholder={"Enter Dropdown Values (Separated By Commas)"}
            />
          )}
        />
      </Grid>
    )
  }
  const handleDataTypeChange = (id) => {
    const res = findSpecificDataType(id);
    if ((res !== undefined) && Object.keys(res).length > 0) {
      setSelectedDataType(res);
      setCharLimit(+res.defaultCharacterLimit);
      clearErrors("characterLimit");
      setValue("characterLimit", +res.defaultCharacterLimit);
      setValue("options", undefined);
    } else {
      setSelectedDataType();
      setValue("characterLimit", '0');
      setValue("options", undefined);
      setCharLimit(0);
    }
  }
  return (
    <form
      id="addCustomFieldForm"
      onSubmit={handleSubmit(handleFormSubmit)}
      novalidate="novalidate">

      <Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={12} md={12}>
          <Controller
            name={"fieldName"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.TextInput
                onChange={(e) => {
                  onChange(e);
                  setValue("internalLabel", converFieldNameToLabel(e.target.value))
                }}
                required
                name={"fieldName"}
                value={value}
                label={"Field Name"}
                style={CommonInputStyle}
                error={errors?.fieldName?.message}
                placeholder={"Enter Field Name"}
                setlength={30}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name={"internalLabel"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.TextInput
                onChange={onChange}
                required
                disabled
                name={"internalLabel"}
                value={value}
                label={"Internal Label"}
                style={CommonInputStyle}
                error={errors?.internalLabel?.message}
                placeholder={"Label will auto populate"}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name={"location"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.SelectField
                onChange={onChange}
                required
                items={locations}
                selectId={'id'}
                selectValue={'name'}
                value={value}
                name={"location"}
                label={"Location"}
                style={CommonInputStyle}
                error={errors?.location?.message}
                defaultTitle={"Select Location"}
              />
            )}
          />
        </Grid>
        <Grid item xs>
          <Controller
            name={"dataType"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.SelectField
                onChange={(e) => {
                  onChange(e);
                  handleDataTypeChange(e.target.value);
                }}
                required
                value={value}
                items={dataTypes}
                selectId={'id'}
                selectValue={'type'}
                name={"dataType"}
                label={"Data Type"}
                style={CommonInputStyle}
                error={errors?.dataType?.message}
                defaultTitle={"Select Data Type"}
              />
            )}
          />
        </Grid>
        {
          (DROP_DOWN_TEXT === selectedDataType?.type) && renderInputElement()
        }
        <Grid item xs>
          <Controller
            name={"isRequired"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.RadioField
                onChange={onChange}
                required
                items={CustomRequiredOption}
                value={value}
                name={"isRequired"}
                label={"Required"}
                error={errors?.isRequired?.message}
              />
            )}
          />
        </Grid>
        {!NoCharacterLimitRequired.includes(selectedDataType?.type) && <Grid item xs>
          <Controller
            name={"characterLimit"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.TextInput
                onChange={(event) => {
                  setCharLimit(+event.target.value ?? 0)
                  onChange(+event.target.value)
                }}
                required
                value={value}
                name={"characterLimit"}
                label={"Character Limit"}
                style={{ width: "4.5rem" }}
                error={errors?.characterLimit?.message}
                placeholder={"00000"}
              />
            )}
          />
          <span style={CharacterStyle}>character</span>
        </Grid>}
        <Grid item xs>
          <Controller
            name={"group"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controls.SelectField
                onChange={onChange}
                value={value}
                items={[]}
                name={"group"}
                selectId={'id'}
                selectValue={'value'}
                label={"Sub-tab Group Name"}
                style={CommonInputStyle}
                error={errors?.group?.message}
                defaultId={"0"}
                defaultTitle={"Select Sub-Tab"}
              />
            )}
          />
        </Grid>
        <Grid item xs>
          <Controller
            name={"editableBy"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                onChange={onChange}
                options={[]}
                value={value}
                name={"editableBy"}
                label={"Editable By"}
                placeholder={"Select Editors"}
              />
            )}
          />
        </Grid>
        <Grid item xs>
          <Controller
            name={"viewableBy"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                onChange={onChange}
                options={[]}
                value={value}
                name={"viewableBy"}
                label={"is Viewable By"}
                placeholder={"Select Viewers"}
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCustomField;
