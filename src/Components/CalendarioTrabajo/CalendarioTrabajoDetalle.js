import React, { Component } from "react";
import CalendarioTrabajoService from '../../Service/CalendarioTrabajo/CalendarioTrabajoService';
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Select from 'react-select'
import Swal from 'sweetalert2'

class CalendarioTrabajoDetalle extends Component{

    constructor(props){
        super(props)
        this.state ={
            periocidad: "",
            periodo: ""
            
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this) 
    }
    async componentDidMount() {
        if (this.props.editar){
            const id=this.props.location.pathname.split('/')[3]
            const calendarioTrabajo = await CalendarioTrabajoService.obtenerCalendarioTrabajo(parseInt(id))
            const{periocidad, periodo} = calendarioTrabajo.data
            this.setState({
                periocidad, periodo
            })
        }
    }

    validate(values){
        var fecha = new Date();
        var ano = fecha.getFullYear();
        console.log(ano)
        let errors ={}
        if(values.periodo < ano || values.periodo>=2120) errors.desde = 'Ingrese el ano de planilla'
        if(!values.periocidad) errors.periocidad = 'Ingrese periocidad'
        return errors
    }
    
    async onSubmit(values) {
        var fecha = new Date();
        var ano = fecha.getFullYear();
        if(values.periodo == ano){
            values.activo=true
        } else{
            values.activo=false
        }
        const calendarioTrabajo = {
          calendariotrabajo: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
          periocidad: values.periocidad,
          periodo: values.periodo,
          activo: values.activo
        }

        console.log("CalendarioTrabajoDetalle -> onSubmit -> calendarioTrabajo", calendarioTrabajo)
        this.props.editar ? await CalendarioTrabajoService.modificarCalendarioTrabajo(calendarioTrabajo.calendariotrabajo, calendarioTrabajo)
            : await CalendarioTrabajoService.agregarCalendarioTrabajo(calendarioTrabajo)
        this.props.history.push('/empresa')
        const mensaje = this.props.editar ? 'Registro modificado con éxito' : 'Registro creado con éxito'
        Swal.fire({
            icon: 'success',
            title: 'Buen trabajo!',
            html: mensaje,
            timer: 5000,
            timerProgressBar: true,
        })
    }

    render(){
        let {periocidad, periodo} = this.state
        const options = [
            { value: 'mensual', label: 'Mensual' },
            { value: 'semanal', label: 'Semanal' }
          ]
          const MyComponent = () => (
            <Select options={options} />
          )
        
        return(
            <div className="container">
                {this.props.editar ? <h3>Editar Periodo</h3> : <h3>Crear un nuevo Periodo</h3>}
                <Formik
                initialValues={{periocidad, periodo}}validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
                enableReinitialize={true}
                onSubmit={this.onSubmit}
                >
                {
                    <Form>
                        <ErrorMessage name="periocidad" component="div" className="alert-warning" />
                        <ErrorMessage name="periodo" component="div" className="alert-warning" />

                        <fieldset>
                            <label htmlFor="">Periocidad</label>
                            <Field className="form-control" type="text" placeholder="Semanal o Mensual" name="periocidad"></Field>  
                            {/*MyComponent()*/}
                        </fieldset>

                        <fieldset>
                        <label htmlFor="">Periodo</label>
                            <Field className="form-control" type="number" placeholder="A?o de planilla" name="periodo"></Field>
                        </fieldset>
                        <button className="btn btn-success" type="submit">Guardar</button>
                        <Link to="/empresa"><button className="btn btn-danger">Regresar</button></Link>
                    </Form>
                }
                    </Formik>
            </div>
        );
    }

    
}

export default CalendarioTrabajoDetalle;

