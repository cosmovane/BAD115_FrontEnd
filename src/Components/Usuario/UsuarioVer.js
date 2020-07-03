import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LoginService from '../../Service/Login/LoginService';
import UsuarioService from '../../Service/Usuario/UsuarioService';
export default class UsuarioVer extends Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			email:'',
			roles:[]
		}
	}


	async componentDidMount(){
		if(this.props.ver){
			const id = this.props.location.pathname.split('/')[3];
			const user = await UsuarioService.buscarUsuario(parseInt(id));
			if (user !== undefined) {
				const {username,email,roles} = user.data
			this.setState({
				username,email,roles
			})
			}
			
		}
	}

	render(){
		return(
				
            <Container>
            
            	<Row>
            		<Col> <h3>Usuario</h3></Col>
            	</Row>
            	<Row>
            	 {
                    LoginService.hasPermiso('USER_UPDATE') ? <Link to={`/usuario/editar/${this.props.location.pathname.split('/')[3]}`}><button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} />Editar</button></Link>: ""
                  }
            		<Link to="/usuarios"><button className="btn btn-danger">Regresar</button></Link>
            	</Row>
  				<Row>
    				<Col><h4>Username</h4></Col>
    				<Col><h4>Email</h4></Col>
    				<Col><h4>Roles</h4></Col>
  				</Row>
  				<Row>
    				<Col><h5>{this.state.username}</h5></Col>
    				<Col><h5>{this.state.email}</h5></Col>
    				<Col>{this.state.roles.map(
									rol=><h5 key={rol.idRol}>{rol.nombre}</h5>
                       )}</Col>
  				</Row>
			</Container>
			);
	}
}