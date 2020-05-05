import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons'
import ProfesionService from '../../Service/Profesion/ProfesionService'

class ProfesionComponent extends Component {

    constructor(props) {
    super(props)
    this.state = {
        profesiones: []
        
    }
    //this.ProfesionService = new PersonaService();
    this.refreshProfesiones = this.refreshProfesiones.bind(this);
}

async componentDidMount() {
    await this.refreshProfesiones()
  }

  async refreshProfesiones() {
    const response = await ProfesionService.allProfesiones()
     const profesionesActivos = response.data.filter(
      r => {
        if(r.estado){
          return {
            idProfesion: r.idProfesion,
            acronimo: r.acronimo,
            nombre: r.nombre,
            estado: r.estado,
          }
        }
      }
    )
    this.setState({ profesiones: profesionesActivos })
  }



  render() {
    return (
      <div className="container">
        <br />
        <h3> Profesiones</h3>
        <div className="row">
          <Link to="/profesion/crear"> <button className="btn btn-success"> Nuevo </button> </Link>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Acrónimo</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.profesiones.map(
                profesion => {
                    if(profesion.estado)
                    return <tr key={profesion.idProfesion}>
                    <td>{profesion.acronimo}</td>
                    <td>{profesion.nombre}</td>
                    <td>
                        <Link to={`/profesion/editar/${profesion.idProfesion}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                        </td>
                </tr>
                }
              )
            }
          </tbody>
        </table>
      </div>
    );
  }

}

export default ProfesionComponent;