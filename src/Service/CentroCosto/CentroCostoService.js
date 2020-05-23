import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const EMPRESA_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}`;
class CentroCostoService{

	listUnidades(id){
		return axios.get(`${EMPRESA_API_URL}/unidad_organizacional/list/${id}`);
	}

	listCostos(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/list/${id}`);
	}

	buscarCosto(id){
		return axios.get(`${EMPRESA_API_URL}/centro_costo/${id}`);
	}

	crearCosto(costo,idUnidad){
		return axios.post(`${EMPRESA_API_URL}/centro_costo/${idUnidad}`,costo);
	}

	editarCosto(costo,idUnidad,idCosto){
		return axios.put(`${EMPRESA_API_URL}/centro_costo/${idUnidad}/${idCosto}`,costo);
	}

	desactivarCosto(idCosto){
		return axios.put(`${EMPRESA_API_URL}/centro_costo/desactivar/${idCosto}`);
	}
}

export default new CentroCostoService();
