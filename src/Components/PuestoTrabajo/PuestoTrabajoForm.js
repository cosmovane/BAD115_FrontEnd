import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import PuestosTrabajoService from '../../Service/PuestoTrabajo/PuestoTrabajoService'

class PuestoTrabajoForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nombre: "",
      descripcion: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  async componentDidMount(){
    if (this.props.editar) {
      const id = this.props.location.pathname.split('/')[3]
      const puestoTrabajo = await PuestosTrabajoService.obtenerPuestoTrabajo(parseInt(id))
      const {nombre, descripcion} = puestoTrabajo.data
      this.setState({
        nombre,
        descripcion
      })
    }
  }

  validate(values) {
    let errors = {}

    if (!values.nombre) errors.nombre = 'Ingrese un nombre'
    if (!values.descripcion) errors.descripcion = 'Ingrese una descripción'

    return errors
  }

  async onSubmit(values) {
    const puestoTrabajo = {
      idPuestotrabajo: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
      nombre: values.nombre,
      descripcion: values.descripcion
    }
    this.props.editar ? await PuestosTrabajoService.modificarPuestoTrabajo(puestoTrabajo.idPuestotrabajo, puestoTrabajo)
    : await PuestosTrabajoService.agregarPuestoTrabajo(puestoTrabajo) 
    this.props.history.push('/puestotrabajo')
  }

  render() {
    let { nombre, descripcion } = this.state
    return (
      <div className="container">
        {this.props.editar ? <h3>Editar puesto de trabajo</h3> : <h3>Crear un puesto de trabajo</h3>}
        <Formik
          initialValues={{ nombre, descripcion }}
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
              <fieldset className="form-group">
                <label htmlFor="">Nombre</label>
                <Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="">Descripción</label>
                <Field className="form-control" type="text" placeholder="Descripción" name="descripcion" />
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