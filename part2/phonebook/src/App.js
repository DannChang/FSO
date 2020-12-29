import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Message from './components/Message';
import contacts from './services/contacts';


const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchInput, setSearchInput ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState(false);


  useEffect (()=> {
    contacts
      .getAll()
      .then(setPersons)
      .catch(err => {
        setMessage('Could not get contacts.');
        setSuccessMessage(false);
      });
  }, []);

  useEffect (()=> {
    setTimeout(()=> {
      setMessage(null);
    }, 3000);
  }, [message]);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
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
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setMessage(`${updatedPerson.name} has been updated.`);
            setSuccessMessage(true);
          })
          .catch(err => {
            setMessage(              
              `Information of ${
              newPerson.name
              } has already been removed from the server.`);
            setSuccessMessage(false);
          });
    } else {
        contacts
          .create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson));
            setMessage(`Added ${createdPerson.name}.`);
            setSuccessMessage(true);
          })
          .catch(err => {
            setMessage(`Could not add ${newPerson.name}.`);
            setSuccessMessage(false);
          });
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div style={{
      backgroundColor: 'lightyellow', 
      borderStyle: 'solid', 
      borderColor: 'lightblue', 
      borderRadius: 25
    }}>
      <h2 style={{color: 'darkgreen'}}>Phonebook</h2>
        <Message 
          message={message}
          success={successMessage}
        />
        <Filter 
          value={searchInput} 
          onChange={handleSearchInput}
        />
      <h3 style={{color: 'darkred'}}>Add a new</h3>
        <PersonForm 
          onSubmit={handleAddPerson}
          name={newName}
          number={newNumber}
          onHandleName={handleNewName}
          onHandleNumber={handleNewNumber}
        />
      <h3 style={{color: 'orange'}}>Numbers</h3>
        <Persons 
          persons={personsToShow} 
          onDelete={handleDelete}
        />
    </div>
  );
};

export default App;