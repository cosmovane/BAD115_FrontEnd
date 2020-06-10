import React, { Component } from 'react';
import UsuarioService from '../../Service/Usuario/UsuarioService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
export default class Usuarios extends Component{
	constructor(props){
		super(props)
		this.state={
			usuarios:[]
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

	async refreshUsuarios(){
		const response = await UsuarioService.allUsuarios();
		this.setState({usuarios:response.data});
	}

	render(){
		return (
			<div className="container">
                <h3>Usuarios</h3>
                <div className="container">
                    <div className="row">
                        <Link to="/usuario/crear"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus}/>Agregar </button> </Link>
                    </div>
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
                                            <Link to={`/usuario/ver/${usuario.idUser}`}><button className="btn btn-info btn-sm"><FontAwesomeIcon icon={faEye} /></button></Link>
                                            <Link to={`/usuario/editar/${usuario.idUser}`} ><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                                            <button className="btn btn-secondary btn-sm" ><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivarActivarUsuario(usuario.idUser)}/></button>
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
