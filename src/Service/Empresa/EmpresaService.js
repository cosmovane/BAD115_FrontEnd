import axios from 'axios';
import Swal from 'sweetalert2';

import LoginService from '../Login/LoginService';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const EMPRESA_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empresa`;

const headers = {
    'Content-Type': 'application/json'
}

class EmpresaService{

  
    allEmpresas(){
        return axios.get(`${EMPRESA_API_URL}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {

            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    'No se puede cargar la lista de empresas' ,
                    'error'
                    )
            }
        } );
    }

    empresa(id){
        return axios.get(`${EMPRESA_API_URL}/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {

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

    empresaCrear(empresa){
        return axios.post(`${EMPRESA_API_URL}/crear`,empresa,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

    empresaActualizar(idEmpresa,idDireccion,empresa){
        return axios.put(`${EMPRESA_API_URL}/${idEmpresa}/${idDireccion}`,empresa,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

    departamentosMunicipios(){
        return axios.get(`${EMPRESA_API_URL}/departamento/municipios`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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



export default new EmpresaService();