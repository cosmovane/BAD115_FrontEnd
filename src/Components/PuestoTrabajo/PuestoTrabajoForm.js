import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import PuestosTrabajoService from '../../Service/PuestoTrabajo/PuestoTrabajoService'

class PuestoTrabajoForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nombre: "",
      descripcion: "",
      desde: "",
      hasta: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.validateNumber = this.validateNumber.bind(this)
  }

  async componentDidMount(){
    if (this.props.editar) {
      const id = this.props.location.pathname.split('/')[3]
      const puestoTrabajo = await PuestosTrabajoService.obtenerPuestoTrabajo(parseInt(id))
      const {nombre, descripcion} = puestoTrabajo.data
      const desde = puestoTrabajo.data.id_salario.desde
      const hasta = puestoTrabajo.data.id_salario.hasta
      this.setState({
        nombre, descripcion, desde, hasta
      })
    }
  }

  validateNumber(number){
    const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
    return isNumber.test(number)
  }

  validate(values) {
    let errors = {}

    if(!this.validateNumber(values.desde) || !this.validateNumber(values.hasta) ) errors.desde = 'Debe ingresar un monton con dos decimales'
    if(!this.validateNumber(values.hasta) || !this.validateNumber(values.hasta) ) errors.hasta = 'Debe ingresar un monton con dos decimales'
    if((values.desde <= 0 || values.desde >= 100000)) errors.desde = 'Debe ingresar un monto mayor a cero y menor de 100,000'
    if((values.hasta <= 0 || values.hasta >= 100000)) errors.hasta = 'Debe ingresar un monto mayor a cero y menor de 100,000'
    if(values.desde > values.hasta) errors.hasta = 'El salario mínimo debe ser menor al salario máximo'

    if (!values.nombre) errors.nombre = 'Ingrese un nombre'
    if (!values.descripcion) errors.descripcion = 'Ingrese una descripción'
    if (!values.desde) errors.desde = 'Ingrese el salario mínimo'
    if (!values.hasta) errors.hasta = 'Ingrese el salario máximo'

    return errors
  }

  async onSubmit(values) {
    const puestoTrabajo = {
      idPuestotrabajo: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
      nombre: values.nombre,
      descripcion: values.descripcion,
      id_salario: {
        desde: values.desde,
        hasta: values.hasta,
        estado: true
      }
    }
    console.log("PuestoTrabajoForm -> onSubmit -> puestoTrabajo", puestoTrabajo)
    this.props.editar ? await PuestosTrabajoService.modificarPuestoTrabajo(puestoTrabajo.idPuestotrabajo, puestoTrabajo)
    : await PuestosTrabajoService.agregarPuestoTrabajo(puestoTrabajo) 
    this.props.history.push('/puestotrabajo')
  }

  render() {
    let { nombre, descripcion, desde, hasta } = this.state
    return (
      <div className="container">
        {this.props.editar ? <h3>Editar puesto de trabajo</h3> : <h3>Crear un puesto de trabajo</h3>}
        <Formik
          initialValues={{ nombre, descripcion, desde, hasta }}
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
              <ErrorMessage name="descripcion" component="div"
                className="alert alert-warning" />
              <ErrorMessage name="desde" component="div"
                className="alert alert-warning" />
              <ErrorMessage name="hasta" component="div"
                className="alert alert-warning" />
              <fieldset className="form-group">
                <label htmlFor="">Nombre</label>
                <Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="">Descripción</label>
                <Field className="form-control" type="text" placeholder="Descripción" name="descripcion" />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="">Salario mínimo</label>
                <Field className="form-control" type="number" placeholder="Salario mínimo" name="desde" />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="">Salario máximo</label>
                <Field className="form-control" type="number" placeholder="Salario máximo" name="hasta" />
              </fieldset>
              <button className="btn btn-success" type="submit">Guardar</button>
              <Link to="/puestotrabajo"><button className="btn btn-danger">Regresar</button></Link>
            </Form>
          }
        </Formik>
      </div>
    );
  }
}

export default PuestoTrabajoForm;