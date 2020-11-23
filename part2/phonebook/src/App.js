import React, { useState } from 'react'
import Contacts from './components/Contacts'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filters, setFilters ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    // Check if person already exists in phonebook
    const copyPerson = persons.find(person => person.name===newName)
    console.log("Who's the copy Person?", copyPerson)

    // declare new persons object to be concatinated to persons state
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    // Prevent user from adding existing name in phonebook
    copyPerson !== undefined 
      ? alert(`${newName} is already added to the phonebook. Please enter a different name.`) 
      : setPersons(persons.concat(personObject))
    // Refreshes the input fields
    setNewName('')
    setNewNumber('')
  }
  const filteredItems = persons.filter(person => person.name.toLowerCase() === filters.toLowerCase)


  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilters = (event) => {
    
    console.log(event.target.value)
    setFilters(event.target.value)


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filters} onChange={handleFilters}/>
      </div>
      <h3>Add a new Contact</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons}/>
    </div>
  );
}

export default App;
