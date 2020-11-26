import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  // fetch data from db.json for persons state
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    // Check if person already exists in phonebook
    const copyPerson = persons.find(person => person.name===newName);
    console.log("Who's the copy Person?", copyPerson);

    // declare new persons object to be concatinated to persons state
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // Prevent user from adding existing name in phonebook
    copyPerson !== undefined 
      ? alert(`${newName} is already added to the phonebook. Please enter a different name.`) 
      : setPersons(persons.concat(personObject));
    // Refreshes the input fields
    setNewName('');
    setNewNumber('');
  };

  // Filter according to input values
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={filter} 
        onChange={event => setFilter(event.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onHandleName={event => setNewName(event.target.value)}
        onHandleNumber={event => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  );
};

export default App;
