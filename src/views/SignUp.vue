<template>
  <v-container>
    <!--    {{groups}}}-->
    <v-row class="text-center">
      <v-col cols="12">
        <!--        <v-img src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"></v-img>-->
        <v-card class="mx-auto" max-width="364">
          <v-card-text>
            <div class="d-inline-flex justify-center">
              <v-img height="50" src="@/../public/11.png" width="50"/>
            </div>
            <div class="headline text--primary">Регистрация поставщика</div>
            <p class="mb-1">Введите данные вашей компании, чтобы получить доступ к заказам.</p>

            <!--            ref="form" v-model="valid"-->
            <v-form ref="form" v-model="valid">
              <v-row>
                <!--                FIO-->
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.fullName"-->
                  <v-text-field
                    :disabled="disabledSettings"
                    :rules="rules.fullName"
                    hide-details="auto"
                    label="Введите ваше ФИО"
                    outlined
                    required
                    v-model="fullName"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.fullName"-->
                  <v-text-field
                    disabled
                    hide-details="auto"
                    label="Ваш номер телефона"
                    outlined
                    v-model="phoneNumber"
                  ></v-text-field>
                </v-col>
                <!--                Comppany-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.companyName"-->
                  <v-text-field
                    :disabled="disabledSettings"
                    :rules="rules.companyName"
                    hide-details="auto"
                    label="Введите Название компании"
                    outlined
                    required
                    v-model="companyName"
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.cityName"-->
                  <v-text-field
                    :disabled="disabledSettings"
                    :rules="rules.cityName"
                    hide-details="auto"
                    label="Введите Город"
                    outlined
                    required
                    v-model="cityName"
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0" cols="12" md="12">
                  <!--                  :rules="rules.address"-->
                  <v-text-field
                    :disabled="disabledSettings"
                    :rules="rules.address"
                    hide-details="auto"
                    label="Введите Адрес склада"
                    outlined
                    required
                    v-model="address"
                  ></v-text-field>
                </v-col>
                <!--                auto parts-->
                <v-col class="pb-0" cols="12" md="12">
                  <Field :field="carParts" label="Выберите автозапчасти" ref="carParts"></Field>
                </v-col>
                <v-col class="pb-0" cols="12" md="12">
                  <v-layout align-center justify-space-around>

                    <v-checkbox :rules="[this.buAuto || this.newAuto]" class="mt-0 pt-0" hide-details label="Б/у" v-model="buAuto"></v-checkbox>
                    <v-checkbox :rules="[this.buAuto || this.newAuto]" class="mt-0 pt-0" hide-details label="Новые" v-model="newAuto"></v-checkbox>
                  </v-layout>
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
                      <Field :field="i.auto" :iconInItem="true" :key="i.auto.items[j].id" :multiple="false"
                             @getModel="getModel($event,j)" label="Выберите автомобиль" @clearModelValue="clearModelValue($event,j)">
                      </Field>
                      <Field :auto="i.auto" :disabled="true" :field="i.models" :key="i.models[j]" :multiple="true" @getModel="getModel($event,j)" @selectAll="selectAll($event,j)"
                             label="Выберите модели"
                             ref="modelField"></Field>
                    </v-card-text>
                  </v-card>
                  <v-btn :disabled="disabled" @click="addGroup" color="primary" small>
                    <span class="caption text-none font-weight-medium">Добавить марку авто</span>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-layout align-center class="pb-2" justify-center v-if="this.$route.meta === 'registration'">
                    <v-checkbox class="mt-0 pt-0" hide-details v-model="checkbox"></v-checkbox>
                    <a href="https://telegra.ph/Soglasie-na-obrabotku-dannyh-08-09" target="_blank">Даю согласие на обработку данных</a>
                  </v-layout>
                  <v-btn :disabled="!valid || !checkbox" @click="submit" class="mt-1" color="primary">Сохранить</v-btn>
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
import Field from "../components/Field"

export default {
	name: 'SignUp',
	components: {
		'Field': Field
		// 'Field': () => import('@/components/Field.vue')
	},
	async mounted() {
		if (this.$route.meta === 'registration') {
			try {
				await Promise.all([this.$API.car.parts(), this.$API.car.maker(), this.$API.car.phone(this.$route.params.id)]).then(values => {
					this.carParts.items = values[0].data.slice()
					this.carMaker.items = values[1].data.slice()
					this.phoneNumber = values[2].data.phone
				})
				this.addGroup()
			} catch (e) {
				console.error(e, 'error')
			}
		}
		if (this.$route.meta === 'settings') {
			try {
				this.checkbox=true
				this.carMaker.items = (await this.$API.car.maker()).data.slice()
				const result = (await this.$API.settings.getUser(this.$route.params.id)).data
				this.fullName = result.name
				this.companyName = result.name
				this.phoneNumber = result.phone
				this.cityName = result.city_name
				this.address = result.address
        this.buAuto=result.type_detail.used_detail
        this.newAuto=result.type_detail.new_detail
				this.carParts.items = result.work_type
				this.carParts.value = result.work_type.filter(e => e.checked ? e.id : null)
				// result.car_list
				// this.$set(this.field.value, index, '')

				for (let i = 0; i < result.car_list.length; i++) {
					this.addGroup()
					this.groups[i].auto.value = result.car_list[i].carmaker_id
					this.groups[i].models.items = result.car_list[i].items
					// result.car_list[i].items.map((e, j) => e.checked ? this.$set(this.groups[i].models.value, j, e.id) : this.$set(this.groups[i].models.value, j, null))
					// this.$set(this.groups[i].models.value,i,result.car_list[i].items.map(e => e.checked ? e.id : null))
					this.groups[i].models.value = result.car_list[i].items.map(e => e.checked ? e.id : '')
					// this.$set(this.groups[i].auto.value,i,result.car_list[i].carmaker_id)
				}
				// console.log(result.car_list.length,'length')
				// console.log(result.work_type.map(e=>e.checked===true ? e.id: ''),'result.work_type.filter(e=>e.checked)')
				// console.log(result.data)
			} catch (e) {
				console.error(e, 'error')
			}
			// todo: так как я делал динамический импорт, то некст тик не работал, при обычном импорте работает, разобраться почему!
			this.$nextTick(function () {
				// console.log(        this.$refs.carParts,'shit')
				this.$refs.carParts.accept()
				this.$refs.modelField.forEach(e => e.accept())
			})
			// this.$refs.modelField[0]
			// this.carParts.value=this.carParts.items
		}
		this.carMakerLength = this.carMaker.items.length
	},
	data: () => ({
		valid: true,
		rules: {
			fullName: [
				v => !!v || 'Не может быть пустым',
			],
			companyName: [
				v => !!v || 'Не может быть пустым',
			],
			cityName: [
				v => !!v || 'Не может быть пустым',
			],
			address: [
				v => !!v || 'Не может быть пустым',
			],
			buAuto: [
				v => !!v || 'Не может быть пустым',
			],
			newAuto: [
				v => !!v || 'Не может быть пустым',
			]
		},
		fullName: '',
		companyName: '',
		phoneNumber: '',
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
		buAuto: false,
		newAuto: false,
	}),
	methods: {
		clearModelValue(e,index){
      this.groups[index].models.value=[]
    },
		async submit() {
			if (this.$refs.form.validate()) {
				let test = []
				this.groups.forEach(e => {
					if (e)
						test.push(...e.models.value)
				})
				const payload = {
					full_name: this.fullName,
					company_name: this.companyName,
					city_name: this.cityName,
					address: this.address,
					wt_list: this.carParts.value.filter(e => e),
					carmodel_list: test,
					user_id: this.$route.params.id,
					state_auto: { buAuto: this.buAuto, newAuto: this.newAuto },
					phone_number: this.phone_number
				}
				try {
					await this.$API.car.addUser(payload)
					alert('Регистрация прошла успешно')
					this.resetForm()
				} catch {
					alert('Произошла ошибка')
					console.error('error')
				}
			}
		},
		resetForm() {
			this.$refs.form.reset()
		},
		async getModel(carId, fieldIndex) {
			if (!carId && this.groups.length === 1) {
				console.log(1)
				this.groups.forEach(e => e.auto.items = JSON.parse(JSON.stringify(this.carMaker.items)))
				return
			}
			// вернуть
			// if (this.groups[fieldIndex].models.value.indexOf(0) !== -1) {
			// 	this.groups[fieldIndex].models.value = []
			// 	console.log(2)
			// }
			this.indexes[fieldIndex] = carId
			if (this.indexes.length > 0) {
				console.log(3,fieldIndex,carId)
				for (let i = 0; i < this.groups.length; i++) {
					this.groups[i].auto.items = JSON.parse(JSON.stringify(this.carMaker.items.filter(e => e.id)))
				}
			// this.groups[fieldIndex].models.value=[]
			}
			//вернуть
			// else {
			// 	console.log(4)
			// 	for (let i = 0; i < this.groups.length; i++) {
			// 		this.groups[i].auto.items = JSON.parse(JSON.stringify(this.carMaker.items))
			// 	}
			// }
			if (this.indexes.filter(e => e === carId).length > 1) {
				console.log(5)
				this.groups.splice(fieldIndex, 1)
				this.indexes.splice(fieldIndex, 1)
				return
			}
			// todo
			const result = await this.$API.car.model(carId)
			this.groups[fieldIndex].models.items = result.data
			// }
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
			this.groups[index].models.value.push(0)
		}
	},
	computed: {
		disabled: (vm) => {
			if (vm.groups.length === vm.carMakerLength) {
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
		disabledSettings: (vm) => {
			return vm.$route.meta === 'settings'
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

