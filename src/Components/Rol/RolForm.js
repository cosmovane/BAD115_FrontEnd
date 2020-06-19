import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';  
import makeAnimated from 'react-select/animated';  
import update from 'immutability-helper';
import MultiSelect from "react-multi-select-component";

import LoginService from '../../Service/Login/LoginService';
import RolService from '../../Service/Rol/RolService';
const animatedComponents = makeAnimated();  
let perSelect = [];
export default class RolForm extends Component{
	constructor(props){
		super(props)
		this.state={
			nombre:'',
			detalle:'',
			permisos:[],
			permisosSeleccionados:[]
		}

		//this.multiselectRef = React.createRef();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
	}

	async componentDidMount(){
		const permisosList = await RolService.allPermisos();
		//console.log(permisosList.data)
		this.setState({permisos:permisosList.data}) 
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3];
			const rol = await RolService.buscarRol(parseInt(id));
			console.log(rol.data)
			const {nombre,detalle,permisos} = rol.data
			this.setState({
				nombre:nombre,detalle:detalle,permisosSeleccionados:permisos.map(data=>({label:data.nombre,value:data.idPermiso})),permisos:permisosList.data
			})

			console.log(this.state.permisosSeleccionados)
		}
	}

	Permisos(){
		return (this.state.permisos.map(data=>({label:data.nombre,value:data.idPermiso})));
	}

	PermisosSubmit(){
		return (this.state.permisosSeleccionados.map(data=>({idPermiso:data.value,nombre:data.label})));
	}

	// PermisosSeleccionados(permisos){
	// 	return (permisos.map(data=>({label:data.nombre,value:data.idPermiso})));
	// }

	validate(values){
		let errors={}
		console.log(this.state.permisosSeleccionados);
		//console.log(perSelect)
		if(!values.nombre) errors.nombre = 'Ingrese nombre de rol'
		if(!values.detalle) errors.detalle = 'Ingrese detalle de rol'
		console.log("antes de validar permisos")
		if(JSON.stringify(this.state.permisosSeleccionados) === '[]') Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione permisos!'})
		console.log("despues de validar permisos")
		return errors;
	}

	async onSubmit(values){
		const rol = {
			nombre: values.nombre,
			detalle: values.detalle,
			permisos:this.PermisosSubmit()
		}

		console.log(rol);
		const idRol = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await RolService.editarRol(rol,idRol) : await RolService.crearRol(rol);
		this.props.history.push('/roles')
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
    	    value = this.Permisos().filter(v => v.isFixed);
    	    break;
    }

    //value = orderOptions(value);
    this.setState({ permisosSeleccionados: update(this.state.permisosSeleccionados, {$set:value})});
   // perSelect = value;
  }



	render(){
		let {nombre,detalle,permisosSeleccionados} = this.state 
		return(
			<div className="container">
        		{this.props.editar ? <h3>Editar rol</h3> : <h3>Crear un rol</h3>}
        		<Formik
        			 initialValues={{ nombre, detalle, permisosSeleccionados }}
          			 validateOnChange={false}
          			 validateOnBlur={false}
          			 validate={this.validate}
          			 enableReinitialize={true}
          			 onSubmit={this.onSubmit}
        		>
        		{
        			<Form> 
        				<ErrorMessage name="nombre" component="div"
                			className="alert alert-warning" />
        				<fieldset className="form-group">
                			<label htmlFor="">Nombre:</label>
                			<Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
              			</fieldset>
              			 <ErrorMessage name="detalle" component="div"
                			className="alert alert-warning" />
              			<fieldset className="form-group">
                			<label htmlFor="">Descripción:</label>
                			<Field className="form-control" type="text" placeholder="Descripción de rol" name="detalle" />
              			</fieldset>
              			<fieldset className="form-group">
                			<label htmlFor="">Permisos:</label>
                			<Select
                				value={permisosSeleccionados}
                				options={this.Permisos()}
                				components={animatedComponents}
                				isMulti
                				className="basic-multi-select"
        						classNamePrefix="select"
        						onChange={this.onChange}
        						isSelectAll={true}
                			/>
              			</fieldset>
              			 {
                            LoginService.hasPermiso('ROLE_CREATE') ? <button className="btn btn-success" type="submit">Guardar</button>: ""
                        }
              			 
              			<Link to="/roles"><button className="btn btn-danger">Regresar</button></Link>
        			</Form>
        		}
        		</Formik>
        	</div>
			);
	}

}