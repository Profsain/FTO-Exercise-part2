import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"

const App = () => {
  //App state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  //Fetch persons data from server 
  //using useEffect, axios and promise
  useEffect(() => {
    console.log('useEffect operation')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Data fetched successful')
        setPersons(response.data)
      })
  }, [])
  //Handle number changes
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  //Handle name changes
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  //Handle search name changes
  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  //Handle form submit
  const addPerson = (event) => {
    event.preventDefault()
    const personeObj = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString,
      id: persons.length + 1,
    }
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personeObj))
      setNewName('')
      setNewNumber('')
    }
    
  }
  
  return (
    <div>
      <h1>Phonebook App</h1>
      <Filter
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      
      <h2>Add New Contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
      />
    </div>
  )
}
export default App