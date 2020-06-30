import axios from 'axios';
import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'
const EMPLEADO_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/empleado`;
const ESTADOCIVIL_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/estadocivil`;
const GENERO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/genero`;

class EmpleadoService{

    allEmpleados(){
        return axios.get(`${EMPLEADO_API_URL}`);
    }

    empleado(id){
        return axios.get(`${EMPLEADO_API_URL}/${id}`);
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

    ultimoEmpleado(){
      return axios.get(`${EMPLEADO_API_URL}/ultimo`)
    }

}



export default new EmpleadoService();
