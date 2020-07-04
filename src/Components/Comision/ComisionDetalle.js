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
    
      /*   ComisionService.comision(this.state.idComision)
        .then(response => this.setState(this.state,
            {
            idComision: response.data.idComision,
            desde: response.data.desde,
            hasta: response.data.hasta,
            porcentajecomision: response.data.porcentajecomision,

        }))//.then( response => this.printResult())*/
    }

    /*printResult(){
        console.log(this.state);
    }*/

    async onSubmit(values) {
        let comision = {
            desde: values.desde,
            hasta: values.hasta,
            porcentajecomision: values.porcentajecomision,

            
        }

                   // console.log(comision)

            /*const response= await ComisionService.comisionCrear(comision)

            this.props.history.push('/comision')
            Swal.fire({
                icon: 'success',
                tittle: 'Buen trabajo',
                html: 'Registro guardado con éxito',
                timer: 5000,
                timerProgressBar: true,
            })*/

            console.log(comision)
           //const response = await ComisionService.comisionActualizar(comision)
            
        if (this.state.idComision == -1) {
            console.log(comision);
            var pro = ComisionService.comisionCrear(comision).then(() => this.props.history.push('/comision'));
            console.log(pro.isResolved);
        } else {
            comision.idComision = values.idComision;
        ComisionService.comisionActualizar(comision).then(() => this.props.history.push('/comision'));
        }
       
      this.props.history.push('/comision')
        Swal.fire({
            icon: 'success',
            tittle: 'Buen trabajo',
            html: 'Registro guardado con éxito',
            timer: 5000,
            timerProgressBar: true,
        })
  
    }

    validate(values) {
        /*let errors = {}

        if (!this.validateNumber(values.desde) || !this.validateNumber(values.hasta)) errors.desde = 'Debe ingresar un monton con dos decimales'
        if (!this.validateNumber(values.hasta) || !this.validateNumber(values.hasta)) errors.hasta = 'Debe ingresar un monton con dos decimales'
        if ((values.desde <= 0 || values.desde >= 100000)) errors.desde = 'Debe ingresar un monto mayor a cero y menor de 100,000'
        if ((values.hasta <= 0 || values.hasta >= 100000)) errors.hasta = 'Debe ingresar un monto mayor a cero y menor de 100,000'
        if (values.desde > values.hasta) errors.hasta = 'El monto final debe ser menor al monto inicial'
    
        if (!values.porcentajecomision) errors.porcentajecomision = 'Ingrese un porcentaje'
        if (!values.desde) errors.desde = 'Ingrese el monto inicial'
        if (!values.hasta) errors.hasta = 'Ingrese el monto final'

        return errors*/
    
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
                                                        
                           <ErrorMessage name="desde" component="span" className="alert alert-danger" />
                          <Field className="form-control" type="number" name="desde" style={{ width: '25em' }} placeholder="Desde" />
                              </fieldset>
                              </Col>
                             <Col sm={4}>
                            </Col>
                                    </Row>
                                <Row>
                             <Col sm={6}>
                          <fieldset className="form-group">
                          <ErrorMessage name="hasta" component="span" className="alert alert-danger" />
                                                      
                          <Field className="form-control" style={inputStyle} type="number" name="hasta" placeholder="Hasta"/>                                    </fieldset>
                              </Col>
                              <Col sm={6}>
                              <fieldset className="form-group">
                              <ErrorMessage name="porcentajecomision" component="span" className="alert alert-danger" />
                                                      
                            <Field className="form-control" style={inputStyle} type="number" name="porcentajecomision" placeholder="Porcentaje" />
                                 </fieldset>
                                </Col>
                             </Row>
        
                  <button className="btn btn-success" type="submit"> Guardar</button>                                    <Link to="/comision">{this.renderRedirect()}<button className="btn btn-danger" onClick={this.setRedirect}> Regresar</button></Link>
                                            
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