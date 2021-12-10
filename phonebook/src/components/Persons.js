
const Persons = ({persons, searchName}) => {
  const searchResult = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())).map(person =>
      <p>{person.name} { person.number}</p>)
  return (
    <div>
       {searchResult}
    </div>
   
  )
}
export default Persons