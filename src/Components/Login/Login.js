import React from "react";
//import { Button, FormGroup, FormControl } from "react-bootstrap";
import Swal from 'sweetalert2';
//import Alert from 'react-bootstrap/Alert';
import { Formik, Form, Field, ErrorMessage } from 'formik'
//import  { Redirect } from 'react-router-dom'

import "../../Container/Login.css";
import LoginService from '../../Service/Login/LoginService';
let contadorFallida = 0;
let usernameAnterior='';
export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.validate = this.validate.bind(this);
	}
	componentDidMount(){
		if(LoginService.isAuthenticated()){
			console.log("ya esta")
			this.props.history.push('/home');
		}
	}

	validate(values){
		let errors ={}
		if(!values.username) errors.username='Ingrese nombre de usuario';
		if(!values.password) errors.password ='Ingrese password';
		return errors;
	}

	async onSubmit(values){
		const usuario = {
			username: values.username,
			password: values.password,
		}
		this.setState({username:values.username});
		LoginService.login(usuario).then(res=>{
			//console.log(res);
			let objeto_usuario_payload = LoginService.obtenerDatosToken(res.data.access_token);
			LoginService.guardarUsuario(res.data.access_token);
			LoginService.guardarToken(res.data.access_token);
			let username = LoginService.obtenerUsuario();
			//console.log(username)
			Swal.fire({icon: 'success',title: 'Sesión Iniciada',text: `Has iniciado sesión con éxito ${username.username}!`
		})
			contadorFallida = 0;
			//console.log(contadorFallida);
			window.location.reload(false);
			this.props.history.push('/home');
		}).catch( (err)=> {
			//console.log(err.response)
			if(err.response.status == 400 || err.response.status==401){
				if (!(usernameAnterior===this.state.username)) {
					//console.log("entra al ser usuario diferente")
					contadorFallida=0;
					usernameAnterior = this.state.username;
				}
				contadorFallida=contadorFallida+1;
				if(err.response.data.error_description === "User is disabled"){
					Swal.fire(
					'Estado de cuenta',
					'Su cuenta de usuario ha sido bloqueada',
					'info'
					)
					contadorFallida=0;
				}else{
					Swal.fire(
					'Algo ha salido mal',
					'username o password no son las correctas',
					'error'
					)
				}
				console.log("Contador fallida:"+contadorFallida);
				
			}
			if (contadorFallida===3) {
				LoginService.usuarioBloquear(this.state.username).then( (res)=>{
                Swal.fire(
					'Estado de cuenta',
					res.data.mensaje,
					'info'
					)
        		} );
        		contadorFallida=0;
			}
		} );
	}
	render(){
		let {username,password} = this.state;
		return (
			<div className="Login">
			<h4>Iniciar Sesión</h4>
			<Formik
			initialValues={{ username,password}}
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

				<ErrorMessage name="password" component="div"
				className="alert alert-warning" />
				<fieldset className="form-group">
				<label htmlFor="">Password:</label>
				<Field className="form-control" type="password" placeholder="Password" name="password" />
				</fieldset>

				<button className="btn btn-success" type="submit">Sign In</button>
				</Form>
			}
			</Formik>
			</div>
			);

		}
	}