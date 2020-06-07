import React, { Component } from 'react';
import RolService from '../../Service/Rol/RolService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert';
import { Multiselect } from 'multiselect-react-dropdown';

import UsuarioService from '../../Service/Usuario/UsuarioService';
export default class UsuarioForm extends Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			email:'',
			password:'',
			rolesSeleccionados:[],
			roles:[],
		}

		this.multiselectRef = React.createRef();

		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
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
		if(values.rolesSeleccionados ===[]) Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione roles!'});
		return errors;
	}

	async onSubmit(values){
		const usuario = {
			username: values.username,
			email: values.email,
			password: values.password,
			roles:values.rolesSeleccionados
		}
		const idUser = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await UsuarioService.editarUsuario(usuario,idUser) : await UsuarioService.crearUsuario(usuario);
		this.props.history.push('/usuarios')
	}

	rolSeleccionado(){
		const rol = this.multiselectRef.current.getSelectedItems();
		this.setState({rolesSeleccionados:rol})
	}

	render(){
		let {username,email,password,rolesSeleccionados} = this.state;
		return(
			<div className="container">
        		{this.props.editar ? <h3>Editar usuario</h3> : <h3>Crear un usuario</h3>}
        		<Formik
        			 initialValues={{ username,email,password,rolesSeleccionados }}
          			 validateOnChange={false}
          			 validateOnBlur={false}
          			 validate={this.validate}
          			 enableReinitialize={true}
          			 onSubmit={this.onSubmit}
        		>
        		{
        			<Form> 
        				<ErrorMessage name="username" component="div"
                			className="alert alert-warning" />
        				<fieldset className="form-group">
                			<label htmlFor="">Username:</label>
                			<Field className="form-control" type="text" placeholder="Nombre" name="username" />
              			</fieldset>
              			 <ErrorMessage name="email" component="div"
                			className="alert alert-warning" />
              			<fieldset className="form-group">
                			<label htmlFor="">Email:</label>
                			<Field className="form-control" type="text" placeholder="Email" name="email" />
              			</fieldset>
              			<ErrorMessage name="password" component="div"
                			className="alert alert-warning" />
              			<fieldset className="form-group">
                			<label htmlFor="">Password:</label>
                			<Field className="form-control" type="text" placeholder="Password" name="password" />
              			</fieldset>
              			<fieldset className="form-group">
                			<label htmlFor="">Roles:</label>
                			<Multiselect
								options={this.state.roles} // Options to display in the dropdown
								selectedValues={rolesSeleccionados} // Preselected value to persist in dropdown
								ref={this.multiselectRef}
								onSelect={this.rolSeleccionado} // Function will trigger on select event
								onRemove={this.rolSeleccionado} // Function will trigger on remove event
								displayValue="nombre" // Property name to display in the dropdown options
								
							/>
              			</fieldset>
        			</Form>
        		}
        		</Formik>
        	</div>	

			);
	}
}