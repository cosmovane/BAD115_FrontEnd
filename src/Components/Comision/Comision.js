import React, { Component } from 'react';
import ComisionService from '../../Service/Comision/ComisionService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import LoginService from '../../Service/Login/LoginService';
export default class ComisionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comisiones: [],
        }

        this.refreshComisiones = this.refreshComisiones.bind(this)


       this.updateComisionClicked = this.updateComisionClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
    }

   async componentDidMount() {
        await this.refreshComisiones();
    }

    async refreshComisiones() {
        const response = await ComisionService.allComisiones()
            .then(
                response => {
                    console.log(response);
                    this.setState({ comisiones: response.data });
                }
            )
    }

    addCourseClicked() {
        this.props.history.push(`/comision/-1`)
    }


    updateComisionClicked(id, comison){
        this.props.history.push(`/comison/${id}`)
    }

    render() {
        return (

            <div className="container">
                <br />
                <h3>Comisiones para Ventas</h3>
                <div className="container">
                    <div className="row">
                    {
                         LoginService.hasPermiso('COMISION_CREATE') ? <button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button> : ""
                        }
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Desde el valor de venta</th>
                                <th style={{ width: '30%' }}>Hasta el valor de venta</th>
                                <th style={{ width: '20%' }}>Porcentaje de Comision</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.comisiones.map(
                                    comision =>
                                        <tr key={comision.idComision}>
                                            <td>{comision.desde}</td>
                                            <td>{comision.hasta}</td>
                                            <td>{comision.porcentajecomision}</td>
                                            <td>
                                            {
                                                LoginService.hasPermiso('COMISION_CREATE') ? <button className="btn btn-warning btn-sm" onClick={() => this.updateComisionClicked(comision.idComision)}><FontAwesomeIcon icon={faEdit}/></button> : ""
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