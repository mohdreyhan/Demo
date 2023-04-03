import * as React from "react";
import { Box, CssBaseline, Drawer } from "@oasis/react-core";
import NestedList from "./ListView/NestedList";
import Accounts from "../GeneralInformation/Accounts/Accounts";
import ContactInformation from "../GeneralInformation/ContactInformation/ContactInformation";
import EmployerInformation from "../GeneralInformation/PlaceOfEmployment/EmployerInformation";
import PersonalDetailsInfo from "../GeneralInformation/PersonalDetails/PersonalDetailsInfo";
const drawerWidth = 250;

/*------------- This code is not under use, Its is a part of older version of agent experience UI. Its kept in the repo for future implementation-----------*/


function SideBarMenu() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          className="sideBar"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              position: "relative",
            },
            height: "100%",
          }}
          open
        >
          <NestedList />
        </Drawer>
      </Box>
      {/* -------------------------main-------------- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          padding: "10px",
          maxWidth: { sm: `calc(100% - ${drawerWidth}px)` },
          borderRadius: "5px",
        }}
      >
        <PersonalDetailsInfo />
        <ContactInformation />
        <Accounts />
        <EmployerInformation />
      </Box>
    </Box>
  );
}

export default SideBarMenu;
