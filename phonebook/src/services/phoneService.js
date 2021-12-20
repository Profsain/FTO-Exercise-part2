import axios from "axios";

const baseUrl = '/api/persons'

//Fetch all the phonebook data
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Post new object to the server
const create = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

//delete object from the server
const deleteObj = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

//update phone number in the server
const update = (id, updateNum) => {
    const request = axios.put(`${baseUrl}/${id}`, updateNum)
    return request.then(response => response.data)
}
export default {getAll, create, deleteObj, update}