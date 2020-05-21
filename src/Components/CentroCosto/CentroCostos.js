import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';

export default class CentroCostoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			costos:[],
		}

		this.refreshCostos = this.refreshCostos.bind(this)
	}

	componentDidMount(){
		await this.refreshCostos()
	}

	async desactivar(id){
		await CentroCostoService.desactivarCosto(id)
		await this.refreshCostos()
	}

	async refreshCostos(){
		const response = await CentroCostoService.listCostos(-1);
		this.setState({costos:response}); 
	}

	render(){

		return(
				 <div className="container">
                <h3>Empresas</h3>
                {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
                <div className="container">
                    <div className="row">   
                     <Link to="/centro_costo/crear"><button className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>Agregar</button></Link>  
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '30%' }}>Unidad organizacional</th>
                                <th style={{ width: '20%' }}>Monto</th>
                                <th style={{ width: '20%' }}>Periodo</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.costos.map(
                                    costo =>
                                        <tr key={costo.idCosto}>
                                            <td>{costo.id_unidadorganizacional.nombre}</td>
                                            <td>{costo.monto}</td>
                                            <td>{costo.periodo}</td>
                                            <td>
                      						   <Link to={`/centro_costo/editar/${costo.idCosto}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link>
                      						   <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivar(costo.idCosto)} /></button>
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
