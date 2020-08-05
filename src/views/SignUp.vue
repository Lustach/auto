<template>
  <v-container>

    <v-row class="text-center">
      <v-col cols="12">
        <!--        <v-img src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"></v-img>-->
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <div class="headline text--primary">Регистрация поставщика</div>
            <p>
              Введите данные вашей компании, чтобы зарегестрироваться в боте для получения доступа к заказам.
              <!--              be•nev•o•lent-->
            </p>
            <v-form>
              <v-row>
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="ФИО"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Название компании"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Город"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" md="12" sm="6">
                  <v-text-field
                    hide-details
                    label="Адрес"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" md="12" sm="6">
                  <v-select
                    :items="items2"
                    hide-details
                    label="Выберите автозапчасти"
                    multiple
                    v-model="value2"
                  >
                    <template v-slot:selection="{ item, index }">
                      <span style="white-space: pre" v-if="index===0 || index===1">
                        <span>{{ item }}</span>
                        <span v-if="index<value2.length-1 && index !==2">, </span>
                      </span>
                      <span
                        class="grey--text caption"
                        v-if="index === 2"
                      >(+ ещё {{ value2.length - 2 }})</span>
                    </template>
                  </v-select>
                </v-col>
                <v-col class="pa-0" cols="12">
                  <v-card class="mb-4 mt-4" elevation="5">
                    <v-card-text>
                      <v-col cols="12" md="12" sm="6">
                        <v-select
                          :items="items"
                          hide-details
                          label="Выберите автомобиль"
                          v-model="value"
                        >
                          <template v-slot:item="{ item}">
                            <div style="display: flex;align-items: center ">
                              <v-img class="mr-1"
                                     height="25px"
                                     src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"
                                     width="25px"
                              ></v-img>
                              <span>{{ item }}</span>
                            </div>
                          </template>
                          <template v-slot:selection="{ item}">
                            <div style="display: flex;align-items: center ">
                              <v-img class="mr-1"
                                     height="25px"
                                     src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"
                                     width="25px"
                              ></v-img>
                              <span>{{ item }}</span>
                            </div>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col class="pt-0" cols="12" md="12" sm="6">
                        <v-select
                          :items="items1"
                          hide-details
                          label="Выберите модели"
                          multiple
                          v-model="value1"
                        >
                          <template v-slot:selection="{ item, index }">
                      <span style="white-space: pre" v-if="index===0 || index===1">
                        <span>{{ item }}</span>
                        <span v-if="index<value1.length-1 && index !==2">, </span>
                      </span>
                            <span
                              class="grey--text caption"
                              v-if="index === 3"
                            >(+ ещё {{ value1.length - 3 }})</span>
                          </template>
                        </v-select>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!--group-->
                <v-col class="pa-0" cols="12">
                  <v-card :key="j" class="mb-4" elevation="5" v-for="(i,j) in groups">
                    <v-card-text>
                      <div class="text-h6" style="display:flex;">
                        <v-spacer></v-spacer>
                        <v-btn @click="deleteGroup(j)" icon>
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <v-col class="pt-0" cols="12" md="12" sm="6">
                        <v-select
                          :items="i.auto.items"
                          hide-details
                          label="Выберите автомобиль"
                          v-model="i.auto.value"
                        >
                          <template v-slot:item="{ item}">
                            <div style="display: flex;align-items: center ">
                              <v-img class="mr-1"
                                     height="25px"
                                     src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"
                                     width="25px"
                              ></v-img>
                              <span>{{ item }}</span>
                            </div>
                          </template>
                          <template v-slot:selection="{ item}">
                            <div style="display: flex;align-items: center ">
                              <v-img class="mr-1"
                                     height="25px"
                                     src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png"
                                     width="25px"
                              ></v-img>
                              <span>{{ item }}</span>
                            </div>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col class="pt-0" cols="12" md="12" sm="6">
                        <v-select
                          :items="i.models.items"
                          hide-details
                          label="Выберите модели"
                          multiple
                          v-model="i.models.value"
                        >
                          <template v-slot:selection="{ item, index }">
                            <span style="white-space: pre" v-if="index===0 || index===1">
                              <span>{{ item }}</span>
                              <span v-if="index<i.models.value.length-1 && index !==2">, </span>
                            </span>
                            <span
                              class="grey--text caption"
                              v-if="index === 3"
                            >(+ ещё {{ i.models.value.length - 3 }})</span>
                          </template>
                        </v-select>
                      </v-col>
                    </v-card-text>
                  </v-card>
                  <v-btn @click="addGroup" color="blue darken-1" dark
                         small>
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

	data: () => ({
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
		groups: []
	}),
	methods: {
		addGroup() {
			this.groups.push({
				auto: { items: ['рено', 'ауди', 'лада', 'уаз', 'шевроле', 'ланос', 'бмв', 'гелик'], value: '' },
				models: { items: ['модель1', 'модель2', 'модель3', 'модель4', 'модель5', 'модель6'], value: [] }
			})
		},
		deleteGroup(index) {
			this.groups.splice(index, 1)
		}
	},
}
</script>

