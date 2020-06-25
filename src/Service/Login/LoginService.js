import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_API_URL } from '../../utilities/constants'

const credenciales = btoa('reactapp'+':'+'12345');
const headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Authorization': 'Basic '+credenciales
}
let _usuario = {
	id:'',
	username:'',
	email:'',
	permisos:[]
}

let _token=''
class LoginService {

	login(usuario){
	//	console.log(usuario.username)
	//	console.log(usuario.password)
		let params = new URLSearchParams();
		params.set('grant_type','password');
		params.set('username',usuario.username);
		params.set('password',usuario.password);
		return axios.post(`${BASE_API_URL}/oauth/token`,params.toString(),{headers: headers});
	}

	obtenerDatosToken(accessToken){
		return accessToken != null ? JSON.parse(atob(accessToken.split(".")[1])) : "";
	}

	guardarUsuario(accessToken){
		let payload = this.obtenerDatosToken(accessToken);
		_usuario.id = payload.id
		_usuario.username = payload.username;
		_usuario.email = payload.email;
		_usuario.permisos = payload.authorities;
		sessionStorage.setItem('usuario',JSON.stringify(_usuario));
	}

	guardarToken(accessToken){
		_token = accessToken
		sessionStorage.setItem('token',accessToken);
	}

	

	obtenerUsuario(){
		if(_usuario.username !==''){
		//	console.log("hay datos en usuario")
		//	console.log(_usuario.username)
			return _usuario;
		}else if(_usuario.username === '' && sessionStorage.getItem('usuario') !==null){
		//	console.log("no hay datos en _usuario y busca sessionStorage")
			let payload=JSON.parse(sessionStorage.getItem('usuario'));
		//	console.log(payload)
			_usuario.id = payload.id
			_usuario.username = payload.username;
			_usuario.email = payload.email;
			_usuario.permisos = payload.permisos;
		//	console.log(_usuario)
			return _usuario
		}
		//console.log("retorna null")
		return null;
	}

	obtenerToken(){
		if(_token !=''){
	//		console.log("hay token")
			return _token;
		}else if(_token == '' && sessionStorage.getItem('token') !=null){
	//		console.log("no hay busca en storage")
			_token = sessionStorage.getItem('token');
			return _token
		}

		return null;
	}

	isAuthenticated(){
		let payload = this.obtenerDatosToken(this.obtenerToken());
		if(payload !=null && payload.username && payload.username.length > 0){
	//		console.log("retorna true")
			return true;
		}

	//	console.log("retorna false")
		return false;
	}

	logout(){
		_token = null;
		_usuario = null
		sessionStorage.clear();
	}

	agregarAuthorizationHeader(){
		let headers = {
			'Content-Type': 'application/json'
		}

		//console.log(headers);
		let token = this.obtenerToken();
		if(token != null){
			let headers = {
			'Content-Type': 'application/json',
			'Authorization':'Bearer '+token,
		}
			//return headers["Authorization"] = 'Bearer ' + token;
			return headers;
		}
		return headers;
	}

	isNoAutorizado(e){
		if(e.status == 401){
			if(this.isAuthenticated()){
				this.logout();
			}
		}
		if(e.status == 401 || e.status == 403){

			return true;
		}

		return false;
	}

	hasPermiso(permiso){
		let usuario = this.obtenerUsuario();
		if(usuario.permisos.includes(permiso)){
			return true;
		}
		return false;
	}

	usuarioBloquear(username){
		return axios.get(`${BASE_API_URL}/api/planilla/user/bloqueado/${username}`,{headers: this.agregarAuthorizationHeader()});
	}

}

export default new LoginService();