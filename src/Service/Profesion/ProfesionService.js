import axios from 'axios'
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const PROFESION_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/profesion`

class ProfesionService {

    allProfesiones() {
        return axios.get(`${PROFESION_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
      }
    
      //obtenerProfesion(id) {
       // return axios.get(`${PROFESION_API_URL}/${id}`)
      //}

      profesion(id){
        return axios.get(`${PROFESION_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
      }

      agregarProfesion(profesion) {
        return axios.post(`${PROFESION_API_URL}/crear`,profesion,{headers: LoginService.agregarAuthorizationHeader()}).then( () => {
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
    
      modificarProfesion(profesion){
        return axios.put(`${PROFESION_API_URL}/`, profesion, {headers: LoginService.agregarAuthorizationHeader()}).then( () => {
            Swal.fire(
                'Buen trabajo!',
                'El registro fue actualizado con exito.',
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
    

}

export default new ProfesionService()