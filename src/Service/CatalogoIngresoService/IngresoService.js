import axios from 'axios';
import Swal from 'sweetalert2';

import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants';

const INGRESO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/ingreso`;

class IngresoService{

	allIngresosActivos(){
		return axios.get(`${INGRESO_API_URL}/list/activos`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede cargar la lista de ingresos' ,
                    'error'
                    )
            }
        } );
	}

	allIngresos(){
		return axios.get(`${INGRESO_API_URL}/list/all`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            console.log(err)
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                     'No se puede cargar la lista de ingresos' ,
                    'error'
                    )
            }
        } );
	}

	buscarIngreso(idIngreso){
		return axios.get(`${INGRESO_API_URL}/${idIngreso}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

	crearIngreso(ingreso){
		return axios.post(`${INGRESO_API_URL}`,ingreso,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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


	editarIngreso(ingreso,idIngreso){
		return axios.put(`${INGRESO_API_URL}/${idIngreso}`,ingreso,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

	desactivarIngreso(idIngreso){
		return axios.get(`${INGRESO_API_URL}/desactivar/${idIngreso}`,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

export default new IngresoService();