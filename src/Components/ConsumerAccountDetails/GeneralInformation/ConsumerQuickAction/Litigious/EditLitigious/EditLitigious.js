import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditLitigiousFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditLitigious.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import { EDITLITIGIOUS, DELETELITIGIOUS } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';

function EditLitigious(props) {
    const formRef = React.useRef();
    const [tableRowData, setTableRowData] = React.useState({});
    const [warnings, setWarnings] = React.useState([]);

    ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////
    React.useEffect(() => {
        if (props.litigiousInfo.length > 0) {
            setTableRowData(props.litigiousInfo[0]);
        }
    }, [props.litigiousInfo, props.showDialog]);

    /////// VALIDATE EXISTING PRIMARY RECORDS

    const CheckForWarnings = () => {
        let internalArr = [];
        internalArr.push({
        alertType: 'warning',
        text: "Changing the information to 'No' will remove the litigious information.",
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
        });
        setWarnings(internalArr);
    };

    /////// CLEAR WARNINGS
    const clearWarnings = () => {
        setWarnings([]);
    };

    const handleChange = (event) => {
        const obj = {
            ...tableRowData,
            [event.target.name]: event.target.value
        };
        setTableRowData(obj);
        if (obj.isLitigious === false) {
            CheckForWarnings();
        } else {
            clearWarnings();
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!tableRowData.isLitigious) {
            await props.DELETELITIGIOUS(
                localStorage.getItem("customerId"),
                tableRowData.id,
                props.handleDialog,
                props.showDialog
            );
        } else {
            await props.EDITLITIGIOUS(
                tableRowData,
                localStorage.getItem("customerId"),
                tableRowData.id,
                props.handleDialog,
                props.showDialog
            );
        }
    };

  return (
    <>
        <PopUp
            showDialog={props.showDialog}
            handleDialog={props.handleDialog}
            dialogDataHeader={dialogDataHeader}
            dialogStructureHeader={dialogStructureHeader}
            dialogDataFooter={dialogDataFooter}
            dialogStructureFooter={dialogStructureFooter}
            warnings={warnings}
            clearWarnings={clearWarnings}
            formName="editLitigious">
            <EditLitigiousForm
                EditLitigiousFormData={EditLitigiousFormData}
                formRef={formRef}
                handleChange={handleChange}
                handleFormSubmit={handleFormSubmit}
                tableRowData={tableRowData}
            />
        </PopUp>
    </>
  );
}

const EditLitigiousForm = (props) => {
    props.EditLitigiousFormData.filter((data) => data.accessor !== 'isLitigious').forEach(
        (formData) => {
            if (props.tableRowData?.isLitigious === false) {
                formData.disabled = true;
                if(formData.type == 'radio') {
                    formData.options.optionsData.map((radioOptionData) => {
                        radioOptionData.disabled = true;
                    })
                }
            } else {
                formData.disabled = false;
                if(formData.type == 'radio') {
                    formData.options.optionsData.map((radioOptionData) => {
                        radioOptionData.disabled = false;
                    })
                }
            }
        }
    );
    return (
        <form
            id="editLitigious"
            onSubmit={(event) => props.handleFormSubmit(event)}
            ref={props.formRef}
            novalidate="novalidate">
            <Grid container>
                {props.EditLitigiousFormData &&
                    props.EditLitigiousFormData.map((data) => {
                        return (
                            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '16px' }}>
                                {renderLabel(data)} 
                                {data.type == 'radio' && (
                                <RadioButtonGroup
                                    data={data}
                                    captureInputs={props.handleChange}
                                    editValues={props.tableRowData}
                                />
                                )}
                                {data.type == 'date' && (
                                <ResponsiveDatePicker
                                    data={data}
                                    captureInputs={props.handleChange}
                                    editValues={props.tableRowData}
                                />
                                )}
                            </Grid>
                        );
                    })
                }
            </Grid>
        </form>
    );
};

function mapStateToProps(state) {
    return {
        litigiousInfo: state.ConsumerQuickActionsReducer.litigiousInfo
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        EDITLITIGIOUS: async (tableRowData, customerId, litigiousId, handleDialog, showDialog) => {
            await dispatch(
                EDITLITIGIOUS(tableRowData, customerId, litigiousId, handleDialog, showDialog)
            );
        },
        DELETELITIGIOUS: async (customerId, litigiousId, handleDialog, showDialog) => {
            await dispatch(DELETELITIGIOUS(customerId, litigiousId, handleDialog, showDialog));
        }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (EditLitigious);
