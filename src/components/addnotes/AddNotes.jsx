import React from "react";
import "./AddNotes.css";
import buttonClick from "../sounds/buttonClick.mp3";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNotes = ({ onClose, existingNotes }) => {
  const [notes, setNotes] = React.useState(existingNotes || "");

  const notifySuccess = () => {
    toast.success("Notes Saved");
  };

  const notifyCancel = () => {
    toast.error("Cancelled");
  };

  const sound = new Audio(buttonClick);

  const handleSaveNotes = () => {
    notifySuccess();
    sound.play();
    onClose(notes); // Pass the notes back to the parent component
  };

  const handleClose = () => {
    notifyCancel();
    sound.play();
    onClose(); // No notes to return if canceled
  };

  return (
    <div className='addnotes-main-container'>
      <div className='addnotes-container'>
      {/* {existingNotes && <h4>Saved Notes</h4>}  */}
        <textarea
          placeholder="Type your notes ..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <div className='buttons'>
          {/* Conditionally render the Save button if there are no existing notes */}
            <button className="save-btn" onClick={handleSaveNotes}>Save</button>
          
          <button className="cancel-btn" onClick={handleClose}>
            {existingNotes ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
