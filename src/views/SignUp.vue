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
            <div v-if="$route.meta === 'registration'" class="headline text--primary">Регистрация поставщика двигателей</div>
            <div v-else class="headline text--primary">Настройки аккаунта</div>
            <p v-if="$route.meta === 'registration'" class="mb-1">Введите данные вашей компании, чтобы получить доступ к заказам.</p>
            <p v-else class="mb-1">Отредактируйте данные вашей компании</p>
            <!--            ref="form" v-model="valid"-->
            <v-form ref="form" v-model="valid">
              <v-row>
                <!--                FIO-->
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.fullName"-->
                  <v-text-field
                      v-model="fullName"
                      :disabled="disabledSettings"
                      :rules="rules.fullName"
                      label="Введите ваше ФИО"
                      outlined
                      required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.fullName"-->
                  <v-text-field
                      v-model="phoneNumber"
                      disabled
                      label="Ваш номер телефона"
                      outlined
                  ></v-text-field>
                </v-col>
                <!--                Comppany-->
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.companyName"-->
                  <v-text-field
                      v-model="companyName"
                      :disabled="disabledSettings"
                      :rules="rules.companyName"
                      label="Введите Название компании"
                      outlined
                      required
                  ></v-text-field>
                </v-col>
                <!--                City-->
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.cityName"-->
                  <v-text-field
                      v-model="cityName"
                      :disabled="disabledSettings"
                      :rules="rules.cityName"
                      label="Введите Город"
                      outlined
                      required
                  ></v-text-field>
                </v-col>
                <!--                Adress-->
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <!--                  :rules="rules.address"-->
                  <v-text-field
                      v-model="address"
                      :disabled="disabledSettings"
                      :rules="rules.address"
                      label="Введите Адрес склада"
                      outlined
                      required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0 pt-1" cols="12" md="12">
                  <Field v-if="$route.meta==='registration'" ref="status" :disabled="disabledSettings" :field="status" :multiple="false" label="Ваша должность"></Field>
                  <v-text-field v-else v-model="status.items.name" :disabled="disabledSettings" class="px-3 pt-0"></v-text-field>
                  <Field ref="carParts" :field="carParts" label="Выберите автозапчасти"></Field>
                  <Field ref="carMaker" :field="carMaker" :iconInItem="true" label="Выберите марки"></Field>
                </v-col>
                <v-col v-if="!disabledSettings" class="pb-0 pt-1 px-6" cols="12" md="12">
                  <v-textarea v-model="about" :rules="rules.about" auto-grow label="Откуда о нас узнали" no-resize row-height="24px" rows="1"></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-layout v-if="this.$route.meta === 'registration'" align-center class="pb-2" justify-center>
                    <v-checkbox v-model="checkbox" class="mt-0 pt-0" hide-details></v-checkbox>
                    <a href="https://telegra.ph/Soglasie-na-obrabotku-dannyh-08-09" target="_blank">Даю согласие на обработку данных</a>
                  </v-layout>
                  <v-btn :disabled="!valid || !checkbox" class="mt-1" color="primary" @click="submit">Сохранить</v-btn>
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
        await Promise.all([this.$API.car.maker(), this.$API.settings.getUser(this.$route.params.id),
          this.$API.status.directorStatus(), this.$API.car.parts()]).then(values => {
          this.carMaker.items = values[0].data.slice()
          this.phoneNumber = values[1].data.phone
          this.status.items = values[2].data
          this.carParts.items = values[3].data.slice()
        })
      } catch (e) {
        console.error(e, 'error')
      }
    }
    if (this.$route.meta === 'settings') {
      try {
        this.checkbox = true
        const result = (await this.$API.settings.getCompanyInfo(this.$route.params.id)).data
        this.fullName = result.name
        this.companyName = result.name
        this.phoneNumber = result.phone
        this.cityName = result.city_name
        this.address = result.address
        this.carMaker.items = result.car_list
        this.carMaker.value = result.car_list.map(e => e.checked === true ? e.id : '')
        this.status.items = {}
        this.status.items = { id: 1, name: result.director_status }
        this.status.value = this.status.items.name
        this.carParts.items = result.work_type
        this.carParts.value = result.work_type.map(e => e.checked ? e.id : null)
      } catch (e) {
        console.error(e, 'error')
      }
    }
    this.$nextTick(function () {
      this.$refs.carParts.accept()
    })
  },
  data: () => ({
    valid: true,
    rules: {
      fullName: [v => !!v || 'Не может быть пустым',],
      companyName: [v => !!v || 'Не может быть пустым',],
      cityName: [v => !!v || 'Не может быть пустым',],
      address: [v => !!v || 'Не может быть пустым'],
      about: [v => !!v || 'Не может быть пустым',]
    },
    fullName: '',
    companyName: '',
    phoneNumber: '',
    cityName: '',
    address: '',
    carMaker: { items: [], value: [] },
    status: { items: [], value: [], },
    carParts: { items: [], value: [] },
    // status: { items: [{ id: 1, name: 'Генеральный директор/собственник' }, { id: 2, name: 'Менеджер по продажам' }], value: [], },
    about: '',
    checkbox: false,
    dialog: false,
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const payload = {
          full_name: this.fullName,
          company_name: this.companyName,
          city_name: this.cityName,
          address: this.address,
          user_token: this.$route.params.id,
          phone_number: this.phoneNumber,
          status: this.status.value,
          car_list: this.carMaker.value.filter(e => e !== ""),
          wt_list: this.carParts.value.filter(e => e),
        }
        try {
          if (this.$route.meta === 'settings') {
            const payload = {
              car_list: this.carMaker.value.filter(e => e !== ""),
              wt_list: this.carParts.value.filter(e => e),
            }
            payload.company_token = this.$route.params.id
            await this.$API.settings.updateUser(payload)
          } else {
            payload.about = this.about
            await this.$API.car.addUser(payload)
          }
          this.$route.meta === 'registration' ? this.router.push('/successRegistration') : alert('Данные успешно обновлены')
          this.$route.meta === 'registration' ? this.resetForm() : ''
        } catch (e) {
          alert('Произошла ошибка')
          console.error(e, 'error')
        }
      }
    },
    resetForm() {
      this.$refs.form.reset()
    },
  },
  computed: {
    disabledSettings: (vm) => {
      return vm.$route.meta === 'settings'
    }
  },
}
</script>

