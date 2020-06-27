import axios from 'axios'

import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const BOLETA_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/obtenerboleta`

class BoletaPagoService {

  obtenerBoleta(datosEmpleado){
    return axios.post(`${BOLETA_API_URL}`, datosEmpleado)
  }
    
}

export default new BoletaPagoService()