import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const EMPRESA_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;
class CentroCostoService{

	listUnidades(id){
		return axios.get(`${EMPRESA_API_URL}/unidad_organizacional/list/${id}`).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje ,
                'error'
            )
            console.log(err.response.data.mensaje)
        } );
	}

	listCostos(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/list/${id}`);
	}

	buscarCosto(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/${id}`).catch( (err)=> {
            Swal.fire(
                'Algo ha salido mal',
                err.response.data.mensaje ,
                'error'
            )
            console.log(err.response.data.mensaje)
        } );
	}

	crearCosto(costo,idUnidad){
		return axios.post(`${EMPRESA_API_URL}/centro_costo/${idUnidad}`,costo).then( (res)=>{
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

	editarCosto(costo,idUnidad,idCosto){
		return axios.put(`${EMPRESA_API_URL}/centro_costo/${idUnidad}/${idCosto}`,costo).then( (res)=>{
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

	desactivarCosto(idCosto){
		return axios.put(`${EMPRESA_API_URL}/centro_costo/desactivar/${idCosto}`).then( (res)=>{
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

export default new CentroCostoService();
