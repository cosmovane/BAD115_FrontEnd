import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmpleadoService from '../../Service/Empleado/EmpleadoService';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Redirect,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faReply} from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./editarEmpleado.css";

const inputStyle = {
    'width': '25em',
}
const textoValidator = /^[a-zA-Z\s]*$/i; //Nombre (1,2,3,4,5) fechaNac, Direccion, Genero, EStadoCivil
const inputLengthTest = /^.{0,50}$/;

class EmpleadoDetalleComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idEmpleado: this.props.match.params.id,
            primernombre: '',
            segundonombre: '',
            apellidopaterno: '',
            apellidomaterno: '',
            apellidocasada: '',
            fechanacimiento: '',
            idDireccion: '',
            idGenero: '',
            idEstadocivil: '',

            idPuestotrabajo: '',
            esServicioProfesional: '',
            departamentos: [],
            generos: [],
            estadosciviles: [],
            descripcion: '',
            selectedOption: 0,
            selectedOptionMunicipio: 0,
            departamentoEsp: '',
            minucipio: '',
            puestos: [],
            redirect: false,
        };

        //this.handleChangeInputs = this.handleChangeInputs.bind(this);
      //  this.handleDatePicker = this.handleDatePicker.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        // console.log(this.state.idEmpresa)
        EmpleadoService.listarGeneros().then(response => {
            this.setState({
                generos: response.data,
            });
        })
        EmpleadoService.listarEstadosCiviles().then(response => {
            this.setState({
                estadosciviles: response.data,
            });
        })

        EmpleadoService.allPuestos().then(response => {
            this.setState({
                puestos: response.data,
            })
        })

        if (this.state.idEmpleado !== '-1') {

        EmpleadoService.empleado(this.state.idEmpleado)
            .then(response => this.setState({
                idEmpleado: response.data.idEmpleado,
                primernombre: response.data.primernombre,
                segundonombre: response.data.segundonombre,
                apellidopaterno: response.data.apellidopaterno,
                apellidomaterno: response.data.apellidomaterno,
                apellidocasada: response.data.apellidocasada,
                fechanacimiento: new Date(response.data.fechanacimiento),
                esServicioProfesional: response.data.esServicioProfesional,
                idGenero: response.data.id_genero.idGenero,
                idEstadocivil: response.data.id_estadocivil.idEstadocivil,
                // idDireccion: response.data.id_direccion.idDireccion,
                idPuestotrabajo: response.data.id_puestotrabajo ? response.data.id_puestotrabajo.idPuestotrabajo : -1 ,


                // colonia: response.data.id_direccion.colonia,
                // descripcion: response.data.id_direccion.descripcion,
                // selectedOption: response.data.id_direccion.id_departmento.idDepartmento,
                // selectedOptionMunicipio: response.data.id_direccion.id_municipio.idMunicipio,
                // departamentoEsp: response.data.id_direccion.id_departmento.nombre,
                // municipio: response.data.id_direccion.id_municipio.nombre,
            })).then(response => this.loguear())

        }

    }

    loguear() {
       // console.log(this.state);
    }

    setCheckbox(e) {
        this.setState({esServicioProfesional: e.target.checked});
    }

    handleDatePicker =(e) => {
        this.setState({
            fechanacimiento: e,
        })
    }



    onSubmit(values) {
        let empleado = {
            primernombre: values.primernombre,
            segundonombre: values.segundonombre,
            apellidopaterno: values.apellidopaterno,
            apellidomaterno: values.apellidomaterno,
            apellidocasada: values.apellidocasada,
            fechanacimiento: values.fechanacimiento,
            esServicioProfesional: values.esServicioProfesional,
            //id_genero: values.idGenero,



            // descripcion: values.descripcion,
            // departamento: this.state.selectedOption,
            // municipio: this.state.selectedOptionMunicipio
        }
      //  console.log(values.esServicioProfesional);
       // console.log("ID:" + this.state.idEmpleado)

        if (this.state.idEmpleado === -1) {
         //   console.log(empleado);
            var promesa = EmpleadoService.empleadoCrear( this.state.idGenero, this.state.idEstadocivil,this.state.idPuestotrabajo, empleado).then(() => this.props.history.push('/empleado'));
         //   console.log(promesa.isResolved);
        } else {
            empleado.idEmpleado = values.idEmpleado;
            EmpleadoService.empleadoActualizar(this.state.idGenero, this.state.idEstadocivil, this.state.idPuestotrabajo, empleado).then(() => this.props.history.push('/empleado'));
        }

    }

    validate(values) {
        // console.log(this.state);
        // let errors = {}
        // console.log("DEPARTAMENTO:" + this.state.selectedOption);
        // console.log("MUNICIPIO:" + this.state.selectedOptionMunicipio);
        // if(this.state.selectedOption == 0 || this.state.selectedOptionMunicipio == 0 ){
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Seleccione departamento y/o municipio!',
        //     })
        // }
        //  if(!this.state.primernombre){
        //     errors.primernombre = "Debe ingresar al menos un nombre"
        // } else if(!inputLengthTest.test(this.state.primernombre)){
        //     errors.primernombre = "No exceda los 50 caracteres por valor.";
        //  }

        // if(!this.state.apellidopaterno){
        //     errors.apellidopaterno = "Debe ingresar al menos un apellido"
        // } else if(!inputLengthTest.test(this.state.apellidopaterno)){
        //     errors.apellidopaterno = "No exceda los 50 caracteres por valor.";
        // }

        // if(!inputLengthTest.test(this.state.segundonombre)){
        //     errors.segundonombre = "No exceda los 50 caracteres por valor.";
        // }

        // if(!inputLengthTest.test(this.state.apellidomaterno)){
        //     errors.apellidomaterno = "No exceda los 50 caracteres por valor.";
        // }

        // if(!inputLengthTest.test(this.state.apellidocasada)){
        //     errors.apellidocasada = "No exceda los 50 caracteres por valor.";
        // }

        // return errors;
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/empleado' />
        }
    }

    render() {
        let isEditar = this.state.idEmpleado !== '-1';
        let { idEmpleado, primernombre, segundonombre, apellidopaterno, apellidomaterno, apellidocasada, fechanacimiento, esServicioProfesional } = this.state
        const getGeneros = () => {
            const generos = this.state.generos;
            return (
                <div>
                    <select className="form-control" onChange={(e) => this.setState({ idGenero: e.target.value })}>
                        <option value='-1'>Seleccione un Genero</option>

                        {
                            generos ? generos.map( m => <option key={m.idGenero} value={m.idGenero} selected={ this.state.idGenero === m.idGenero } >{m.nombre}</option>) : <option>Seleccione un Genero</option>
                        }
                    </select>
                </div>
            )

        }

        const getPuestos = () => {
            const puestos = this.state.puestos;
            return (
                <div>
                    <select className="form-control"
                            onChange={(e) => this.setState({ idPuestotrabajo: e.target.value })}>
                        <option value='-1'>Seleccione un Puesto</option>
                        {
                            puestos ? puestos.map(m =>
                                <option key={m.idPuestotrabajo} value={m.idPuestotrabajo}
                                        selected={this.state.idPuestotrabajo === m.idPuestotrabajo}>{m.nombre}</option>) : <option>Seleccione un Puesto</option>
                        }
                    </select>
                </div>
            )
        }

        const getEstadosCiviles = () => {
            const estadosciviles = this.state.estadosciviles;
            return (
                <div>
                    <select className="form-control" onChange={(e) => this.setState({ idEstadocivil: e.target.value })}>
                        <option value='-1'>Seleccione un Estado Civil</option>
                        {
                            estadosciviles ? estadosciviles.map(m => <option key={m.idEstadocivil} value={m.idEstadocivil} selected={this.state.idEstadocivil === m.idEstadocivil}>{m.nombre}</option>) : <option>Seleccione un Estado Civil</option>
                        }
                    </select>

                </div>
            )
        }
        return (
            < div >
                <Card style={{ width: 'relative', 'marginLeft': 'auto', 'marginRight': 'auto' }} >
                    <Card.Header><h3>Empleado</h3></Card.Header>
                    <Card.Body>
                        <Container>
                            <h5 className='form-element-left'>Datos Personales</h5>
                            <hr/>
                            <Formik initialValues={{ idEmpleado, primernombre, segundonombre, apellidopaterno, apellidomaterno, apellidocasada, fechanacimiento, esServicioProfesional }}
                                    onSubmit={this.onSubmit}
                                    validateOnChange={true}
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
                                                        <ErrorMessage name="primernombre" component="span" className="alert alert-danger" />
                                                        <label className='form-element-left' >Primer Nombre</label>
                                                        {isEditar ? (
                                                            <Field className="form-control" type="text" name="primernombre" style={{ width: '25em' }} onChange={(e) => this.setState({primernombre: e.value})}/>
                                                                    ) : (
                                                            <Field className="form-control" type="text" name="primernombre" style={{ width: '25em' }}/>
                                                        )}

                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidocasada" component="span" className="alert alert-danger" />
                                                        <label className='form-element-left' >Apellido de Casada</label>
                                                        {isEditar ? (
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidocasada"  onChange={(e) => this.setState({apellidocasada: e.value})}/>
                                                                    ) : (
                                                            <Field className="form-control" style={inputStyle} type="text" name="apellidocasada" />
                                                        )}
                                                        </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="segundonombre" component="span" className="alert alert-danger"  />
                                                        <label className='form-element-left' >Segundo Nombre</label>
                                                        {isEditar ? (
                                                        <Field className="form-control" style={inputStyle} type="text" name="segundonombre" onChange={(e) => this.setState({segundonombre: e.value})}/>
                                                                    ) : (
                                                        <Field className="form-control" style={inputStyle} type="text" name="segundonombre"/>
                                                        )}
                                                        </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="fechanacimiento" component="span" className="alert alert-danger" />
                                                        <label className='form-element-left' >Fecha de Nacimiento</label>
                                                        {isEditar ? (
                                                        <DatePicker
                                                            className="form-control form-element-left" name="fechanacimiento"
                                                            selected={this.state.fechanacimiento}
                                                            onChange={(e) => this.handleDatePicker(e)}
                                                        />
                                                        ) : (
                                                            <Field className="form-control" style={inputStyle} type="date" name="fechanacimiento" placeholder="Fecha de Nacimiento" />

                                                        )}

                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidopaterno" component="span" className="alert alert-danger" />
                                                        <label className='form-element-left' >Apellido Paterno</label>
                                                        {isEditar ? (
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidopaterno" onChange={(e) => this.setState({apellidopaterno: e.value})}/>
                                                                    )  : (
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidopaterno"/>
                                                        )}
                                                        </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <label className='form-element-left' >Genero</label>
                                                    { getGeneros() }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidomaterno" component="span" className="alert alert-danger" />
                                                        <label className='form-element-left' >Apellido Materno</label>
                                                        {isEditar ? (
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidomaterno" onChange={(e) => this.setState({apellidomaterno: e.value})}/>
                                                                )  : (
                                                              <Field className="form-control" style={inputStyle} type="text" name="apellidomaterno"/>
                                                        )}

                                                        </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <label className='form-element-left' >Estado Civil</label>
                                                    { getEstadosCiviles()  }
                                                </Col>
                                            </Row>
                                            <br/><br/>
                                        <h5 className='form-element-left'>Puesto de Trabajo</h5>
                                        <hr/>
                                            <Row>
                                                <Col sm={6}>
                                                    <label className='form-element-left' >Puesto Asignado</label>
                                                    { getPuestos()  }
                                                </Col>
                                                <Col sm={4}>
                                                    <br/><br/>

                                                        {isEditar ? (
                                                            <label >
                                                                <input
                                                                    type="checkbox"
                                                                    name='esServicioProfesional'
                                                                    checked={this.state.esServicioProfesional}
                                                                    onChange={(e) => this.setCheckbox(e)}
                                                                    className="form-check-input"
                                                                />Contrato por Servicios Profesionales</label>
                                                        ) : (
                                                            <label >
                                                                <input
                                                                    type="checkbox"
                                                                    name='esServicioProfesional'
                                                                    className="form-check-input"
                                                                />Contrato por Servicios Profesionales</label>
                                                        )}

                                                </Col>
                                            </Row>
                                            <br/><br/>
                                        <h5 className='form-element-left'>Direcci&oacute;n</h5>
                                        <hr/>
                                            {/*<Row>*/}
                                            {/*    <Card.Title>Dirección</Card.Title>*/}

                                            {/*</Row>*/}
                                            {/*<Row>*/}
                                            {/*    <Col sm={6}>*/}
                                            {/*        <fieldset className="form-group">*/}
                                            {/*            /!* <label>Colonia</label> *!/*/}
                                            {/*            <ErrorMessage name="colonia" component="span" className="alert alert-danger" />*/}
                                            {/*            <Field className="form-control" style={inputStyle} type="text" name="colonia" placeholder="colonia" />*/}
                                            {/*        </fieldset>*/}
                                            {/*    </Col>*/}
                                            {/*    <Col sm={4}>*/}
                                            {/*        <fieldset className="form-group">*/}

                                            {/*            <ErrorMessage name="descripcion" component="span" className="alert alert-danger" />*/}
                                            {/*            <Field className="form-control" style={inputStyle} type="text" name="descripcion" placeholder="Descripción" />*/}
                                            {/*        </fieldset>*/}
                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                            {/*<Row>*/}
                                            {/*    <Col sm={5}>*/}
                                            {/*        <fieldset className="form-group">*/}

                                            {/*            <select className="form-control" onChange={(e) => this.setState({ selectedOption: e.target.value })}>*/}
                                            {/*                {*/}
                                            {/*                    selectedOption > 0 ? <option value={selectedOption}>{departamentoEsp}</option> : <option value="ND">seleccione departamento</option>}*/}

                                            {/*                {this.state.departamento.map(dep => <option key={dep.nombre} value={dep.idDepartmento}>{dep.nombre}</option>)}*/}
                                            {/*            </select>*/}

                                            {/*        </fieldset>*/}
                                            {/*    </Col>*/}
                                            {/*    <Col sm={4}>*/}
                                            {/*        <fieldset className="form-group">*/}
                                            {/*            {getMunicipios()}*/}
                                            {/*        </fieldset>*/}
                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                            <button className="btn btn-success" type="submit"><FontAwesomeIcon icon={faSave}/> Guardar</button>
                                            {/* {this.renderRedirect()}
                                                <button className="btn btn-danger" onClick={this.setRedirect}>Regresar</button> */}
                                            <Link to="/empleado"><button className="btn btn-danger"><FontAwesomeIcon icon={faReply}/> Regresar</button></Link>

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

export default EmpleadoDetalleComponent;