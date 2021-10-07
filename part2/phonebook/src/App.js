//import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import appServices from './services/app'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    appServices.getAll()
      .then(initialPersons => {
        //console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchText, setSearchText ] = useState('')

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const replaceNumberHandler = (personToUpdate, id) => {
    appServices.updateNumber(personToUpdate, id, newNumber)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        replaceNumberHandler(personToUpdate, personToUpdate.id)
      }
    } else {
      const newPerson = {name: newName, number: newNumber}

      appServices.create(newPerson)
        .then(returnedPerson => {
          //console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const searchHandler = (event) => {
    setSearchText(event.target.value)
  }

  const deleteHandler = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      appServices.deletePerson(id)
        .then(response => {
          //console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchText.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchText} onChange={searchHandler}/> 

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={nameChangeHandler}
        onNumberChange={numberChangeHandler}
        onSubmit={submitHandler}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deleteHandler={deleteHandler}/>
      {/*{personsToShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}*/}
    </div>
  )
}

export default App