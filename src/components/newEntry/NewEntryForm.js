import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import classes from "./NewEntryForm.module.css";

const NewEntryForm = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [meridian, setMeridian] =useState("");
  const [error, setError] = useState();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const timeChangeHandler = (event) => {
    const timeSplit = event.target.value.split(":");
    let hours = timeSplit[0];
    let minutes = timeSplit[1];

    setTime((hours % 12 ? 0 + hours % 12 : 12) + ":" + minutes);
    setMeridian(hours >= 12 ? 'pm' : 'am');
  }

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(title.trim().length === 0) {
      setError({
        title: "Description Required",
        message: "Please enter a description."
      })
      return
    };

    if(location.length === 0) {
      setError({
        title: "Location Required",
        message: "Please select a location."
      })
      return
    };

    if(time.length === 0) {
      setError({
        title: "Time Required",
        message: "Please select a time."
      })
      return
    };

    if(date.length === 0) {
      setError({
        title: "Date Required",
        message: "Please select a date."
      })
      return
    };

    const entryData = {
      title: title,
      location: location,
      time: time,
      meridian: meridian,
      date: new Date(date),
    };

    props.onSaveEntryData(entryData);

    setTitle("");
    setLocation("");
    setDate("");
    setTime("");
  };

  const confirmErrorHandler = () => {
    setError(null);
  }

  return (
    <>
    {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={confirmErrorHandler}
        />
      )}
    <form onSubmit={submitHandler}>
      <div className={classes.newEntry__controls}>
        <div className={classes.newEntry__control}>
          <label>Description</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={title}
          ></input>
        </div>
        <div className={classes.newEntry__control}>
          <label>Location</label>
          <select
            type="text"
            onChange={locationChangeHandler}
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
            onChange={timeChangeHandler}
          ></input>
        </div>
        <div className={classes.newEntry__control}>
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
      <div className={classes.newEntry__actions}>
        <button type="button" onClick={props.hideForm}>Cancel</button>
        <button type="submit">Add Entry</button>
      </div>
    </form>
    </>
  )
};

export default NewEntryForm;
