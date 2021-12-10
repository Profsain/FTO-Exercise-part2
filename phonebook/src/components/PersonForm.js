
const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          Name: <input
            value={newName}
            onChange={handleNameChange}
          />
          <br />
          <br/>
          Phone Number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
  )
}
export default PersonForm