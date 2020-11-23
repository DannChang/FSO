import React from 'react'

// List all existing contacts stored in persons
const Contacts = ({persons}) => {
    return (
      <div>  
          {persons.map(person =>
            <p key={person.id}>
              {person.name} {person.number}
            </p> 
          )}
      </div>
    )
}

export default Contacts