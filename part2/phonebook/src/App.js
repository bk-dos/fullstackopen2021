import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

  const submitHandler = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const searchHandler = (event) => {
    setSearchText(event.target.value)
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

      <Persons personsToShow={personsToShow}/>
      {/*{personsToShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}*/}
    </div>
  )
}

export default App