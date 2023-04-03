import React from 'react';
import { Box, MuiButton, TextField, FormControl } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { EDITNOTES } from '../../../../Actions/ConsumerDetails/ActionCreators';
import { useDispatch } from 'react-redux';

function EditNotesInput({ record, responsibleId, setSelectedAddType }) {
  const dispatch = useDispatch();

  const [addValue, setAddValue] = React.useState(record.content);

  const handleSaveChange = () => {
    const newNote = {
      content: addValue,
      special: true
    };

    if (addValue.trim().length >= 1 && addValue.trim() !== record.content.trim()) {
      dispatch(EDITNOTES(responsibleId, newNote, record.id));
    }
    setSelectedAddType('');
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        backgroundColor: ColorPallete.AccordionSummary.backgroundColor,
        marginLeft: '-16px',
        marginRight: '-16px',
        paddingRight: '16px',
        paddingLeft: '16px'
      }}>
      <FormControl fullWidth>
        <TextField
          autoFocus
          InputProps={{ disableUnderline: true }}
          inputProps={{ maxLength: setSelectedAddType ? 2500 : 4000 }}
          value={addValue}
          onChange={(e) => setSelectedAddType ? setAddValue(e.target.value) : setAddValue(e.target.value.slice(0, 4000))}
          multiline
          sx={{
            '& .MuiInputBase-input.MuiInput-input': { border: 'none' },
            color: ColorPallete.Text.Primary,
            fontFamily: 'poppins',
            fontWeight: '12px',
            width: '-webkit-fill-available'
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

export default EditNotesInput;
