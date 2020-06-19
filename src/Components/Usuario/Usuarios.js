import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UsuarioService from '../../Service/Usuario/UsuarioService';
import LoginService from '../../Service/Login/LoginService';
export default class Usuarios extends Component{
	constructor(props){
		super(props)
		this.state={
			usuarios:[],
            buscarText:'',
            usuariosBackup:[]
		}

		this.refreshUsuarios = this.refreshUsuarios.bind(this);
        this.desactivarActivarUsuario = this.desactivarActivarUsuario.bind(this);
	}

	async componentDidMount(){
		await this.refreshUsuarios();
	}

	async desactivarActivarUsuario(id){
		await UsuarioService.desactivarUsuario(id)
		await this.refreshUsuarios();
	}

    Usuarios(usuarios){
        return (usuarios.map(data=>({idUser:data.idUser,username:data.username,email:data.email,estado:data.estado ? 'Activo' : 'Desactivado'})));
    }

	async refreshUsuarios(){
		const response = await UsuarioService.allUsuarios();
		this.setState({usuarios:this.Usuarios(response.data),usuariosBackup:this.Usuarios(response.data)});
	}

    filter(event){
        let text = event.target.value
        const data = this.state.usuariosBackup
        const newData = data.filter(res=>{
            const resDataUsername = res.username.toUpperCase()
            const resDataEmail = res.email.toUpperCase()
            const resDataEstado = res.estado.toUpperCase()
            const campo = resDataUsername+" "+resDataEmail+" "+resDataEstado
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })

        this.setState({
            usuarios:newData,
            buscarText:text
        })
    }

	render(){
		return (
			<div className="container">
                <h3>Usuarios</h3>
                <div className="container">
                     <Row>
                        <Col sm={2}>
                        {
                            LoginService.hasPermiso('USUARIO_CREATE') ? <Link to="/usuario/crear" style={{' position': 'absolute','left': '150px'}} className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>Agregar</Link>: ""
                        }
                            
                        </Col>
                        <Col sm={4}></Col>
                        <Col sm={6}>
                            <input className="form-control"  placeholder="Buscar.." value={this.state.buscarText} onChange={(text) => this.filter(text)}/>
                        </Col>
                    </Row>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '15%' }}>Username</th>
                                <th style={{ width: '45%' }}>Email</th>
                                <th style={{ width: '20%' }}>Estado</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usuarios.map(
                                    usuario =>
                                        <tr key={usuario.idUser}>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.email}</td>
                                            <td>{
                                                    usuario.estado ? 'Activo' : 'Desactivo'
                                                }</td>
                                            <td>
                                            {
                                                LoginService.hasPermiso('USUARIO_CREATE') ? <Link to={`/usuario/ver/${usuario.idUser}`}><button className="btn btn-info btn-sm"><FontAwesomeIcon icon={faEye} /></button></Link> : ""
                                            }
                                            {
                                                LoginService.hasPermiso('USUARIO_UPDATE') ? <Link to={`/usuario/editar/${usuario.idUser}`} ><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link> : ""
                                            }
                                            {
                                                LoginService.hasPermiso('USUARIO_READ') ? <button className="btn btn-secondary btn-sm" ><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivarActivarUsuario(usuario.idUser)}/></button> : ""
                                            }
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
			);
	}
}
