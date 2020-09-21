<template>
  <div>
    <div v-if="multiple">
      <v-dialog v-model="dialog" max-width="364" persistent scrollable>
        <v-card height="auto">
          <v-card-text class="px-2 pt-3 pb-0">
            <v-list v-if="field.items.length>0">
              <v-list-item ripple @click="toggle">
                <v-list-item-title v-if="checkAll">Выбрать все</v-list-item-title>
                <v-list-item-title v-else>Получать запросы на</v-list-item-title>
                <v-list-item-action>
                  <v-icon :color="field.value.length > 0 ? 'indigo lighten-4' : ''">{{ icon }}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-card-title v-if="field.items.length===0" class="d-flex justify-center">
              <span class="white--text">
              Нет данных</span>

            </v-card-title>
            <v-list
                flat
                subheader
                two-line
            >
              <v-list-item-group
                  multiple
              >
                <v-list-item v-for="(i,j) in field.items" :key="j" @change="change(i.id,j)">
                  <template v-slot:default>
                    <v-list-item-content>
                      <v-list-item-title class="d-flex">
                        <v-img :src="i.link" height="18px" max-width="25px"></v-img>
                        <span style="white-space: pre"> {{ i.name }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                          :input-value="field.value[j]"
                          color="primary"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-card-actions class="pb-1 pt-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="cancel()">Отмена</v-btn>
            <v-btn color="primary" text @click="accept()">Ок</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-col class="pt-0 pb-0" cols="12" md="12">
      <v-select ref="select" v-model="field.value" :clearable="iconInItem" :disabled="disabled" :items="field.items" :label="label"
                :multiple="multiple" :rules="[required]" item-text="name"
                item-value="id" no-data-text="Нет данных" @click="openDialog($event)">
        <v-list-item v-if="field.items.length>0 && multiple" slot="prepend-item" ripple @click="toggle">
          <v-list-item-action>
            <v-icon :color="field.value.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>Выбрать все</v-list-item-title>
        </v-list-item>
        <v-divider v-if="field.items.length>0 && multiple" slot="prepend-item" class="mt-2"/>
        <template v-if="iconInItem" v-slot:item="{ item}">
          <div style="display: flex;align-items: center">
            <v-img v-if="item.id>0" :src="item.link" class="mr-1" height="18px" width="25px"></v-img>
            <span>{{ item.name }}</span>
          </div>
        </template>
        <template v-slot:selection="{ item, index }">
          <div style="display: flex;align-items: center">
            <v-img v-if="iconInItem && index<1 && item.id>0" :src="item.link" class="mr-1" height="18px" width="25px"></v-img>
            <span v-if="index===0" style="white-space: pre">
            <span>{{ item.name }}</span>
              <!--            <span v-if="index<field.value.length-1 && index !==1">, </span>-->
            </span>
            <span v-if="index === 1 && item!==''" class="grey--text caption">(+ ещё {{ checkArray - 1 }})</span>
            <!--            <span class="grey&#45;&#45;text caption" v-if="index === 2 && item!==''">(+ ещё {{ field.value.length - 2 }})</span>-->
          </div>
        </template>
      </v-select>
    </v-col>
  </div>
</template>
<script>
export default {
  rules: [
    v => !!v || 'Не может быть пустым',
    v => (v && v.length > 0) || 'Не может быть пустым'
  ],
  name: "Group",
  props: {
    model: {},
    field: {
      items: [],
      value: [],
    },
    label: {
      required: true,
      default: '',
      type: String,
    },
    checkAll:{
      default: true,
      type: Boolean
    },
    iconInItem: {
      default: false
    },
    disabled: {
      default: false,
    },
    multiple: {
      default: true
    },
  },
  mounted() {
  },
  data: () => ({
    dialog: false,
    tempArr: [],//for cancel or accept methods /
  }),
  methods: {
    change(id, index) {
      this.field.value[index] ? this.$set(this.field.value, index, '') : this.$set(this.field.value, index, id)
    },
    cancel() {
      this.dialog = false
      this.field.value = this.tempArr.slice()
    },
    accept() {
      this.tempArr = this.field.value.slice()
      this.dialog = false
      this.$forceUpdate()
    },
    openDialog() {
      if (this.multiple) {
        if (this.field.items.length > 0) {
          this.multiple ? this.dialog = true : ''
          this.tempArr = this.field.value.slice()
        }
      }
    },
    required(value) {
      if (value instanceof Array && value.length === 0) {
        return 'Не может быть пустым'
      }
      if (value === 0) {
        return !value
      }
      return !!value || 'Не может быть пустым'
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectedAllGroup) {
          this.field.value = []
        } else {
          this.field.value = this.field.items.map(e => {return e.id}).slice()
        }
      })
    },
    isEmpty(obj) {
      for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false
      }
      return true
    }
  },
  computed: {
    checkArray() {
      let length = 0
      for (let i = 0; i < this.field.value.length; i++) {
        if (this.field.value[i]) length++
      }
      return length
    },
    selectedAllGroup() {
      return this.field.value.length === this.field.items.length
    },
    selectedSomeGroup() {
      return this.field.value.length > 0 && !this.selectedAllGroup
    },
    icon() {
      if (this.selectedAllGroup) return 'mdi-close-box'
      if (this.selectedSomeGroup) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    // isEmpty: vm => {
    //   if (vm.disabled) {
    //     if (Array.isArray(vm.auto.value) && vm.auto.value.length !== 0) {
    //       vm.$API.car.model(0)
    //       return false
    //     }
    //     if (typeof vm.auto.value === "number") {
    //       console.log('hi')
    //       // // todo id
    //       if (vm.auto.value === 0) {
    //         vm.$emit('selectAll', vm)
    //         return true
    //       } else {
    //         vm.$emit('getModel', vm.auto.value)
    //         return false
    //       }
    //     } else
    //       return true
    //   }
    // }
  },
  watch: {
    // todo ну тут костыль на костыле блядь!!!!!!
    // todo я просто в шоке на хуй...
    dialog: function () {
      if (this.dialog) {
        let timerId = setInterval(() => {
          if (this.$refs.select.$children[1].$refs && !this.isEmpty(this.$refs.select.$children[1].$refs)){
            this.$refs.select.$children[1].$refs.content.style.display = 'none'
          }
          if (this.$refs.select.$children[2].$refs && !this.isEmpty(this.$refs.select.$children[2].$refs)) {
            this.$refs.select.$children[2].$refs.content.style.display = 'none'
          }
        }, 100)
        setTimeout(() => { clearInterval(timerId) }, 1000)
      }
    }
  },
}
</script>

<style>
.custom-select, .v-input__control {
  cursor: pointer !important;
}

.v-list-item__title, .v-list-item__subtitle {
  white-space: normal !important;
}

</style>
