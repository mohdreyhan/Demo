import * as React from "react";
import PositionedMenu from "../../../Common/AEComponents/Menu/PositionedMenu.js";
import EditConsumer from "./EditConsumer/EditConsumer.js";
import PersonalDetailsInfo from "./PersonalDetailsInfo.js";
import { MenuItems } from "./PersonalDetails.Data.js";

export default function Main(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [formData, setFormData] = React.useState([]);

  const handleDialog = (value) => {
    setDialog(value);
  };

  React.useEffect(()=>{
  },[])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, data) => {
    setFormData(data)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  const [rotation, setRotation] = React.useState("unset");

  const [expand, setExpand] = React.useState(false) 


  const rotateExpandIcon = (afterUpdate) => {
    setExpand(afterUpdate ? true : !expand);
    if (rotation == "unset" || afterUpdate) {
      setRotation("rotate(180deg)");
    } else {
      setRotation("unset");
    }
  };


  return (
    <>
    <PersonalDetailsInfo handleClick={handleClick} handleClose={handleClose}
    open={open} anchorEl={anchorEl} rotation={rotation} expand={expand} rotateExpandIcon={rotateExpandIcon}/>
    {showDialog === true && <EditConsumer showDialog = {showDialog} rotateExpandIcon={rotateExpandIcon} consumerData={formData}
    handleDialog={handleDialog}/> }
    <PositionedMenu  handleClick={handleClick} handleClose={handleClose} MenuItems={MenuItems} 
     showDialog = {showDialog}
     handleDialog={handleDialog}
    open={open} anchorEl={anchorEl}/>
    </>
  );
}