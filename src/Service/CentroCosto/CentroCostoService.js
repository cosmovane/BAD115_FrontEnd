import axios from 'axios';
import Swal from 'sweetalert2';
import LoginService from '../Login/LoginService';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const EMPRESA_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;
class CentroCostoService{

	listUnidades(id){
		return axios.get(`${EMPRESA_API_URL}/unidad_organizacional/list/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    'No se puede cargar la lista de unidades' ,
                    'error'
                    )
            }
        } );
	}

	listCostos(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/list/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
            if(LoginService.isNoAutorizado(err.response)){
                Swal.fire(
                    'Algo ha salido mal',
                    'No tienes acceso a este recurso' ,
                    'error'
                    )
            }else{
                Swal.fire(
                    'Algo ha salido mal',
                    'No se puede cargar la lista de costos' ,
                    'error'
                    )
            }
        } );
	}

	buscarCosto(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/${id}`,{headers: LoginService.agregarAuthorizationHeader()}).catch( (err)=> {
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

	crearCosto(costo,idUnidad){
		return axios.post(`${EMPRESA_API_URL}/centro_costo/${idUnidad}`,costo,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

    editarCosto(costo,idUnidad,idCosto){
      return axios.put(`${EMPRESA_API_URL}/centro_costo/${idUnidad}/${idCosto}`,costo,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

desactivarCosto(idCosto){
  return axios.get(`${EMPRESA_API_URL}/centro_costo/desactivar/${idCosto}`,{headers: LoginService.agregarAuthorizationHeader()}).then( (res)=>{
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

export default new CentroCostoService();
