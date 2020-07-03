import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faPlus,faList,faBan,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CentroCostoService from '../../Service/CentroCosto/CentroCostoService';
import LoginService from '../../Service/Login/LoginService';

export default class CentroCostoComponent extends Component{
	constructor(props){
		super(props)
		this.state={
			costos:[],
            costosBackup:[],
            id:'',
            buscarText:''
		}

        this.desactivar = this.desactivar.bind(this)
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
       // console.log('ID COSTO'+id)
		const response = await CentroCostoService.listCostos(parseInt(id));
        //console.log(response.data)
        if (response !== undefined) {
            this.setState({costos:response.data,id:id,costosBackup:response.data}); 
        }
		
	}

    costoForm(){
        const id = this.props.location.pathname.split('/')[2]
        this.props.history.push('/centro_costo/crear/'+id)
    }

    async costoListAtras(){
        //const id = this.props.location.pathname.split('/')[2]
        //console.log("ID atras:"+id) 
        this.props.history.push('/centro_costo_list/'-1)
        //await this.refreshCostos();
    }

    async costoListHijos(id){
        this.props.history.push('/centro_costo_list/'+id)
        await this.refreshCostos();
    }

    filter(event){
        let text = event.target.value
        const data = this.state.costosBackup
        const newData = data.filter(res=>{
            const resDataUnidad = res.id_unidadorganizacional.nombre.toUpperCase()
            const resDataMonto = res.monto.toString()
            const resDataPeriodo = res.periodo.toString()
            const campo = resDataUnidad+" "+resDataMonto+" "+resDataPeriodo
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })

        this.setState({
            costos:newData,
            buscarText:text
        })
    }

     pagarPlanilla = async () =>{
            await CentroCostoService.payCosto();
        }

	render(){
        let {id} = this.state
		return(
				 <div className="container">
                <h3>Centro de costos</h3>
                {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
                <div className="container">
                   
                    <Row>
                        <Col sm={2}>
                            {
                                LoginService.hasPermiso('CENTRO_COSTO_CREATE') ? <button className="btn btn-success" onClick={() => this.costoForm()}><FontAwesomeIcon icon={faPlus}/>Agregar</button> : ""
                            }
                   
                        </Col>
                        <Col sm={2}>
                            <button className="btn btn-secondary btn-planilla" onDoubleClick={ () => this.pagarPlanilla()}>
                                Pagar planilla
                            </button>
                        </Col>
                        <Col sm={2}>
                           {/* <button className="btn btn-danger" onClick={() => this.costoListAtras()}><FontAwesomeIcon icon={faArrowLeft}/>Regresar</button>*/}
                            <Link to={'/centro_costo_list/-1'}><button className="btn btn-danger"><FontAwesomeIcon icon={faArrowLeft} />Regresar</button></Link>
                        </Col>
                        <Col sm={6}>
                            <input className="form-control"  placeholder="Buscar.." value={this.state.buscarText} onChange={(text) => this.filter(text)}/>
                        </Col>
                    </Row>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th style={{ width: '45%' }}>Unidad organizacional</th>
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
                                            
                                            <td>
                                            {
                                                LoginService.hasPermiso('CENTRO_COSTO_CREATE') ?  <Link to={`/centro_costo/crear/${costo.id_unidadorganizacional.idUnidadorganizacional}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faPlus} /></button></Link> : ""
                                            }
                                            {
                                                LoginService.hasPermiso('CENTRO_COSTO_READ') ?  <button className="btn btn-info btn-sm" onClick={() => this.costoListHijos(costo.id_unidadorganizacional.idUnidadorganizacional)}><FontAwesomeIcon icon={faList} /></button> : ""
                                            }
                      						  
                      						{
                                                LoginService.hasPermiso('CENTRO_COSTO_UPDATE') ?  <Link to={`/centro_costo/editar/${costo.idCosto}`}><button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faEdit} /></button></Link> : ""
                                            }
                                            {
                                                LoginService.hasPermiso('CENTRO_COSTO_DISABLED') ?  <button className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faBan} onDoubleClick={ () => this.desactivar(costo.idCosto)} /></button> : ""
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
