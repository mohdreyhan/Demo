import {
  MenuItem,
  FormControl,
  Select,
  Box,
  Grid,
} from "@oasis/react-core";
import useStyles from "../../../Styles/WorkflowStyle";

const SelectField = (props) => {
  const { name, label, onChange, items, selectId, selectedId, menuItems,onOpen,onClose  } = props;
  const classes = useStyles();
  return (
    <FormControl className={classes.selectWrap} style={{width: "40%"}}>
      <Box component="div" className={classes.heading}>
        {label}
      </Box>
      <Select
        onChange={onChange}
        name={name}
        value={selectedId}
        className={classes.selectfields}
        onOpen={onOpen} 
        onClose={onClose}
      >
        {items.length > 0 &&
          items.map((item) => (
              <MenuItem key={item[selectId]} value={item[selectId]} >
                <Grid container>
                        <Grid item xs={12}>{item.name}</Grid>
                      {menuItems && 
                        <Box>
                          {/* <Grid item xs={12}><b>Name:</b>{item.name} </Grid> */}
                          <Grid item xs={12}><b>Status:</b>{item.status}</Grid>
                          <Grid item xs={12}><b>Description:</b></Grid>
                        </Box>
                      }
                </Grid> 
              </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
export default SelectField;
