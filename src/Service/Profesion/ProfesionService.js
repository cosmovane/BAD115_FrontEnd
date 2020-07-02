import axios from 'axios'

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const PROFESION_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/profesion`

class ProfesionService {

    allProfesiones() {
        return axios.get(`${PROFESION_API_URL}`)
      }
    
      /*obtenerProfesion(id) {
        return axios.get(`${PROFESION_API_URL}/${id}`)
      }*/

      profesion(id, profesion){
        return axios.get(`${PROFESION_API_URL}/${id}`,profesion)
      }

      agregarProfesion(profesion) {
        const test=axios.post(`${PROFESION_API_URL}/crear`,profesion)
        
        console.log(test)
        console.log(`${PROFESION_API_URL}`)
        return test
      }
    
      modificarProfesion(id, profesion){
        return axios.put(`${PROFESION_API_URL}/${id}`, profesion)
      }
    

}

export default new ProfesionService()