import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert'
import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';

export default class CentroCostoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			costos:[],
            id:'',
		}

		this.refreshCostos = this.refreshCostos.bind(this)
	}

	async componentDidMount(){
		await this.refreshCostos()
	}

	async desactivar(id){
		await CentroCostoService.desactivarCosto(id)
		await this.refreshCostos()
	}

	async refreshCostos(){
		const id = this.props.location.pathname.split('/')[2]
        console.log('ID COSTO'+id)
		const response = await CentroCostoService.listCostos(parseInt(id));
        console.log(response.data)
		this.setState({costos:response.data,id:id}); 
	}

    costoForm(){
        const id = this.props.location.pathname.split('/')[2]
        this.props.history.push('/centro_costo/crear/'+id)
    }

    async costoListAtras(){
        const id = this.props.location.pathname.split('/')[2]
        this.props.history.push('/centro_costo_list/'+id)
        await this.refreshCostos();
    }

    async costoListHijos(id){
        this.props.history.push('/centro_costo_list/'+id)
        await this.refreshCostos();
    }

	render(){
        let {id} = this.state
		return(
				 <div className="container">
                <h3>Centro de costos</h3>
                {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
                <div className="container">
                    <div className="row">   
                  {/*   <Link to={`/centro_costo/crear/${id}`}><button className="btn btn-success"><FontAwesomeIcon icon={faPlus}/>Agregar</button></Link> */}
                   <button className="btn btn-success" onClick={() => this.costoForm()}><FontAwesomeIcon icon={faPlus}/>Agregar</button>
                   <button className="btn btn-danger" onClick={() => this.costoListAtras()}><FontAwesomeIcon icon={faArrowLeft}/>Regresar</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '25%' }}>Unidad organizacional</th>
                                <th style={{ width: '20%' }}>Monto</th>
                                <th style={{ width: '15%' }}>Periodo</th>
                                <th style={{ width: '20%' }}>Acciones</th>
                                <th></th>
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
                                            <td>{costo.id_unidadorganizacional.idUnidadorganizacional}</td>
                                            <td>
                      						   <Link to={`/centro_costo/crear/${costo.id_unidadorganizacional.idUnidadorganizacional}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faPlus} /></button></Link>
                      						  {/* <Link to={`/centro_costo_list/${costo.id_unidadorganizacional.idUnidadorganizacional}`}><button className="btn btn-info btn-sm"><FontAwesomeIcon icon={faList} /></button></Link>*/}
                      						   <button className="btn btn-info btn-sm" onClick={() => this.costoListHijos(costo.id_unidadorganizacional.idUnidadorganizacional)}><FontAwesomeIcon icon={faList} /></button>
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
