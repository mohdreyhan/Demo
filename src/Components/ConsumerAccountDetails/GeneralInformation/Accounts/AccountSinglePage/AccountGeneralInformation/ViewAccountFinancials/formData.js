export const defaultSelectId = 'SELECT_1';

export const FinancialFormPayloadData = {
  balance: '',
  accountage: '',
  contingencyfee: 'SELECT_1',
  interestrate: '12%',
  interestbaseamount: '$1200',
  placementdate: '2022/10/10',
  placementamount: '$12000'
};

export const FinancialFormData = [
  {
    id: '1',
    type: 'input',
    name: 'balance',
    label: 'Balance',
    spacing: 4,
    required: false,
    placeHolder: 'Enter Balance',
    typeFomart: 'text'
  },
  {
    id: '2',
    type: 'input',
    name: 'accountage',
    label: 'Account Age',
    spacing: 4,
    required: false,
    placeHolder: 'Enter Account Age'
  },
  {
    id: '2',
    type: 'space',
    name: 'accountage',
    label: 'Account Age',
    spacing: 4,
    required: false,
    placeHolder: 'Enter Description'
  },
  {
    id: '3',
    type: 'select',
    name: 'contingencyfee',
    label: 'Contingency Fee',
    spacing: 4,
    required: true,
    idaccessor: 'contingencyfeeId',
    valueaccessor: 'name',
    value: defaultSelectId
  },
  {
    id: '4',
    type: 'input',
    name: 'interestrate',
    label: 'Interest Rate',
    spacing: 4,
    required: true,
    placeHolder: 'Enter Interest Rate'
  },
  {
    id: '5',
    type: 'input',
    name: 'interestbaseamount',
    label: 'Interest Base Amount',
    spacing: 4,
    required: true,
    placeHolder: 'Enter Interest Base Amount'
  },
  {
    id: '6',
    type: 'input',
    name: 'placementdate',
    label: 'Placement Date',
    spacing: 4,
    required: false,
    placeHolder: 'Enter Placement Date'
  },
  {
    id: '7',
    type: 'input',
    name: 'placementamount',
    label: 'Placement Amount',
    spacing: 4,
    required: false,
    placeHolder: 'Enter Placement Amount'
  }
];
