import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_API_URL = 'http://10.10.10.115:8000';
const BASE_API_PLANILLA = 'api/planilla';
const EMPLEADO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empleado`;
const ESTADOCIVIL_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/estadocivil`;
const GENERO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/genero`;
const PUESTOS_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/puestostrabajo`;

class EmpleadoService{

    allEmpleados(){
        return axios.get(`${EMPLEADO_API_URL}`);
    }

    empleado(id){
        return axios.get(`${EMPLEADO_API_URL}/${id}`);
    }

    allPuestos(){
        return axios.get( `${PUESTOS_API_URL}/`)
    }

    empleadoCrear(idGenero,idEstadocivil,idPuestotrabajo,empleado){

        return axios.post(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}`,empleado).then( ()=>{
                Swal.fire(
                    'Buen trabajo!',
                    'El registro fue creado con exito.',
                    'success'
                )
        } ).catch( (respuesta)=> {
            Swal.fire(
                'Algo ha salido mal',
                'El registro no pudo crearse',
                'error'
            )
        } );
    }

    empleadoActualizar(idGenero,idEstadocivil,idPuestotrabajo,empleado){
        return axios.put(`${EMPLEADO_API_URL}/${idGenero}/${idEstadocivil}/${idPuestotrabajo}`,empleado).then( ()=>{
            Swal.fire(
                'Buen trabajo!',
                'El registro fue actualizado con exito.',
                'success'
            )
        } ).catch( (respuesta)=> {
            Swal.fire(
                'Algo ha salido mal',
                'El registro no pudo crearse',
                'error'
            )
        } );
    }

    listarEstadosCiviles(){
        return axios.get(`${ESTADOCIVIL_API_URL}`);
    }

    listarGeneros(){
        return axios.get(`${GENERO_API_URL}`);
    }

}



export default new EmpleadoService();