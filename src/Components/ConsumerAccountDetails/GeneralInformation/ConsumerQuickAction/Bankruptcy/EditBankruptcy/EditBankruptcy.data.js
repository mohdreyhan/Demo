import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('update.png')} width="16px" />,
    accessor: 'EditIcon',
    operation: []
  },
  {
    label: 'Update Bankruptcy Information',
    accessor: 'title',
    operation: []
  },
  {
    label: (
      <IconButton style={{ pointer: 'cursor' }}>
        <img src={extractImagePath('close.png')} width="16px" />
      </IconButton>
    ),
    accessor: 'CloseIcon',
    operation: ['click']
  }
];

export const dialogDataFooter = [
  {
    label: 'Cancel',
    accessor: 'cancelButton',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small'
  },
  {
    label: 'Submit',
    accessor: 'addButton',
    operation: ['click'],
    type: 'button',
    variant: 'contained',
    size: 'small'
  }
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: 'label',
    accessor: 'EditIcon',
    styles: {
      display: 'flex'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title',
    styles: {
      paddingLeft: '5px'
    }
  },
  {
    id: 31,
    size: 0.5,
    component: 'label',
    accessor: 'CloseIcon',
    styles: {
      cursor: 'pointer'
    }
  }
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: 'label',
    accessor: 'cancelButton',
    type: 'button'
  },
  {
    id: 2,
    component: 'label',
    accessor: 'addButton',
    type: 'submit'
  }
];

export const EditBankruptcyFormData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'isBankrupted',
    label: 'Bankrupt?',
    size: 'small',
    xs: 12,
    style: {
      width: '304px'
    },
    name: 'isBankrupted',
    required: true,
    default: true,
    disabled: true,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
        }
      ]
    }
  },
  {
    id: 2,
    type: 'select',
    accessor: 'bankruptcyTypeId',
    label: 'Bankruptcy Type',
    size: 'small',
    xs: 12,
    placeholder: 'Select Bankruptcy Type',
    name: 'bankruptcyTypeId',
    width: '280px',
    style: {
      marginRight: '16px',

    },
    options: {
      optionsData: [{}],
    }
  },
  {
    id: 3,
    type: 'date',
    accessor: 'fileDate',
    label: 'File Date',
    size: 'small',
    xs: 3.75,
    name: 'fileDate',
    required: false,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 4,
    type: 'input',
    accessor: 'caseNumber',
    label: 'Case Number',
    size: 'small',
    xs: 3.75,
    name: 'caseNumber',
    placeholder: 'Enter Case Number',
    // operation:['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 5,
    type: 'date',
    accessor: 'verificationDate',
    label: 'Verification Date',
    size: 'small',
    xs: 3,
    name: 'verificationDate',
    //required: false,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    width: '178px',
    required: true,
    style: {
      marginRight: '16px'
    },
    minDate: "2022-02-02"
  },
];

export const CourtInfoFormData = [
  {
    id: 1,
    type: 'input',
    accessor: 'name',
    label: 'Name',
    size: 'small',
    xs: 3.75,
    name: 'name',
    placeholder: 'Enter Court Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 2,
    type: 'input',
    accessor: 'district',
    label: 'District',
    size: 'small',
    xs: 3.75,
    name: 'district',
    placeholder: 'Enter District',
    style: {
      marginRight: '16px'
    },
  },
  {
    id: 3,
    type: 'input',
    accessor: 'division',
    label: 'Division',
    size: 'small',
    xs: 3,
    placeholder: 'Enter Division ',
    name: 'division',
    width: '178px',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: [{}]
    }
  },
  {
    id: 4,
    type: 'input',
    accessor: 'addressLine1',
    label: 'Address Line 1',
    size: 'small',
    xs: 12,
    name: 'addressLine1',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 5,
    type: 'input',
    accessor: 'addressLine2',
    label: 'Address Line 2',
    size: 'small',
    xs: 12,
    name: 'addressLine2',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 6,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City Name',
    operation: ['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },

  {
    id: 7,
    type: 'input',
    accessor: 'county',
    label: 'County',
    size: 'small',
    xs: 3.75,
    name: 'county',
    placeholder: 'Enter County',
    options: {},
    style: {
      marginRight: '16px'
    }
    // sendUserInputs: true
  },
  {
    id: 8,
    type: 'select',
    accessor: 'stateId',
    label: 'State',
    size: 'small',
    xs: 3,
    placeholder: 'Select State',
    name: 'stateId',
    width: '178px',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: [{}]
    }
  },
  {
    id: 9,
    type: 'patternInput',
    accessor: 'postalCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3.75,
    name: 'postalCode',
    placeholder: 'Enter Postal Code',
    operation: ['zipCodeFormat'],
    //sendUserInputs: true,
    mask: "",
    format: "######",
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 10,
    type: 'patternInput',
    accessor: 'phone',
    label: 'Phone/Ext',
    currentLabel: 'Phone/Ext',
    size: 'small',
    xs: 3.75,
    name: 'phone',
    operation: ['formatPhoneNumber'],
    currentXs: 3.75,
    placeholder: "(___) ___-____,_____",
    mask: "_",
    format: "(###) ###-#####",
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 11,
    type: 'input',
    accessor: 'website',
    label: 'Website',
    size: 'small',
    xs: 3,
    name: 'website',
    operation:["validateWebsite"],
    placeholder: 'Enter Website ',
    width: '178px',
    style: {
      marginRight: '16px'
    }
  },
];

//Trustee
export const TrusteeInfoFormData = [
  {
    id: 1,
    type: 'input',
    accessor: 'firstName',
    label: 'First Name',
    size: 'small',
    xs: 3.75,
    name: 'firstName',
    placeholder: 'Enter First Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 2,
    type: 'input',
    accessor: 'lastName',
    label: 'Last Name',
    size: 'small',
    xs: 3.75,
    name: 'lastName',
    placeholder: 'Enter Last Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 3,
    type: 'input',
    accessor: 'addressLine1',
    label: 'Address Line 1',
    size: 'small',
    xs: 12,
    name: 'addressLine1',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 4,
    type: 'input',
    accessor: 'addressLine2',
    label: 'Address Line 2',
    size: 'small',
    xs: 12,
    name: 'addressLine2',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 5,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City Name',
    operation: ['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 6,
    type: 'select',
    accessor: 'stateId',
    label: 'State',
    size: 'small',
    xs: 3.75,
    placeholder: 'Select State',
    name: 'stateId',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: [{}]
    }
  },
  {
    id: 7,
    type: 'patternInput',
    accessor: 'postalCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3,
    name: 'postalCode',
    placeholder: 'Enter Postal Code',
    operation: ['zipCodeFormat'],
    sendUserInputs: true,
    mask: "",
    format: "######",
    width: '178px',
  },
  {
    id: 8,
    type: 'patternInput',
    accessor: 'phone',
    label: 'Phone/Ext',
    currentLabel: 'Phone/Ext',
    size: 'small',
    xs: 3.75,
    name: 'phone',
    operation: ['formatPhoneNumber'],
    currentXs: 3.75,
    placeholder: "(___) ___-____,_____",
    mask: "",
    sendUserInputs: true,
    format: "(###) ###-#####"
  },

];


export const mockData = {
  id: "e8b643ea-3765-493e-bbb6-ff648a35eb80",
  fileDate: "2022-01-01T00:00:00.000Z",
  caseNumber: "Case",
  verificationDate: "2022-02-01T00:00:00.000Z",
  bankruptcyTypeId: "e66b5c4d-3d31-44d5-9031-696afa289821",
  courtInformation: {
    id: "4603b546-a4d0-4649-a26c-8915d0fd6aeb",
    name: "court1",
    district: "court3",
    division: "court2",
    addressLine1: "court4",
    addressLine2: "court5",
    city: "court6",
    county: "court7",
    stateId: "5959d9c9-d647-4664-a664-9ef2f0a6237e",
    postalCode: "123456789",
    phone: "1234567890",
    website: "www"
  },
  trusteeInformation: {
    id: "bc3e3487-46f4-4df2-b0d6-4792cc576ff0",
    firstName: "trustee1",
    lastName: "trustee2",
    addressLine1: "trsutee3",
    addressLine2: "trustee4",
    city: "trustee5",
    stateId: "5959d9c9-d647-4664-a664-9ef2f0a6237e",
    postalCode: "123456789",
    phone: "1234567890,123"
  }
}
