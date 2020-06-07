import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert';

import RolService from '../../Service/Rol/RolService';

export default class RolForm extends Component{
	constructor(props){
		super(props)
		this.state={
			nombre:'',
			detalle:'',
			permisos:[],
			permisosSeleccionados:[]
		}

		this.multiselectRef = React.createRef();

		this.onSubmit = this.onSubmit.bind(this);
    	this.validate = this.validate.bind(this);
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
		if(this.state.permisosSeleccionados === []) Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione permisos!'})
		return errors;
	}

	async onSubmit(values){
		const rol = {
			nombre: values.nombre,
			detalle: values.detalle,
			permisos:values.permisosSeleccionados
		}
		const idRol = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '';
		this.props.editar ? await RolService.editarRol(rol,idRol) : await RolService.crearRol(rol);
		this.props.history.push('/roles')
	}

	permisoSeleccionado(){
		const permiso = this.multiselectRef.current.getSelectedItems();
		this.setState({permisosSeleccionados:permiso})
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
                			<Multiselect
								options={this.state.permisos} // Options to display in the dropdown
								selectedValues={permisosSeleccionados} // Preselected value to persist in dropdown
								ref={this.multiselectRef}
								onSelect={this.permisoSeleccionado} // Function will trigger on select event
								onRemove={this.permisoSeleccionado} // Function will trigger on remove event
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