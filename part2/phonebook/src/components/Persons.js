import React from 'react'
//import appServices from '../services/app'




const Persons = ({personsToShow, deleteHandler}) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteHandler(person.id)}>delete</button>
          </p>
        )
      })}
    </div>
  )
}

export default Persons