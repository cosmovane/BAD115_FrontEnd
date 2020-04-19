import React, { Component } from 'react';
import EmpresaService from '../../Service/Empresa/EmpresaService';

export default class EmpresaComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empresas: [],
            message: null
        }
        this.refreshEmpresas = this.refreshEmpresas.bind(this);
        this.addCourseClicked = this.addCourseClicked.bind(this)
        this.updateEmpresaClicked = this.updateEmpresaClicked(this)
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
                <h3>Todas Empresas</h3>
                {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
                <div className="container">
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Agregar</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                            <td>{empresa.idEmpresa}</td>
                                            <td>{empresa.representante}</td>
                                            <td>{empresa.nit}</td>
                                            <td>{empresa.nic}</td>
                                            <td><button className="btn btn-secondary" onClick={() => this.updateEmpresaClicked(empresa.idEmpresa)}>Actualizar</button></td>
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


