import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProfesionService from '../../Service/Profesion/ProfesionService';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Redirect,Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faReply} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import LoginService from '../../Service/Login/LoginService';
const inputStyle = {
  'width': '25em',
}

class ProfesionF extends Component {

    constructor(props) {
      super(props)
      this.state = {
        acronimo: "",
        nombre: ""
      }
  
      this.onSubmit = this.onSubmit.bind(this)
     // this.validate = this.validate.bind(this)
     this.render = this.render.bind(this);
     
    }

    
     componentDidMount() {

   /*  ProfesionService.profesion(this.state.idProfesion)
        .then(response => this.setState(this.state,
            {
            idProfesion: response.data.idProfesion,
            acronimo: response.data.acronimo,
            nombre: response.data.nombre,


        })).then( response => this.printResult())*/

     /* if (this.props.editar) {
        const id = this.props.location.pathname.split('/')[3]
        const profesion = await ProfesionService.obtenerProfesion(parseInt(id))
        const { acronimo, nombre} = profesion.data
        this.setState({
          acronimo, nombre 
        })
      }*/
    }

    printResult(){
      console.log(this.state);
    }

    async onSubmit(values) {
      let profesion = {
        acronimo: values.acronimo,
        nombre: values.nombre,
      }
    
     // console.log(profesion)
    
      

      if (this.state.idProfesion == -1) {
        console.log(profesion);
        var pro= ProfesionService.agregarProfesion(profesion).then(() => this.props.history.push('/profesion/crear'));
        console.log(pro.isResolved);
    } else {
        profesion.idProfesion = values.idProfesion;
        ProfesionService.modificarProfesion(profesion).then(() => this.props.history.push('/profesion/{id}'));
    }

    //  this.props.history.push('/profesion')
            Swal.fire({
                icon: 'success',
                tittle: 'Buen trabajo',
                html: 'Registro guardado con éxito',
                timer: 5000,
                timerProgressBar: true,})
    /*  this.props.editar ? await ProfesionService.modificarProfesion(profesion.idProfesion, profesion)
      : await ProfesionService.agregarProfesion(profesion)
    this.props.history.push('/profesion')
    const mensaje = this.props.editar ? 'Registro modificado con éxito' : 'Registro creado con éxito'
    Swal.fire({
      icon: 'success',
      title: 'Buen trabajo!',
      html: mensaje,
      timer: 5000,
      timerProgressBar: true,
    })*/
  }
    
  setRedirect = () => {
    this.setState({
        redirect: true
    })
}

renderRedirect = () => {
    if (this.state.redirect) {
        return <Redirect to='/profesion' />
    }
}

    render() {
      let { acronimo, nombre} = this.state

      return (
        <div>
          <Card style={{ width: 'relative', 'marginLeft': 'auto', 'marginRight': 'auto' }} >
                    <Card.Header><h3>Profesiones</h3></Card.Header>
                    <Card.Body>
                        <Container>
          <Formik
            initialValues={{ acronimo, nombre }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
            
          >
            {
              (props) => (
                 <Form className="form">
                   <Row>
                   <Col sm={6}>
                    <fieldset className="form-group">
                                                    
                     <ErrorMessage name="acronimo" component="span" className="alert alert-danger" />
                       <Field className="form-control" type="text" name="acronimo" style={{ width: '25em' }} placeholder="Acronimo" />
                   </fieldset>
                  </Col>
                <Col sm={4}>
                 </Col>
                </Row>
                   <Row>
                       <Col sm={6}>
                   <fieldset className="form-group">
                   <ErrorMessage name="hasta" component="span" className="alert alert-danger" />
                                                                                     <Field className="form-control" style=   {inputStyle} type="text" name="nombre" placeholder="Nombre"/>
                     </fieldset>
                        </Col>
                        </Row>

                        <button className="btn btn-success" type="submit"> Guardar</button>
                          <Link to="/profesion">{this.renderRedirect()}<button className="btn btn-danger" onClick={this.setRedirect}> Regresar</button></Link>    
                 </Form>
                                    )
                                }
                                </Formik>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
            );
    }           
}

export default ProfesionF;