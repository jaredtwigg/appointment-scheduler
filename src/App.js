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

  const editEntryHandler = (updatedEntry) => {
    console.log("UE", updatedEntry);
    // setEntries(entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
  }

  return (
    <>
      <NewEntry onAddEntry={addEntryHandler} />
      <Entries updateEntry={editEntryHandler} item={entries} onDelete={handleDelete} />
    </>
  );
}

export default App;
