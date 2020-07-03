import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import UnidadOrganizacionalService from '../../Service/UnidadOrganizacional/UnidadOrganizacionalService'
import Swal from 'sweetalert2'


class UnidadOrganizacionalDetalle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idUnidadorganizacional:this.props.match.params.id,
            unidadOrganizacionalSuperior: "",
            nombre: "",
            unidadesOrganizacionales: []
         //   id_empresa: ""
         //   empresas: []
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        UnidadOrganizacionalService.allUnidadesOrganizacionales().then(response =>{console.log(response);
            this.setState({unidadesOrganizacionales: response.data,
            });
        })
        if (this.props.editar) {
            const id = this.props.location.pathname.split('/')[3]
            const unidadOrganizacional = await UnidadOrganizacionalService.obtenerUnidadOrganizacional(parseInt(id))
            //const {unidadOrganizacionalSuperior, nombre, id_empresa} = unidadOrganizacional.data
            const {unidadOrganizacionalSuperior, nombre} = unidadOrganizacional.data
            this.setState({
               //unidadOrganizacionalSuperior, nombre, id_empresa
                unidadOrganizacionalSuperior, nombre
            })
        }
    }

    async onSubmit(values) {
        if(values.unidadOrganizacionalSuperior){
            values.unidadmayor=false
        } else{
            values.unidadmayor=true
        }
        const unidadOrganizacional = {
            idUnidadorganizacional: this.props.editar ? parseInt(this.props.location.pathname.split('/')[3]) : '',
            unidadOrganizacionalSuperior: values.unidadOrganizacionalSuperior,
            nombre: values.nombre,
            //id_empresa: values.id_empresa,
            estado:true,
            unidadmayor: values.unidadmayor
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
        //let { unidadOrganizacionalSuperior, nombre, id_empresa } = this.state
        let { unidadOrganizacionalSuperior, nombre } = this.state
        const getUnidadSuperior = () => {
            var x=0;
            var y=0;
            const unidadesOrganizacionales = this.state.unidadesOrganizacionales;
            return(
                <div>
                    <select className="form-control" onChange={(uni) => this.setState({unidadOrganizacionalSuperior: uni.target.value })}>
                        <option value='-1'>Seleccione departamento</option>
                        {
                            unidadesOrganizacionales ? unidadesOrganizacionales.map(m =>  m.estado ? 
                                m.unidadOrganizacionalSuperior != unidadOrganizacionalSuperior ?
                            <option key={m.idUnidadorganizacional} value={m.idUnidadorganizacional}>{m.nombre} </option> : y=1 : x=1) : <option>Seleccione un departamento</option>
                        }
                    </select>
                </div>
            )
        }
        return (
            <div className="container">
                {this.props.editar ? <h3>Editar Unidad Organizacional</h3> : <h3>Crear Unidad Organizacional</h3>}
                <Formik
                    //initialValues={{ unidadOrganizacionalSuperior, nombre, id_empresa }}
                    initialValues={{ unidadOrganizacionalSuperior, nombre }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    onSubmit={this.onSubmit}>
                    {
                        <Form>
                            <ErrorMessage name="unidadOrganizacionalSuperior" component="div"
                                className="alert alert-warning" />
                            <ErrorMessage name="nombre" component="div"
                                className="alert alert-warning" />
                            

                            <fieldset className="form-group">
                                <label htmlFor="">Unidad organizacional Superior</label>
                                
                                { getUnidadSuperior() }
                            </fieldset>
                            
                            <fieldset className="form-group">
                                <label htmlFor="">Nombre</label>
                                <Field className="form-control" type="text" placeholder="Nombre" name="nombre" />
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