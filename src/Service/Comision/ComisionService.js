import axios from 'axios';


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

    comisionActualizar(comision){

        const test=axios.put(`${COMISION_API_URL}/editar`,comision)
        console.log(test)
        console.log(`${COMISION_API_URL}/editar`)
         return  test
    }



}
export default new ComisionService();
