import classes from "./EntryDate.module.css";

const EntryDate = (props) => {

    const month = props.date.toLocaleString("en-US", { month: "long" });
    const day = props.date.toLocaleString("en-US", { day: "2-digit", timeZone: 'UTC' });
    const year = props.date.getFullYear();

    return (
    <div className={classes.entryDate}>
        <div className={classes.entryDate__month}>{month}</div>
        <div className={classes.entryDate__day}>{day}</div>
        <div className={classes.entryDate__year}>{year}</div>
    </div>
    );

};

export default EntryDate;