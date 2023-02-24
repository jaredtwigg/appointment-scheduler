import { useState } from "react";
import NewEntryForm from "./NewEntryForm";
import classes from "./NewEntry.module.css";

const NewEntry = (props) => {
  const [visible, setVisible] = useState(false);

  const saveEntryDataHandler = (enteredEntryData) => {
    const entryData = {
      ...enteredEntryData,
      id: Math.floor(1000 + Math.random() * 9000),
    };

    setVisible(false);

    props.onAddEntry(entryData);
  };

  const showHideEntryForm = () => {
    setVisible(!visible);
  };

  return (
    <div className={classes.newEntry} style={!visible ? {backgroundColor: '#000'} : {backgroundColor: '#1c1c1c'}}>
      {!visible && <button style={!visible ? {backgroundColor: '#000'} : {backgroundColor: '#1c1c1c'}} onClick={showHideEntryForm}>Add New Entry</button>}
      {visible && <NewEntryForm onSaveEntryData={saveEntryDataHandler} hideForm={showHideEntryForm} />}
    </div>
  );
};

export default NewEntry;
