import { Grid, KeyboardArrowUpIcon, KeyboardArrowDownIcon, Divider } from '@oasis/react-core';
import { useEffect, useState } from 'react';
import { PaymentListStracture, SubBalance, TableHeadersPayment } from './PaymentData';
import useStyles from './SinglePayment.style';
import AETable from '../../../../../../Common/AEComponents/Table/AETable';
import { paymentSinglePageApi } from '../../../../../ApiAction';
import { convertTimestamptoUSA, formatCurrency,formatCurrencyAllowZero } from '../../../../../../Common/commonfunctions';
import { connect } from 'react-redux';
import { ColorPallete } from '../../../../../../../theme/ColorPallete';

function SinglePayment(props) {
  const { data, accountDetails } = props;
  const [paymentDataList, setPaymentDataList] = useState({});
  const [showMoreData, setShowMoreData] = useState(false);
  const [subbalancerow, setSubbalancerow] = useState([]);
  const [tableAccountDetails, setTableAccountDetails] = useState([]);
  const styles = useStyles();
  const [moreButtonCustom, setMoreButton] = useState({});
  const useStyles1 = {
    TableContainer: {
      overflowY: 'auto',
      height: 'auto'
    },
    firstChild: {
      height: '40px',
      left: 'unset',
      boxShadow: 'unset !important'
    },
    lastChild: {
      boxShadow: 'unset !important',
      padding: 'unset',
      right: 'unset'
    },
    others: {
      tableBodyTableCell: {
        borderBottom: 'none'
      }
    }
  };
  const useStyles2 = {
    TableContainer: {
      overflowY: 'auto',
      height: 'auto',
      paddingLeft: '24px',
      paddingBottom: '15px'
    },
    firstChild: {
      height: '40px',
      left: 'unset',
      boxShadow: 'unset !important'
      // backgroundColor: ColorPallete.Color.White
    },
    lastChild: {
      boxShadow: 'unset !important',
      padding: 'unset',
      right: 'unset'
      // backgroundColor: ColorPallete.Color.White
    },
    others: {
      tableHeaderTableCell: {
        padding: '5px 19px',
        backgroundColor: ColorPallete.Color.White,
        color: ColorPallete.Color.Black
      },
      tableHeaderTableCellTypography: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        fontWeight: '700',
        color: ColorPallete.Color.Black
      },
      tableBodyTableCell: {
        padding: '8px 19px'
      }
    }
  };
  const tableHeaderStyle = {
    backgroundColor: ColorPallete.Color.White,
    color: ColorPallete.Text.Primary
  };
  const getSinglePagePayment = async (paymentID) => {
    const payment = await paymentSinglePageApi(paymentID);
    let singlePaymentObject = {
      ...payment,
      paymentAmount: formatCurrency(payment.paymentAmount),
      directedIndicator: payment.directedIndicator ? 'Yes' : 'No',
      postedDate: convertTimestamptoUSA(payment.postedDate),
      effectiveDate: convertTimestamptoUSA(payment.effectiveDate),
      payerName: '',
      billingAddress: ''
    };
    setPaymentDataList(singlePaymentObject);
    setTableAccountDetails([
      {
        accountId: accountDetails.accountNumber,
        client: accountDetails.clientName,
        paymentAmount: formatCurrency(payment.paymentAmount),
        dueToClient: '',
        trustAccount: ''
      }
    ]);
    const modifiedSubbalances = payment?.transactions?.map((balance) => {
      let temp = { ...balance };
        props.subbalanceType.forEach((type) => {
          if (balance.subBalanceCode == type.code) {
            temp.code = type.description;
          }
        });
        return temp;
    });
    let filtereddata = [];
    modifiedSubbalances.forEach((datas) => {
      filtereddata.push({
        ...datas,
        subBalanceCodeDescription: datas.code,
        paymentAmount: formatCurrencyAllowZero(datas.appliedAmount)
      });
    });

    setSubbalancerow(filtereddata);
  };
  useEffect(() => {
    if (data?.paymentID) {
      getSinglePagePayment(data.paymentID);
    }
  }, [data]);
  useEffect(() => {
    if (showMoreData) {
      setMoreButton({
        icon: <KeyboardArrowUpIcon style={{ color: ColorPallete.Button.Primary }} />
      });
    } else {
      setMoreButton({
        icon: <KeyboardArrowDownIcon style={{ color: ColorPallete.Button.Primary }} />
      });
    }
  }, [showMoreData]);

  return (
    <>
      <Grid item xs={8} container style={{ maxWidth: '50%' }}>
        {Object.keys(paymentDataList).length > 0 &&
          PaymentListStracture?.map((d) => {
            return (
              <Grid
                item
                xs={5}
                key={`${d.id}_${d.accessor}`}
                lg={d.size}
                style={{ paddingBottom: '24px' }}>
                <div className={styles.paymentDetailslabel}>{d.label}</div>
                <div className={styles.paymentDetailsAccesor}>
                  {paymentDataList[d.accessor] ?? 'NA'}
                </div>
              </Grid>
            );
          })}
      </Grid>

      {tableAccountDetails?.length > 0 && (
        <AETable
          tableHeaders={TableHeadersPayment}
          currentRecords={tableAccountDetails}
          styles={useStyles1}
          handleClick={() => {
            setShowMoreData(!showMoreData);
          }}
          moreButtonCustom={moreButtonCustom}
          applyMakeStyles={true}
          singlePaymentStyle={true}></AETable>
      )}

      {showMoreData && (
        <Grid item xs={8} container style={{ maxWidth: '50%', paddingTop: '20px' }}>
          <AETable
            tableHeaders={SubBalance}
            currentRecords={subbalancerow}
            styles={useStyles2}
            customTblHeaderStyle={tableHeaderStyle}
            showMoreButton="false"
            applyMakeStyles={true}
            changeAccessor={true}
            noSortingIcon={true}
            isSortBy="none"
            singlePaymentStyle={true}
          />
        </Grid>
      )}
      <Divider />
    </>
  );
}
function mapStateToProps(state) {
  return {
    subbalanceType: state.ConsumerDetailsReducer.subbalanceType
  };
}

export default connect(mapStateToProps, null)(SinglePayment);
