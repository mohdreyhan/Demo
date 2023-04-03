import { Button } from '@mui/material';
import { ColorPallete } from '../../../theme/ColorPallete';
import CustomFieldIcon from '../../../../Icons/CustomFieldIcon.png'
export const ToolbarDataArray = [

    {
      label: <img src={CustomFieldIcon} />,
      accessor: "icon",
    },
  {
    label: 'Custom Fields',
    accessor: 'heading'
  },
  {
    label: (
      <Button
        variant="outlined"
        style={{
          fontFamily: 'Poppins',
          fontSize: '14px',
          lineHeight: '21px',
          height: '29px',
          textTransform: 'capitalize',
          color: ColorPallete.Button.Secondary,
          border: `1px solid ${ColorPallete.Button.Primary}`
        }}>
        <div>Add New Custom Field</div>
      </Button>
    ),
    accessor: 'moreButton',
    operation: ['click']
  }
];

export const ToolbarStructureArray = [
  {
    id: 1,
    tag: "div",
    size: 0.55,
    component: "label",
    accessor: "icon",
    styles: {
      alignSelf: "center",
      display: "flex",
      paddingRight: "8px",
    },
  },
  {
    id: 2,
    tag: "div",
    size: 2,
    component: "label",
    accessor: "heading",
    styles: {
      alignSelf: "left",
      display: "flex",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      color: "#444444",
      paddingRight: "24px",
      width: "auto",
      whiteSpace: "nowrap",
      fontFamily: "Poppins"
    },
  },
  {
    id: 3,
    tag: "div",
    size: 11,
    component: "label",
    accessor: "moreButton",
    styles: {
      display: "flex",
      width: "100%",
      alignSelf: "right",
      justifyContent: 'right'
    },
  },

];
