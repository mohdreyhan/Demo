import { makeStyles } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';

export default makeStyles(
  {
    tableContainer: {
      // height: "calc(100vh - 169px)",
      // overflow: "auto",
    },
    tableHeaderStyle: {
      '& tr': {
        '& th': {
          fontFamily: 'Poppins',
          position: 'sticky',
          padding: '0px 19px',
          fontSize: '12px',
          fontWeight: '700',
          color: ColorPallete.Table.Secondary,
          backgroundColor: 'rgb(224, 224, 224)',
          '&:first-child': {
            paddingLeft: '30px',
            left: 'unset',
            zIndex: '88',
            position: 'sticky'
          },
          '&:last-child': {
            padding: '0px 5px',
            right: '0px',
            boxShadow: '-2px 0px 2px rgba(68 68 68 / 40%)' //-2px 0px 2px rgba(68, 68, 68, 0.4)
          },
          '& .selected td': {
            color: '#000000'
          }
        }
      }
    },
    tableBodyStyle: {
      '& tr': {
        '& td': {
          borderBottom: '1px solid rgba(224, 224, 224, 1) !important',
          fontFamily: 'Poppins',
          padding: '0px 19px',
          fontSize: '14px',
          fontWeight: '400',
          '&:first-child': {
            paddingLeft: '30px',
            left: 'unset',
            backgroundColor: ColorPallete.Color.White
          },
          '&:last-child': {
            padding: '0px 5px',
            right: '0px',
            backgroundColor: ColorPallete.Color.White,
            boxShadow: '-2px 0px 2px rgba(68 68 68 / 40%)',
            position: 'sticky'
          }
        }
      }
    },
    disputeTableRow: {
      height: '40px'
    }
  },
  { name: 'DataTableStyle' }
);
