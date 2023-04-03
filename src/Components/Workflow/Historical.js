import { FormControl, Grid, MenuItem, Select } from "@oasis/react-core";
import { useState } from "react";
import { Headers, response1, response2, tempChildHistoryData } from "./WorkflowForm";
import useStyles from "../../Styles/WorkflowStyle";
import HistoricalTable from "./HistoricalTable";

const historyValue = response1?.data;
const rows = response2.data;

const Historical = () => {
    const classes = useStyles();
    const [selectedMenuItem, setSelectedMenuItem] =useState(historyValue[0].scheduleId)
    const onChange = (e) => {
        setSelectedMenuItem(e.target.value)
    };
    return (
        <Grid container style={{ width: "100%" }} key={selectedMenuItem}>
            <Grid
                item
                xs={12}
                key={selectedMenuItem}
                className={classes.textgrid}
            >
                <FormControl size='small' sx={{width: "40%"}}>
                    <Select
                        onChange={onChange}
                        id="history-workflow"
                        labelId="history-workflow-label"
                        value={selectedMenuItem}
                        className={classes.selectfields}
                    >
                        {historyValue?.map((menuItem) => (
                            <MenuItem key={menuItem.scheduleId} value={menuItem.scheduleId}>
                                {menuItem.text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                key={selectedMenuItem}
                className={classes.textgrid}
            >
                <HistoricalTable 
                    headData={Headers}
                    rows={rows}
                    childHistoryData = {tempChildHistoryData}
                />
            </Grid>
        </Grid>
    )

}

export default Historical;