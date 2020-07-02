import axios from 'axios';
import Swal from 'sweetalert2';

import { BASE_API_URL, BASE_API_PLANILLA } from '../../utilities/constants'

const COMISION_API_URL=`${BASE_API_URL}/${BASE_API_PLANILLA}/comision`;

class ComisionService{

    allComisiones(){
        return axios.get(`${COMISION_API_URL}`);
    }
    
    comision(id){
        return axios.get(`${COMISION_API_URL}/${id}`);
    }

    comisionCrear(comision){
        const test=axios.post(`${COMISION_API_URL}/crear`,comision)
        
        console.log(test)
        console.log(`${COMISION_API_URL}/crear`)
        return test

    }

    comisionActualizar(id, comision){

         return  axios.put(`${COMISION_API_URL}/${id}`,comision)
    }



}
export default new ComisionService();
