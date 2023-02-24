import { useState } from "react";
import EntriesList from "../entriesFilter/EntriesList";
import EntriesFilter from "../entriesFilter/EntriesFilter";
import Card from "../UI/Card";
import classes from "./Entries.module.css";

const Entries = (props) => {
  const [filterMonth, setFilterMonth] = useState("all");

  const filterChangeHandler = (selectedfilter) => {
    setFilterMonth(selectedfilter);
  };

  const filteredEntries = props.item.filter(entry => {
      if(filterMonth === 'all') return entry;

      return entry.date.toLocaleString("en-US", { month: "long" }) === filterMonth;
  });

  return (
    <>
      <Card className={classes.entries}>
        <EntriesFilter
          selected={filterMonth}
          onFilterChange={filterChangeHandler}
        />
        <EntriesList updateEntry={props.updateEntry} items={filteredEntries} onDelete={props.onDelete} onEdit={props.onEdit}/>
      </Card>
    </>
  );
};

export default Entries;
