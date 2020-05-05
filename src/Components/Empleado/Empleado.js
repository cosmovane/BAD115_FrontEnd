import React, { Component } from 'react';
import EmpleadoService from '../../Service/Empleado/EmpleadoService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';

export default class EmpleadoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empleados: [],
        }

        this.updateEmpleadoClicked = this.updateEmpleadoClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.refreshEmpleados = this.refreshEmpleados.bind(this);
    }

    componentDidMount() {
        this.refreshEmpleados();
    }

    refreshEmpleados() {
        EmpleadoService.allEmpleados()
            .then(
                response => {
                    console.log(response);
                    this.setState({ empleados: response.data });
                }
            )
    }

    addCourseClicked() {
        this.props.history.push(`/empleado/-1`)
    }


    updateEmpleadoClicked(id){
        this.props.history.push(`/empleado/${id}`)
    }

    render() {
        return (

            <div className="container">
                <h3>Empleados</h3>
                <div className="container">
                    <div className="row">
                        {
                            <button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button>
                        }
                        {/* <button className="btn btn-success" onClick={this.addCourseClicked}>Agregar</button> */}
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Nombre</th>
                            <th>Fecha de Nacimiento</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.empleados.map(
                                empleado =>
                                    <tr key={empleado.idEmpleado}>
                                        {/* <td>{empresa.idEmpresa}</td> */}
                                        <td>{empleado.primernombre} {empleado.segundonombre} {empleado.apellidopaterno} {empleado.apellidomaterno}</td>
                                        <td>{empleado.fechanacimiento}</td>
                                        <td><button className="btn btn-warning btn-sm" onClick={() => this.updateEmpleadoClicked(empleado.idEmpleado)}><FontAwesomeIcon icon={faEdit}/></button></td>
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


