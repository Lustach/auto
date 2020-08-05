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
                <v-col cols="12" md="12" sm="6">
                  <v-select
                    :items="items1"
                    hide-details
                    label="Выберите модели"
                    multiple
                    v-model="value1"
                  >
                    <template v-slot:selection="{ item, index }">
                      <span style="white-space: pre" v-if="index===0 || index===1 || index===2 || index===3">
                        <span>{{ item }}{{index}}</span>
                        <span v-if="index<value1.length-1 && index !==3">, </span>
                      </span>
                      <span
                        class="grey--text caption"
                        v-if="index === 4"
                      >(+ ещё {{ value1.length - 4 }})</span>
                    </template>
                  </v-select>
                </v-col>
                <v-col class="pb-0" cols="12" md="12" sm="6">
                  <v-select
                    :items="items2"
                    label="Выберите автозапчасти"
                    multiple
                    v-model="value2"
                  >
                    <template v-slot:selection="{ item, index }">
                      <span style="white-space: pre" v-if="index===0 || index===1 || index===2 || index===3">
                        <span>{{ item }}{{index}}</span>
                        <span v-if="index<value2.length-1 && index !==3">, </span>
                      </span>
                      <span
                        class="grey--text caption"
                        v-if="index === 4"
                      >(+ ещё {{ value2.length - 4 }})</span>
                    </template>
                  </v-select>
                </v-col>
                <!--                <v-row>-->
                <v-col class="pa-0" cols="12">
                  <v-dialog max-width="344" persistent v-model="dialog">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue darken-1" dark small v-bind="attrs"
                             v-on="on">
                        <span class="caption text-none font-weight-medium">Добавить марку</span>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Добавление марки</v-card-title>
                      <v-card-text v-for="i in 3" :key="i">
                        <v-col cols="12" md="12" sm="6" >
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
                        <v-col cols="12" md="12" sm="6">
                          <v-select
                            :items="items1"
                            hide-details
                            label="Выберите модели"
                            multiple
                            v-model="value1"
                          >
                            <template v-slot:selection="{ item, index }">
                      <span style="white-space: pre" v-if="index===0 || index===1 || index===2 || index===3">
                        <span>{{ item }}{{index}}</span>
                        <span v-if="index<value1.length-1 && index !==3">, </span>
                      </span>
                              <span
                                class="grey--text caption"
                                v-if="index === 4"
                              >(+ ещё {{ value1.length - 4 }})</span>
                            </template>
                          </v-select>
                        </v-col>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false" color="error darken-2" text>Закрыть</v-btn>
                        <v-btn @click="dialog = false" color="green darken-2" text>Добавить</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <!--                  <router-link to="/">Добавить марку</router-link>-->
                </v-col>
                <v-col cols="12">
                  <v-checkbox hide-details label="Даю согласие на обработку данных" v-model="checkbox1"></v-checkbox>
                  <v-btn class="mt-1" color="primary">Подтвердить</v-btn>

                </v-col>
                <!--                  <v-col>-->
                <!--                  </v-col>-->
                <!--                </v-row>-->

              </v-row>
            </v-form>

          </v-card-text>
          <!--          <v-card-actions>-->
          <!--            <v-btn-->
          <!--              color="deep-purple accent-4"-->
          <!--              text-->
          <!--            >-->
          <!--              Learn More-->
          <!--            </v-btn>-->
          <!--          </v-card-actions>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
	name: 'SignUp',

	data: () => ({
		items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar', 'foobar1', 'foobar2'],
		value: '',
		items1: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar', 'foobar', 'foobar1', 'foobar2'],
		value1: ['foo', 'bar'],
		items2: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
		value2: ['foo', 'bar'],
		checkbox1: true,
		dialog: false,
	}),
}
</script>

