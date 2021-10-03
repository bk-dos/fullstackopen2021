import React from 'react'

const PersonForm = (props) => {
  const {newName,
    newNumber,
    onNameChange,
    onNumberChange,
    onSubmit} = props

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm