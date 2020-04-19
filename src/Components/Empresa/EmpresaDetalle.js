import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EmpresaService from '../../Service/Empresa/EmpresaService';

class EmpresaDetalleComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idEmpresa: this.props.match.params.id,
            representante: '',
            nit: '',
            nic: '',
            paginaweb: '',
            telefono: '',
            email: '',
            page: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

    }

    componentDidMount() {

        console.log(this.state.idEmpresa)

        // eslint-disable-next-line
        if (this.state.idEmpresa == -1) {
            return
        }

        EmpresaService.empresa(this.state.idEmpresa)
            .then(response => this.setState({
               
                representante: response.data.representante,
                nit: response.data.nit,
                nic: response.data.nic,
                paginaweb: response.data.paginaweb,
                telefono: response.data.telefono,
                email: response.data.email,
                page: response.data.page,
            }))
    }
    onSubmit(values) {
        //console.log(values);
        let empresa={

            representante:values.representante,
            nit:values.nit,
            nic: values.nic,
            paginaweb: values.paginaweb,
            telefono: values.telefono,
            email: values.email,
            page: values.page,
        }
        console.log("ID:"+this.state.idEmpresa)
        console.log(empresa);
        if(this.state.idEmpresa === -1){
            console.log("Entrando a post empresa==========")
            EmpresaService.empresaCrear(empresa).then(()=>this.props.history.push('/empresa'));
        }else{
            EmpresaService.empresaActualizar(this.state.idEmpresa,empresa).then(()=>this.props.history.push('/empresa'));
        }
    }

    validate(values){
        let errors = {}
        if(!values.representante){
            errors.representante = 'Ingrese representante';
        }else if(!values.nit){
            errors.nit = 'Ingrese NIT';
        }else if(!values.nic){
            errors.nic = 'ingrese NIC';
        }else if(!values.paginaweb){
            errors.paginaweb = 'ingrese Pagina web';
        }else if(!values.telefono){
            errors.telefono = 'ingrese Telefono';
        }else if(!values.email){
            errors.email = 'ingrese Email';
        }else if(!values.page){
            errors.page = 'ingrese Page';
        }

        return errors;
    }

    render() {
        console.log("aqui match===========")
        console.log(this.state);
        
        let { representante, idEmpresa, nit, nic,paginaweb,telefono,email,page } = this.state
        return (
            // <div>
            //     <h3>Empresa</h3>
            //     <div>{idEmpresa}</div>
            //     <div>{representante}</div>
            //     <div>{nit}</div>
            //     <div>{nic}</div>
            // </div>

            <div>
                <h3>Empresa</h3>
                <div className="container">
                    <Formik initialValues={{ representante, idEmpresa, nit, nic,paginaweb,telefono,email,page }}  onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="idEmpresa" disabled />
                                    </fieldset>
                                    <ErrorMessage name="representante" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Representante</label>
                                        <Field className="form-control" type="text" name="representante" />
                                    </fieldset>
                                    <ErrorMessage name="nit" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>NIT</label>
                                        <Field className="form-control" type="text" name="nit" />
                                    </fieldset>
                                    <ErrorMessage name="nic" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>NIC</label>
                                        <Field className="form-control" type="text" name="nic" />
                                    </fieldset>
                                    <ErrorMessage name="paginaweb" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Pagina web</label>
                                        <Field className="form-control" type="text" name="paginaweb" />
                                    </fieldset>
                                    <ErrorMessage name="telefono" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Telefono</label>
                                        <Field className="form-control" type="text" name="telefono" />
                                    </fieldset>
                                    <ErrorMessage name="email" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="email" />
                                    </fieldset>
                                    <ErrorMessage name="page" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Page</label>
                                        <Field className="form-control" type="text" name="page" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        );
    }

}

export default EmpresaDetalleComponent;