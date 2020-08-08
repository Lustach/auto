<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!--        <v-img src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"></v-img>-->
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div class="headline text--primary">Регистрация поставщика</div>
            <p>Введите данные вашей компании, чтобы зарегестрироваться в боте для получения доступа к заказам.</p>
            <v-form>
              <v-row>
                <!--                FIO-->
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="ФИО"
                    outlined
                    v-model="full_name"
                  ></v-text-field>
                </v-col>
                <!--                Comppany-->
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Название компании"
                    outlined
                    v-model="company_name"
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Город"
                    outlined
                    v-model="city_name"
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0" cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Адрес"
                    outlined
                    v-model="address"
                  ></v-text-field>
                </v-col>
                <!--                auto parts-->
                <v-col class="pb-0" cols="12" md="12">
                  <Field :field="carParts" itemText="name" itemValue="id" label="Выберите автозапчасти"></Field>
                </v-col>
                <v-col class="pa-0 mt-4" cols="12">
                  <v-card :key="j" class="mb-4" elevation="5" v-for="(i,j) in groups">
                    <v-card-text>
                      <div class="text-h6" style="display:flex;" v-if="j>0">
                        <v-spacer></v-spacer>
                        <v-btn @click="deleteGroup(j)" icon>
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <Field :field="i.auto" :iconInItem="true" :multiple="false" label="Выберите автомобиль"></Field>
                      <Field :auto="i.auto" :disabled="true" :field="i.models" @getModel="getModel($event,j)" @selectAll="selectAll($event,j)" label="Выберите модели"></Field>
                    </v-card-text>
                  </v-card>
                  <v-btn :disabled="disabled" @click="addGroup" color="primary" small>
                    <span class="caption text-none font-weight-medium">Добавить марку</span>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-checkbox hide-details label="Даю согласие на обработку данных" v-model="checkbox1"></v-checkbox>
                  <v-btn @click="submit" class="mt-1" color="primary">Подтвердить</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
	name: 'SignUp',
	components: {
		'Field': () => import('@/components/Field.vue')
	},
	async mounted() {
		try {
			await Promise.all([this.$API.car.parts(), this.$API.car.maker()]).then(values => {
				this.carParts.items = values[0].data.slice()
				this.carMaker.items = values[1].data.slice()
				// this.carModel.items = values[2].data.slice()
			})
		} catch (e) {
			console.error(e, 'error')
		}
		this.addGroup()
	},
	data: () => ({
		full_name: '',
		company_name: '',
		city_name: '',
		address: '',
		carMaker: { items: [], value: [] },
		carModel: { items: [], value: [] },
		carParts: { items: [], value: [] },
		checkbox1: true,
		dialog: false,
		groups: [],
		indexes: [],
	}),
	methods: {
		submit() {
			const payload = {
				full_name: this.full_name,
				company_name: this.company_name,
				city_name: this.city_name,
				address: this.address,
				wt_list: this.carParts.value,
				carmodel_list: this.groups.reduce(e => e.models.value)
			}
			console.log(this.carParts.value, 'thisssss')
			this.$API.car.addUser(payload)
		},
		async getModel(carId, fieldIndex) {
			this.indexes[fieldIndex] = carId
			// for (let i = 0; i < this.groups.length; i++) {
			// 	if (this.groups) {
			// 		console.log(this.groups[i].auto.items,this.indexes[fieldIndex])
			// 		if (this.groups[i].auto.items.id === this.indexes[fieldIndex]) {
			// 			console.log('popalos')
			// 		}
			// 	}
			// }
			// if (this.indexes.length > 0) {
			// 	this.groups.forEach(e => {
			// 		console.log(e,'EHE')
			// 	})
			// }
			// todo вроде получилось ниже
			// console.log(this.carMaker.items.filter((e, i) => {
			// 	console.log(e, i, 'carMaker')
			// 	return this.indexes.find(el => {
			// 		console.log(el === e.id, 'find')
			// 		return el !== e.id
			// 	})
			// }), 'this.carMaker')
			this.groups.forEach((e, i) => {
				if (!this.indexes[i])
					e.auto.items = JSON.parse(JSON.stringify(this.carMaker.items.filter((e, i) => {
						console.log(e, i, 'carMaker')
						return this.indexes.find(el => {
							console.log(el === e.id, 'find')
							return el !== e.id
						})
					})))
				console.log(e.auto.items, 'lolol')
			})
			// for (let i = 0; i < this.indexes.length; i++) {
			// 	if (this.indexes[i]) {
			// 		console.log(this.indexes[i])
			// 		this.groups.forEach((e, index) => {
			// 			console.log(e.auto.items[index], this.indexes[i], 'YES')
			// 			if (e.auto.items[index].id === this.indexes[i]) {
			// 				e.auto.items.splice(index, 1)
			// 				console.log(this.groups, 'E')
			// 			}
			// 		})
			// 	}
			// }
			// todo восстановление
			// for (let i = 0; i < this.indexes.length; i++) {
			// 	if (this.indexes[i]) {
			// 		console.log(this.indexes[i])
			// 		this.groups.forEach((e, index) => {
			// 			console.log(e.auto.items[index], this.indexes[i], 'YES')
			// 			if (e.auto.items[index].id === this.indexes[i]) {
			// 				e.auto.items.splice(index, 1)
			// 				console.log(this.groups, 'E')
			// 			}
			// 		})
			// 	}
			// }
			console.log('CHTO', this.groups)
			const result = await this.$API.car.model(carId)
			this.groups[fieldIndex].models.items = result.data
		},
		addGroup() {
			this.groups.push({
				auto: JSON.parse(JSON.stringify(this.carMaker)),
				models: JSON.parse(JSON.stringify(this.carModel))
			})
		},
		deleteGroup(index) {
			this.groups.splice(index, 1)
		},
		selectAll(e, index) {
			console.log(index, e, 'EJ')
		}
	},
	computed: {
		disabled: (vm) => {
			if (vm.groups.length !== 0) {
				for (let i = 0; i < vm.groups.length; i++) {
					if (vm.groups[i].auto.value === 0) {
						return true
					}
				}
			}
			return false
		},
		test: (vm) => {
			console.warn('hmm')
			return vm.groups
		}
	},
	// watch: {
	// 	groups: {
	// 		handler: function () {
	//
	// 			if (this.groups.length !== 0) {
	// 				for (let i = 0; i < this.groups.length; i++) {
	// 					// this.groups[i].auto.items.filter(e => {
	// 					// 	return e.id===0
	// 					// })
	// 				}
	// 				console.log(this.groups, 'THIs.groups')
	// 			}
	// 			console.log(this.groups, 'handler')
	// 		},
	// 		deep: true
	// 	}
	// }
}
</script>

