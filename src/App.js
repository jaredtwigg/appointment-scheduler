import { useState } from "react";
import Entries from "./components/entries/Entries";
import NewEntry from "./components/newEntry/NewEntry";

const App = () => {
  const [entries, setEntries] = useState([]);

  const addEntryHandler = (entryData) => {
    setEntries((prevEntries) => {
      return [entryData, ...prevEntries]
    });
  }

  const handleDelete = (itemId) => {
    setEntries(entries.filter(entry => entry.id !== itemId));
  }

  const confirmEditHandler = (updated) => {
    const edited = entries.map(entry => {
      if(entry.id === updated.id) {
        return {
          ...entry,
          title: updated.title,
          location: updated.location,
          time: updated.time,
          date: updated.date,
          id: updated.id
        }
      }
      return entry
    })

    setEntries(edited);
  };

  return (
    <>
      <NewEntry onAddEntry={addEntryHandler} />
      <Entries confirmUpdate={confirmEditHandler} item={entries} onDelete={handleDelete} />
    </>
  );
}

export default App;
