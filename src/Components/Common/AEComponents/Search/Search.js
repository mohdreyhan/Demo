import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Autocomplete,
  Grid,
  Divider,
  Box,
  SearchIcon,
  ClearIcon,
  SearchOffIcon,
  Typography,
  CircularProgress,
  InputAdornment,
  styled,
  TextField
} from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete.js';
import useStyles from './Search.style.js';
import {
  phoneNumberFormatSearch,
  phoneNumberFormatSplitted,
  zipCodeFormat,
  highlistbasedOnsearch,
  zipCodeFormatSplitted,
  highlightSearch,
  returnValueOrDefaultNested 
} from '../../../Common/commonfunctions.js';
import SelectButton from '../DropDown/SelectButton.js';
import { SearchMethodData } from './Search.Data.js';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: ColorPallete.Border.Primary
    },
    '&:hover fieldset': {
      borderColor: ColorPallete.Border.Primary
    },
    '&.Mui-focused fieldset': {
      borderColor: ColorPallete.Border.Primary
    }
  }
});

function Search(props) {
  const {
    searchDataAfterApiCall,
    handleClick,
    handlePartialSearch,
    handleOptionSelection,
    getResponsibleType,
    showSearchMethod = false
  } = props;
  const autoRef = useRef(null);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [screenLoaded, setScreenLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [autoFocusOnSelect, setAutoFocusOnSelect] = useState(false);
  const [autoFocusOnSelect1, setAutoFocusOnSelect1] = useState(1);

  const handleChange = (event) => {
    setInputValue('');
    setOpen(false);
    setAutoFocusOnSelect(true);
    setAutoFocusOnSelect1(autoFocusOnSelect1 + 1);

    const obj = {
      [event.target.name]: event.target.value
    };
    props.setSearchMethod(obj);
  };

  //Dynamically changing placeholder based on selection
  const placeHolderChanger = (searchMethod) => {
    if (searchMethod) {
      const SearhedVal = SearchMethodData[0].options.optionsData.filter(
        (val) => val.value == searchMethod.type
      );
      return SearhedVal[0]?.placeHolder;
    }
  };

  const updateLoader = (input, len) => {
    if (input.length > len) setLoader(true);
    else setLoader(false);
  };

  //Regex matching based on selection we are allwoing number / charecters
  const regexTest = (searchMethodVal, val) => {
    if (searchMethodVal && searchMethodVal.type) {
      switch (searchMethodVal.type) {
        case 'NAME':
          if (val.length <= 150) {
            if (val.split(' ').length <= 2) return val;
          }
          return false;

        case 'CS':
          if (val.length <= 150) {
            updateLoader(val, 2);
            return val;
          }
          return false;
        
        case 'PN':
          updateLoader(val, 3);
          return val;
        case 'AN':
          return /^(?=.{0,19}$)\d+$/g.test(val);
          
        case 'SSN':
          updateLoader(val, 2);
          return /^(?=.{0,4}$)\d+$/g.test(val);

        case 'PC':
        default:
          updateLoader(val, 2);
          return val;
      }
    } else {
      return /^[A-Z0-9 ]+$/i.test(val);
    }
  };

  // Cursor Position for Phone Number field
  const getCharPosition = (caret, newVal, inputValue) => {
    switch (caret) {
      case 1:
      case 2:
        // If the new value length is 2 and less than or equal to the input value length, move caret left by 1
        // If the new value length is 6 and greater than the input value length, move caret right by 1
        caret=returnValueOrDefaultNested(
          [newVal.length == 2 && newVal.length <= inputValue.length,newVal.length == 6 && newVal.length > inputValue.length],
          [caret - 1,caret + 1],
          caret
        )
        // caret = newVal.length == 2 && newVal.length <= inputValue.length ? caret - 1 :
        // (newVal.length == 6 && newVal.length > inputValue.length) ? caret + 1 : caret;
        break;
  
      case 3:
        // If the new value length is greater than the input value length and less than 4, move caret to the end
        caret = newVal.length > inputValue.length && inputValue.length < 4 ? 6 : caret;
        break;
  
      case 4:
      case 5:
        // If the new value length is greater than the input value length, move caret to the end
        caret = newVal.length > inputValue.length ? 7 : caret;
        break;
  
      case 10:
        // If the new value length is greater than the input value length, move caret right by 1
        caret = newVal.length > inputValue.length ? caret + 1 : caret;
        break;
  
      default:
        // For all other cases, keep caret at the same position
        break;
    }
  
    return caret;
  };
  



  const setCursorPosition = (modifitedCaret, element) => {
    window.requestAnimationFrame(() => {
      element.selectionStart = modifitedCaret;
      element.selectionEnd = modifitedCaret;
    });
  };

  const getNameForGivenID = (array, val) => {
    return array.find((data) => data.id === val)?.name;
  };
  const accountListAppend = (arr, acceser) => {
    return arr.map((data) => {
      const tempAc = data.accounts;
      data[acceser] = data[acceser].map((value) => {
        const state = value?.state && getNameForGivenID(props.getstates, value?.state);
        const country = value?.country && getNameForGivenID(props?.countriesData, value?.country);
        return { ...value, accounts: tempAc, countryName: country, stateName: state };
      });
      return data;
    });
  };
  //converting api response based on selection
  //here if it's phone we are pusing ph data to accounts list
  const convertSearchDataAfterApiCall = (searchDataAfterApiCall) => {
    if (props.searchMethod?.type == 'PN') {
      accountListAppend(searchDataAfterApiCall, 'phones');
    }
    if (props.searchMethod?.type == 'PC' || props.searchMethod?.type == 'CS') {
      accountListAppend(searchDataAfterApiCall, 'addresses');
    }
    return searchDataAfterApiCall;
  };

  useEffect(() => {
    if (!screenLoaded || inputValue?.length > 0) {
      let modifiedResult = convertSearchDataAfterApiCall(searchDataAfterApiCall);
      setSearchResults(modifiedResult);
      setOpen(screenLoaded);
      setScreenLoaded(true);
      setLoader(false);
    }
  }, [searchDataAfterApiCall, searchResults]);

  //remove text from autocomplete [by pressing cross icon]
  const removeText = () => {
    setInputValue('');
    setOpen(false);
    autoRef?.current?.setValue(null);
  };

  const handleSelection = (value1, value2) => {
    setLoader(true);
    handleOptionSelection(value1, value2);
    setInputValue(null);
    setOpen(false);
    setKey(key + 1);
  };

  //common option list
  let commonOptionList = (value, option, SplittedData, index, remainingAddress) => {
    return (
      <>
        {showSearchMethod && (
          <div style={{ marginTop: index != 0 ? '14px' : '2px' }}>
            <div
              style={{
                fontFamily: 'Poppins',
                fontSize: 12,
                marginbottom: '10px'
              }}>
              {props?.searchMethod?.type != 'CS' && (
                <>
                  <span style={{ fontWeight: 'bold' }}>{inputValue}</span>
                  {SplittedData}
                </>
              )}
            </div>
            {props?.searchMethod?.type == 'CS' && (
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 12
                }}
                dangerouslySetInnerHTML={{
                  __html: `${highlistbasedOnsearch(inputValue, SplittedData) + remainingAddress}`
                }}>
              </div>
            )}

            <div
              style={{
                fontFamily: 'Poppins',
                fontSize: 12
              }}>
              Name: {`${option.firstName} ${option.lastName}`}
            </div>
          </div>
        )}

        {value?.accounts?.map((val, index) => {
          return [
            <>
              <Grid
                container
                key={`accounts${val?.originalAccountNumber}_${index + 1}`}
                item
                spacing={0}
                onClick={() => handleSelection(val, option.customerId)}
                className={styles.HighlightHover}>
                <React.Fragment>
                  <Grid item xs={8} className={styles.UnderLineHoverStyle}>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        color: ColorPallete.Text.Primary
                      }}>
                      CRID: {val?.originalAccountNumber}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        color: ColorPallete.Text.Primary
                      }}>
                      {getResponsibleType(val.relationshipTypeId)} (
                      {val?.active ? 'Active' : 'In Active'})
                    </div>
                  </Grid>
                </React.Fragment>
              </Grid>
            </>
          ];
        })}
      </>
    );
  };

  //Name view
  let nameoptionList = (value) => {
    const Name = `${value.firstName} ${value.lastName}`;
    return (
      <>
        {showSearchMethod && (
          <div
            style={{
              fontFamily: 'Poppins',
              fontSize: 12
            }}
            dangerouslySetInnerHTML={{
              __html: `Name: ${highlistbasedOnsearch(inputValue, Name)}`
            }}></div>
        )}
        {value?.accounts?.map((val, index) => {
          return [
            <>
              <Grid
                container
                key={`accounts${val?.originalAccountNumber}_${index + 1}`}
                item
                spacing={0}
                onClick={() => handleSelection(val, value.customerId)}
                className={styles.HighlightHover}>
                <React.Fragment>
                  <Grid item xs={8} className={styles.UnderLineHoverStyle}>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        color: ColorPallete.Text.Primary
                      }}>
                      CRID: {val?.originalAccountNumber}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        color: ColorPallete.Text.Primary
                      }}>
                      {getResponsibleType(val.relationshipTypeId)} (
                      {val?.active ? 'Active' : 'In Active'})
                    </div>
                  </Grid>
                </React.Fragment>
              </Grid>
            </>
          ];
        })}
      </>
    );
  };
  //List based on result selection we are showing diffrent drop
  let returnResult = (option) => {
    if (props?.searchMethod?.type == 'PN') {
      return (
        <>
          {option?.phones.map((value, index) => {
            let phoneNumberSplitted = phoneNumberFormatSplitted(value.number, inputValue);
            return [commonOptionList(value, option, phoneNumberSplitted, index)];
          })}
        </>
      );
    } else if (props?.searchMethod?.type == 'PC') {
      return (
        <>
          {option?.addresses.map((value, index) => {
            let postalCodeSplitted = zipCodeFormatSplitted(value.zip, inputValue);
            return [commonOptionList(value, option, postalCodeSplitted, index)];
          })}
        </>
      );
    } else if (props?.searchMethod?.type == 'CS') {
      return (
        <>
          {option?.addresses.map((value, index) => {
            let cityStreet = value.address1 + ' ' + value.city + ' ';
            let remainingAddress = value.stateName + ' ' + value.countryName + ', ' + value.zip;
            return [commonOptionList(value, option, cityStreet, index, remainingAddress)];
          })}
        </>
      );
    } else if (props?.searchMethod?.type == 'NAME') {
      return nameoptionList(option);
    } else if (props?.searchMethod?.type == 'SSN') {
      return (
        <>
          {' '}
          {showSearchMethod && (
            <div>
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  marginbottom: '10px'
                }}>
                {highlightSearch(option?.ssn, inputValue)}
              </div>
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 12
                }}>
                Name: {`${option.firstName} ${option.lastName}`}
              </div>
            </div>
          )}
          {option?.accounts.map((val, index) => {
            return [
              <>
                <Grid
                  container
                  key={`account${val?.originalAccountNumber}_${index + 1}`}
                  item
                  spacing={0}
                  onClick={() => handleSelection(val, option.customerId)}
                  className={styles.HighlightHover}>
                  <React.Fragment>
                    <Grid item xs={8} className={styles.UnderLineHoverStyle}>
                      <div
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          color: ColorPallete.Text.Primary
                        }}>
                        CRID: {val.originalAccountNumber}
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          color: ColorPallete.Text.Primary
                        }}>
                        {getResponsibleType(val.relationshipTypeId)} (
                        {val?.active ? 'Active' : 'In Active'})
                      </div>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </>
            ];
          })}
        </>
      );
    } else {
      return (
        <>
          {option?.accounts.map((val, index) => {
            return [
              <>
                {showSearchMethod && (
                  <div>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        fontWeight: 'bold',
                        marginbottom: '10px'
                      }}>
                      {val.accountNum}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: 12
                      }}>
                      Name: {`${option.firstName} ${option.lastName}`}
                    </div>
                  </div>
                )}

                <Grid
                  container
                  key={`acc${val?.originalAccountNumber}_${index + 1}`}
                  item
                  spacing={0}
                  onClick={() => handleSelection(val, option.customerId)}
                  sx={{
                    ...(showSearchMethod && {
                      marginBottom: '8px'
                    })
                  }}
                  className={styles.HighlightHover}>
                  <React.Fragment>
                    <Grid item xs={8} className={styles.UnderLineHoverStyle}>
                      <div
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          color: ColorPallete.Text.Primary
                        }}>
                        CRID: {val.originalAccountNumber}
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          color: ColorPallete.Text.Primary
                        }}>
                        {getResponsibleType(val.relationshipTypeId)} (
                        {val?.active ? 'Active' : 'In Active'})
                      </div>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </>
            ];
          })}
        </>
      );
    }
  };
  const checkandHandlePartialSearch = (e, value) => {
    const keywords = value.split(' ');
    if (keywords[0]?.length > 2 || keywords[1]?.length > 2) {
      updateLoader(value, 2);
      handlePartialSearch(e, value);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        height: '32px',
        borderColor: ColorPallete.Border.Primary,
        borderRadius: '8px '
      }}>
      <div style={{ display: 'flex' }}>
        {showSearchMethod && (
          <>
            <div
              style={{
                alignItems: 'left',
                alignContent: 'left',
                textAlign: 'left'
              }}>
              <SelectButton
                showSearchMethod={true}
                data={SearchMethodData[0]}
                defaultValue={'AN'}
                captureInputs={handleChange}
              />
            </div>

            <Divider
              sx={{
                height: 31,
                // m: 0.5,
                width: '2px',
                margin: '0.1px',
                color: ColorPallete.Button.Tertiary
              }}
              orientation="vertical"
            />
          </>
        )}
        <div key={autoFocusOnSelect1}>
          <Autocomplete
            sx={{
              width: 500,
              height: 32,
              border: 'none',
              // borderColor: ColorPallete.Color.white,
              borderRadius: '8px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '& .MuiTextField-root': {
                height: 32,
                width: 500,
                borderRadius: '8px'
                // marginBottom: '4px'
              },
              '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                padding: '4px 8px 4px 8px',
                height: 32
              },
              '& .MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '4px 8px 4px 8px'
                // boxSizing: 'borderBox'
              },
              '& .MuiFormControl-root .MuiOutlinedInput-root': {
                paddingRight: '15px !important',
                border: 0
              }
            }}
            ListboxProps={{
              style: {
                maxHeight: '250px',
                border: `1px solid ${ColorPallete.Border.Primary}`,
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                margin: '0 0 0 0'
              },
              position: 'bottom-start'
            }}
            id="custom-input-demo"
            open={open}
            onClose={() => setOpen(false)}
            onChange={(val) => {
              setInputValue('');
            }}
            value={null}
            ref={autoRef}
            // Commented for Name & Address Cursor moving to end
            key={searchResults.length}
            clearOnBlur={false}
            blurOnSelect={true}
            inputValue={inputValue}
            onInputChange={(e, value,) => {
              if (value) {
                if (regexTest(props.searchMethod, value)) {
                switch (props?.searchMethod?.type) {
                  case 'PN':
                    let newVal = phoneNumberFormatSearch(value, inputValue);
                    if (newVal.length < 3) {
                      setOpen(false);
                      setLoader(false);
                      }
                    let caret = event.target.selectionStart;
                    const element = event.target;
                    let modifitedCaret;
                    modifitedCaret = getCharPosition(caret, newVal,inputValue);
                    setInputValue(newVal);
                    handlePartialSearch(e, newVal);
                    setCursorPosition(modifitedCaret, element);
                    break;
                  case 'PC':
                    let zipcodeVal = zipCodeFormat(value);
                    if (zipcodeVal.length < 3) {
                      setOpen(false);
                    }
                    setInputValue(zipcodeVal);
                    handlePartialSearch(e, zipcodeVal);
                    break;
                  case 'NAME': 
                    setInputValue(value);
                    checkandHandlePartialSearch(e, value);
                    break;
                  case 'AN': 
                    setInputValue(value);
                    handleClick(e, value, setLoader);
                    break;
                  default:
                    setInputValue(value);
                    handlePartialSearch(e, value);
                  }
                  handleClick(e, value, setLoader);
                }
              } else {
                setInputValue(value);
                setOpen(false);
              }
            }}
            options={searchResults}
            filterOptions={() => searchResults}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <CssTextField
                  autoFocus={autoFocusOnSelect ?? false}
                  variant="outlined"
                  size="small"
                  value={inputValue}
                  onKeyPress={(e) => handleClick(e, inputValue,setLoader)}
                  placeholder={
                    showSearchMethod
                      ? `${placeHolderChanger(props.searchMethod)}`
                      : 'Search by Consumer Name or Client Reference ID'
                  }
                  {...params.inputProps}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: ColorPallete.Button.Secondary }} />
                      </InputAdornment>
                    ),
                    endAdornment:
                      inputValue?.length > 0 ? (
                        <InputAdornment position="end" onClick={() => removeText()}>
                          {loader && (
                            <CircularProgress
                              style={{ color: ColorPallete.Button.Secondary }}
                              size={15}
                            />
                          )}
                          <ClearIcon
                            style={{
                              color: ColorPallete.Button.Secondary,
                              cursor: 'pointer'
                            }}
                          />
                        </InputAdornment>
                      ) : (
                        ''
                      )
                  }}
                />
              </div>
            )}
            renderOption={(propsvalue, option) => (
              <li
                style={{
                  backgroundColor: ColorPallete.Color.White,
                  padding: 0
                }}
                {...propsvalue}>
                <Box
                  sx={{
                    flexGrow: 1,
                    padding: 0,
                    backgroundColor: ColorPallete.Color.White,
                    '&:hover': {
                      backgroundColor: ColorPallete.Color.White
                    }
                  }}
                  {...propsvalue}>
                  <Grid
                    container
                    spacing={0}
                    sx={{
                      padding: 0
                    }}>
                    <Grid
                      sx={{
                        padding: 0,
                        cursor: 'auto'
                      }}
                      item
                      xs={12}>
                      {!showSearchMethod && (
                        <div
                          style={{
                            fontFamily: 'Poppins',
                            fontSize: 14
                          }}>
                          {`${option.firstName} ${option.lastName}`}
                        </div>
                      )}
                    </Grid>
                    <>{returnResult(option)}</>
                  </Grid>
                </Box>
              </li>
            )}
            noOptionsText={
              <div className={styles.cardDivstyle}>
                <SearchOffIcon className={styles.searchoffIconStyle} />
                <Typography variant="h4" className={styles.messageHeading}>
                  Sorry! No Results Found
                </Typography>
                <Typography variant="h5" className={styles.messageSubheading}>
                  Sorry we couldn’t find any matches for that. Please try <br />
                  searching something else.
                </Typography>
              </div>
            }
          />
        </div>
      </div>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    countriesData: state.StaticDataReducer.countriesData,
    getstates: state.StaticDataReducer.getstates
  };
}

export default connect(mapStateToProps, null)(Search);
