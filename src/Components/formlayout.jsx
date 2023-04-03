import { useState } from "react";
import { makeStyles } from "@oasis/react-core";
const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: "8px",
    },
  },
}));
export const FormLayout = (intialFormValues) => {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (JSON.stringify(intialFormValues) !== JSON.stringify(values)) {
      setChangesFound(true);
    } else {
      setChangesFound(false);
    }
  };
  const [values, setValues] = useState(intialFormValues);
  const [errors, setErrors] = useState({});
  const [changesFound, setChangesFound] = useState(false);
  return {
    values,
    setValues,
    handlePropertyChange,
    errors,
    setErrors,
    changesFound,
  };
};
export const Form = (props) => {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
};
