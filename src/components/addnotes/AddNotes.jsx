import "./AddNotes.css";
import buttonClick from "../sounds/buttonClick.mp3";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddNotes = ({ onClose }) => {
  const notify = () => {
    toast.success("Notes Saved");
  };

  const sound = new Audio(buttonClick);
  const handleSaveNotes = (e) => {
    notify();
    sound.play();
    onClose();
  }
  const handleCancel = (e) => {
    toast.error("closed");
    sound.play();
    onClose()
  }
  return (
    <div className='addnotes-main-container'>
      <div className='addnotes-container'>
        <textarea placeholder="Type your notes ..."></textarea>
        <div className='buttons'>
          <button className="save-btn" onClick={handleSaveNotes}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddNotes