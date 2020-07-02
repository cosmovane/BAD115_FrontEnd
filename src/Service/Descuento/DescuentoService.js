import axios from 'axios'

import {BASE_API_URL, BASE_API_PLANILLA} from '../../utilities/constants'
const DESCUENTO_API_URL = `${BASE_API_URL}/${BASE_API_PLANILLA}/descuento`

class DescuentoService {

  allDescuentos(){
    return axios.get(`${DESCUENTO_API_URL}`)
  }

  agregarDescuento(descuento){
    return axios.post(`${DESCUENTO_API_URL}`, descuento)
  }

  obtenerDescuento(id){
    console.log(DESCUENTO_API_URL);
    
    return axios.get(`${DESCUENTO_API_URL}/${id}`)
  }

  modificarDescuento(id, descuento){
    return axios.put(`${DESCUENTO_API_URL}/${id}`, descuento)
  }

  desactivarDescuento(id){
    return axios.delete(`${DESCUENTO_API_URL}/${id}`)
  }
    
}

export default new DescuentoService()