import { MuiButton, Divider,Tab, Tabs, Typography } from "@oasis/react-core";
import { useCallback,useState } from "react";
import Historical from "./Historical";
import CurrentWorkflow from "./CurrentWorkflow";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import useStyles from "../../Styles/WorkflowStyle";
import {ColorPallete} from '../../theme/ColorPallete';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const buttonProps = { disableOpen: true, selectedScheduleId: 0, disableStart: true, selectedFlowId: 0 };

const TabPanelFlow = (props) => {
    
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [panelKey, setPanelKey] = useState(1);
    const [enableOpen, setEnableOpen] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCallBackFun = (buttonUpdatedProps) => {
        setEnableOpen(true);
    }
    const handleButtonEnable = useCallback((buttonUpdatedProps) => {
        handleCallBackFun(buttonUpdatedProps);
    }, [buttonProps]);

    const cancelForm = () => {
        props.closePopup(true);
    }
    const refreshForm = () => {
        const crypto = window.crypto || window.msCrypto;
        const array = new Uint32Array(1);
        const val = crypto.getRandomValues(array)[0];
        setPanelKey(val + 1);
    }


    return (<>
        <Box sx={{ bgcolor: "background.paper" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Tabs
                    TabIndicatorProps={{
                        style: {
                            background:ColorPallete.Table.TabIndicatorBackground,
                            height: "3px",
                            margin: "auto",
                        },
                    }}
                    value={value}
                    textColor="inherit"
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        className={classes.deviderRight}
                        label={"Current"}
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={classes.devider}
                        label={"Historical"}
                        {...a11yProps(1)}
                    />
                </Tabs>
                <div className={classes.currentHistoryFlowbtns}>
                    <MuiButton variant="outlined" sx={{ mr: 1 }} size="small" onClick={refreshForm}>Refresh</MuiButton>
                    <MuiButton variant="outlined" sx={{ mr: 1 }} size="small" disabled={!enableOpen} onClick={handleOpenButton}>Open</MuiButton>
                    <MuiButton variant="outlined" sx={{ mr: 1 }} size="small" disabled onClick={handleStartButton}>Start</MuiButton>
                </div>
            </Box>
        </Box>
        <TabPanel value={value} index={0}>
            <CurrentWorkflow buttonAction={handleButtonEnable} key={panelKey} />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Historical />
        </TabPanel>
        <Divider />
        <div style={{ margin: "10px" }}>
            <div onClick={cancelForm} className={classes.buttonDiv}>
                Cancel
            </div>
        </div>

    </>)
}
export default TabPanelFlow;