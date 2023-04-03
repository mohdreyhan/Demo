import { makeStyles } from '@oasis/react-core';
import { ColorPallete } from '../../../../../../theme/ColorPallete.js';

export default makeStyles(
  {
    label: {
      fontFamily: 'poppins',
      fontStyle: 'regular',
      fontWeight: '400 !important',
      fontSize: '12px !important',
      color: ColorPallete.Text.Secondary
    },
    value: {
      fontFamily: 'poppins',
      fontStyle: 'normal',
      fontWeight: '400 !important',
      fontSize: '14px !important',
      color: ColorPallete.Color.Black,
      whiteSpace: 'normal',
      lineBreak: 'anywhere'
    },
    layout: {
      borderRadius: '8px',
      padding: '8px 8px 8px 8px',
      minHeight: '43vh',
      backgroundColor: ColorPallete.Color.LightGrey
    }
  },

  { index: 1 }
);
