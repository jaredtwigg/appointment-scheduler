import ReactDom from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./EntryEditModal.module.css";
import { useState } from "react";

const Backdrop = (props) => {
  return (<div className={classes.backdrop} onClick={props.onConfirm} />)
};

const EditModalOverlay = (props) => {
    const [title, setTitle] = useState(props.title);
    const [location, setLocation] = useState(props.location);
    const [time, setTime] = useState(props.time);
    const [date, setDate] = useState(props.date);

    const id = props.id;

    const updatedEntry = {id, title, location, time, date};

    props.updateEntry(updatedEntry);

  return (<Card className={classes.modal}>
    <form onConfirm={props.onConfirm}>
      <div className={classes.newEntry__controls}>
        <div className={classes.newEntry__control}>
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </div>
        <div className={classes.newEntry__control}>
          <label>Location</label>
          <select
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">Choose Location</option>
            <option value="San Diego">San Diego</option>
            <option value="Portland">Portland</option>
            <option value="Seattle">Seattle</option>
            <option value="London">London</option>
            <option value="Orlando">Orlando</option>
          </select>
        </div>
        <div className={classes.newEntry__control}>
          <label>Time</label>
          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          ></input>
        </div>
        <div className={classes.newEntry__control}>
          <label>Date</label>
          <input
            type="date"
            min="2023-02-01"
            max="2028-12-31"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          ></input>
        </div>
      </div>
    </form>
    <footer className={classes.actions}>
      <Button onClick={props.onConfirm}>Okay</Button>
    </footer>
  </Card>)
};

const EntryEditModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      ;
      {ReactDom.createPortal(
        <EditModalOverlay 
            updateEntry={props.updateEntry}
            id={props.id} title={props.title} 
            location={props.location}
            time={props.time}
            date={props.date}
            onConfirm={props.onConfirm} 
        />,
        document.getElementById("overlay-root")
      )}
      ;
    </>
  );
};

export default EntryEditModal;