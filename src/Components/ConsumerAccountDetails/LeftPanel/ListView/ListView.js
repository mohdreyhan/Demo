import * as React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@oasis/react-core";
import { ListData } from "./ListView.Data";
import useStyles from "./ListView.Styles";
import { ColorPallete } from '../../../../theme/ColorPallete';
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./ListView.js";

function ListView(props) {
  const [value, setValue] = React.useState(1);
  const styles = useStyles();
  let navigate = useNavigate();
  let location = useLocation();

  const [currentListView, setCurrentListView] = React.useState(ListData);

  React.useEffect(() => {
    if (props?.accountLeftMenuInfo?.length) {
      setCurrentListView(props.accountLeftMenuInfo);
    } else {
      setCurrentListView(ListData);
    }
  }, [props.accountLeftMenuInfo]);

  React.useEffect(() => {
    ListData.forEach(data => {
      if (data.routePath == location.pathname) {
        setValue(data.id)
      }
    })
  }, [props.accountLeftMenuInfo]);

  const handleClick = (id, routePath) => {
    if (value !== id && routePath) {
      setValue(id);
      navigate(`${routePath}`)
    }
  };

  return (
    <List sx={{ margin: "0px 10px 0px 10px" }}>
      {currentListView?.map((listData, listIndex) => {
        return (
          <ListItem style={listData.styles ?? { padding: "8px 0px 8px 0px" }} key={`${listData.id}_${listIndex+1}`}
          >
            <ListItemButton
              style={{
                padding: "5px 3px", borderRadius: "8px", backgroundColor: value === listIndex + 1 ? ColorPallete.Button.Secondary
                  : ColorPallete.Color.White, border: `solid 1px ${ColorPallete.Button.Tertiary}`
              }}
              onClick={() => { handleClick(listData.id, listData?.routePath); }}>
              {value == listData.id ? (
                <ListItemIcon className={styles.MuiListItemIcon} style={listData.styles ?? {}}>
                  {listData.iconOnSelect}
                </ListItemIcon>
              ) : (
                <ListItemIcon className={styles.MuiListItemIcon} style={listData.styles ?? {}}>
                  {listData.icon}
                </ListItemIcon>
              )}
              {/* <ListItemIcon className={styles.MuiListItemIcon} style={listData.styles ?? {}}>
                {listData.iconOnSelect}
              </ListItemIcon> */}
              <ListItemText primary={listData.name} sx={{ fontSize: "14px", color: value === listIndex + 1 ? ColorPallete.Color.White : ColorPallete.Text.Secondary }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}


function mapStateToProps(state) {
  return {
    accountLeftMenuInfo: state.ConsumerDetailsReducer.accountLeftMenuInfo,
  };
}

export default connect(mapStateToProps)(ListView);

