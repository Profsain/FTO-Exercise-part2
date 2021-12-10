import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"
import PersonsDB from "./PhonebookDB";

const App = () => {
  //App state
  const [persons, setPersons] = useState(PersonsDB)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

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
    console.log(event.target.value)
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