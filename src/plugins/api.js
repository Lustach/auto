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
		maker:()=>axios.get(`${BASE_URL}/car_maker`),
		model:(id)=>axios.get(`${BASE_URL}/car_model?carmaker_id=${id}`),
		addUser:(data)=>axios.post(`${BASE_URL}/company-add`, data),
		phone:(id)=>axios.get(`${BASE_URL}/get_user?user_id=${id}`),
	},
	status:{
		directorStatus:()=>axios.get(`${BASE_URL}/director_status`)
	},
	settings:{
		getUser:(id)=>axios.get(`${BASE_URL}/get_company_info?id=${id}`),
		updateUser:(data)=>axios.post(`${BASE_URL}/company-update`, data),
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
