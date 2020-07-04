import axios from 'axios'
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const EMPLEADO_DESCUENTO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/empleadosdescuento`

class EmpleadoDescuentoService {
  agregarEmpleadoDescuento(empleadoDescuento){
    return axios.post(`${EMPLEADO_DESCUENTO_API_URL}`, empleadoDescuento,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }
}

export default new EmpleadoDescuentoService()