import { makeStyles } from '@oasis/react-core';

export default makeStyles({
  toUppercase: {
    textTransform: 'uppercase'
  },
  mainContainerStatic: {
    '& .MuiTableContainer-root': {
      height: 'calc(100vh - 161px)'
    }
  },
  scrollContainer: {
    maxHeight: '350px',
    overflowY: 'auto',
    paddingRight: '2px'
  },
  disableInput: {
    color: '#6B6B6B !important',
    background: '#e0e0df !important',
    mixBlendMode: 'normal'
  },
  buttonContainer: {
    display: 'flex',
    padding: '20px 0px 5px 0',
    flexDirection: 'row-reverse',
    fontFamily: '"Poppins"'
  },
  btnDefault: {
    marginRight: '2%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    color: '#006FBA',
    border: '1px solid #006FBA !important',
    textTransform: 'none'
  },
  btnPrimary: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    background: '#006FBA !important',
    fontSize: '14px',
    textTransform: 'none'
  },
  textinputs: {
    width: '100% !important',
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        padding: '7px'
      }
    },
    '& .Mui-disabled': {
      background: '#F0EFEE !important',
      color: '#444 !important',
      mixBlendMode: 'normal'
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Poppins !important',
      width: '100%'
    }
  },
  selectinputs: {
    height: '32px !important',
    width: '100% !important',
    margin: '3px 0px !important',
    padding: '0px 0 !important',
    '& .Mui-disabled': {
      background: '#F0EFEE !important',
      color: '#444 !important',
      mixBlendMode: 'normal',
      padding: '4.3px 4px'
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Poppins !important'
    }
  },
  textgrid: {
    '& .MuiFormControl-root': {
      width: '100% !important',
      '& .MuiOutlinedInput-root': {
        '& .MuiSelect-iconOutlined': {
          borderLeft: '1px solid #ccc',
          top: 'calc(50% - 13px) !important',
          height: '25px !important',
          right: '0.1em !important',
          width: '30px'
        },
        '& .MuiSelect-iconOpen': {
          borderRight: '1px solid #ccc !important',
          borderLeft: '0px solid #ccc !important'
        }
      },
      '& .MuiFormHelperText-root': {
        fontFamily: 'Poppins !important'
      }
    }
  },
  flexDiv1: {
    display: 'flex',
    padding: '20px 0px 5px 0',
    flexDirection: 'row-reverse',
    fontFamily: 'Poppins'
  },
  primarybuttonDiv: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0px 12px',
    marginRight: '5px',
    gap: '4px',
    background: '#006FBA !important',
    border: '1px solid #006FBA !important',
    borderRadius: '4px',
    height: '29px',
    lineHeight: '27px',
    color: '#FFFFFF',
    cursor: 'pointer',
    textTransform: 'none',
    fontSize: '14px',
    '&.MuiButton-root': {
      minHeight: '29px',
      padding: '0px 12px',
      fontFamily: 'Poppins',
      margin: '0px 4px'
    }
  },
  buttonDiv: {
    background: '#FFFFFF',
    border: '1px solid #006FBA',
    borderRadius: '4px',
    color: '#003F74',
    marginRight: '5px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0px 12px',
    gap: '4px',
    height: '29px',
    lineHeight: '27px',
    cursor: 'pointer',
    textTransform: 'none',
    fontSize: '14px',
    '&.MuiButton-root': {
      minHeight: '29px',
      fontFamily: 'Poppins',
      padding: '0px 12px',
      margin: '0px 4px'
    }
  },
  activeSelectItem: {
    background: '#E0EEF7 !important',
    borderRadius: '4px',
    padding: '0px 8px',
    border: '1px solid #66A9D6',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '17px'
  },
  inactiveSelectedItem: {
    backgroundColor: '#E0E0DF',
    borderRadius: '4px',
    padding: '0px 8px',
    border: '1px solid #A6A6A6',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '17px'
  },
  contingencyMenuitems: {
    '& .MuiPaper-root': {
      maxWidth: '16%',
      overflowX: 'auto',
      maxHeight: '40%'
    }
  }
});
