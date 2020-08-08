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
                  ></v-text-field>
                </v-col>
                <!--                Comppany-->
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Название компании"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Город"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0" cols="12" md="12">
                  <v-text-field
                    hide-details
                    label="Адрес"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                auto parts-->
                <v-col class="pb-0" cols="12" md="12">
                  <Field :field="carParts" itemText="name" itemValue="id" label="Выберите автозапчасти"></Field>
                </v-col>
                <v-col class="pa-0 mt-4" cols="12">
                  <v-card :key="j" class="mb-4" elevation="5" v-for="(i,j) in test">
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
                  <v-btn class="mt-1" color="primary">Подтвердить</v-btn>
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
		this.addGroup()
	},
	data: () => ({
		carMaker: { items: [], value: [] },
		carModel: { items: [], value: [] },
		carParts: { items: [], value: [] },
		checkbox1: true,
		dialog: false,
		groups: [],
		indexes: [],
	}),
	methods: {
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
			console.log('CHTO', this.indexes)
			const result = await this.$API.car.model(carId)
			this.groups[fieldIndex].models.items = result.data
		},
		addGroup() {
			// const auto =  JSON.parse(JSON.stringify(this.carMaker))
			// const models =  JSON.parse(JSON.stringify(this.carModel))
			// console.log(auto)
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

