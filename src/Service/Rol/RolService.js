import axios from 'axios';
import Swal from 'sweetalert2';

import LoginService from '../Login/LoginService';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const ROL_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;

class RolService{

	allPermisos(){
		return axios.get(`${ROL_API_URL}/permisos/list`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede cargar la lista de permisos' ,
                    'error'
                    )
            }
        } );
	}

	allRolesUser(){
		return axios.get(`${ROL_API_URL}/rol/list/user`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede cargar la lista de roles' ,
                    'error'
                    )
            }
        } );
	}

	allRoles(){
		return axios.get(`${ROL_API_URL}/rol/list`).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede cargar la lista de roles' ,
                    'error'
                    )
            }
        } );
	}

	buscarRol(idRol){
		return axios.get(`${ROL_API_URL}/rol/${idRol}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    err.response.data.mensaje,
                    'error'
                    )
            }
        } );
	}

	crearRol(rol){
		return axios.post(`${ROL_API_URL}/rol`,rol,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    err.response.data.mensaje,
                    'error'
                    )
            }
        } );
	}

	editarRol(rol,idRol){
		return axios.put(`${ROL_API_URL}/rol/${idRol}`,rol,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    err.response.data.mensaje,
                    'error'
                    )
            }
        } );
	}

	desactivarRol(idRol){
		return axios.put(`${ROL_API_URL}/rol/desactivar/${idRol}`,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    err.response.data.mensaje,
                    'error'
                    )
            }
        } );
	}
}

export default new RolService();