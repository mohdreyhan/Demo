import React from 'react';
import { Box, MuiButton, TextField, FormControl } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { ADDNOTES } from '../../../../Actions/ConsumerDetails/ActionCreators';
import { useDispatch } from 'react-redux';

function AddNotesInput({ isSpecial, responsibleId, setSelectedAddType }) {
  const dispatch = useDispatch();

  const [addValue, setAddValue] = React.useState('');

  const handleSaveChange = () => {
    const newNote = {
      content: addValue,
      special: isSpecial
    };

    if (addValue.trim().length >= 1) {
      dispatch(ADDNOTES(responsibleId, newNote));
    }
    setAddValue('');
    setSelectedAddType('');
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        backgroundColor: ColorPallete.AccordionSummary.backgroundColor,
        marginLeft: '-20px',
        marginRight: '-20px',
        paddingRight: '20px',
        paddingLeft: '20px'
      }}>
      <FormControl fullWidth>
        <TextField
          autoFocus
          placeholder={isSpecial ? 'Add a special note' : 'Add a note'}
          InputProps={{ disableUnderline: true }}
          inputProps={{ maxLength: isSpecial ? 2500 : 4000 }}
          value={addValue}
          onChange={(e) => isSpecial ? setAddValue(e.target.value) : setAddValue(e.target.value.slice(0, 4000))}
          multiline
          sx={{
            '& .MuiInputBase-input.MuiInput-input': { border: 'none' },
            color: ColorPallete.Text.Primary,
            fontFamily: 'poppins',
            fontWeight: '12px',
            width: '-webkit-fill-available',
            background: "unset"
          }}
          variant="standard"
        />
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px' }}>
        <MuiButton
          onClick={handleSaveChange}
          style={{ color: ColorPallete.Button.Secondary, textTransform: 'capitalize' }}>
          Done
        </MuiButton>
      </div>
    </Box>
  );
}

export default AddNotesInput;
