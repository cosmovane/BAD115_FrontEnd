import axios from 'axios'
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const DESCUENTO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/descuento`

class DescuentoService {

  allDescuentos(){
    return axios.get(`${DESCUENTO_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  agregarDescuento(descuento){
    return axios.post(`${DESCUENTO_API_URL}`, descuento,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  obtenerDescuento(id){
    console.log(DESCUENTO_API_URL);
    
    return axios.get(`${DESCUENTO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  modificarDescuento(id, descuento){
    return axios.put(`${DESCUENTO_API_URL}/${id}`, descuento,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  desactivarDescuento(id){
    return axios.delete(`${DESCUENTO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

export default new DescuentoService()