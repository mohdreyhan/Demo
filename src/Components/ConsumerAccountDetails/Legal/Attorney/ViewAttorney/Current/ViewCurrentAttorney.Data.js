export const TableHeaders = [
  {
    label: 'Name',
    accessor: 'attorneyFullName',
    operation: [],
    style: { align: 'left' }
  },
  {
    label: 'FIRM ',
    accessor: 'firmName',
    operation: [],
    style: { align: 'right' }
  },
  {
    label: 'CONTACT NAME ',
    accessor: 'contactFullName',
    operation: [],
    style: { align: 'right' }
  },
  {
    label: 'ADDRESS',
    accessor: 'address',
    operation: ['formatAddress'],
    style: {
      align: 'left',
      display: 'block',
      width: '146px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer'
    }
  },
  {
    label: 'MOBILE NUMBER ',
    accessor: 'mobileNumber',
    operation: ['formatPhoneNumber'],
    style: { align: 'right' }
  },
  {
    label: 'OFFICE NUMBER',
    accessor: 'officeNumber',
    operation: ['formatPhoneNumber'],
    style: { align: 'right' }
  },
  {
    label: 'FAX NUMBER',
    accessor: 'faxNumber',
    operation: ['formatPhoneNumber'],
    style: { align: 'right' }
  },
  {
    label: 'EMAIL ADDRESS',
    accessor: 'email',
    operation: [],
    style: { align: 'left' }
  },
  {
    label: 'BAR NUMBER',
    accessor: 'barcode',
    operation: [],
    style: { align: 'left' }
  }
];
