
const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      Search Phonebook: <input
      value={searchName}
      onChange={handleSearchChange}
    />
  </div>
  )
}
export default Filter