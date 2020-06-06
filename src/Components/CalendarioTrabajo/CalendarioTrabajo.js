import React, { Component } from "react";
import CalendarioTrabajoService from '../../Service/CalendarioTrabajo/CalendarioTrabajoService';
import { Link } from "react-router-dom";
import { faEdit, faBan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CalendarioTrabajo extends Component{
    constructor(props){
        super(props)
        this.state = {
            calendariosTrabajo:[]
        }
        this.refreshCalendariosTrabajo =this.refreshCalendariosTrabajo.bind(this)
        this.desactivar = this.desactivar.bind(this)
    }

    async componentDidMount(){
        await this.refreshCalendariosTrabajo()
    }
    desactivar
    async desactivar(id){
        await CalendarioTrabajoService.desactivarCalendarioTrabajo(id)
        await this.refreshCalendariosTrabajo()
        
    }
    
    async refreshCalendariosTrabajo(){
        const response = await CalendarioTrabajoService.allCalendarioTrabajo()
        const calendariosActivos = response.data.filter(
            r => {
                if(r.estado){
                    return {
                        calendariotrabajo: r.calendariotrabajo,
                        periocidad: r.periocidad,
                        periodo: r.periodo,
                        activo: r.activo
                    }
                }
            }
        )
        this.setState({ calendariosTrabajo: calendariosActivos})
    }

    render(){
        return (
            <div className="container">
                <br/>
                <h3>Periocidad de pago</h3>
                <div className="row">
                    <Link to="periocidad/crear"><button className="btn btn-success">Agregar</button></Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Periodo</th>
                            <th>Periocidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.calendariosTrabajo.map(
                                calendarioTrabajo => {
                                    if(calendarioTrabajo.estado)
                                    return <tr key={calendarioTrabajo.calendariotrabajo}>
                                        <td>{calendarioTrabajo.periodo}</td>
                                        <td>{calendarioTrabajo.periocidad}</td>
                                        <td><Link to={`/periocidad/editar/${calendarioTrabajo.calendariotrabajo}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivar(calendarioTrabajo.calendariotrabajo)} /></button>
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

export default CalendarioTrabajo;