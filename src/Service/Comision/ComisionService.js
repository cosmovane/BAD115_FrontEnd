import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';


import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const COMISION_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/comision`;

class ComisionService{

    allComisiones(){
        return axios.get(`${COMISION_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }
    
    comision(id){
        return axios.get(`${COMISION_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }

    comisionCrear(comision){
        return axios.post(`${COMISION_API_URL}/crear`,comision,{headers: LoginService.agregarAuthorizationHeader()}).then( () => {
            Swal.fire(
                'Buen trabajo!',
                'El registro fue creado con exito.',
                'success'
            )
        } ).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                )
            }else {
                Swal.fire(
                    'Algo ha salido mal',
                    'Asegurese de llenar todos los campos obligatorios.',
                    'error'
                )
            }
        } );

    }

    comisionActualizar(comision){

        return axios.put(`${COMISION_API_URL}/editar`,comision, {headers: LoginService.agregarAuthorizationHeader()}).then( () => {
            Swal.fire(
                'Buen trabajo!',
                'El registro fue actualizado con exito.',
                'success'
            )
        }).catch((err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                )
            }else {
                Swal.fire(
                    'Algo ha salido mal',
                    'Asegurese de llenar todos los campos obligatorios.',
                    'error'
                )
            }
        })

    }



}
export default new ComisionService();
