import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import ProfesionService from '../../Service/Profesion/ProfesionService'

class ProfesionF extends Component {

    constructor(props) {
      super(props)
      this.state = {
        acronimo: "",
        nombre: ""
      }
  
      this.onSubmit = this.onSubmit.bind(this)
      this.validate = this.validate.bind(this)
    }

    
    async componentDidMount() {
      if (this.props.editar) {
        const id = this.props.location.pathname.split('/')[3]
        const profesion = await ProfesionService.obtenerProfesion(parseInt(id))
        const { acronimo, nombre} = profesion.data
        this.setState({
          acronimo, nombre 
        })
      }
    }

    validate(values) {
      let errors = {}
    
      if (!values.acronimo) errors.acronimo = 'Ingrese un acronimo'
      if (!values.nombre) errors.nombre = 'Ingrese un nombre'

      return errors
    
    }

    async onSubmit(values) {
      const profesion = {
        idProfesion: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
        acronimo: values.acronimo,
        nombre: values.nombre,
          estado: true
      }
    
      console.log("ProfesionF -> onSubmit -> profesion", profesion)
    this.props.editar ? await ProfesionService.modificarProfesion(profesion.idProfesion, profesion)
      : await ProfesionService.agregarProfesion(profesion)
    this.props.history.push('/profesion')
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
      let { acronimo, nombre} = this.state
      return (
        <div className="container">
          {this.props.editar ? <h3>Editar profesion</h3> : <h3>Crear una profesion</h3>}
          <Formik
            initialValues={{ acronimo, nombre }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
          >
            {
              <Form>
                <ErrorMessage name="acronimo" component="div"
                  className="alert alert-warning" />
                <ErrorMessage name="nombre" component="div"
                  className="alert alert-warning" />

                <fieldset className="form-group">
                  <label htmlFor="">Acronimo</label>
                  <Field className="form-control" type="text" placeholder="Acronimo" name="acronimo" />
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="">Nombre</label>
                  <Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
                </fieldset>
                
                <button className="btn btn-success" type="submit">Guardar</button>
                <Link to="/profesion"><button className="btn btn-danger">Regresar</button></Link>
              </Form>
            }
          </Formik>
        </div>
      );
    }
    
    


     

      







}

export default ProfesionF;