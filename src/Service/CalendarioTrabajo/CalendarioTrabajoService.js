import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants';
const CALENDARIOTRABAJO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/periocidad`;

class CalendarioTrabajoService{
    allCalendarioTrabajo(){
        return axios.get(`${CALENDARIOTRABAJO_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        });
    }

    agregarCalendarioTrabajo(calendarioTrabajo) {
        return axios.post(`${CALENDARIOTRABAJO_API_URL}`, calendarioTrabajo,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
           // console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
        //return axios.post(`${CALENDARIOTRABAJO_API_URL}/crear`, calendarioTrabajo);
    }
    
    modificarCalendarioTrabajo(id, calendarioTrabajo){
        return axios.put(`${CALENDARIOTRABAJO_API_URL}/${id}`, calendarioTrabajo,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    obtenerCalendarioTrabajo(id) {
        return axios.get(`${CALENDARIOTRABAJO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
           // console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    desactivarCalendarioTrabajo(id) {
        return axios.delete(`${CALENDARIOTRABAJO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
           // console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }

    obtenerCalendarioDelAnio(anio){
      return axios.get(`${BASE_API_URL}/${BASE_API_PLANILLA}/periodicidad/${parseInt(anio)}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
           // console.log(err)
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

export default new CalendarioTrabajoService();