import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const PUESTOTRABAJO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/puestotrabajo`


class PuestoTrabajoService {

  allPuestosTrabajo() {
    return axios.get(`${PUESTOTRABAJO_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  agregarPuestoTrabajo(puestoTrabajo) {
    return axios.post(`${PUESTOTRABAJO_API_URL}`, puestoTrabajo,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  modificarPuestoTrabajo(id, puestoTrabajo){
    return axios.put(`${PUESTOTRABAJO_API_URL}/${id}`, puestoTrabajo,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  obtenerPuestoTrabajo(id) {
    return axios.get(`${PUESTOTRABAJO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
  }

  desactivarPuestoTrabajo(id) {
    return axios.delete(`${PUESTOTRABAJO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

export default new PuestoTrabajoService()