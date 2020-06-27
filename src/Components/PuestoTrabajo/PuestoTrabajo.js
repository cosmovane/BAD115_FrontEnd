import React, { Component } from 'react';
import PuestosTrabajoService from '../../Service/PuestoTrabajo/PuestoTrabajoService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

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
    Swal.fire({
      icon: 'success',
      title: 'Buen trabajo!',
      html: 'Registro desactivado',
      timer: 5000,
      timerProgressBar: true,
    })
  }

  async refreshPuestosTrabajo() {
    const response = await PuestosTrabajoService.allPuestosTrabajo()
    const puestosActivos = response.data.filter(
      r => {
        if (r.estado) {
          return {
            idPuestotrabajo: r.idPuestotrabajo,
            nombre: r.nombre,
            descripcion: r.descripcion,
            estado: r.estado,
            id_salario: r.id_salario
          }
        }
      }
    )
    this.setState({ puestosTrabajo: puestosActivos })
  }

  render() {
    return (
      <div className="container">
        <h3> Puestos de Trabajo</h3>
        <div className="row">
          <Link to="/puestotrabajo/crear"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus} />Agregar </button> </Link>
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
                  if (puestoTrabajo.estado)
                    return <tr key={puestoTrabajo.idPuestotrabajo}>
                      <td>{puestoTrabajo.nombre}</td>
                      <td>{puestoTrabajo.descripcion}</td>
                      <td>${puestoTrabajo.id_salario.desde} - ${puestoTrabajo.id_salario.hasta}</td>
                      <td>
                        <Link to={`/puestotrabajo/editar/${puestoTrabajo.idPuestotrabajo}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                        <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={() => this.desactivar(puestoTrabajo.idPuestotrabajo)} /></button>
                      </td>
                    </tr>
                  else return <div></div>
                }
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default PuestoTrabajoComponent;