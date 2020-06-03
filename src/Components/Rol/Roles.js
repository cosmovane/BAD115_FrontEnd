import React, { Component } from 'react';
import RolService from '../../Service/Rol/RolService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Roles extends Component{
	constructor(props){
		super(props)
		this.state={
			roles:[],
		}

		this.refreshRoles = this.refreshRoles.bind(this);
	}

	async componentDidMount(){
		await this.refreshRoles();
	}


	async desactivarActivarRol(id){
		await RolService.desactivarRol(id);
		await this.refreshRoles();
	}

	async refreshRoles(){
		const response = await RolService.allRoles();
		this.setState({roles:response.data});
	}

	render(){
		return (
			<div className="container">
                <h3>Roles</h3>
                <div className="container">
                    <div className="row">
                         <Link to="/rol/crear"> <button className="btn btn-success"> <FontAwesomeIcon icon={faPlus}/>Agregar </button> </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '15%' }}>Nombre</th>
                                <th style={{ width: '55%' }}>Descripción</th>
                                <th style={{ width: '20%' }}>Estado</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.roles.map(
                                    rol =>
                                        <tr key={rol.idRol}>
                                            <td>{rol.nombre}</td>
                                            <td>{rol.detalle}</td>
                                            <td>{rol.estado}</td>
                                            <td>
                                            <Link><button className="btn btn-info btn-sm"><FontAwesomeIcon icon={faEye} /></button></Link>
                                            <Link ><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                                            <button className="btn btn-danger btn-sm" ><FontAwesomeIcon icon={faBan}/></button>
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