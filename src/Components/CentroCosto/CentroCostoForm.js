import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';

export default class CentroCostoForm extends Component{
	constructor(props){
		super(props)
		this.state={
			idCosto:0,
			monto:0,
			unidades:[],
			idUnidad:0,
			unidad:'',

		}
		this.onSubmit = this.onSubmit.bind(this)
		this.validate = this.validate.bind(this)
   	 	this.validateNumber = this.validateNumber.bind(this)
	}

	async componentDidMount(){
		const id =-1
		const unidades = await CentroCostoService.listUnidades(id)
		//console.log(unidades2)
		this.setState({
			unidades:unidades.data
		})

		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3]
			const costo = await CentroCostoService.buscarCosto(parseInt(id))
			const {idCosto,monto} = costo.data
			const idUnidad = costo.data.idUnidad.id.idUnidadorganizacional
			const unidad = costo.data.idUnidad.nombre
			this.setSate({
				idCosto,monto,idUnidad,unidad
			})
		}
	}

	validateNumber(number) {
    const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
    return isNumber.test(number)
  	}

	validate(values){
		let errors = {}
		console.log("ID UNIDAD:"+this.state.idUnidad)
		if(this.state.idUnidad == 0) Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione unidad!'})
		if(!values.monto) errors.monto = 'Ingrese monto'
		if(!this.validateNumber(values.monto)) errors.monto = 'Debe ingresar un monto con dos decimales '
		if(parseFloat(values.monto) <= 0) errors.monto = 'Ingrese un monto positivo'
		return errors
	}

	async onSubmit(values){
		const costo={
			idCosto: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
			monto: values.monto
		}
		this.props.editar ? await CentroCostoService.editarCosto(costo,this.state.idUnidad,costo.idCosto) 
			: await CentroCostoService.crearCosto(costo,this.state.idUnidad)
		this.props.history.push('/centro_costo')
	}

	render(){
		let {idUnidad,monto} = this.state
		return(
			<div className="container">
				{this.props.editar ? <h3>Editar costo</h3> : <h3>Crear costo</h3>}
				<Formik
				initialValues={{ idUnidad, monto}}
          		validateOnChange={false}
          		validateOnBlur={false}
          		validate={this.validate}
          		enableReinitialize={true}
          		onSubmit={this.onSubmit}
				>
				{(props) =>(
					<Form>
					 <Row>
					 <Col sm={2}>
					 <label htmlFor="">Unidad organizacional:</label>
					 </Col>
					  <Col sm={3}>
						<fieldset className="form-group">
                          	<select className="form-control" onChange={(e) => this.setState({ idUnidad: e.target.value })}>
                          		<option value="NU">Seleccione unidad..</option>
                           		{this.state.unidades.map(unidad => <option key={unidad.nombre} value={unidad.idUnidadorganizacional}>{unidad.nombre}</option>)}
                        	</select>                           
                        </fieldset>
					  </Col>
					  <Col sm={2}>
					  <label htmlFor="">Presupuesto:</label>
					  </Col>
					  <Col sm={4}>
					   <ErrorMessage name="monto" component="div"
                		className="alert alert-danger" />
						<fieldset className="form-group">
                			<Field className="form-control" type="number" placeholder="Presupuesto" name="monto"/>
              			</fieldset>
              		  </Col>
              		 </Row>
              		 <button className="btn btn-success" type="submit">Guardar</button>
              		 <Link to="/centro_costo"><button className="btn btn-danger">Regresar</button></Link>
					</Form>
					)
				}

				</Formik>

			</div>

			);
	}
}