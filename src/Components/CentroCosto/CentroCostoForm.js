import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert'

import LoginService from '../../Service/Login/LoginService';
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
			unidadPadre:-1,
			presupuestoTotal:0,
			presupuestoDisponible:0,
			presupuestoAsignado:0,
			unidadMayor:false,
			editar:false,
			unidadPadreEdit:'',
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.validate = this.validate.bind(this)
   	 	this.validateNumber = this.validateNumber.bind(this)
	}

	async componentDidMount(){
		if(this.props.crear){
			const id = this.props.location.pathname.split('/')[3]
			console.log("ID PASADO:"+id)
			const unidades = await CentroCostoService.listUnidades(parseInt(id))
			console.log("aqui:"+unidades)
			if(unidades != undefined){
			this.setState({
				unidades:unidades.data.unidades,
				unidadPadre: (id != -1) ? unidades.data.unidadPadre : -1,
				presupuestoTotal:unidades.data.presupuestoTotal,
				presupuestoDisponible:unidades.data.presupuestoDisponible,
				presupuestoAsignado:unidades.data.presupuestoAsignado
			})
			const {unidadPadre} = this.state
			//console.log("ID EN STATE:"+unidadPadre)
		 if(unidades.data.unidades == ''){
		 	Swal.fire(
                'Algo ha salido mal',
                unidades.data.mensaje ,
                'error'
            )
		 }
		}
		}
		
		if(this.props.editar){
			const id = this.props.location.pathname.split('/')[3]
			const costo = await CentroCostoService.buscarCosto(parseInt(id))
			console.log("aqui costo:"+costo)
			if(costo != undefined){
			const {idCosto,monto} = costo.data
			const idUnidad = costo.data.id_unidadorganizacional.idUnidadorganizacional
			const unidad = costo.data.id_unidadorganizacional.nombre
			const unidadMayor = costo.data.id_unidadorganizacional.unidadmayor
			const unidadPadreEdit = costo.data.idUnidadPadre

			const unidades = unidadMayor ? await CentroCostoService.listUnidades(parseInt(-1)) :await CentroCostoService.listUnidades(parseInt(idUnidad))
			this.setState({
				idCosto:idCosto,
				monto:monto,
				//unidades:unidades.data.unidades,
				unidadPadre: (id != -1) ? unidades.data.unidadPadre : -1,
				idUnidad:idUnidad,
				unidad:unidad,
				unidadMayor: unidadMayor,
				presupuestoTotal:unidades.data.presupuestoTotal,
				presupuestoDisponible:unidades.data.presupuestoDisponible,
				presupuestoAsignado:unidades.data.presupuestoAsignado,
				editar:this.props.editar,
				unidadPadreEdit: unidadPadreEdit,
			})
		}

		}
	}

	validateNumber(number) {
    const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
    return isNumber.test(number)
  	}

	validate(values){
		const id = this.props.location.pathname.split('/')[3]
		let errors = {}
		console.log("ID UNIDAD:"+this.state.idUnidad)
		if(this.state.idUnidad == 0) Swal.fire({icon: 'error',title: 'Oops...',text: 'Seleccione unidad!'})
		if(!values.monto) errors.monto = 'Ingrese monto'
		if(!this.validateNumber(values.monto)) errors.monto = 'Debe ingresar un monto con dos decimales '
		if(parseFloat(values.monto) <= 0) errors.monto = 'Ingrese un monto positivo'
		if(id!=-1 && !this.state.unidadMayor && this.props.editar == false){
			if(values.monto > this.state.presupuestoDisponible) errors.monto = 'Ingrese un monto menor o igual al presupuesto disponible'
		}
		return errors
	}

	async onSubmit(values){
		const idCosto = this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : ''
		const costo={
			//idCosto: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
			monto: values.monto,
		}
		this.props.editar ? await CentroCostoService.editarCosto(costo,this.state.idUnidad,idCosto) 
			: await CentroCostoService.crearCosto(costo,this.state.idUnidad)

		//const id = this.state.unidadMayor ? -1 : this.state.unidadPadre
		//console.log("UNIDAD PADRE LIST:"+id)
		//this.props.history.push('/centro_costo_list/'+id)

		if(this.props.editar){
        	const {unidadPadreEdit} = this.state 
        	this.props.history.push('/centro_costo_list/'+unidadPadreEdit)
    	}else{
    		const {unidadPadre} = this.state
       	 	this.props.history.push('/centro_costo_list/'+unidadPadre)
    	}
	}

	costoList(){
		if(this.props.editar){
        	const {unidadPadreEdit} = this.state 
        	this.props.history.push('/centro_costo_list/'+unidadPadreEdit)
    	}else{
    	const {unidadPadre} = this.state
        this.props.history.push('/centro_costo_list/'+unidadPadre)
    	}
    }

	render(){
		let {idUnidad,monto,unidad,editar} = this.state
		return(
			<div className="container">
				{this.props.editar ? <h3>Editar costo</h3> : <h3>Crear costo</h3>}
				<Formik
				initialValues={{ idUnidad, monto,unidad,editar}}
          		validateOnChange={false}
          		validateOnBlur={false}
          		validate={this.validate}
          		enableReinitialize={true}
          		onSubmit={this.onSubmit}
				>
				{(props) =>(
					<Form>
					<Row>
						<Col sm={4}><Alert variant="info"><Alert.Heading>Presupuesto total</Alert.Heading><h2>${this.state.presupuestoTotal}</h2></Alert></Col>
						<Col sm={4}><Alert variant="success"><Alert.Heading>Presupuesto asignado</Alert.Heading><h2>${this.state.presupuestoAsignado}</h2></Alert></Col>
						<Col sm={4}><Alert variant="warning"><Alert.Heading>Presupuesto disponible</Alert.Heading><h2>${this.state.presupuestoDisponible}</h2></Alert></Col>
					</Row>
					 <Row>
					 <Col sm={2}>
					 <label htmlFor="">Unidad organizacional:</label>
					 </Col>
					  <Col sm={3}>
						<fieldset className="form-group">
                          	<select className="form-control" onChange={(e) => this.setState({ idUnidad: e.target.value })}>
                          		{
                                  editar  ? <option value={idUnidad}>{unidad}</option> :<option value="NU">Seleccione unidad..</option>
								  
                              	}
                              	{
                              	  !editar ? this.state.unidades.map(unidad => <option key={unidad.nombre} value={unidad.idUnidadorganizacional}>{unidad.nombre}</option>):''
                              	}
                           		
                        	</select>                           
                        </fieldset>
					  </Col>
					  <Col sm={2}>
					  <label htmlFor="">Presupuesto:</label>
					  </Col>
					  <Col sm={4}>
						<fieldset className="form-group">
                			<Field className="form-control" type="number" placeholder="Presupuesto" name="monto"/>
              			</fieldset>
              			<ErrorMessage name="monto" component="div"
                		className="alert alert-danger" />
              		  </Col>
              		 </Row>
              		 {
                        LoginService.hasPermiso('CENTRO_COSTO_CREATE') ?  <button className="btn btn-success" type="submit"><FontAwesomeIcon icon={faSave}/>Guardar</button> : ""
                      }
              		 
              		{/* <Link to="{{pathname:'/centro_costo_list/${this.state.unidadPadre}'}}"><button className="btn btn-danger">Regresar</button></Link>*/}
					<button className="btn btn-danger" onClick={() => this.costoList()}><FontAwesomeIcon icon={faArrowLeft}/>Regresar</button>
					</Form>
					)
				}

				</Formik>

			</div>

			);
	}
}