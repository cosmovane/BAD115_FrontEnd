import React, { Component } from 'react';
import UsuarioService from '../../Service/Usuario/UsuarioService';
import RolService from '../../Service/Rol/RolService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class UsuarioForm extends Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			email:'',
			password:'',
			rolesSeleccionados:[]
			roles:[],
		}
	}

	async componentDidMount(){
		const rolesList = await this.RolService.allRolesUser();
		this.setState({roles:rolesList.data})
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3];
			const usuario = await UsuarioService.buscarUsuario(id);
			const {username,email} = usuario.data;
			this.setState({
				username,email,rolesSeleccionados:usuario.data.roles
			});
		}
	}

	validate(values){
		let errors ={}
		if(!values.username) errors.username='Ingrese nombre de usuario';
		if(!values.email) errors.username = 'Ingrese correo electronico';
		if(!this.props.editar){
			if(!values.password) errors.password ='Ingrese password';
		}
		if(values.rolesSeleccionados ===[]) errors.rolesSeleccionados = 'Ingrese roles';
	}

	async onSubmit(values){
		const usuario = {
			username: values.username,
			email: values:email,
			password: values.password,
			roles:values.roles.rolesSeleccionados
		}
		const idUser = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await UsuarioService.editarUsuario(usuario,idUser) : await UsuarioService.crearUsuario(usuario);
		this.props.history.push('/usuarios')
	}

	render(){
		return(
				

			);
	}
}