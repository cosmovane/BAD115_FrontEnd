import axios from 'axios';
import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const USUARIO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;

class UsuarioService{

	allUsuarios(){
		return axios.get(`${USUARIO_API_URL}/users/list`);
	}

	buscarUsuario(idUser){
		return axios.get(`${USUARIO_API_URL}/user/${idUser}`).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje,
                'error'
            )
        } );
	}

	crearUsuario(usuario){
		return axios.post(`${USUARIO_API_URL}/user`,usuario).then( ()=>{
                Swal.fire(
                    'Buen trabajo!',
                    'El registro fue creado con exito.',
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

	editarUsuario(usuario,idUsuario){
		return axios.put(`${USUARIO_API_URL}/user/${idUsuario}`,usuario).then( ()=>{
                Swal.fire(
                    'Buen trabajo!',
                    'El registro fue editado con exito.',
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

	desactivarUsuario(idUsuario){
		return axios.put(`${USUARIO_API_URL}/user/desactivar/${idUsuario}`).then( ()=>{
                Swal.fire(
                    'Buen trabajo!',
                    'El registro fue desactivado con exito.',
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

export default new UsuarioService();