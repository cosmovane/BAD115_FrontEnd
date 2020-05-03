import React, { Component } from 'react';
import EmpresaService from '../../Service/Empresa/EmpresaService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';

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
                    console.log(response);
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
                            this.state.empresas.length > 0 ? <button className="btn btn-success" disabled ><FontAwesomeIcon icon={faPlus}/> Agregar</button> : <button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button>
                        }
                        {/* <button className="btn btn-success" onClick={this.addCourseClicked}>Agregar</button> */}
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Representante</th>
                                <th>NIT</th>
                                <th>NIC</th>
                                <th></th>
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
                                            <td><button className="btn btn-warning btn-sm" onClick={() => this.updateEmpresaClicked(empresa.idEmpresa)}><FontAwesomeIcon icon={faEdit}/></button></td>
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


