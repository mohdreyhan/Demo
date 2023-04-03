import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Typography,
    tableCellClasses,
    IconButton,
    TableHead,
    TableRow,
    KeyboardArrowDownIcon,
    KeyboardArrowUpIcon
} from "@oasis/react-core";
import { useEffect, useState } from "react";
import useStyles from "../../Styles/WorkflowStyle";
import { ApiServices } from "@oasis/js-data";
import { convertTimestamptoUSA } from '../Common/commonfunctions';
import {ColorPallete} from '../../theme/ColorPallete';

const CurrentWorkflow = ({ buttonAction }) => {
     const classes = useStyles();
    const [surveySchedules, setSurveySchedules] = useState([]);
    const portfolioId = 90901;
    const responsibleId = 102272;

    useEffect(() => {
        workflowInitialCall(portfolioId, responsibleId);
    }, []);
    const workflowInitialCall = (portfolioIds, responsibleIds) => {
        try {
            ApiServices("account")
                .get(
                    `v1/survey-schedules?portfolioId=${portfolioIds}&responsibleId=${responsibleIds}`,
                    {}
                )
                .then((response) => {
                    setSurveySchedules(response?.data?.result?.surveySchedules);
                })
                .catch((error) => {
                    return false;
                });
        } catch (error) {
            console.error(error);
        }
    };
    const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = useState(false);
        const [scheduleOpen, setScheduleOpen] = useState(false);
        const [scheduleList, setScheduleList] = useState([]);
        const [flowList, setFlowList] = useState([]);
        async function fetchFlowList(responsibleIds, scheduleId) {
            try {
                let response = await ApiServices("account").get(
                    `v1/survey-flows?scheduleId=${scheduleId}&responsibleId=${responsibleIds}`, {});
                let tmpArr = [];
                tmpArr = scheduleList.length ? [...scheduleList] : [];
                tmpArr[`workflow_${scheduleId}`] = response?.data?.result?.surveyFlows;
                setScheduleList(tmpArr);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchFlowData(responsibleIds, flowId) {
            try {
                let response = await ApiServices("account").get(
                    `v1/survey-flow-instances?responsibleId=${responsibleIds}&flowId=${flowId}`,
                    {}
                );
                let tmpArr = [];
                tmpArr = flowList.length ? [...flowList] : [];
                tmpArr[`workflowData_${flowId}`] = response?.data?.result?.surveyFlowInstances;
                setFlowList(tmpArr);
            } catch (error) {
                console.error(error);
            }
        }
        const handleSchduleList = async (scheduleId) => {
            if (!open && !scheduleList[`workflow_${scheduleId}`]) {
                await fetchFlowList(responsibleId, scheduleId);
            }
            setOpen(!open);
        };
        const handleFlowList = async (scheduleId, flowId) => {
            if (!scheduleOpen && !flowList[`workflowData_${flowId}`]) {
                await fetchFlowData(responsibleId, flowId);
            }
            setScheduleOpen(!scheduleOpen);
         };
        const expandInitialLoading = async () => {
            if (row?.status?.toLowerCase() == "active") {
                await fetchFlowList(responsibleId, row?.id);
                setOpen(true);
            }
            surveySchedules?.filter((column) => row?.status?.toLowerCase() == "active");
        }
        useEffect(() => {
         expandInitialLoading();
        }, []);
        const checkdoubleClick = () => {
            console.log("Doble Click");
        }
        return (
            <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell component="th" scope="row" colSpan={6}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => { handleSchduleList(row?.id) }}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {row.name}{" "}
                        <span className={classes.statusCls}>[{row?.status}]</span>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {scheduleList[`workflow_${row?.id}`]?.map((column) => (
                                <div key={`schedule_key_${column.id}`} style={{ marginLeft: "20px" }}>
                                    <Box>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => handleFlowList(row?.id, column?.id)}
                                        >
                                            {scheduleOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                        {column?.name}
                                    </Box>
                                    <Collapse in={scheduleOpen} timeout="auto" unmountOnExit>
                                        <Table size="small" aria-label="purchases" style={{ marginLeft: "3%", width: "98%" }}>
                                            <TableBody sx={{ background: "none" }}>
                                                {flowList[`workflowData_${column?.id}`]?.map((subChild) => {
                                                    return (
                                                        <TableRow key={`tablerow_${subChild?.id}`} onDoubleClick={checkdoubleClick}
                                                        // onClick={() => accordionFormClick(subChild?.flowId)}
                                                        >
                                                            <TableCell>
                                                                <Typography
                                                                    className={classes.flowformbtn}>
                                                                    {subChild?.name}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">{subChild?.persistenceCode}</TableCell>
                                                            <TableCell align="right">{subChild?.status}</TableCell>
                                                            <TableCell align="right">
                                                                {subChild?.createDate ? convertTimestamptoUSA(subChild?.createDate) : "start date"}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {subChild?.lastUpdateDate ? convertTimestamptoUSA(subChild?.lastUpdateDate) : "end date"}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {subChild?.startBy ?? ""}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}

                                            </TableBody>
                                        </Table>

                                    </Collapse>
                                </div>
                            ))}
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    };



    return (
        <TableContainer sx={{ height: "55vh" }}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "0.5px solid",
                            borderBottomColor:ColorPallete.Table.BorderBottom,
                            color:ColorPallete.Table.Main,
                            fontWeight: "700",
                        },
                    }}
                    className={classes.customTblHeader}
                >
                    <TableRow>
                        <TableCell>Business Process</TableCell>
                        <TableCell align="right">Persistence Code</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Started Date</TableCell>
                        <TableCell align="right">End Date</TableCell>
                        <TableCell align="right">Started By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "0.5px solid",
                            borderBottomColor:ColorPallete.Table.BorderBottom,
                        },
                    }}
                    className={classes.tableBody}
                >
                    {surveySchedules?.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default CurrentWorkflow;
