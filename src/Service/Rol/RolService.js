import axios from 'axios';
import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const ROL_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;

class RolService{

	allPermisos(){
		return axios.get(`${ROL_API_URL}/permisos/list`);
	}

	allRolesUser(){
		return axios.get(`${ROL_API_URL}/rol/list/user`).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                'No se puede cargar la lista de roles' ,
                'error'
            )
        } );
	}

	allRoles(){
		return axios.get(`${ROL_API_URL}/rol/list`);
	}

	buscarRol(idRol){
		return axios.get(`${ROL_API_URL}/rol/${idRol}`).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje,
                'error'
            )
            console.log(err.response.data.mensaje)
        } );
	}

	crearRol(rol){
		return axios.post(`${ROL_API_URL}/rol`,rol).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje ,
                'error'
            )
        } );
	}

	editarRol(rol,idRol){
		return axios.put(`${ROL_API_URL}/rol/${idRol}`,rol).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje ,
                'error'
            )
        } );
	}

	desactivarRol(idRol){
		return axios.put(`${ROL_API_URL}/rol/desactivar/${idRol}`).then( (res)=>{
                Swal.fire(
                    'Buen trabajo!',
                    res.data.mensaje,
                    'success'
                )
        } ).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje ,
                'error'
            )
        } );
	}
}

export default new RolService();