import React, { Component } from "react";
import CalendarioTrabajoService from '../../Service/CalendarioTrabajo/CalendarioTrabajoService';
import { Link } from "react-router-dom";
//import { faPlus } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, Form, ErrorMessage, Field } from "formik";

class CalendarioTrabajoDetalle extends Component{

    constructor(props){
        super(props)
        this.state ={
            periocidad: "",
            desde: "",
            hasta: "",
            activo: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validar = this.validar.bind(this)
        this.validarNumero = this.validarNumero.bind(this) 
    }
    async componentDidMount() {
        if (this.props.editar){
            const id=this.props.location.pathname.split('/')[3]
            const calendarioTrabajo = await CalendarioTrabajoService.obtenerCalendarioTrabajo(parseInt(id))
            const{periocidad, desde, hasta, activo} = calendarioTrabajo.data
            this.setState({periocidad, desde, hasta, activo
            })
        }
    }

    validarNumero(values){
        const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
        return isNumber.test(Number)
    }
    validar(values){
        let errors ={}
        if(!this.validarNumero(values.desde)||!this.validarNumero(values.desde)) errors.desde = 'Ingrese un numero con dos decimales'
        if(!this.validarNumero(values.hasta)||!this.validarNumero(values.hasta)) errors.hasta = 'Ingrese un numero con dos decimales'
        if(values.desde <= 0 || values.desde>=366) errors.desde = 'Debe ingresar un monto mayor que 0 y menor 366'
        if(values.hasta <= 0 || values.hasta>=366) errors.hasta = 'Debe ingresar un monto mayor que 0 y menor 366'
        if(values.desde > values.hasta) errors.hasta = 'La fecha final debe ser mayor'
        if(!values.periocidad) errors.periocidad = 'Ingrese periocidad'
        return errors
    }
    async onSubmit(values) {
        const calendarioTrabajo = {
          calendariotrabajo: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
          periocidad: values.periocidad,
          desde: values.desde,
          hasta: values.hasta,
          activo: values.activo
        }

    }

    render(){
        let {periocidad, desde, hasta, activo} = this.state
        
        return(
            <div className="container">
                {this.props.editar ? <h3>Editar puesto de trabajo</h3> : <h3>Crear un puesto de trabajo</h3>}
                <Formik
                initialValues={{ periocidad, desde, hasta, activo}}validateOnChange={false}
                validateOnBlur={false}
                //validate={this.validar}
                enableReinitialize={true}
                onSubmit={this.onSubmit}
                >
                {
                    <Form>
                        <ErrorMessage name="periocidad" component="div" className="alert-warning" />
                        <ErrorMessage name="desde" component="div" className="alert-warning" />
                        <ErrorMessage name="hasta" component="div" className="alert-warning" />
                        <ErrorMessage name="activo" component="div" className="alert-warning" />
                        <fieldset className="form-group">
                            <label htmlFor="">Periocidad</label>
                            <Field className="form-control" type="text" placeholder="Periodidad" name="periocidad"></Field>                           
                        </fieldset>
                        <fieldset>
                            <Field className="form-control" type="number" placeholder="Desde" name="desde"></Field>
                        </fieldset>
                        <fieldset>
                            <Field className="form-control" type="number" placeholder="Hasta" name="hasta"></Field>
                        </fieldset>
                        <fieldset>
                            <Field className="form-control" type="number" placeholder="Activo" name="activo"></Field>
                        </fieldset>
                        <button className="btn btn-success" type="submit">Guardar</button>
                        <Link to="/periocidad"><button className="btn btn-danger">Regresar</button></Link>
                    </Form>
                }
                    </Formik>
            </div>
        );
    }

    
}

export default CalendarioTrabajoDetalle;

