import { Button } from '@mui/material';
import { ColorPallete } from '../../../theme/ColorPallete';

export const ToolbarData = [
  {
    label: 'Status Code Prioritization',
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
        <div>Add Status Code Priority</div>
      </Button>
    ),
    accessor: 'moreButton',
    operation: ['click']
  }
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: 'div',
    size: 3,
    component: 'label',
    accessor: 'heading',
    styles: {
      alignSelf: 'center',
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      color: ColorPallete.Text.Primary,
      paddingRight: '24px',
      width: 'auto',
      whiteSpace: 'nowrap',
      fontFamily: "Poppins",
      lineHeight: "24px"
    }
  },

  {
    id: 2,
    tag: 'div',
    size: 10,
    component: 'label',
    accessor: 'moreButton',
    styles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      variant: 'outlined'
    }
  }
];
