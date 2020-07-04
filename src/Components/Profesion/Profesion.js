import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faEdit,faBan,faPlus,faSave } from '@fortawesome/free-solid-svg-icons'
import ProfesionService from '../../Service/Profesion/ProfesionService'
import LoginService from '../../Service/Login/LoginService';

class ProfesionComponent extends Component {

    constructor(props) {
    super(props)
    this.state = {
        profesiones: []
        
    }
    //this.ProfesionService = new PersonaService();
    this.refreshProfesiones = this.refreshProfesiones.bind(this);
   // this.addCourseClicked = this.addCourseClicked.bind(this)
   // this.updateProfesionClicked = this.updateProfesionClicked.bind(this)
}

async componentDidMount() {
    await this.refreshProfesiones()
  }

  async refreshProfesiones() {
    const response = await ProfesionService.allProfesiones()
    .then(
        response => {
         // console.log(response);
            this.setState({ profesiones: response.data });
        }
    )
}

addCourseClicked() {
  this.props.history.push(`/profesion/-1`)
}


updateProfesionClicked(id){
  this.props.history.push(`/profesion/${id}`)
}

  render() {
    return (
      <div className="container">
                <br />
                <h3>Profesiones</h3>
                <div className="container">
                    <div className="row">
                    {
                            <Link to="/profesion/-1"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus}/>Agregar</button> </Link>
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Acronimo</th>
                                <th style={{ width: '30%' }}>Hasta Nombre</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.profesiones.map(
                                    profesion =>
                                        <tr key={profesion.idProfesion}>
                                            <td>{profesion.acronimo}</td>
                                            <td>{profesion.nombre}</td>
                                            <td>
                                            <Link to={`/profesion/${profesion.idProfesion}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button>
                                            </Link>
                                                </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    );
  }

}

export default ProfesionComponent;