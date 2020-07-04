import axios from 'axios';
import Swal from 'sweetalert2';

import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const USUARIO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;

class UsuarioService{

	allUsuarios(){
		return axios.get(`${USUARIO_API_URL}/users/list`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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
                     'No se puede cargar la lista de usuarios' ,
                    'error'
                    )
            }
        } );
	}

	buscarUsuario(idUser){
		return axios.get(`${USUARIO_API_URL}/user/${idUser}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

	crearUsuario(usuario){
		return axios.post(`${USUARIO_API_URL}/user`,usuario,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

	editarUsuario(usuario,idUsuario){
		return axios.put(`${USUARIO_API_URL}/user/${idUsuario}`,usuario,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

	desactivarUsuario(idUsuario){
		return axios.get(`${USUARIO_API_URL}/user/desactivar/${idUsuario}`,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

    buscarUsuarioGeneral(idUser){
        return axios.get(`${USUARIO_API_URL}/user/general/${idUser}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

    editarUsuarioGeneral(usuario,idUsuario){
        return axios.put(`${USUARIO_API_URL}/user/general/${idUsuario}`,usuario,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

export default new UsuarioService();