import axios from 'axios'

import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const BOLETA_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}`

class BoletaPagoService {

  obtenerPago(datosEmpleado){
    return axios.post(`${BOLETA_API_URL}/obtenerboleta`, datosEmpleado)
  }

  guardarBoleta(boleta){
    return axios.post(`${BOLETA_API_URL}/boletapago`, boleta)
  }
    
}

export default new BoletaPagoService()