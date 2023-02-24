import { useState } from "react";
import EntryItem from "../entries/EntryItem";
import EntryEditModal from "../UI/EntryEditModal";

import classes from "./EntriesList.module.css"

const EntriesList = (props) => {
  const [edit, setEdit] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [id, setId] = useState();

  if (props.items.length === 0) {
      return <h2 className={classes.entriesList__fallback}>Nothing scheduled.</h2>
  }

  const confirmEditHandler = () => {
    setEdit(null);
  };

  const handleEdit = (itemId) => {
    props.items.map(entry => {
      if(entry.id === itemId) {
        setTitle(entry.title)
        setLocation(entry.location)
        setTime(entry.time)
        setDate(entry.date)
        setId(entry.id)

      }
      return entry;
    })
    setEdit(1);
  }

  return (
    <>
      {edit && (
        <EntryEditModal
          title={title}
          location={location}
          time={time}
          date={date}
          id={id}
          onConfirm={confirmEditHandler}
          updateEntry={props.updateEntry}
        />
      )}
      <ul className={classes.entriesList}>
          {props.items.map((entry) => (
          <EntryItem
            title={entry.title}
            time={entry.time}
            meridian={entry.meridian}
            location={entry.location}
            date={entry.date}
            key={entry.id}
            id={entry.id}
            onDelete={() => {props.onDelete(entry.id)}}
            onEdit={handleEdit}
          />))}
      </ul>
  </>
  )
};

export default EntriesList;
