import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_API_URL = 'http://10.10.10.121:8000';
const BASE_API_PLANILLA = 'api/planilla';
const EMPLEADO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empleado`;

class EmpleadoService{

    allEmpleados(){
        return axios.get(`${EMPLEADO_API_URL}`);
    }

    empleado(id){
        return axios.get(`${EMPLEADO_API_URL}/${id}`);
    }

    empleadoCrear(idGenero,idEstadocivil,idPuestotrabajo,empleado){
        Swal.fire(
            'Buen trabajo!',
            'Registro creado con éxito!',
            'success'
        )
        return axios.post(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}`,empleado);
    }

    empleadoActualizar(idGenero,idEstadocivil,idPuestotrabajo,empleado){
        Swal.fire(
            'Buen trabajo!',
            'Registro actuaizado con éxito!',
            'success'
        )
        return axios.put(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}`,empleado);
    }

}



export default new EmpleadoService();