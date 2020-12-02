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
  // const [ errorMessage, setErrorMessage ] = useState(null);
  // Filter according to input values
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()));

  // Fetch DB in db.json from port:3001
  useEffect (()=> {
    contacts
      .getAll()
      .then(setPersons)
      .catch(err => alert("Error updating database"));
  }, []);


  const handleAddPerson = (event) => {
    event.preventDefault();
    // New person Object to be pushed onto DB
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // find existing Person
    const existingPerson = persons.find(person => person.name === newName);
    if(existingPerson) {
      const willUpdate = window
        .confirm(
          `${existingPerson.name} is already added to the phonebook, do you want to replace the existing number with the new one?`);
      if(!willUpdate) return; 
      
      // Attempt to update user
        contacts
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          })
          .catch(err => alert("Unable to update existing contact."));
    }

    else {
      // Add person if none of conditionals above are satisfied
      contacts
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
        })
        .catch(err => alert("cannot add new contact"));
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
      })
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={searchInput} 
        onChange={event => setSearchInput(event.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={handleAddPerson}
        name={newName}
        number={newNumber}
        onHandleName={event => setNewName(event.target.value)}
        onHandleNumber={event => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete}/>
    </div>
  );
};

export default App;
