<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!--        <v-img src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"></v-img>-->
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div class="headline text--primary">Регистрация поставщика</div>
            <p>Введите данные вашей компании, чтобы зарегестрироваться в боте для получения доступа к заказам.</p>
            <!--            ref="form" v-model="valid"-->
            <v-form ref="form" v-model="valid">
              <v-row>
                <!--                FIO-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.fullName"-->
                  <!--                  <v-text-field-->
                  <!--                    :rules="rules.fullName"-->
                  <!--                    hide-details="auto"-->
                  <!--                    label="ФИО"-->
                  <!--                    outlined-->
                  <!--                    required-->
                  <!--                    v-model="fullName"-->
                  <!--                  ></v-text-field>-->
                </v-col>
                <!--                Comppany-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.companyName"-->
                  <v-text-field
                    :rules="rules.companyName"
                    hide-details="auto"
                    label="Название компании"
                    outlined
                    required
                    v-model="companyName"
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.cityName"-->
                  <v-text-field
                    :rules="rules.cityName"
                    hide-details="auto"
                    label="Город"
                    outlined
                    required
                    v-model="cityName"
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.address"-->
                  <v-text-field
                    :rules="rules.address"
                    hide-details="auto"
                    label="Адрес"
                    outlined
                    required
                    v-model="address"
                  ></v-text-field>
                </v-col>
                <!--                auto parts-->
                <v-col class="pb-0" cols="12" md="12">
                  <Field :field="carParts" label="Выберите автозапчасти"></Field>
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
                  <v-layout align-center>
                    <v-checkbox class="mt-0 pt-0" hide-details v-model="checkbox"></v-checkbox>
                    <a href="https://telegra.ph/Soglasie-na-obrabotku-dannyh-08-09" target="_blank">Даю согласие на обработку данных</a>
                  </v-layout>
                  <!--                  :disabled="!valid"-->
                  <v-btn :disabled="!valid || !checkbox" @click="submit" class="mt-1" color="primary">Подтвердить</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <!--            {{rules[0]}}-->
            <!--            <v-select :items="items1" :rules="rules" clearable multiple v-model="value1"></v-select>-->
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
		console.log(this.$route)
		try {
			await Promise.all([this.$API.car.parts(), this.$API.car.maker()]).then(values => {
				this.carParts.items = values[0].data.slice()
				this.carMaker.items = values[1].data.slice()
				// this.carModel.items = values[2].data.slice()
			})
		} catch (e) {
			console.error(e, 'error')
		}
		this.carMakerLength = this.carMaker.items.length
		this.addGroup()
	},
	data: () => ({
		valid: true,
		rules: {
			// fullName: [
			// 	v => !!v || 'Не может быть пустым',
			// 	// v => (v && v.length <= 10) || 'Name must be less than 10 characters',
			// ],
			companyName: [
				v => !!v || 'Не может быть пустым',
			],
			cityName: [
				v => !!v || 'Не может быть пустым',
			],
			address: [
				v => !!v || 'Не может быть пустым',
			],
		},
		// fullName: '',
		companyName: '',
		cityName: '',
		address: '',
		carMaker: { items: [], value: [] },
		carMakerLength: 0,
		carModel: { items: [], value: [] },
		carParts: { items: [], value: [] },
		checkbox: false,
		dialog: false,
		groups: [],
		indexes: [],
	}),
	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				let test = []
				console.log(this.groups, 'ALLLLO')
				this.groups.forEach(e => {
					test.push(...e.models.value)
				})
				const payload = {
					// full_name: this.fullName,
					company_name: this.companyName,
					city_name: this.cityName,
					address: this.address,
					wt_list: this.carParts.value,
					carmodel_list: test,
					user_id: this.$route.params.id
				}
				try {
					await this.$API.car.addUser(payload)
          alert('Регистрация прошла успешно')
				} catch {
          console.error('error')
				}
			}
		},
		async getModel(carId, fieldIndex) {
			console.log('indexes')
			this.indexes[fieldIndex] = carId
			if (this.indexes.length > 0) this.carMaker.items.splice(0, 1)
			// todo вроде получилось
			this.groups.forEach((e, i) => {
				if (!this.indexes[i]) {
					e.auto.items = JSON.parse(JSON.stringify(this.carMaker.items.filter((e, i) => {
						console.log(e, i, 'carMaker')
						return this.indexes.find(el => {
							console.log(el === e.id, 'find')
							return el !== e.id
						})
					})))
				}
				console.log(e.auto.items, 'lolol')
			})
			this.groups[fieldIndex].models.value = []
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
			this.groups[index].models.value = []
			console.log(index, e, this.groups[index].models.value, 'EJ')
			this.groups[index].models.value.push(0)
			// this.groups[index].auto
		}
	},
	computed: {
		disabled: (vm) => {
			// const carMaker = JSON.parse(JSON.stringify(vm.carMaker.items))
			// check
			if (vm.groups.length === vm.carMakerLength - 1) {
				return true
			}
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

