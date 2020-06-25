import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import RolService from '../../Service/Rol/RolService';
import LoginService from '../../Service/Login/LoginService';
export default class RolVer extends Component{
	constructor(props){
		super(props)
		this.state={
			nombre:'',
			detalle:'',
			permisos:[]
		}
	}


	async componentDidMount(){
		if(this.props.ver){
			const id = this.props.location.pathname.split('/')[3];
			const rol = await RolService.buscarRol(parseInt(id));
			const {nombre,detalle,permisos} = rol.data
			this.setState({
				nombre,detalle,permisos
			})
		}
	}

	render(){
		return(
				
            <Container>
            
            	<Row>
            		<Col> <h3>{this.state.nombre}</h3></Col>
            	</Row>
            	<Row>
            	 {
                     LoginService.hasPermiso('ROL_UPDATE') ? <Link to={`/rol/editar/${this.props.location.pathname.split('/')[3]}`}><button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} />Editar</button></Link> : ""
                 }	
            		<Link to="/roles"><button className="btn btn-danger">Regresar</button></Link>
            	</Row>
  				<Row>
    				<Col><h4>Descripción</h4></Col>
    				<Col><h4>Permisos</h4></Col>
  				</Row>
  				<Row>
    				<Col><h5>{this.state.detalle}</h5></Col>
    				<Col>{this.state.permisos.map(
									permiso=><h5 key={permiso.idPermiso}>{permiso.nombre}</h5>
                       )}</Col>
  				</Row>
			</Container>
			);
	}
}