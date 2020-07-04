import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants';
const UNIDADORGANIZACIONAL_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/departamentos`;

class UnidadOrganizacionalService{

    allUnidadesOrganizacionales(){
        return axios.get(`${UNIDADORGANIZACIONAL_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }

    agregarUnidadOrganizacional(unidadOrganizacional) {
        return axios.post(`${UNIDADORGANIZACIONAL_API_URL}`, unidadOrganizacional,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    modificarUnidadOrganizacional(id, unidadOrganizacional){
        return axios.put(`${UNIDADORGANIZACIONAL_API_URL}/${id}`, unidadOrganizacional,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    obtenerUnidadOrganizacional(id) {
        return axios.get(`${UNIDADORGANIZACIONAL_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    desactivarUnidadOrganizacional(id) {
        return axios.delete(`${UNIDADORGANIZACIONAL_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

export default new UnidadOrganizacionalService();