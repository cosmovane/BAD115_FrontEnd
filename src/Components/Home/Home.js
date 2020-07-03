import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class HomeComponent extends Component {
	render() {
		return (
			<div>
			<h1 style={{color: "#24b300"}}>Proud Parrot</h1>
			<h2>Sistema de planillas para El Salvador</h2>
			<h3>BAD115 2020</h3>
			<h4>Grupo 7</h4>
			<h5>Integrantes:</h5>
			<br />
			<Table>
			<thead>
			<th>Carnet</th>
			<th>Nombre</th>
			</thead>
			<tbody>
			<tr>
			<td>CL13002</td>
			<td>Cornejo López, Sandra Verónica </td>
			</tr>
			<tr>
			<td>DV14002</td>
			<td>Dimas Valle, Edwin Enrique </td>
			</tr>
			<tr>
			<td>GR14017</td>
			<td>Guevara Rodríguez, Fátima Briseth </td>
			</tr>
			<tr>
			<td>NR15002</td>
			<td>Núñez Ramírez, Vanessa Carolina </td>
			</tr>
			<tr>
			<td>RR14059</td>
			<td>Ramos Rodríguez, Salvador Enrique </td>
			</tr>
			</tbody>
			</Table>
			</div>
			);
		}
	}


