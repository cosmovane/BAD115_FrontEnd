import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
//const BASE_API_URL = 'http://10.10.10.115:8000';
//const BASE_API_PLANILLA = 'api/planilla';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const EMPLEADO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empleado`;
const ESTADOCIVIL_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/estadocivil`;
const GENERO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/genero`;
const PUESTOS_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/puestostrabajo`;

class EmpleadoService{

    allEmpleados(){
        return axios.get(`${EMPLEADO_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()});
    }

    empleado(id){
        return axios.get(`${EMPLEADO_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()});
    }

    allPuestos(){
        return axios.get( `${PUESTOS_API_URL}/`,{headers: LoginService.agregarAuthorizationHeader()})
    }

    empleadoCrear(idGenero,idEstadocivil,idPuestotrabajo, idMunicipio,empleado, direccion ){

        return axios.post(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}/${idMunicipio}`,{ empleado, direccion},{headers: LoginService.agregarAuthorizationHeader()}).then( ()=>{
                Swal.fire(
                    'Buen trabajo!',
                    'El registro fue creado con exito.',
                    'success'
                )
        } ).catch( (respuesta)=> {
            if(LoginService.isNoAutorizado(respuesta)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else {
            Swal.fire(
                'Algo ha salido mal',
                'El registro no pudo crearse',
                'error'
            )
          }
        } );
    }

    empleadoActualizar(idGenero,idEstadocivil,idPuestotrabajo,idMunicipio,empleado, direccion){
        return axios.put(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}/${idMunicipio}`,{ empleado, direccion},{headers: LoginService.agregarAuthorizationHeader()}).then( ()=>{
            Swal.fire(
                'Buen trabajo!',
                'El registro fue actualizado con exito.',
                'success'
            )
        } ).catch( (respuesta)=> {
            if(LoginService.isNoAutorizado(respuesta)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else {
            Swal.fire(
                'Algo ha salido mal',
                'El registro no pudo crearse',
                'error'
            )
          }
        } );
    }

    listarEstadosCiviles(){
        return axios.get(`${ESTADOCIVIL_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }

    listarGeneros(){
        return axios.get(`${GENERO_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }
        } );
    }

    ultimoEmpleado(){
      return axios.get(`${EMPLEADO_API_URL}/ultimo`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

export default new EmpleadoService();

