import axios from 'axios'

import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const EMPLEADO_DESCUENTO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/empleadosdescuento`

class EmpleadoDescuentoService {
  agregarEmpleadoDescuento(empleadoDescuento){
    return axios.post(`${EMPLEADO_DESCUENTO_API_URL}`, empleadoDescuento)
  }
}

export default new EmpleadoDescuentoService()