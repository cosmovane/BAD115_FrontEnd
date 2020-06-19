import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert';
import { Multiselect } from 'multiselect-react-dropdown';
import Select from 'react-select';  
import makeAnimated from 'react-select/animated'; 
import update from 'immutability-helper';

import LoginService from '../../Service/Login/LoginService';
import RolService from '../../Service/Rol/RolService';
import UsuarioService from '../../Service/Usuario/UsuarioService';

const animatedComponents = makeAnimated();  
const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
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

		//this.multiselectRef = React.createRef();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
	}

	async componentDidMount(){
		const rolesList = await RolService.allRolesUser();
		console.log(rolesList.data)
		this.setState({roles:rolesList.data})
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3];
			const usuario = await UsuarioService.buscarUsuario(id);
			const {username,email,roles} = usuario.data;
			this.setState({
				username,email,rolesSeleccionados:roles.map(data=>({label:data.nombre,value:data.idRol})),roles:rolesList.data
			});
		}
	}

	Roles(){
		return (this.state.roles.map(data=>({label:data.nombre,value:data.idRol})));
	}

	RolesSubmit(){
		return (this.state.rolesSeleccionados.map(data=>({idRol:data.value,nombre:data.label})));
	}

	validate(values){
		let errors ={}
		if(!values.username) errors.username='Ingrese nombre de usuario';
		if(!values.email) errors.username = 'Ingrese correo electronico';
		if(!emailTest.test(values.email)) errors.email='Email con coincide con formato';
		if(!this.props.editar){
			if(!values.password) errors.password ='Ingrese password';
			if(!passwordTest.test(values.password)) errors.password = 'Password no coincide con formato';
		}
		if(JSON.stringify(this.state.rolesSeleccionados) === '[]') Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione roles!'});
		return errors;
	}

	async onSubmit(values){
		const usuario = {
			username: values.username,
			email: values.email,
			password: values.password,
			roles:this.RolesSubmit()
		}
		const idUser = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await UsuarioService.editarUsuario(usuario,idUser) : await UsuarioService.crearUsuario(usuario);
		this.props.history.push('/usuarios')
	}

	onChange(value, { action, removedValue }) {
    	switch (action) {
    	  case 'remove-value':
    	  case 'pop-value':
    	    if (removedValue.isFixed) {
    	      return;
     	   }
    	    break;
    	  case 'clear':
    	    value = this.Roles().filter(v => v.isFixed);
    	    break;
    }

    //value = orderOptions(value);
    this.setState({ rolesSeleccionados: update(this.state.rolesSeleccionados, {$set:value})});
   // perSelect = value;
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
                			<Select
                				value={rolesSeleccionados}
                				options={this.Roles()}
                				components={animatedComponents}
                				isMulti
                				className="basic-multi-select"
        						classNamePrefix="select"
        						onChange={this.onChange}
        						isSelectAll={true}
                			/>
              			</fieldset>
                     {
                       LoginService.hasPermiso('USUARIO_CREATE') ?  <button className="btn btn-success" type="submit">Guardar</button>: ""
                     }
              			
              			<Link to="/roles"><button className="btn btn-danger">Regresar</button></Link>
        			</Form>
        		}
        		</Formik>
        	</div>	

			);
	}
}