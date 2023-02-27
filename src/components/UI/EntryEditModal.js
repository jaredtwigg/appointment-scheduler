import { useState } from "react";
import ReactDom from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./EntryEditModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const EditModalOverlay = (props) => {
  const [title, setTitle] = useState(props.title);
  const [location, setLocation] = useState(props.location);
  const [time, setTime] = useState(props.time);
  const [meridian, setMeridian] = useState(props.meridian);
  const [date, setDate] = useState(props.date);

  const titleChangeHandler = (event) => {
      setTitle(event.target.value);
  };

  const locationChangeHandler = (event) => {
      setLocation(event.target.value);
  };

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
  }

  const dateChangeHandler = (event) => {
      setDate(event.target.value);
  };

  const onConfirmEditHandler = () => {

    const timeSplit = time.split(":");
    let hours = timeSplit[0];
    let minutes = timeSplit[1];

    const newTime = (hours % 12 ? 0 + hours % 12 : 12) + ":" + minutes;
    
    setMeridian(hours >= 12 ? 'pm' : 'am');

    const id = props.id;

    const updatedEntry = { 
        id: id, 
        title: title, 
        location: location, 
        time: newTime,
        meridian: meridian, 
        date: new Date(date) 
    };

    return props.confirmUpdate(updatedEntry)
  };

  return (
    <Card className={classes.modal}>
      <form>
        <div className={classes.editEntry__controls}>
          <div className={classes.editEntry__control}>
            <label>Description</label>
            <input
              type="text"
              onChange={titleChangeHandler}
              value={title}
            ></input>
          </div>
          <div className={classes.editEntry__control}>
            <label>Location</label>
            <select
              type="text"
              onChange={locationChangeHandler}
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
          <div className={classes.editEntry__control}>
            <label>Time</label>
            <input
              type="time"
              onChange={timeChangeHandler}
              value={time}
            ></input>
          </div>
          <div className={classes.editEntry__control}>
            <label>Date</label>
            <input
              type="date"
              min="2023-02-01"
              max="2028-12-31"
              onChange={dateChangeHandler}
              value={date}
            ></input>
          </div>
        </div>
      </form>
      <footer className={classes.actions}>
        <Button onClick={props.onCancel} className={classes.cancel}>
          Cancel
        </Button>
        <Button onClick={onConfirmEditHandler}>Okay</Button>
      </footer>
    </Card>
  );
};

const EntryEditModal = (props) => {

    const confirmUpdate = (updateEntry) => {
        props.confirmUpdate(updateEntry);
        props.onConfirm();
    }

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <EditModalOverlay
          id={props.id}
          title={props.title}
          location={props.location}
          time={props.time}
          meridian={props.meridian}
          date={props.date}
          confirmUpdate={confirmUpdate}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default EntryEditModal;
