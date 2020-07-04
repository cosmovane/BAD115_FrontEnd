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

      profesion(id, profesion){
        return axios.get(`${PROFESION_API_URL}/${id}`,profesion,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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
        const test=axios.post(`${PROFESION_API_URL}/crear`,profesion,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
        
        console.log(test)
        console.log(`${PROFESION_API_URL}`)
        return test
      }
    
      modificarProfesion(profesion){
        return axios.put(`${PROFESION_API_URL}`, profesion)
      }
    

}

export default new ProfesionService()