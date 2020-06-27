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
            idEstadoCivil: '',

            departamento: [],
            generos: [],
            estadosciviles: [],
            descripcion: '',
            colonia: '',
            selectedOption: 0,
            selectedOptionMunicipio: 0,
            departamentoEsp: '',
            minucipio: '',
            redirect: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        // console.log(this.state.idEmpresa)
        EmpleadoService.listarGeneros().then(response => {
            console.log(response);
            this.setState({
                generos: response.data,
            });
        })
        EmpleadoService.listarEstadosCiviles().then(response => {
            console.log(response);
            this.setState({
                estadosciviles: response.data,
            });
        })
        if (this.state.idEmpleado == -1) {
            return
        }

        EmpleadoService.empleado(this.state.idEmpleado)
            .then(response => this.setState({
                idEmpleado: response.data.idEmpleado,
                primernombre: response.data.primernombre,
                segundonombre: response.data.segundonombre,
                apellidopaterno: response.data.apellidopaterno,
                apellidomaterno: response.data.apellidomaterno,
                apellidocasada: response.data.apellidocasada,
                fechanacimiento: response.data.fechanacimiento,


                // idDireccion: response.data.id_direccion.idDireccion,
                // idGenero: response.data.id_genero.idGenero,
                // idEstadoCivil: response.data.id_estadocivil.idEstadoCivil,

                // colonia: response.data.id_direccion.colonia,
                // descripcion: response.data.id_direccion.descripcion,
                // selectedOption: response.data.id_direccion.id_departmento.idDepartmento,
                // selectedOptionMunicipio: response.data.id_direccion.id_municipio.idMunicipio,
                // departamentoEsp: response.data.id_direccion.id_departmento.nombre,
                // municipio: response.data.id_direccion.id_municipio.nombre,
            }))

    }

    onSubmit(values) {
        let empleado = {
            primernombre: values.primernombre,
            segundonombre: values.segundonombre,
            apellidopaterno: values.apellidopaterno,
            apellidomaterno: values.apellidomaterno,
            apellidocasada: values.apellidocasada,
            fechanacimiento: values.fechanacimiento,

            // descripcion: values.descripcion,
            // departamento: this.state.selectedOption,
            // municipio: this.state.selectedOptionMunicipio
        }
        console.log("ID:" + this.state.idEmpleado)

        if (this.state.idEmpleado == -1) {
            console.log(empleado);
            var promesa = EmpleadoService.empleadoCrear( this.state.id_genero, this.state.id_estadocivil,'-1', empleado).then(() => this.props.history.push('/empleado'));
            console.log(promesa.isResolved);
        } else {
            empleado.idEmpleado = values.idEmpleado;
            EmpleadoService.empleadoActualizar(this.state.id_genero, this.state.id_estadocivil, '-1', empleado).then(() => this.props.history.push('/empleado'));
        }
    }

    validate(values) {
        let errors = {}
        // console.log("DEPARTAMENTO:" + this.state.selectedOption);
        // console.log("MUNICIPIO:" + this.state.selectedOptionMunicipio);
        // if(this.state.selectedOption == 0 || this.state.selectedOptionMunicipio == 0 ){
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Seleccione departamento y/o municipio!',
        //     })
        // }
        if(!values.primernombre){
            errors.primernombre = "Debe ingresar al menos un nombre"
        } else if(!inputLengthTest.test(values.primernombre)){
            errors.primernombre = "No exceda los 50 caracteres por valor.";
        }

        if(!values.apellidopaterno){
            errors.apellidopaterno = "Debe ingresar al menos un apellido"
        } else if(!inputLengthTest.test(values.apellidopaterno)){
            errors.apellidopaterno = "No exceda los 50 caracteres por valor.";
        }

        if(!inputLengthTest.test(values.segundonombre)){
            errors.segundonombre = "No exceda los 50 caracteres por valor.";
        }

        if(!inputLengthTest.test(values.apellidomaterno)){
            errors.apellidomaterno = "No exceda los 50 caracteres por valor.";
        }

        if(!inputLengthTest.test(values.apellidocasada)){
            errors.apellidocasada = "No exceda los 50 caracteres por valor.";
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
            return <Redirect to='/empleado' />
        }
    }

    render() {
        let { idEmpleado, primernombre, segundonombre, apellidopaterno, apellidomaterno, apellidocasada, fechanacimiento } = this.state
        const getGeneros = () => {
            const generos = this.state.generos;
            return (
                <div>
                    <select className="form-control" onChange={(e) => this.setState({ id_genero: e.target.value })}>
                        <option value='-1'>Seleccione un Genero</option>
                        {
                            generos ? generos.map(m => <option key={m.idGenero} value={m.idGenero}>{m.nombre}</option>) : <option>Seleccione un Genero</option>
                        }
                    </select>
                </div>
            )

        }
        const getEstadosCiviles = () => {
            const estadosciviles = this.state.estadosciviles;
            return (
                <div>
                    <select className="form-control" onChange={(e) => this.setState({ id_estadocivil: e.target.value })}>
                        <option value='-1'>Seleccione un Estado Civil</option>
                        {
                            estadosciviles ? estadosciviles.map(m => <option key={m.idEstadocivil} value={m.idEstadocivil}>{m.nombre}</option>) : <option>Seleccione un Estado Civil</option>
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
                            <Formik initialValues={{ idEmpleado, primernombre, segundonombre, apellidopaterno, apellidomaterno, apellidocasada, fechanacimiento }} onSubmit={this.onSubmit}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validate={this.validate}
                                    enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form className="form">
                                            {/* <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control"  style={inputStyle}  type="text" name="idEmpresa" disabled />
                                    </fieldset> */}
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="primernombre" component="span" className="alert alert-danger" />
                                                        <Field className="form-control" type="text" name="primernombre" style={{ width: '25em' }} placeholder="Primer Nombre" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidocasada" component="span" className="alert alert-danger" />
                                                        {/* <label>NIC</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidocasada" placeholder="Apellido de Casada" />
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="segundonombre" component="span" className="alert alert-danger" />
                                                        {/* <label>NIT</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="segundonombre" placeholder="Segundo Nombre" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="fechanacimiento" component="span" className="alert alert-danger" />
                                                        {/* <label>NIC</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="fechanacimiento" placeholder="Fecha de Nacimiento" />
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidopaterno" component="span" className="alert alert-danger" />
                                                        {/* <label>Pagina web</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidopaterno" placeholder="Apellido Paterno" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    { getGeneros() }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="apellidomaterno" component="span" className="alert alert-danger" />
                                                        {/* <label>Email</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="apellidomaterno" placeholder="Apellido Materno" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    { getEstadosCiviles()  }
                                                </Col>
                                            </Row>

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