<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        {{groups}}
        <!--        <v-img src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"></v-img>-->
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div class="headline text--primary">Регистрация поставщика</div>
            <p>Введите данные вашей компании, чтобы зарегестрироваться в боте для получения доступа к заказам.</p>
            <v-form>
              <v-row>
                <!--                FIO-->
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="ФИО"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                Comppany-->
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Название компании"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Город"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0" cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Адрес"
                    outlined
                  ></v-text-field>
                </v-col>
                <!--                auto parts-->
                <v-col class="pb-0" cols="12" md="12" sm="6">
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
                      <Field :field="i.auto" :iconInItem="true" label="Выберите автомобиль" :multiple="false"></Field>
                      <Field :disabled="true" :auto="i.auto" :field="i.models" label="Выберите модели"></Field>
                    </v-card-text>
                  </v-card>
                  <v-btn @click="addGroup" color="blue darken-1" dark small>
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
		console.log(this.$API, 'api')
		try {
			await Promise.all([this.$API.car.parts(), this.$API.car.maker(), this.$API.car.model(1)]).then(values => {
				this.carParts.items = values[0].data.slice()
				this.carMaker.items = values[1].data.slice()
				this.carModel.items = values[2].data.slice()
				console.log(values, 'values')
				console.log(typeof values[0].data, typeof values[1].data, typeof values[2].data, 'lol')
			})
		} catch (e) {
			console.error(e, 'error')
		}
		console.log('hm')
		this.addGroup()
		this.addGroup()
	},
	data: () => ({
		carMaker: { items: [], value: [] },
		carModel: { items: [], value: [] },
		carParts: { items: [], value: [] },
		items: ['рено', 'ауди', 'лада', 'уаз', 'шевроле', 'ланос', 'бмв', 'гелик'],
		value: '',
		items1: ['модель1', 'модель2', 'модель3', 'модель4', 'модель5', 'модель6', 'модель7', 'модель8'],
		value1: [],
		// 'модель1', 'модель1'
		items2: ['модель1', 'модель2', 'модель3', 'модель4', 'модель5', 'модель6'],
		value2: [],
		// 'модель1', 'модель2'
		checkbox1: true,
		dialog: false,
		groups: [],
	}),
	methods: {
		addGroup() {
			console.log('addGroup')
			// const auto =  JSON.parse(JSON.stringify(this.carMaker))
			// const models =  JSON.parse(JSON.stringify(this.carModel))
			// console.log(auto)
			console.log(this.carModel, 'this.carModel', this.carMaker, 'this.carMaker')
			this.groups.push({
				auto: JSON.parse(JSON.stringify(this.carMaker)),
				models: JSON.parse(JSON.stringify(this.carModel))
			})
		},
		deleteGroup(index) {
			this.groups.splice(index, 1)
		}
	},
	computed: {
		disabled: vm => {
			console.log(vm)
			return true
		}
	},
}
</script>

