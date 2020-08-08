import axios from 'axios'

const BASE_URL = 'http://195.69.187.126:8085'
// const token = process.env.VUE_APP_KEY
//смотреть в экспорт!!
const API = {
	car:{
		maker:()=>axios.get(`${BASE_URL}/car_maker`),
		model:(id)=>axios.get(`${BASE_URL}/car_model?carmaker_id=${id}`),
		parts:()=>axios.get(`${BASE_URL}/work_type`),
		addUser:(data)=>axios.post(`${BASE_URL}/add_user`,{
			params:{data: data}
		})
	},
	record: {
		getData: () => axios.get(`${BASE_URL}/api/records`)
		// chart: {
		//   getTopArtists: (page?: number, limit?: number) => axios.get(`${BASE_URL}?method=chart.gettopartists&api_key=${token}&format=json`,
		//     { params: { page: page, limit: limit } }),
		//   getTopTracks: (page?: number, limit?: number) =>
		//     axios.get(`${BASE_URL}?method=chart.gettoptracks&api_key=${token}&format=json`),
		// },
	},
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
