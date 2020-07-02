 import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LoginService from '../../Service/Login/LoginService';
import IngresoService from '../../Service/CatalogoIngresoService/IngresoService';

export default class Ingresos extends Component{
	constructor(props){
		super(props)
		this.state={
			ingresos:[],
			ingresosBackup:[],
			buscarText:''
		}

		this.refreshRoles = this.refreshRoles.bind(this);
		this.desactivarActivarIngreso = this.desactivarActivarIngreso.bind(this)
	}

	async componentDidMount(){
		await this.refreshRoles();
	}

	async desactivarActivarIngreso(id){
		await IngresoService.desactivarIngreso(id);
		await this.refreshRoles();
	}

	Ingresos(ingresos){
        return (ingresos.map(data=>({
        	idCatalogoingresos:data.idCatalogoingresos,
        	acronimoIngresos:data.acronimoIngresos,
        	nombre:data.nombre,
        	porcentaje_ingreso:data.porcentaje_ingreso,
        	estado:data.estado ? 'Activo' : 'Inactivo'})));
    }

    async refreshRoles(){
		const response = await IngresoService.allIngresos();
        if (response !== undefined) {
            this.setState({ingresos:this.Ingresos(response.data),ingresosBackup:this.Ingresos(response.data)});
        }
		
	}

    filter(event){
        let text = event.target.value
        const data = this.state.ingresosBackup
        const newData = data.filter(res=>{
            const resDataAcronimo = res.acronimoIngresos.toUpperCase()
            const resDataNombre = res.nombre.toUpperCase()
            const resDataPorcentaje = res.porcentaje_ingreso.toString()
            const resDataEstado = res.estado.toUpperCase()
            const campo = resDataAcronimo+" "+resDataNombre+" "+resDataPorcentaje+" "+resDataEstado
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })

        this.setState({
            ingresos:newData,
            buscarText:text
        })
    }

    render(){
		return (
			<div className="container">
                <h3>Ingresos</h3>
                <div className="container">
                    <Row>
                        <Col sm={2}>
                         {
                            LoginService.hasPermiso('INGRESO_CREATE') ? <Link to="/ingreso/crear" style={{' position': 'absolute','left': '150px'}} className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>Agregar</Link>: ""
                        }
                            
                        </Col>
                        <Col sm={4}></Col>
                        <Col sm={6}>
                            <input className="form-control"  placeholder="Buscar.." value={this.state.buscarText} onChange={(text) => this.filter(text)}/>
                        </Col>
                    </Row>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '15%' }}>Acronimo</th>
                                <th style={{ width: '45%' }}>Nombre</th>
                                <th style={{ width: '10%' }}>Porcentaje</th>
                                <th style={{ width: '10%' }}>Estado</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ingresos.map(
                                    ingreso =>
                                        <tr key={ingreso.idCatalogoingresos}>
                                            <td>{ingreso.acronimoIngresos}</td>
                                            <td>{ingreso.nombre}</td>
                                            <td>{ingreso.porcentaje_ingreso}</td>
                                            <td>{ingreso.estado}</td>
                                            <td>
                                            
                                             {
                                                 LoginService.hasPermiso('INGRESO_UPDATE') ? <Link to={`/ingreso/editar/${ingreso.idCatalogoingresos}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link> : ""
                                             }
                                             {
                                                 LoginService.hasPermiso('INGRESO_DISABLED') ? <button className="btn btn-secondary btn-sm" ><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivarActivarIngreso(ingreso.idCatalogoingresos)}/></button> : ""
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