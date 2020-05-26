import axios from 'axios';
//import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants';
const CALENDARIOTRABAJO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/periocidad`;

class CalendarioTrabajoService{
    allCalendarioTrabajo(){
        return axios.get(`${CALENDARIOTRABAJO_API_URL}`);
    }

    agregarCalendarioTrabajo(calendarioTrabajo) {
        return axios.post(`${CALENDARIOTRABAJO_API_URL}`, calendarioTrabajo);
    }
    
    modificarCalendarioTrabajo(id, calendarioTrabajo){
        return axios.put(`${CALENDARIOTRABAJO_API_URL}/${id}`, calendarioTrabajo);
    }
    
    obtenerCalendarioTrabajo(id) {
        return axios.get(`${CALENDARIOTRABAJO_API_URL}/${id}`);
    }
    
    desactivarCalendarioTrabajo(id) {
        return axios.delete(`${CALENDARIOTRABAJO_API_URL}/${id}`);
    }
}

export default new CalendarioTrabajoService;