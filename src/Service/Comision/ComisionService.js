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
        const test=axios.post(`${COMISION_API_URL}/crear`,comision,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
        
        //console.log(test)
       // console.log(`${COMISION_API_URL}/crear`)
       // return test

    }

    comisionActualizar(comision){

        const test=axios.put(`${COMISION_API_URL}/editar`,comision)
        console.log(test)
        console.log(`${COMISION_API_URL}/editar`)
         return  test
    }



}
export default new ComisionService();
