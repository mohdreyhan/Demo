import { makeStyles } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';

export default makeStyles(
  {
    individualGridStyle: {
      marginTop: '24px',
      wordBreak: 'break-word',
    },
    consumerDetailslabel: {
      fontFamily: 'poppins',
      fontStyle: 'regular',
      fontWeight: '400 !important',
      fontSize: '12px !important',
      color: ColorPallete.Text.Secondary
    },
    consumerDetailsAccesor: {
      fontFamily: 'poppins',
      fontStyle: 'regular',
      fontWeight: '400 !important',
      fontSize: '14px !important',
      color: ColorPallete.Color.Black,
      overflowWrap: 'break-word'
    },
    consumerDetailsTitle: {
      fontFamily: 'poppins',
      fontStyle: 'regular',
      fontWeight: '700 !important',
      fontSize: '14px !important',
      color: ColorPallete.Text.Primary,
    },
  },
  { index: 1 }
);
