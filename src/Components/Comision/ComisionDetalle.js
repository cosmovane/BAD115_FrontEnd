import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ComisionService from '../../Service/Comision/ComisionService';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Redirect,Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faReply} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

import LoginService from '../../Service/Login/LoginService';
import EmpleadoService from "../../Service/Empleado/EmpleadoService";
const inputStyle = {
    'width': '25em',
}


class ComisionDetalleComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idComision: this.props.match.params.id,
            desde: '',
            hasta: '',
            porcentajecomision: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
       // this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);

    }

    componentDidMount() {

        if (this.state.idComision !== '-1') {
            ComisionService.comision(this.state.idComision)
                .then(response => this.setState({
                    desde: response.data.desde,
                    hasta: response.data.hasta,
                    porcentajecomision: response.data.porcentajecomision,
                }))
        }

    }

    onSubmit(values) {
        let comision = {
            idComision: this.state.idComision,
            desde: values.desde,
            hasta: values.hasta,
            porcentajecomision: values.porcentajecomision,

        }
            
        if (this.state.idComision === '-1') {
            ComisionService.comisionCrear(comision).then((e) => this.props.history.push('/comision'));
        } else {
            console.log(comision);
        ComisionService.comisionActualizar(comision).then((e) => this.props.history.push('/comision'));
        }
  
    }

    validate(values) {
        let errors = {};
        if(values.porcentajecomision > 1){
            errors.porcentajecomision = "El Numero no debe ser superior a 1.";
        }
        else if(values.porcentajecomision < 0 ){
            errors.porcentajecomision = "El Numero no debe ser inferior a 0";
        }

        if(values.desde === ""){
            errors.desde = "No deje vacio el campo";
        } else if(parseInt(values.desde) >= parseInt(values.hasta) ){
            errors.desde = "Este numero debe ser menor que el otro extremo del intervalo";
        }

        if(values.hasta === ""){
            errors.hasta = "No deje vacio el campo";
        }
        return errors;
    }


    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/comision' />
        }
    }

    render() {
        let {  desde, hasta, porcentajecomision} = this.state
        
        return (
            < div >
                <Card style={{ width: 'relative', 'marginLeft': 'auto', 'marginRight': 'auto' }} >
                    <Card.Header><h3>Comisiones de Venta</h3></Card.Header>
                    <Card.Body>
                        <Container>
                            <Formik 
                            initialValues={{ desde, hasta, porcentajecomision }} 
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
                           <label className='form-element-left'>Inicio de Rango</label>
                           <ErrorMessage name="desde" component="span" className="alert alert-danger" />
                          <Field className="form-control" type="number" name="desde" style={{ width: '25em' }} placeholder="Desde" required/>
                              </fieldset>
                              </Col>
                             <Col sm={4}>
                            </Col>
                                    </Row>
                                <Row>
                             <Col sm={6}>
                          <fieldset className="form-group">
                          <label className='form-element-left'>Fin de Rango</label>
                          <ErrorMessage name="hasta" component="span" className="alert alert-danger" />
                          <Field className="form-control" style={inputStyle} type="number" name="hasta" placeholder="Hasta" required/>                                    </fieldset>
                              </Col>
                              <Col sm={6}>
                              <fieldset className="form-group">
                                  <label className='form-element-left'>Porcentaje de Comisi&oacute;n (0.00 hasta 1.00)</label>
                              <ErrorMessage name="porcentajecomision" component="span" className="alert alert-danger" />
                            <Field className="form-control" style={inputStyle} type="number" name="porcentajecomision" placeholder="Porcentaje" />
                                 </fieldset>
                                </Col>
                             </Row>
                            <br/>
                         <button className="btn btn-success" type="submit"> Guardar</button>
                         <Link to="/comision">{this.renderRedirect()}<button className="btn btn-danger"> Regresar</button></Link>
                                            
                       </Form>
                                    )
                                }
                                </Formik>
                            </Container>
                        </Card.Body>
                    </Card>
                </div >
            );
    }           
}

export default ComisionDetalleComponent;