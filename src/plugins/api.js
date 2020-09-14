import axios from 'axios'

// axios.create({
// 	timeout: 30000,
// 	headers: {
// 		'Access-Control-Allow-Origin': '*',
// 		'Content-Type': 'application/json',
// 		'Accept': 'application/json',
// 	}
// })

const BASE_URL = 'http://195.69.187.72:8080/api/v1'
// const token = process.env.VUE_APP_KEY
//смотреть в экспорт!!
const API = {
	car:{
		maker:()=>axios.get(`http://195.69.187.153:8080/api/v1/car_maker`),
		model:(id)=>axios.get(`${BASE_URL}/car_model?carmaker_id=${id}`),
		addUser:(data)=>axios.post(`http://195.69.187.153:8080/api/v1/company-add`, data),
		parts:()=>axios.get(`${BASE_URL}/work_type`),
		phone:(id)=>axios.get(`${BASE_URL}/get_user?user_id=${id}`),
	},
	status:{
		directorStatus:()=>axios.get(`http://195.69.187.153:8080/api/v1/director_status`)
	},
	settings:{
		getUser:(id)=>axios.get(`http://195.69.187.153:8080/api/v1/get_user?token=${id}`),
		getCompanyInfo:(id)=>axios.get(`http://195.69.187.153:8080/api/v1/get_company_info?token=${id}`),
		updateUser:(data)=>axios.post(`http://195.69.187.153:8080/api/v1/company-update`, data),
	},
	// record: {
		// getData: () => axios.get(`${BASE_URL}/api/records`)
		// chart: {
		//   getTopArtists: (page?: number, limit?: number) => axios.get(`${BASE_URL}?method=chart.gettopartists&api_key=${token}&format=json`,
		//     { params: { page: page, limit: limit } }),
		//   getTopTracks: (page?: number, limit?: number) =>
		//     axios.get(`${BASE_URL}?method=chart.gettoptracks&api_key=${token}&format=json`),
		// },
	// },
	// user: {
	// 	login: (email: string, password: string) => axios.post(`${BASE_URL}/user/login`,
	// 		{ email: email, password: password }),
	// 	signUp: (username: string, email: string, password: string) => axios.post(`${BASE_URL}/user/signup`,
	// 		{ email: email, password: password, username: username })
	// }
}

export default {
	install(Vue) {
		// console.log(process.env.VUE_APP_KEY)
		Object.defineProperty(Vue.prototype, '$API', { value: API })
	}
}
