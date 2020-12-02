import React from 'react';

const Persons = ({ persons, onDelete }) => {
  const styles = {
    color: 'purple'
  };
  return (
    <div>  
        {persons.map(person =>
          <p key={person.id} style={styles}>
            {person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button>
          </p> 
        )}
    </div>
  );
};

export default Persons;