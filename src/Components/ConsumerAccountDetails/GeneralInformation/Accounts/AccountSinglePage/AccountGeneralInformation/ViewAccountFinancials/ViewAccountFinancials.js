import * as React from 'react';
import {
  ToolbarData,
  ToolbarStructure,
  accountFinancialsData,
  PositionedMenuEditItems
} from './ViewAccountFinancialsData';
import WidgetComponent from '../../../../../../Common/WidgetComponent/WidgetComponent';
import PositionedMenu from '../../../../../../Common/AEComponents/Menu/PositionedMenu';
import PopUp from '../../../../../../Common/DialogModals/PopUp';
import { convertTimestamptoUSA } from '../../../../../../Common/commonfunctions';
import UpdateImg from '../../../../../../../Images/EditSub.png';
import UpdateFinancials from './updateFinancialForm';
import {
  GETACTIVECONTIGENCYFEE,
  GETACCOUNTFINANCIALDETAILS,
  POSTACCOUNTFINANCIALDETAILS
} from '../../../../../../../Actions/ConsumerDetails/ActionCreators';
import { FinancialFormPayloadData, defaultSelectId } from './formData';
import { useDispatch, useSelector } from 'react-redux';

const ViewAccountFinancials = ({ accountId }) => {
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  const [activeContingencyFee, setActiveContingencyFee] = React.useState([]);
  const [inActiveContingencyFee, setInActiveContingencyFee] = React.useState([]);
  const [formData, setFormData] = React.useState(FinancialFormPayloadData);
  const [editAnchorEl, setEditAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [accountFinancials, setAccountFinancials] = React.useState(null);
  const editOpen = Boolean(editAnchorEl);
  const contigencyFee = useSelector((state) => state.ConsumerDetailsReducer?.activeContigencyFee);
  const financialsInfo = useSelector((state) => state.ConsumerDetailsReducer?.financialDetails);
  const updateFinancialsInfo = useSelector(
    (state) => state.ConsumerDetailsReducer?.updateFinancialDetails
  );

  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const onMoreButtonClick = (event) => {
    setPositionedMenuItems(PositionedMenuEditItems);
    setEditAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditAnchorEl(null);
  };

  const handleDialog = () => {
    setShowModal(true);
  };

  React.useEffect(() => {
    dispatch(GETACTIVECONTIGENCYFEE());
    dispatch(GETACCOUNTFINANCIALDETAILS(accountId));
  }, []);

  const getSelectedContingencyFee = (contingencyFeeScheduleId) => {
    if (contingencyFeeScheduleId) {
      const selectedFee = contigencyFee.find((item) => item.uuid === contingencyFeeScheduleId);
      return selectedFee?.name || 'No Contingency Fee';
    }

    return 'No Contingency Fee';
  };

  const handleCreateandUpdate = (values) => {
    if (values) {
      const payload = {
        contingencyFeeScheduleId: values.contingencyfee
      };
      dispatch(POSTACCOUNTFINANCIALDETAILS(payload, accountId));
    }
  };

  React.useEffect(() => {
    if (financialsInfo && contigencyFee && contigencyFee.length > 0) {
      let accountFinancialInfo = {};
      const activeContigencyFee = contigencyFee.filter((data) => {
        return data.status;
      });
      const inActiveContigencyFee = contigencyFee.filter((data) => {
        return !data.status;
      });

      setActiveContingencyFee(activeContigencyFee);
      setInActiveContingencyFee(inActiveContigencyFee);

      accountFinancialInfo.contingencyFeeScheduleCode = getSelectedContingencyFee(
        financialsInfo.contingencyFeeScheduleId
      );
      accountFinancialInfo.placementDate = financialsInfo.placementDate;
      accountFinancialInfo.placementAmount = financialsInfo.placementBalance;
      accountFinancialInfo.remainingBalance = financialsInfo.remainingBalance;
      setAccountFinancials([accountFinancialInfo]);
      setLoading(false);
    }
  }, [financialsInfo, contigencyFee]);

  React.useEffect(() => {
    if (accountId === updateFinancialsInfo.accountId) {
      setShowModal(false);
      dispatch(GETACCOUNTFINANCIALDETAILS(accountId));
    }
  }, [updateFinancialsInfo]);

  React.useEffect(() => {
    if (activeContingencyFee.length > 0) {
      const payloadData = Object.assign(FinancialFormPayloadData, {
        placementdate: convertTimestamptoUSA(financialsInfo.placementDate),
        placementamount: `$ ${financialsInfo.placementBalance}`,
        balance: `$ ${financialsInfo.remainingBalance}`,
        contingencyfee:
          financialsInfo.contingencyFeeScheduleId == undefined
            ? defaultSelectId
            : financialsInfo.contingencyFeeScheduleId
      });
      setFormData(payloadData);
    }
  }, [activeContingencyFee, inActiveContingencyFee]);

  return (
    <>
      <WidgetComponent
        toolbarStructure={ToolbarStructure}
        toolbarData={ToolbarData}
        stateData={accountFinancials}
        columnData={accountFinancialsData}
        handleMoreButtonClick={onMoreButtonClick}
        loading={loading}
      />
      <PositionedMenu
        handleClose={handleClose}
        MenuItems={postionedMenuItems}
        showDialog={false}
        handleDialog={handleDialog}
        open={editOpen}
        anchorEl={editAnchorEl}
      />
      <PopUp
        title={'Update Financials'}
        imageSrc={UpdateImg}
        onAction={'Update'}
        setOpenPopUp={handleClose}
        openPopUp={showModal}>
        <UpdateFinancials
          contingencyFee={activeContingencyFee}
          inActiveContingencyFee={inActiveContingencyFee}
          FinancialFormPayloadData={formData}
          handleCreateandUpdate={handleCreateandUpdate}
          handleClose={handleClose}
          onAction={'Update'}
        />
      </PopUp>
    </>
  );
};

export default ViewAccountFinancials;
