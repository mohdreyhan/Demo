import React from 'react';
import PopUp from '../../../Common/AEComponents/DialogBox/PopUp';
import Notes from './Notes';

function NotesPopUp({
	showDialog,
	closePopUp
}) {
	return (
		<PopUp showDialog={showDialog} isNotesPopUp={true}>
			<div style={{margin: '-20px'}}>
			<Notes
				from="popup"
				closePopUp={closePopUp}
			/>
			</div>
		</PopUp>
	)
}

export default NotesPopUp;