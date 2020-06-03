import React, { Component } from 'react';
import RolService from '../../Service/Rol/RolService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class RolForm extends Component{
	constructor(props){
		super(props)
		this.state={
			nombre:'',
			detalle:'',
			permisos:[],
			permisosSeleccionados:[]
		}
	}

	async componentDidMount(){
		const permisosList = RolService.allPermisos();
		this.setState({permisos:permisosList}) 
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3];
			const rol = await RolService.buscarRol(parseInt(id));
			const {nombre,detalle} = rol.data
			this.setState({
				nombre,detalle,permisosSeleccionados:rol.data.permisos
			})
		}
	}

	validate(values){
		let errors={}
		if(!values.nombre) errors.nombre = 'Ingrese nombre de rol'
		if(!values.detalle) errors.detalle = 'Ingrese detalle de rol'
		if(values.permisosSeleccionados === []) errors.detalle = 'Seleccione permisos que contendra rol'
		return errors;
	}

	async onSubmit(values){
		const rol = {
			nombre: values.nombre,
			detalle: values:detalle,
			permisos:values.permisosSeleccionados
		}
		const idRol = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await RolService.editarRol(rol,idRol) : await RolService.crearRol(rol);
		this.props.history.push('/roles')
	}

	render(){
		return(


			);
	}

}