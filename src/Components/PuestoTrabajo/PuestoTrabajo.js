import React, { Component } from 'react';
import PuestosTrabajoService from '../../Service/PuestoTrabajo/PuestoTrabajoService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class PuestoTrabajoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      puestosTrabajo: []
    }

    this.refreshPuestosTrabajo = this.refreshPuestosTrabajo.bind(this)
    this.desactivar = this.desactivar.bind(this)
  }

  async componentDidMount() {
    await this.refreshPuestosTrabajo()
  }

  async desactivar(id) {
    await PuestosTrabajoService.desactivarPuestoTrabajo(id)
    await this.refreshPuestosTrabajo()
  }

  async refreshPuestosTrabajo() {
    const response = await PuestosTrabajoService.allPuestosTrabajo()
    this.setState({ puestosTrabajo: response.data })
  }

  render() {
    return (
      <div className="container">
        <br />
        <h3> Puestos de Trabajo</h3>
        <div className="row">
          <Link to="/puestotrabajo/crear"> <button className="btn btn-success"> Agregar </button> </Link>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Nombre</th>
              <th style={{ width: '55%' }}>Descripción</th>
              <th style={{ width: '20%' }}>Rango de salario</th>
              <th style={{ width: '10%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.puestosTrabajo.map(
                puestoTrabajo => {
                  if(puestoTrabajo.estado)
                  return <tr key={puestoTrabajo.idPuestotrabajo}>
                    <td>{puestoTrabajo.nombre}</td>
                    <td>{puestoTrabajo.descripcion}</td>
                <td>${puestoTrabajo.id_salario.desde} - ${puestoTrabajo.id_salario.hasta}</td>
                    <td>
                      <Link to={`/puestotrabajo/editar/${puestoTrabajo.idPuestotrabajo}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                      <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivar(puestoTrabajo.idPuestotrabajo)} /></button>
                    </td>
                  </tr>}
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default PuestoTrabajoComponent;