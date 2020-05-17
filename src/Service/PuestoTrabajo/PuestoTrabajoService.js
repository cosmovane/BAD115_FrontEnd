import axios from 'axios'

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const PUESTOTRABAJO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/puestotrabajo`

class PuestoTrabajoService {

  allPuestosTrabajo() {
    return axios.get(`${PUESTOTRABAJO_API_URL}`)
  }

  agregarPuestoTrabajo(puestoTrabajo) {
    return axios.post(`${PUESTOTRABAJO_API_URL}`, puestoTrabajo)
  }

  modificarPuestoTrabajo(id, puestoTrabajo){
    return axios.put(`${PUESTOTRABAJO_API_URL}/${id}`, puestoTrabajo)
  }

  obtenerPuestoTrabajo(id) {
    return axios.get(`${PUESTOTRABAJO_API_URL}/${id}`)
  }

  desactivarPuestoTrabajo(id) {
    return axios.delete(`${PUESTOTRABAJO_API_URL}/${id}`)
  }

} 

export default new PuestoTrabajoService()