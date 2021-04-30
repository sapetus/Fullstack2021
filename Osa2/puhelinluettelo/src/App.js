import React, { useEffect, useState } from 'react'
import FilterForm from './components/FilterForm.js'
import AddPersonForm from './components/AddPersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/PersonService.js'
import Notification from './components/Notification.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState([]);

  useEffect(() => {
    personService.getAll().then(fetchedPersons => {
      setPersons(fetchedPersons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} style={messageStyle}/>
      <FilterForm filter={filter} setNewFilter={setNewFilter} />
      <h2>Add a new person</h2>
      <AddPersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        message={message} setMessage={setMessage}
        messageStyle={messageStyle} setMessageStyle={setMessageStyle}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} filter={filter} 
        setPersons={setPersons} setMessage={setMessage} 
        setMessageStyle={setMessageStyle}
      />
    </div>
  );
};

export default App;