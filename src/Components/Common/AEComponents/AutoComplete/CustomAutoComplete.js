import React, { useEffect, useLayoutEffect, useRef } from 'react';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import {
  Grid,
  Box,
  Typography,
  ClearIcon,
  SearchIcon,
  SearchOffIcon,
  MuiButton,
  CircularProgress
} from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import DividerComp from '../Divider/DividerComp';
import './custom.style.css';

function CustomAutoComplete({
  showSearchIcon = true,
  showRemoveIcon = true,
  showAddButton = false,
  placeholder = '',
  options = undefined,
  showNoDataAvailable = true,
  showOptions = false,
  onClickAdd,
  onClickOption,
  addButtonText,
  inputValue = '',
  setInputValue,
  loading
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onClickOutside = (e) => {
    if (!document.getElementById('auto-complete-box').contains(e.target)) {
      setInputValue('');
    }
  };

  return (
    <div id="auto-complete-box">
      <FormControl className={`custom-autocomplete`}>
        {showSearchIcon && <SearchIcon />}
        <InputBase
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          inputProps={{ 'aria-label': placeholder }}
        />
        {loading && <CircularProgress style={{ width: '20px', height: '20px' }} />}
        {!loading && showRemoveIcon && inputValue?.length > 0 && (
          <ClearIcon
            style={{
              cursor: 'pointer'
            }}
            onClick={(e) => setInputValue('')}
          />
        )}
      </FormControl>
      {showOptions && (
        <div
          style={{
            position: 'fixed',
            background: 'white',
            width: '500px',
            zIndex: '1300',
            border: '1px solid #A6A6A6',
            borderRadius: '8px',
            marginTop: '2px',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
          }}>
          {options && options.length > 0 && (
            <>
              <ul
                style={{
                  maxHeight: '172px',
                  overflow: 'auto',
                  listStyle: 'none',
                  padding: '8px 0',
                  margin: 0,
                  borderRadius: '8px'
                }}>
                {React.Children.toArray(
                  options.map((option, i) => (
                    <li
                      key={option?.id}
                      onClick={() => onClickOption(option)}
                      className={`list-item`}>
                      <Box
                        sx={{
                          flexGrow: 1,
                          padding: 0,
                          backgroundColor: ColorPallete.Color.White,
                          '&:hover': {
                            backgroundColor: ColorPallete.Color.White,
                            cursor: 'pointer'
                          }
                        }}>
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
                            <div
                              style={{
                                fontFamily: 'Poppins',
                                fontSize: 14,
                                cursor: 'pointer'
                              }}>
                              {option.firstName || ''} {option.lastName || ''}{' '}
                              <b>{option.firmName ? `- ${option.firmName}` : ''}</b>
                            </div>
                          </Grid>
                        </Grid>
                      </Box>
                    </li>
                  ))
                )}
              </ul>
              <DividerComp
                orientation="horizontal"
                styles={{
                  margin: '0px 15px 0px 15px',
                  width: 'auto',
                  background: ColorPallete.Button.Tertiary
                }}
              />
              {showAddButton && (
                <MuiButton
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '15px',
                    textTransform: 'capitalize',
                    fontSize: '14px'
                  }}
                  onClick={() => onClickAdd()}>
                  {`+ ${addButtonText}`}
                </MuiButton>
              )}
            </>
          )}
          {options && options.length === 0 && showNoDataAvailable && (
            <div className={`cardDivstyle`}>
              <SearchOffIcon className={`searchoffIconStyle`} />
              <Typography variant="h4" className={`messageHeading`}>
                Sorry! No Results Found
              </Typography>
              <Typography variant="h5" className={`messageSubheading`}>
                Sorry we couldn’t find any matches for that. Please try <br />
                searching something else.
              </Typography>
              <DividerComp
                orientation="horizontal"
                styles={{
                  margin: '0px 15px 0px 15px',
                  width: 'auto',
                  background: ColorPallete.Button.Tertiary
                }}
              />
              {showAddButton && (
                <MuiButton
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '15px',
                    textTransform: 'capitalize',
                    fontSize: '14px'
                  }}
                  onClick={() => onClickAdd()}>
                  {`+ ${addButtonText}`}
                </MuiButton>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomAutoComplete;
