import { FormControl, Checkbox, FormControlLabel } from "@oasis/react-core";

const convertToevent = (name, value) => ({
  target: {
    name,
    value,
  },
});

const CheckboxField = (props) => {
  const { name, value, label, onChange } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToevent(name, e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckboxField;
