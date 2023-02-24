import React from 'react';

import classes from './EntriesFilter.module.css';

const EntriesFilter = (props) => {

    const filterChangeHandler = (event) => {
        props.onFilterChange(event.target.value);
    }

  return (
    <div className={classes.entriesFilter}>
      <div className={classes.entriesFilter__control}>
        <select value={props.selected} onChange={filterChangeHandler}>
          <option value='all'>All</option>
          <option value='January'>Jan</option>
          <option value='February'>Feb</option>
          <option value='March'>Mar</option>
          <option value='April'>Apr</option>
          <option value='May'>May</option>
          <option value='June'>Jun</option>
          <option value='July'>Jul</option>
          <option value='August'>Aug</option>
          <option value='September'>Sep</option>
          <option value='October'>Oct</option>
          <option value='November'>Nov</option>
          <option value='December'>Dec</option>
        </select>
      </div>
    </div>
  );
};

export default EntriesFilter;