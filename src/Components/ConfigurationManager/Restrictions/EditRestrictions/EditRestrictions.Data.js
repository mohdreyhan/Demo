import { extractImagePath } from "../../../Common/commonfunctions";

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath("update.png")} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Update Restrictions",
    accessor: "title",
    operation: [],
  },
  {
    label: <img src={extractImagePath("close.png")} />,
    accessor: "CloseIcon",
    operation: ["click"],
  },
];

export const dialogDataFooter = [
  {
    label: "Cancel",
    accessor: "cancelButton",
    operation: ["click"],
    type: "button",
    variant: "outlined",
    size: "small",
  },
  {
    label: "Update",
    accessor: "updateButton",
    operation: ["click"],
    type: "button",
    variant: "contained",
    size: "small",
  },
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: "label",
    accessor: "AddIcon",
    styles: {
      display: "flex",
    },
  },
  {
    id: 2,
    size: 11,
    component: "label",
    accessor: "title",
    styles: {
      paddingLeft: "5px",
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px"
    }
  },
  {
    id: 3,
    size: 0.5,
    component: "label",
    accessor: "CloseIcon",
    styles: {
      cursor: "pointer",
    },
  },
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: "label",
    accessor: "cancelButton",
    type: "button"
  },
  {
    id: 2,
    component: "label",
    accessor: "updateButton",
    type: "submit"
  },
];

export const EditRestrictionFormData = [
  {
    id: 1,
    type: "input",
    accessor: "validationMethod",
    label: "Validation Method",
    required: true,
    size: "small",
    xs: 6,
    placeholder: "Enter Validation Method",
    name: "validationMethod",
    disabled: true,
    fieldType: 'text'
  },
  {
    id: 2,
    type: "input",
    accessor: "deliveryDays",
    label: "Delivery Days",
    required: true,
    size: "small",
    xs: 1,
    name: "deliveryDays",
    fieldType: 'tel',
    onKeyPress: true,
    onKeyPressFn: (event) => {
      if (!`${event.target.value}${event.key}`.match(/^\d*$/)) {
        event.preventDefault();
      }
    }
  },
  {
    id: 3,
    type: "input",
    accessor: "validationPeriodWaitDays",
    label: "Validation Period Wait Days",
    required: true,
    size: "small",
    xs: 1,
    name: "validationPeriodWaitDays",
    fieldType: 'tel',
    onKeyPress: true,
    onKeyPressFn: (event) => {
      if (!`${event.target.value}${event.key}`.match(/^\d*$/)) {
        event.preventDefault();
      }
    }
  }
];