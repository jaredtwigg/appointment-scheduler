import EntryDate from "./EntryDate";
import Card from "../UI/Card";
import classes from "./EntryItem.module.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const EntryItem = (props) => {

    return (
        <li>
            <Card className={classes.entryItem}>
            <EntryDate date={props.date} /> 
            <div className={classes.entryItem__description}>
                <div className={classes.entryItem__title}>
                    <h2>{props.title}</h2>
                    <div className={classes.entryItem__icons} onClick={() => props.onEdit(props.id)}><FiEdit /></div>
                    <div className={classes.entryItem__icons} onClick={() => props.onDelete(props.id)}><FiTrash2 /></div>
                </div>
                <div className={classes.entryItem__price}>{props.time} {props.meridian} | {props.location}</div>
            </div>
            </Card>
        </li>
    );
}

export default EntryItem;
