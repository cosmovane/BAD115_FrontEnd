import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import UnidadOrganizacionalService from '../../Service/UnidadOrganizacional/UnidadOrganizacionalService'
import Swal from 'sweetalert2'


class UnidadOrganizacionalDetalle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            unidadOrganizacionalSuperior: "",
            nombre: "",
            id_empresa: 1
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.validateNumber = this.validateNumber.bind(this)
    }

    async componentDidMount() {
        if (this.props.editar) {
            const id = this.props.location.pathname.split('/')[3]
            const unidadOrganizacional = await UnidadOrganizacionalService.obtenerUnidadOrganizacional(parseInt(id))
            const unidadOrganizacionalSuperior = unidadOrganizacional.data.unidadOrganizacionalSuperior
            const nombre = unidadOrganizacional.data.nombre
            const id_empresa = unidadOrganizacional.data.id_empresa
            this.setState({
                unidadOrganizacionalSuperior, nombre, id_empresa
            })
        }
    }

    validateNumber(number) {
        const isNumber = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/
        return isNumber.test(number)
    }

    validate(values) {
        let errors = {}
        if (!values.nombre) errors.nombre = 'Ingrese un nombre de departamento'
        return errors
    }

    async onSubmit(values) {
        const unidadOrganizacional = {
            idUnidadorganizacional: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
            unidadOrganizacionalSuperior: values.unidadOrganizacionalSuperior,
            nombre: values.nombre,
            id_empresa: values.id_empresa,
            estado:true
        }
 
        console.log("UnidadOrganizacionalDetalle -> onSubmit -> unidadOrganizacional", unidadOrganizacional)
        this.props.editar ? await UnidadOrganizacionalService.modificarUnidadOrganizacional(unidadOrganizacional.idUnidadorganizacional, unidadOrganizacional)
            : await UnidadOrganizacionalService.agregarUnidadOrganizacional(unidadOrganizacional)
        this.props.history.push('/departamentos')
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
        let { unidadOrganizacionalSuperior, nombre, id_empresa } = this.state
        return (
            <div className="container">
                {this.props.editar ? <h3>Editar Unidad Organizacional</h3> : <h3>Crear Unidad Organizacional</h3>}
                <Formik
                    initialValues={{ unidadOrganizacionalSuperior, nombre, id_empresa }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    onSubmit={this.onSubmit}
                >
                    {
                        <Form>
                            <ErrorMessage name="unidadOrganizacionalSuperior" component="div"
                                className="alert alert-warning" />
                            <ErrorMessage name="nombre" component="div"
                                className="alert alert-warning" />
                            <ErrorMessage name="id_empresa" component="div"
                                className="alert alert-warning" />

                            <fieldset className="form-group">
                                <label htmlFor="">Unidad organizacional Superior</label>
                                <Field className="form-control" type="text" placeholder="Unidad Superior" name="unidadOrganizacionalSuperior" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="">Nombre</label>
                                <Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="">Empresa</label>
                                <Field className="form-control" type="text" placeholder="Empresa" name="id_empresa" />
                            </fieldset>

                            <button className="btn btn-success" type="submit">Guardar</button>
                            <Link to="/departamentos"><button className="btn btn-danger">Regresar</button></Link>
                        </Form>
                    }
                </Formik>
            </div>
        );
    }
}

export default UnidadOrganizacionalDetalle;