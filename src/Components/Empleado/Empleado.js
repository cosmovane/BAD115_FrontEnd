import React, { Component } from 'react';
import EmpleadoService from '../../Service/Empleado/EmpleadoService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';
import LoginService from '../../Service/Login/LoginService';
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
        console.log(this.state.empleados);
        return (

            <div className="container">
                <h3>Empleados</h3>
                <div className="container">
                    <div className="row">
                        {
                           LoginService.hasPermiso('EMPLEADO_CREATE') ? <button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button> : ""
                        }
                        {/* <button className="btn btn-success" onClick={this.addCourseClicked}>Agregar</button> */}
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Primer Nombre</th>
                            <th>Segundo Nombre</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Direcci&oacute;n</th>
                            <th>Puesto de Trabajo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.empleados.map(
                                empleado =>

                                    <tr key={empleado.idEmpleado}>
                                        {/* <td>{empresa.idEmpresa}</td> */}
                                        {empleado.estado ? (<td>{empleado.primernombre}</td>) : ('')}
                                        {empleado.estado ? (<td> {empleado.segundonombre} </td> ) : ('')}
                                        {empleado.estado ? (<td> {empleado.apellidopaterno} </td> ) : ('')}
                                        {empleado.estado ? (<td> {empleado.apellidomaterno}</td> ) : ('')}
                                        {empleado.estado ? (<td>{empleado.fechanacimiento}</td> ) : ('')}
                                        {empleado.estado ? (<td>{ empleado.id_direccion.id_departmento.nombre + ', ' + empleado.id_direccion.id_municipio.nombre + ' ' + empleado.id_direccion.colonia  }</td> ) : ('')}
                                        {empleado.estado ? (<td>{ empleado.id_puestotrabajo ? (empleado.id_puestotrabajo.nombre): ('')}</td> ) : ('')}
                                        {empleado.estado ? (<td>
                                        {
                                          LoginService.hasPermiso('EMPLEADO_UPDATE') ? <button className="btn btn-warning btn-sm" onClick={() => this.updateEmpleadoClicked(empleado.idEmpleado)}><FontAwesomeIcon icon={faEdit}/></button> : ""
                                        }
                                        </td> ) : ('')}
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


