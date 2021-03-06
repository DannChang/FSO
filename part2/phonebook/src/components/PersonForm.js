import React from 'react';

const PersonForm = ({ onSubmit, name, number, onHandleName, onHandleNumber }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
          <div>
              Name: <input value={name} onChange={onHandleName}/>
          </div>
          <div>
              Number: <input value={number} onChange={onHandleNumber}/>
          </div>
          <div>
              <button type="submit" onClick={onSubmit}>add</button>
          </div>
      </form>
    </div>
  );
};

export default PersonForm;