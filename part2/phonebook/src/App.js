import React, { useState } from 'react'

const Contacts = ({persons}) => {
  return (
    <div>  
        {persons.map(persons =>
          <p key={persons.id}>
            {persons.name}
          </p> 
        )}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas'}
  ])
  const [ newName, setNewName ] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const copyPerson = persons.find(p => p.name===newName)

   

    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // const handleCopyContact = () => {
  //   (newName===persons.name) 
  // ? alert(`${newName} has already been chosen`)
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons}/>
    </div>
  );
}

export default App;
