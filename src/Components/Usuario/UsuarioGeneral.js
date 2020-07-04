import React, { Component } from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
//import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert';
//import { Multiselect } from 'multiselect-react-dropdown';
//import Select from 'react-select';  
//import makeAnimated from 'react-select/animated'; 
//import update from 'immutability-helper';

import LoginService from '../../Service/Login/LoginService';
//import RolService from '../../Service/Rol/RolService';
import UsuarioService from '../../Service/Usuario/UsuarioService';
//const animatedComponents = makeAnimated();  
const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export default class UsuarioGeneral extends Component{

	constructor(props){
		super(props)
		this.state={
			username:'',
			email:'',
			password:'',
		}

		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
	}

	async componentDidMount(){
			const id = this.props.location.pathname.split('/')[3];
			//console.log("ID en user general:"+id)
			const usuario = await UsuarioService.buscarUsuarioGeneral(id);
			//console.log("Datos de mi perfil"+usuario.data.username)
			if (usuario !== undefined) {
			//	console.log("entra")
				const {username,email} = usuario.data;
				this.setState({
				username,email
				});

			}
			
	}

	validate(values){
		let errors ={}
		if(!values.username) errors.username='Ingrese nombre de usuario';
		if(!values.email) errors.username = 'Ingrese correo electronico';
		if(!emailTest.test(values.email)) errors.email='Email con coincide con formato';
		if(values.password){
			if(!passwordTest.test(values.password)) errors.password = 'Password no coincide con formato.. debe tener mínimo una mayuscula, una mínuscula y un numero, entre 6 y 20 caracteres';
		}
		return errors;
	}

	async onSubmit(values){
		const usuario = {
			username: values.username,
			email: values.email,
			password: values.password,

		}
		const idUser =  parseInt(this.props.location.pathname.split('/')[3])
		await UsuarioService.editarUsuarioGeneral(usuario,idUser)
		this.props.history.push('/home')
	}

	

	render(){
		let {username,email,password} = this.state;
		return(
			<div className="container">
        	 <h3>Editar Perfíl</h3> 
        		<Formik
        			 initialValues={{ username,email,password }}
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
                			<Field className="form-control" type="password" placeholder="Password.. debe tener mínimo una mayuscula, una mínuscula y un numero, entre 6 y 20 caracteres" name="password" />
              			</fieldset>
              			 {
                            LoginService.hasPermiso('USER_GENERAL_UPDATE') ? <button className="btn btn-success" type="submit">Guardar</button>: ""
                        }
              			<Link to="/home"><button className="btn btn-danger">Regresar</button></Link>
        			</Form>
        		}
        		</Formik>
        	</div>	

			);
	}
	
}