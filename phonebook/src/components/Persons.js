
const Persons = ({persons, searchName, deleteHandler}) => {
  const searchResult = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())).map(person =>
      <p>{person.name} {person.number}<span>
        <button onClick={() => deleteHandler(person.id)}>Delete</button>
      </span></p>
      
    )
  return (
    <div>
       {searchResult}
    </div>
   
  )
}
export default Persons