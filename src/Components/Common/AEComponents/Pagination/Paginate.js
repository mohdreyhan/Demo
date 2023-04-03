import * as React from 'react';
import { Pagination, Stack, TableFooter } from "@oasis/react-core";

let limit = 5;

function Paginate(props) {

  const [noOfPages, setNoOfPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = React.useState(0);

  async function setPaginationVariables() {
    let arr = [...props.consumerAssocAccounts]
    const pages = arr.length/limit;
    setNoOfPages(Math.ceil(pages))
    const indexOfLastRecord = currentPage * limit
    const currentReccord = props.consumerAssocAccounts.slice(indexOfFirstRecord, indexOfLastRecord)
    props.getCurrentRecords && props.getCurrentRecords(currentReccord)
  }

  React.useEffect(() => {
    setPaginationVariables()
  }, [props.consumerAssocAccounts])


  const handlePageChange = async (event, value) => {
    if (value > 0 && value <= noOfPages) {
      setCurrentPage(value);
      const indexOfLastRecord = value * limit
      const indexOfFirstRecords = indexOfLastRecord - limit
      setIndexOfFirstRecord(indexOfFirstRecords);
      const currReccords = props.consumerAssocAccounts.slice(indexOfFirstRecords, indexOfLastRecord)
      props.getCurrentRecords(currReccords)
    }
  };

  return (
    <>
      {noOfPages > 1 && (
        <TableFooter
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0px",
          }}
        >
          <Stack spacing={2}>
            <Pagination variant="outlined"
              hideNextButton={noOfPages === 1}
              hidePrevButton={noOfPages === 1}
              count={noOfPages == 1 ? 0 : noOfPages}
              page={currentPage}
              onChange={handlePageChange} />
          </Stack>
        </TableFooter>
      )}
    </>

  );
}

export default Paginate;
