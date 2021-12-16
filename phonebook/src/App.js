import React, { useEffect, useState } from "react";
import phoneService from './services/phoneService'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification"
import Warning from "./components/Warning";
import './index.css';

const App = () => {
  //App state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [warningMessage, setWarningMessage] = useState(null)

  //Fetch persons data from server 
  //using useEffect, axios and promise
  useEffect(() => {
    console.log('useEffect operation')
    phoneService
      .getAll()
      .then(returnedData => {
        setPersons(returnedData)
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
      // id: persons.length + 1,
    }
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const person = persons.find(person => person.name === newName)
        const id = person.id;
        const changeNum = { ...person, number: newNumber }
        phoneService
          .update(id, changeNum)
          .then(returnedData => {
            setPersons(persons.map(person => person.id !== id ? person : returnedData))
          })
          .catch(error => {
            setWarningMessage(`Information of ${person.name} has been removed from the server`)
            setTimeout(() => {
              setWarningMessage(null)
            }, 5000)
          })
        
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Updated ${person.name}.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } else {
      phoneService
        .create(personeObj)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
        })
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Added ${newName}.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }
  
  //Delete button handler
  const deleteHandler = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Do you want to Delete ${person.name}?`)) {
      phoneService
        .deleteObj(id)
      const newPersonsObj = persons.filter(person => person.id !== id)
      setPersons(newPersonsObj)
    }
  }

  return (
    <div className="container">
      <h1>Phonebook App</h1>

      <Notification message={successMessage}/>
     
      <Warning message={warningMessage} />
      
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
        deleteHandler={deleteHandler}
      />
    </div>
  )
}
export default App