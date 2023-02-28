import { useState } from "react";
import EntryItem from "../entries/EntryItem";
import EntryEditModal from "../UI/EntryEditModal";

import classes from "./EntriesList.module.css"

const EntriesList = (props) => {
  const [edit, setEdit] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [meridian, setMeridian] = useState();
  const [date, setDate] = useState();
  const [id, setId] = useState();

  if (props.items.length === 0) {
      return <h2 className={classes.entriesList__fallback}>Nothing scheduled.</h2>
  }

  const cancelEditHandler = () => {
    setEdit(null);
  };

  const confirmEditHandler = () => {
    setEdit(null);
  }

  const handleEdit = (itemId) => {
    props.items.map(entry => {
      if(entry.id === itemId) {
        const timeSplit = entry.time.split(":");
        let hours = timeSplit[0];
        const minutes = timeSplit[1];

        let newHours

        if(entry.meridian === "pm") {
          newHours = +hours + 12;
        } else {
          newHours = hours.padStart(2, '0');
        }

        if(+newHours > 23) {
          newHours = "00"
          setMeridian("am")
        }

        const formattedDate = entry.date.getFullYear().toString().padStart(4, "0") + "-" + (entry.date.getMonth()+1).toString().padStart(2, "0") + "-" + (entry.date.getDate()+1).toString().padStart(2, "0");

        setTitle(entry.title)
        setLocation(entry.location)
        setTime(newHours + ":" + minutes)
        setMeridian(entry.meridian)
        setDate(formattedDate)
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
          meridian={meridian}
          onCancel={cancelEditHandler}
          onConfirm={confirmEditHandler}
          confirmUpdate={props.confirmUpdate}
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
