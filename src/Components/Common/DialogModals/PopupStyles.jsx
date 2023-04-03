import { makeStyles } from '@oasis/react-core';
import { ColorPallete } from '../../../theme/ColorPallete';

export default makeStyles(
  {
    dialogWrapper: {
      padding: '15px',
      position: 'relative',
      top: '8px',
      width: '100%',
      maxHeight: 'calc(100% - 64px)',
      minHeight: '10%',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    header: {
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      color: ColorPallete.Text.Primary,
      margin: '10px'
    },
    imageSource: {
      height: '20px',
      width: '20px',
      left: '2px',
      top: '4px'
      //marginTop: "10px",
    },
    flexDiv: {
      display: 'flex',
      padding: '4px 12px'
    },
    buttonDiv: {
      gap: '4px',
      border: '1px solid rgb(25, 118, 210) !important',
      //borderColor: ColorPallete.Button.PrimaryImp,
      borderRadius: '4px !important',
      height: '29px',
      color: '#1976d2 !important',
      cursor: 'pointer',
      marginTop: '10px !important',
      marginRight: '10px !important',
      textTransform: 'uppercase'
    },
    buttonDisabled: {
      borderColor: ColorPallete.Border.Primary
    },
    popupTitle: {
      display: 'flex',
      flexGrow: '1',
      alignItems: 'center'
    },
    cancelActionBtn: {
      marginTop: '10px !important',
      marginRight: '10px !important',
      padding: '4px 12px !important',
      color: `${ColorPallete.Color.AlertBackground} !important`,
      border: `1px solid ${ColorPallete.Color.AlertBackground} !important`,
      height: '29px',
      minWidth: '130px !important',
      textTransform: 'uppercase',
      '&:hover': {
        color: `${ColorPallete.Color.White} !important`,
        backgroundColor: `${ColorPallete.Color.AlertBackground} !important`
      }
    },
    thankyou: {
      width: '800px'
    }
  },
  { index: 1 }
);
