import axios from 'axios'

const configuraciones = {
    baseURL: 'https://reqres.in/api',
}
const clienteAxios = axios.create(configuraciones)

export default clienteAxios