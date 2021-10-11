import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (personObj) => {
  const request = axios.post(baseUrl, personObj)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateNumber = (personToUpdate, id, newNumber) => {
  const updatedPerson = {...personToUpdate, number: newNumber}
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

const appServices = {getAll, create, deletePerson, updateNumber}

export default appServices