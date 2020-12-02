import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import contacts from './services/contacts';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchInput, setSearchInput ] = useState('');

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect (()=> {
    contacts
      .getAll()
      .then(setPersons)
      .catch(err => alert("Error updating database"));
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const existingPerson = persons.find(person => person.name === newName);
    if(existingPerson) {
      const willUpdate = window
        .confirm(
          `${existingPerson.name} is already added to the phonebook, do you want to replace the existing number with the new one?`
        );
      if(!willUpdate) return; 
        contacts
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          })
          .catch(err => 
            alert("Unable to update existing contact.")
          );
    } else {
        contacts
          .create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson));
          })
          .catch(err => 
            alert("cannot add new contact")
          );
        };
    setNewName('');
    setNewNumber('');    
  };
    
  const handleDelete = (person) => {
    const willDelete = window.confirm(`Delete ${person.name} ?`);
    if(!willDelete) return;
    contacts
      .delete(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
      });
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  };

  const handleNewName = (event) => {
    setNewName(event.target.value)
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter 
          value={searchInput} 
          onChange={handleSearchInput}
        />
      <h3>Add a new</h3>
        <PersonForm 
          onSubmit={handleAddPerson}
          name={newName}
          number={newNumber}
          onHandleName={handleNewName}
          onHandleNumber={handleNewNumber}
        />
      <h3>Numbers</h3>
        <Persons 
          persons={personsToShow} 
          onDelete={handleDelete}
        />
    </div>
  );
};

export default App;