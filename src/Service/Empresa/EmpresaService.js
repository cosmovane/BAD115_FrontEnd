import axios from 'axios'

const BASE_API_URL = 'http://localhost:8000';
const BASE_API_PLANILLA = 'api/planilla';
const EMPRESA_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empresa`;

class EmpresaService{

    allEmpresas(){
        return axios.get(`${EMPRESA_API_URL}`);
    }

    empresa(id){
        return axios.get(`${EMPRESA_API_URL}/${id}`);
    }

    empresaCrear(empresa){
        return axios.post(`${EMPRESA_API_URL}`,empresa);
    }

    empresaActualizar(id,empresa){
        return axios.put(`${EMPRESA_API_URL}/${id}`,empresa);
    }
}



export default new EmpresaService();