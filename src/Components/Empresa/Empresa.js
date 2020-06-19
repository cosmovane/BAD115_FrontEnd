import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';

import EmpresaService from '../../Service/Empresa/EmpresaService';
import LoginService from '../../Service/Login/LoginService';
export default class EmpresaComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empresas: [],
        }

        this.updateEmpresaClicked = this.updateEmpresaClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.refreshEmpresas = this.refreshEmpresas.bind(this);
    }

    componentDidMount() {
        this.refreshEmpresas();
    }

    refreshEmpresas() {
        EmpresaService.allEmpresas()//HARDCODED
            .then(
                response => {
                 //   console.log(response);
                    this.setState({ empresas: response.data });
                }
            )
    }

    addCourseClicked() {
        this.props.history.push(`/empresa/-1`)
    }

   
    updateEmpresaClicked(id){
        this.props.history.push(`/empresa/${id}`)
    }

    render() {
        return (

            <div className="container">
                <h3>Empresas</h3>
                {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
                <div className="container">
                    <div className="row">
                        {

                            LoginService.hasPermiso('EMPRESA_CREATE') ? this.state.empresas.length > 0 ? <button className="btn btn-success" disabled ><FontAwesomeIcon icon={faPlus}/> Agregar</button> : <button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button> : ""
                        }
                        {/* <button className="btn btn-success" onClick={this.addCourseClicked}>Agregar</button> */}
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '15%' }}>Representante</th>
                                <th style={{ width: '55%' }}>NIT</th>
                                <th style={{ width: '20%' }}>NIC</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.empresas.map(
                                    empresa =>
                                        <tr key={empresa.idEmpresa}>
                                            {/* <td>{empresa.idEmpresa}</td> */}
                                            <td>{empresa.representante}</td>
                                            <td>{empresa.nit}</td>
                                            <td>{empresa.nic}</td>
                                            <td>
                                            {
                                                LoginService.hasPermiso('COSTO_UPDATE') ? <button className="btn btn-warning btn-sm" onClick={() => this.updateEmpresaClicked(empresa.idEmpresa)}><FontAwesomeIcon icon={faEdit}/></button> : ""
                                            }
                                                
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


