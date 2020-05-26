import React, { Component } from 'react';
import UnidadOrganizacionalService from '../../Service/UnidadOrganizacional/UnidadOrganizacionalService';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


class UnidadOrganizacionalComponent extends Component {

     constructor(props) {
       super(props)
       this.state = {
        unidadesOrganizacionales: []
       }
       this.refreshUnidadesOrganizacionales = this.refreshUnidadesOrganizacionales.bind(this)
       this.desactivar = this.desactivar.bind(this)
     }
    
    async componentDidMount() {
        await this.refreshUnidadesOrganizacionales()
    }

    async desactivar(id) {
      await UnidadOrganizacionalService.desactivarUnidadOrganizacional(id)
      await this.refreshUnidadesOrganizacionales()
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo!',
        html: 'Registro desactivado',
        timer: 5000,
        timerProgressBar: true,
      })
    }

    async refreshUnidadesOrganizacionales() {
      const response=await UnidadOrganizacionalService.allUnidadesOrganizacionales()
      // const unidadesActivos = response.data.filter(
      //   r => {
      //     if(r.estado){
      //       return {
      //         idUnidadorganizacional: r.idUnidadorganizacional,
      //         unidadOrganizacionalSuperior: r.unidadOrganizacionalSuperior,
      //         nombre: r.nombre,
      //         id_empresa: r.id_empresa,
      //         estado: r.estado
      //       }
      //     }
      //   }
      // )
      // this.setState({ unidadesOrganizacionales: unidadesActivos })
    }

    render() {
      return (
        <div className="container">
          <br />
          <h3> Unidades de la Empresa</h3>
          <div className="row">
            <Link to="/departamentos/crear"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus}/>Agregar </button> </Link>
          </div>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th >Nombre</th>
                <th >Unidad Superior</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.unidadesOrganizacionales.map(
                  unidadOrganizacional => {
                    if(unidadOrganizacional.estado)
                    return <tr key={unidadOrganizacional.idUnidadorganizacional}>
                      <td>{unidadOrganizacional.nombre}</td>
                      <td>{unidadOrganizacional.unidadOrganizacionalSuperior}</td>
                      <td>
                        <Link to={`/departamentos/editar/${unidadOrganizacional.idUnidadorganizacional}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                        <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivar(unidadOrganizacional.idUnidadorganizacional)} /></button>
                      </td>
                    </tr>
                    else return <div></div>}
                )
              }
            </tbody>
          </table>
        </div>
      );
    }




    
}

export default UnidadOrganizacionalComponent;