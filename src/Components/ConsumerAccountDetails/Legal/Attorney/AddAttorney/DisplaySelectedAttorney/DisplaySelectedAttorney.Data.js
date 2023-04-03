export const SelectedAttorneyData = [
  {
    label: 'Attorney Name',
    accessor: 'attorneyName'
  },
  {
    label: 'Firm Name',
    accessor: 'firmName',
    operation: ['getssn']
  },
  {
    label: 'Contact Name',
    accessor: 'contactName',
    operation: ['convertTimestamptoUSA']
  },
  {
    label: 'Address',
    accessor: 'address'
  },
  {
    label: 'Mobile Number',
    accessor: 'mobileNumber',
    operation: ['formatPhoneNumber'],
    format: '(###) ###-####',
  },
  {
    label: 'Office Number',
    accessor: 'officeNumber',
    operation: ['formatPhoneNumber'],
    format: '(###) ###-####',
  },
  {
    label: 'Fax Number',
    accessor: 'faxNumber',
    operation: ['formatPhoneNumber'],
    format: '(###) ###-####',
  },
  {
    label: 'Email Address',
    accessor: 'emailAddress',
    operation: ['formatEmailAddress']
  },
  {
    label: 'Bar Number',
    accessor: 'barNumber'
  }
];
