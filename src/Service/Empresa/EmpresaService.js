import axios from 'axios';
import Swal from 'sweetalert2';

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
        Swal.fire(
            'Buen trabajo!',
            'Registro creado con éxito!',
            'success'
          )
        return axios.post(`${EMPRESA_API_URL}/crear`,empresa);
    }

    empresaActualizar(idEmpresa,idDireccion,empresa){
        Swal.fire(
            'Buen trabajo!',
            'Registro actuaizado con éxito!',
            'success'
          )
        return axios.put(`${EMPRESA_API_URL}/${idEmpresa}/${idDireccion}`,empresa);
    }

    departamentosMunicipios(){
        return axios.get(`${EMPRESA_API_URL}/departamento/municipios`);
    }
}



export default new EmpresaService();