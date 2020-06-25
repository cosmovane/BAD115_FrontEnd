import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LoginService from '../../Service/Login/LoginService';
import RolService from '../../Service/Rol/RolService';
export default class Roles extends Component{
	constructor(props){
		super(props)
		this.state={
			roles:[],
            rolesBackup:[],
            textBuscar:''
		}

		this.refreshRoles = this.refreshRoles.bind(this);
        this.desactivarActivarRol = this.desactivarActivarRol.bind(this)
	}

	async componentDidMount(){
		await this.refreshRoles();
	}


	async desactivarActivarRol(id){
		await RolService.desactivarRol(id);
       // console.log("despues de desactivar debe pasar a refresh")
		await this.refreshRoles();
	}

    Roles(roles){
        return (roles.map(data=>({idRol:data.idRol,nombre:data.nombre,detalle:data.detalle,estado:data.estado ? 'Activo' : 'Inactivo'})));
    }

	async refreshRoles(){
       // console.log("entro a roles a refrescar despues de eliminar")
		const response = await RolService.allRoles();

		this.setState({roles:this.Roles(response.data),rolesBackup:this.Roles(response.data)});
	}

        Roles(roles){
        return (roles.map(data=>({idRol:data.idRol,nombre:data.nombre,detalle:data.detalle,estado:data.estado ? 'Activo' : 'Desactivado'})));
    }

    filter(event){
        let text = event.target.value
        const data = this.state.rolesBackup
        const newData = data.filter(res=>{
            const resDataNombre = res.nombre.toUpperCase()
            const resDataDescripcion = res.detalle.toUpperCase()
            const resDataEstado = res.estado.toUpperCase()
            const campo = resDataNombre+" "+resDataDescripcion+" "+resDataEstado
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })

        this.setState({
            roles:newData,
            buscarText:text
        })
    }

	render(){
		return (
			<div className="container">
                <h3>Roles</h3>
                <div className="container">
                    <Row>
                        <Col sm={2}>
                         {
                            LoginService.hasPermiso('ROL_CREATE') ? <Link to="/rol/crear" style={{' position': 'absolute','left': '150px'}} className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>Agregar</Link>: ""
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
                                <th style={{ width: '15%' }}>Nombre</th>
                                <th style={{ width: '55%' }}>Descripción</th>
                                <th style={{ width: '10%' }}>Estado</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.roles.map(
                                    rol =>
                                        <tr key={rol.idRol}>
                                            <td>{rol.nombre}</td>
                                            <td>{rol.detalle}</td>
                                            <td>{
                                                    rol.estado
                                                }</td>
                                            <td>
                                             {
                                                 LoginService.hasPermiso('ROL_READ') ? <Link to={`/rol/ver/${rol.idRol}`}><button className="btn btn-info btn-sm"><FontAwesomeIcon icon={faEye} /></button></Link> : ""
                                             }
                                             {
                                                 LoginService.hasPermiso('ROL_UPDATE') ? <Link to={`/rol/editar/${rol.idRol}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link> : ""
                                             }
                                             {
                                                 LoginService.hasPermiso('ROL_DISABLED') ? <button className="btn btn-secondary btn-sm" ><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivarActivarRol(rol.idRol)}/></button> : ""
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