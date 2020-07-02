import axios from 'axios';
//import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants';
const UNIDADORGANIZACIONAL_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/departamentos`;

class UnidadOrganizacionalService{

    allUnidadesOrganizacionales(){
        return axios.get(`${UNIDADORGANIZACIONAL_API_URL}`);
    }

    agregarUnidadOrganizacional(unidadOrganizacional) {
        return axios.post(`${UNIDADORGANIZACIONAL_API_URL}`, unidadOrganizacional);
    }
    
    modificarUnidadOrganizacional(id, unidadOrganizacional){
        return axios.put(`${UNIDADORGANIZACIONAL_API_URL}/${id}`, unidadOrganizacional);
    }
    
    obtenerUnidadOrganizacional(id) {
        return axios.get(`${UNIDADORGANIZACIONAL_API_URL}/${id}`);
    }
    
    desactivarUnidadOrganizacional(id) {
        return axios.delete(`${UNIDADORGANIZACIONAL_API_URL}/${id}`);
    }

}

export default new UnidadOrganizacionalService();