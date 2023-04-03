import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@oasis/react-core";
const RadioField = (props) => {
  const { name, value, label, onChange, items } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default RadioField;
