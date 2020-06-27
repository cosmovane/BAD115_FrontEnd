import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import PuestosTrabajoService from '../../Service/PuestoTrabajo/PuestoTrabajoService'
import Swal from 'sweetalert2'
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons'
const inputStyle = {
  'width': '25em',
}

class PuestoTrabajoDetalle extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nombre: "",
      descripcion: "",
      desde: "",
      hasta: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validar = this.validar.bind(this)
    this.validarNumero = this.validarNumero.bind(this)
  }

  async componentDidMount() {
    if (this.props.editar) {
      const id = this.props.location.pathname.split('/')[3]
      const puestoTrabajo = await PuestosTrabajoService.obtenerPuestoTrabajo(parseInt(id))
      const { nombre, descripcion } = puestoTrabajo.data
      const desde = puestoTrabajo.data.id_salario.desde
      const hasta = puestoTrabajo.data.id_salario.hasta
      this.setState({
        nombre, descripcion, desde, hasta
      })
    }
  }

  validarNumero(number) {
    const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
    return isNumber.test(number)
  }

  validar(values) {
    let errors = {}

    if (!this.validarNumero(values.desde) || !this.validarNumero(values.hasta)) errors.desde = 'Debe ingresar un monton con dos decimales'
    if (!this.validarNumero(values.hasta) || !this.validarNumero(values.hasta)) errors.hasta = 'Debe ingresar un monton con dos decimales'
    if ((values.desde <= 0 || values.desde >= 100000)) errors.desde = 'Debe ingresar un monto mayor a cero y menor de 100,000'
    if ((values.hasta <= 0 || values.hasta >= 100000)) errors.hasta = 'Debe ingresar un monto mayor a cero y menor de 100,000'
    if (values.desde > values.hasta) errors.hasta = 'El salario mínimo debe ser menor al salario máximo'

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
    this.props.editar ? await PuestosTrabajoService.modificarPuestoTrabajo(puestoTrabajo.idPuestotrabajo, puestoTrabajo)
      : await PuestosTrabajoService.agregarPuestoTrabajo(puestoTrabajo)
    this.props.history.push('/puestotrabajo')
    const mensaje = this.props.editar ? 'Registro modificado con éxito' : 'Registro creado con éxito'
    Swal.fire({
      icon: 'success',
      title: 'Buen trabajo!',
      html: mensaje,
      timer: 5000,
      timerProgressBar: true,
    })
  }

  render() {
    let { nombre, descripcion, desde, hasta } = this.state
    return (
      < div >
        <Card style={{ width: 'relative', 'marginLeft': 'auto', 'marginRight': 'auto' }} >
          <Card.Header>{this.props.editar ? <h3>Editar puesto de trabajo</h3> : <h3>Crear un puesto de trabajo</h3>}
          </Card.Header>
          <Card.Body>
            <Container>
              <Formik
                initialValues={{ nombre, descripcion, desde, hasta }}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validar}
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
                    <Row>
                      <Col sm={6}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="text" style={inputStyle} placeholder="Nombre" name="nombre" />
                        </fieldset>
                      </Col>
                      <Col sm={4}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="text" style={inputStyle} placeholder="Descripción" name="descripcion" />
                        </fieldset>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="number" style={inputStyle} placeholder="Salario mínimo" name="desde" />
                        </fieldset>
                      </Col>
                      <Col sm={4}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="number" style={inputStyle} placeholder="Salario máximo" name="hasta" />
                        </fieldset>
                      </Col>
                    </Row>
                    <button className="btn btn-success" type="submit"> <FontAwesomeIcon icon={faSave} /> Guardar</button>
                    <Link to="/puestotrabajo"><button className="btn btn-danger"><FontAwesomeIcon icon={faReply} />Regresar</button></Link>
                  </Form>
                }
              </Formik>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PuestoTrabajoDetalle;