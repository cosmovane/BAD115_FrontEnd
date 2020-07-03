import axios from 'axios'
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const BOLETA_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}`;

class BoletaPagoService {

  obtenerPago(datosEmpleado){
    return axios.post(`${BOLETA_API_URL}/obtenerboleta`, datosEmpleado,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
           // console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede obtener boletas' ,
                    'error'
                    )
            }
        } );
  }

  guardarBoleta(boleta){
    return axios.post(`${BOLETA_API_URL}/boletapago`, boleta,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se pudo guardar boleta' ,
                    'error'
                    )
            }
        } );

  }
    
}

export default new BoletaPagoService()