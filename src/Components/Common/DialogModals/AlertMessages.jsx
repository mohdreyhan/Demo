import {Alert, AlertTitle, Stack} from "@oasis/react-core";
import useStyles from "../../Styles/AddressType";

const AlertMessages = (props) => {
  const { setWidth, errorMessage, navigate } = props;

  const classes = useStyles();
  return (
    <>
      <Stack sx={{ width: { setWidth } }} spacing={2}>
        <Alert severity={errorMessage.type} className={classes.alertStyle}>
          <AlertTitle>{errorMessage.content}</AlertTitle>
        </Alert>
      </Stack>
      {
        navigate()
      }
    </>
  );
};

export default AlertMessages;
