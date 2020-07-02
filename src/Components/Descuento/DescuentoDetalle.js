import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { Row, Col, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faReply } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import DescuentoService from '../../Service/Descuento/DescuentoService'
import LoginService from '../../Service/Login/LoginService';
const inputStyle = {
  'width': '25em',
}

class DescuentoDetalle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acronimo: "",
      nombre: "",
      descripcion: "",
      porcentaje: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validar = this.validar.bind(this)
    this.validarNumero = this.validarNumero.bind(this)
  }

  async componentDidMount() {
    if (this.props.editar) {
      const id = this.props.match.params.id
      const descuento = await DescuentoService.obtenerDescuento(id)
      console.log("DescuentoDetalle -> componentDidMount -> descuento", descuento.data)
      let { acronimo, descripcion, nombre, porcentaje } = descuento.data
      if (porcentaje !== 0) {
        this.setState({
          acronimo, nombre, descripcion, porcentaje
        })
      } else {
        this.setState({
          acronimo, nombre, descripcion
        })
      }
      
    }
  }

  validarNumero(number) {
    const isNumber = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/
    return isNumber.test(number)
  }

  validar(values) {
    let errors = {}
    if (values.porcentaje) {
      if (!this.validarNumero(values.porcentaje)) errors.porcentaje = 'Ingresar un número válido. Ej: 45 , 45.8 , 98.0'
      if (values.porcentaje >= 100 || values.porcentaje <= 0) errors.porcentaje = 'Debe ingresar un porcentaje mayor a 0 y menor a 100'
    }
    if(values.acronimo.length > 7) errors.acronimo = 'El acrónimo debe contener 7 o menos caracteres'
    if(values.nombre.length > 40) errors.nombre = 'El nombre debe contener 40 o menos caracteres'
    if(values.descripcion.length > 495) errors.descripcion = 'Escriba una descripción más corta'
    if (!values.acronimo) errors.acronimo = 'Ingrese un acrónimo'
    if (!values.nombre) errors.nombre = 'Ingrese un nombre'
    if (!values.descripcion) errors.descripcion = 'Ingrese una descripción'

    return errors
  }

  async onSubmit(values) {
    const descuento = {
      idDescuento: this.props.editar ? parseInt(this.props.match.params.id) : '',
      acronimo: (values.acronimo).toUpperCase(),
      nombre: values.nombre,
      descripcion: values.descripcion,
      porcentaje: values.porcentaje,
      estado: true
    }
    try {
      this.props.editar ? await DescuentoService.modificarDescuento(descuento.idDescuento, descuento) : await DescuentoService.agregarDescuento(descuento)
      this.props.history.push('/descuento')
      const mensaje = this.props.editar ? 'Registro modificado con éxito' : 'Registro creado con éxito'
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo!',
        html: mensaje,
        timer: 5000,
        timerProgressBar: true,
      })
    } catch (error) {
      this.props.history.push('/descuento')
      const mensaje = 'Parece que algo salió mal'
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: mensaje,
        timer: 5000,
        timerProgressBar: true,
      })
    }


  }

  render() {
    let { acronimo, nombre, descripcion, porcentaje } = this.state
    return (
      <div>
        <Card style={{
          widht: 'relative', 'marginleft': 'auto',
          'marginRight': 'auto'
        }}>
          <Card.Header>{this.props.editar ? <h3>Editar descuento</h3> : <h3>Crear descuento</h3>}
          </Card.Header>
          <Card.Body>
            <Container>
              <Formik
                initialValues={{ acronimo, nombre, descripcion, porcentaje }}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validar}
                enableReinitialize={true}
                onSubmit={this.onSubmit}
              >
                {
                  <Form>
                    <ErrorMessage name="acronimo" component="div" className="alert alert-warning" />
                    <ErrorMessage name="nombre" component="div" className="alert alert-warning" />
                    <ErrorMessage name="descripcion" component="div" className="alert alert-warning" />
                    <ErrorMessage name="porcentaje" component="div" className="alert alert-warning" />
                    <Row>
                      <Col sm={6}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="text" style={inputStyle} placeholder="Acrónimo" name="acronimo" />
                        </fieldset>
                      </Col>
                      <Col sm={4}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="text" style={inputStyle} placeholder="Nombre" name="nombre" />
                        </fieldset>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="number" style={inputStyle} placeholder="Porcentaje Ej: 45" name="porcentaje" />
                        </fieldset>
                      </Col>
                      <Col sm={4}>
                        <fieldset className="form-group">
                          <Field className="form-control" type="text" style={inputStyle} placeholder="Descripción" name="descripcion" />
                        </fieldset>
                      </Col>
                    </Row>
                    <button className="btn btn-success" type="submit"> <FontAwesomeIcon icon={faSave} /> Guardar</button>
                    <Link to="/descuento"><button className="btn btn-danger"><FontAwesomeIcon icon={faReply} />Regresar</button></Link>
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

export default DescuentoDetalle;