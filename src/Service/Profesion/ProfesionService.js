import axios from 'axios'

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const PROFESION_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/profesion`

class ProfesionService {

    allProfesiones() {
        return axios.get(`${PROFESION_API_URL}`)
      }
    
      obtenerProfesion(id) {
        return axios.get(`${PROFESION_API_URL}/${id}`)
      }

      agregarProfesion(profesion) {
        return axios.post(`${PROFESION_API_URL}`, profesion)
      }
    
      modificarProfesion(id, profesion){
        return axios.put(`${PROFESION_API_URL}/${id}`, profesion)
      }
    

}

export default new ProfesionService()