import React,{Component} from 'react';
import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faSave,faPlus} from '@fortawesome/free-solid-svg-icons';

export default class CentroCostoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			costos:[],
		}


	}

	componentDidMount(){

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
                    	<button className="btn btn-success" onClick={this.addCourseClicked}><FontAwesomeIcon icon={faPlus}/>Agregar</button>  
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '15%' }}>Unidad organizacional</th>
                                <th style={{ width: '55%' }}>Monto</th>
                                <th style={{ width: '20%' }}>Periodo</th>
                                <th style={{ width: '10%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.costos.map(
                                    costo =>
                                        <tr key={costo.idCosto}>
                                            {/* <td>{empresa.idEmpresa}</td> */}
                                            <td>{empresa.id_unidadorganizacional.nombre}</td>
                                            <td>{empresa.monto}</td>
                                            <td>{empresa.periodo}</td>
                                            <td><button className="btn btn-warning btn-sm" onClick={() => this.updateEmpresaClicked(empresa.idEmpresa)}><FontAwesomeIcon icon={faEdit}/></button></td>
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
