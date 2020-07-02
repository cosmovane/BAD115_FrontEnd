import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginService from '../../Service/Login/LoginService';
import IngresoService from '../../Service/CatalogoIngresoService/IngresoService';
const porcentajeTest = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

export default class IngresoForm extends Component{
	constructor(props){
		super(props)
		this.state={
			acronimo:'',
			nombre:'',
			porcentajeIngreso:0
		}
		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
	}


	async componentDidMount(){ 
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3];
			const ingreso = await IngresoService.buscarIngreso(parseInt(id));
			if (ingreso !== undefined) {
			this.setState({
				acronimo:ingreso.data.acronimoIngresos,
				nombre:ingreso.data.nombre,
				porcentajeIngreso:ingreso.data.porcentaje_ingreso
			})
			}
		}
	}

	validate(values){
		let errors={}
		if(!values.acronimo) errors.acronimo = 'Ingrese acrónimo de ingreso'
		if(!values.nombre) errors.nombre = 'Ingrese nombre de ingreso'
		//if(!values.porcentajeIngreso) errors.porcentajeIngreso = 'Ingrese porcentaje de ingreso, solo numeros'
		if(values.porcentajeIngreso){
			if(!porcentajeTest.test(values.porcentajeIngreso)) errors.porcentajeIngreso = 'Ingreso de numero con coincide con formato';
		}
		
	
		return errors;
	}


	async onSubmit(values){
		const ingreso = {
			acronimoIngresos: values.acronimo,
			nombre: values.nombre,
			porcentaje_ingreso:values.porcentajeIngreso
		}
		console.log("mandar:"+ingreso.porcentaje_ingreso);
		const idIngreso = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await IngresoService.editarIngreso(ingreso,idIngreso) : await IngresoService.crearIngreso(ingreso);
		this.props.history.push('/ingresos')
	}



render(){
		let {acronimo,nombre,porcentajeIngreso} = this.state 
		return(
			<div className="container">
        		{this.props.editar ? <h3>Editar ingreso</h3> : <h3>Crear un ingreso</h3>}
        		<Formik
        			 initialValues={{ acronimo,nombre,porcentajeIngreso }}
          			 validateOnChange={false}
          			 validateOnBlur={false}
          			 validate={this.validate}
          			 enableReinitialize={true}
          			 onSubmit={this.onSubmit}
        		>
        		{
        			<Form> 
        				<ErrorMessage name="acronimo" component="div"
                			className="alert alert-warning" />
        				<fieldset className="form-group">
                			<label htmlFor="">Acrónimo:</label>
                			<Field className="form-control" type="text" placeholder="Acrónimo" name="acronimo" />
              			</fieldset>
              			 <ErrorMessage name="nombre" component="div"
                			className="alert alert-warning" />
              			<fieldset className="form-group">
                			<label htmlFor="">Nombre:</label>
                			<Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
              			</fieldset>
              			<ErrorMessage name="porcentajeIngreso" component="div"
                			className="alert alert-warning" />
              			<fieldset className="form-group">
                			<label htmlFor="">Porcentaje:</label>
                			<Field className="form-control" type="number" placeholder="Porcentaje Ingreso" name="porcentajeIngreso" />
              			</fieldset>
              			 {
                            LoginService.hasPermiso('INGRESO_CREATE') ? <button className="btn btn-success" type="submit">Guardar</button>: ""
                        }
              			 
              			<Link to="/ingresos"><button className="btn btn-danger">Regresar</button></Link>
        			</Form>
        		}
        		</Formik>
        	</div>
			);
	}

}