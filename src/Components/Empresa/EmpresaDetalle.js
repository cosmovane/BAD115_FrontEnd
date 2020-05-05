import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmpresaService from '../../Service/Empresa/EmpresaService';
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
const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const nitTest = /^\d{4,4}(-\d{6,6}-\d{3,3}-\d{1,1})?$/i;
const inputTest = /^[a-zA-Z\s]*$/i;
const inputLengthTest = /^.{5,100}$/;
const pageLengthTest =/^.{5,50}$/;
const telefonoTest = /^\d{4,4}(-\d{4,4})?$/i;
const paginaWebTest = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
class EmpresaDetalleComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idEmpresa: this.props.match.params.id,
            idDireccion:0,
            representante: '',
            nit: '',
            nic: '',
            paginaweb: '',
            telefono: '',
            email: '',
            page: '',
            departamento: [],
            descripcion: '',
            colonia: '',
            selectedOption: 0,
            selectedOptionMunicipio: 0,
            departamentoEsp: '',
            municipio: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        console.log(this.state.idEmpresa)
        EmpresaService.departamentosMunicipios().then(response => {
            this.setState({
                departamento: response.data,
            });
        })
        if (this.state.idEmpresa == -1) {
            return
        }

        EmpresaService.empresa(this.state.idEmpresa)
            .then(response => this.setState({
                idDireccion:response.data.id_direccion.idDireccion,
                representante: response.data.representante,
                nit: response.data.nit,
                nic: response.data.nic,
                paginaweb: response.data.paginaweb,
                telefono: response.data.telefono,
                email: response.data.email,
                page: response.data.page,
                colonia: response.data.id_direccion.colonia,
                descripcion: response.data.id_direccion.descripcion,
                selectedOption: response.data.id_direccion.id_departmento.idDepartmento,
                selectedOptionMunicipio: response.data.id_direccion.id_municipio.idMunicipio,
                departamentoEsp: response.data.id_direccion.id_departmento.nombre,
                municipio: response.data.id_direccion.id_municipio.nombre,
            }))

    }

    onSubmit(values) {
        let empresa = {
            representante: values.representante,
            nit: values.nit,
            nic: values.nic,
            paginaweb: values.paginaweb,
            telefono: values.telefono,
            email: values.email,
            page: values.page,
            colonia: values.colonia,
            descripcion: values.descripcion,
            departamento: this.state.selectedOption,
            municipio: this.state.selectedOptionMunicipio
        }

        if (this.state.idEmpresa == -1) {
            console.log(empresa);
            EmpresaService.empresaCrear(empresa).then(() => this.props.history.push('/empresa'));
        } else {
            EmpresaService.empresaActualizar(this.state.idEmpresa,this.state.idDireccion, empresa).then(() => this.props.history.push('/empresa'));
        }
    }

    validate(values) {
        let errors = {}
        if(this.state.selectedOption == 0 || this.state.selectedOptionMunicipio == 0 ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione departamento y/o municipio!',
              })
        }
        if (!values.representante) {
            errors.representante = 'Ingrese representante';
        } else if (!inputTest.test(values.representante)) {
            errors.representante = 'Nombre no coincide con formato';
        }else if(!inputLengthTest.test(values.representante)){
            errors.representante = 'Nombre debe contener mínimo 5 y máximo 100 caracteres';
        }
        else if (!values.nit) {
            errors.nit = 'Ingrese NIT';
        } else if (!nitTest.test(values.nit)) {
            errors.nit = 'NIT no coincide con formato';
        }
        else if (!values.nic) {
            errors.nic = 'Ingrese NIC';
        } else if (!values.paginaweb) {
            errors.paginaweb = 'Ingrese Pagina web';
        } else if (!paginaWebTest.test(values.paginaweb)) {
            errors.paginaweb = 'Pagina web no coincide con formato'
        } else if(!inputLengthTest.test(values.paginaweb)){
            errors.paginaweb = 'Pagina web debe contener mínimo 5 y máximo 100 caracteres';
        }
        else if (!values.telefono) {
            errors.telefono = 'Ingrese Telefono';
        } else if (!telefonoTest.test(values.telefono)) {
            errors.telefono = 'Telefono no coincide con formato';
        }
        else if (!values.email) {
            errors.email = 'Ingrese Email';
        } else if (!emailTest.test(values.email)) {
            errors.email = 'Email no coincide con formato';
        }
        else if (!values.page) {
            errors.page = 'Ingrese Page';
        } else if (!pageLengthTest.test(values.page)) {
            errors.page = 'Page web debe contener mínimo 5 y máximo 50 caracteres';
        } 
        else if (!values.colonia) {
            errors.colonia = 'Ingrese colonia';
        } else if (!pageLengthTest.test(values.colonia)) {
            errors.colonia = 'Colonia debe contener mínimo 5 y máximo 50 caracteres';
        } 
        else if (!values.descripcion) {
            errors.descripcion = 'Ingrese descripción';
        }else if(!inputLengthTest.test(values.descripcion)){
            errors.descripcion = 'Descripción debe contener mínimo 5 y máximo 100 caracteres';
        }

        return errors;
    }

    render() {
        let { representante, idEmpresa, nit, nic, paginaweb, telefono, email, page, colonia, descripcion, selectedOption, selectedOptionMunicipio, departamentoEsp, municipio } = this.state
        const getMunicipios = () => {
            const municipios = this.state.departamento.filter(({ idDepartmento }) => idDepartmento == this.state.selectedOption)[0];
            return (
                <div>
                    <select className="form-control" onChange={(e) => this.setState({ selectedOptionMunicipio: e.target.value })}>
                        {
                            selectedOption > 0 ? <option value={selectedOptionMunicipio}>{municipio}</option> : <option value="NM">seleccione municipio</option>
                        }

                        {
                            municipios ? municipios.municipiosByIdDepartmento.map(m => <option key={m.nombre} value={m.idMunicipio}>{m.nombre}</option>) : <option>Seleccione departamento</option>
                        }
                    </select>

                </div>
            )
        }
        return (
            < div >
                <Card style={{ width: 'relative', 'margin-left': 'auto', 'margin-right': 'auto' }} >
                    <Card.Header><h3>Empresa</h3></Card.Header>
                    <Card.Body>
                        <Container>
                            <Formik initialValues={{ representante, idEmpresa, nit, nic, paginaweb, telefono, email, page, colonia, descripcion, selectedOption, selectedOptionMunicipio, departamentoEsp, municipio }} onSubmit={this.onSubmit}
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
                                                        {/* <label>Representante</label> */}
                                                        <ErrorMessage name="representante" component="span" className="alert alert-danger" />
                                                        <Field className="form-control" type="text" name="representante" style={{ width: '25em' }} placeholder="Representante" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="nit" component="span" className="alert alert-danger" />
                                                        {/* <label>NIT</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="nit" placeholder="NIT:0000-000000-000-0" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="nic" component="span" className="alert alert-danger" />
                                                        {/* <label>NIC</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="nic" placeholder="NIC" />
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="paginaweb" component="span" className="alert alert-danger" />
                                                        {/* <label>Pagina web</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="paginaweb" placeholder="Pagina web" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="telefono" component="span" className="alert alert-danger" />
                                                        {/* <label>Telefono</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="telefono" placeholder="Teléfono" />
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="email" component="span" className="alert alert-danger" />
                                                        {/* <label>Email</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="email" placeholder="Email" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        <ErrorMessage name="page" component="span" className="alert alert-danger" />
                                                        {/* <label>Page</label> */}
                                                        <Field className="form-control" style={inputStyle} type="text" name="page" placeholder="Page" />
                                                    </fieldset>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Card.Title>Dirección</Card.Title>

                                            </Row>
                                            <Row>
                                                <Col sm={6}>
                                                    <fieldset className="form-group">
                                                        {/* <label>Colonia</label> */}
                                                        <ErrorMessage name="colonia" component="span" className="alert alert-danger" />
                                                        <Field className="form-control" style={inputStyle} type="text" name="colonia" placeholder="colonia" />
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">

                                                        <ErrorMessage name="descripcion" component="span" className="alert alert-danger" />
                                                        <Field className="form-control" style={inputStyle} type="text" name="descripcion" placeholder="Descripción" />
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={5}>
                                                    <fieldset className="form-group">

                                                        <select className="form-control" onChange={(e) => this.setState({ selectedOption: e.target.value })}>
                                                            {
                                                                selectedOption > 0 ? <option value={selectedOption}>{departamentoEsp}</option> : <option value="ND">seleccione departamento</option>}

                                                            {this.state.departamento.map(dep => <option key={dep.nombre} value={dep.idDepartmento}>{dep.nombre}</option>)}
                                                        </select>
                                                       
                                                    </fieldset>
                                                </Col>
                                                <Col sm={4}>
                                                    <fieldset className="form-group">
                                                        {getMunicipios()}
                                                    </fieldset>
                                                </Col>
                                            </Row>
                                            <button className="btn btn-success" type="submit"><FontAwesomeIcon icon={faSave}/> Guardar</button>
                                            <Link to="/empresa"><button className="btn btn-danger"><FontAwesomeIcon icon={faReply}/> Regresar</button></Link>
                                            
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

export default EmpresaDetalleComponent;