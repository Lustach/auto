<template>
  <div >
<!--    {{checkArray(field.value)}}-->

    <!--    {{tempArr}}te-->

    <div v-if="multiple">
      <v-dialog max-width="364" persistent scrollable v-model="dialog">
        <!--        {{field.value}}-->
        <!--        :style="{height: field.items.length-15*65+'px'}" don't work-->
        <v-card color="grey darken-3" height="auto">
          <!--        <v-card-title class="headline">Use Google's location service?</v-card-title>-->

          <v-card-text class="px-2 pt-3 pb-0">
            <v-list color="grey darken-3" dark v-if="field.items.length>0">
              <v-list-item @click="toggle" ripple>
                <v-list-item-title>Выбрать все</v-list-item-title>
                <v-list-item-action>
                  <v-icon :color="field.value.length > 0 ? 'indigo lighten-4' : ''">{{icon}}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-card-title class="d-flex justify-center" v-if="field.items.length===0">
              <span class="white--text">
              Нет данных</span>

            </v-card-title>
            <v-list
              color="grey darken-3"
              dark
              flat
              subheader
              two-line
            >
              <v-list-item-group
                multiple
              >
                <v-list-item :key="j" @change="change(i.id,j)" v-for="(i,j) in field.items">
                  <template v-slot:default>
                    <v-list-item-content>
                      <v-list-item-title>{{i.name}}</v-list-item-title>
                      <!--                    <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>-->
                    </v-list-item-content>
                    <v-list-item-action>
                      <!--                      {{active}}-->
                      <!--                      {{field.value[j]}}-->
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
            <v-btn @click="cancel()" color="primary" text>Отмена</v-btn>
            <v-btn @click="accept()" color="primary" text>Ок</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-col class="pt-0" cols="12" md="12">
      <v-select :clearable="iconInItem" :disabled="disabled && isEmpty" :items="field.items" :label="label" :multiple="multiple" :rules="[required]"
                @click="openDialog($event)" @click:clear="callBack()" hide-details="auto" item-text="name"
                item-value="id" no-data-text="Нет данных" ref="select" v-model="field.value">
        <v-list-item @click="toggle" ripple slot="prepend-item" v-if="field.items.length>0 && multiple">
          <v-list-item-action>
            <v-icon :color="field.value.length > 0 ? 'indigo darken-4' : ''">{{icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>Выбрать все</v-list-item-title>
        </v-list-item>
        <v-divider class="mt-2" slot="prepend-item" v-if="field.items.length>0 && multiple"/>
        <template v-if="iconInItem" v-slot:item="{ item}">
          <div style="display: flex;align-items: center">
            <v-img :src="item.link" class="mr-1" height="25px" v-if="item.id>0" width="25px"></v-img>
            <span>{{ item.name }}</span>
          </div>
        </template>
        <template v-slot:selection="{ item, index }">
          <div style="display: flex;align-items: center">
            <v-img :src="item.link" class="mr-1" height="25px" v-if="iconInItem && index<2 && item.id>0" width="25px"></v-img>
            <span style="white-space: pre" v-if="index===0 || index===1">
            <span>{{ item.name }}</span>
            <span v-if="index<field.value.length-1 && index !==1">, </span>
            </span>
            <span class="grey--text caption" v-if="index === 2 && item!==''">(+ ещё {{ checkArray-2}})</span>
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
		iconInItem: {
			default: false
		},
		disabled: {
			default: false,
		},
		auto: {
			type: Object,
			default: () => {},
		},
		multiple: {
			default: true
		},
		// eslint-disable-next-line vue/require-prop-type-constructor
		itemText: '',
		// eslint-disable-next-line vue/require-prop-type-constructor
		itemValue: '',
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
			// this.field.value[index]=id
		},
		cancel() {
			// this.field.value = []
			this.dialog = false
			this.field.value = this.tempArr
			// this.field.value.filter((e) => {
			// 	console.log(this.tempArr.indexOf(e),'E')
			// 	return this.tempArr.indexOf(e) > 0
			// })
		},
		accept() {
			this.tempArr = this.field.value.slice()
			this.dialog = false
			this.$forceUpdate()
		},
		openDialog() {
			// костыль, но работает
			// this.$refs.select.$children[1].styles.display='none'
			// console.log(this.$refs.select.$children[1])
			if (this.multiple)
				// setTimeout(() => {
				// 	this.$refs.select.$children[1].$refs.content.style.display = 'none'
				// }, 155)
				// this.$refs.select.$children[1].$el.style['display']='none'
				if (this.field.items.length > 0)
					this.multiple ? this.dialog = true : ''
			// document.querySelector('.v-menu__content').style.display='none'
		},
		callBack() {
			this.$emit('getModel')
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
	},
	computed: {
		checkArray() {
			let length = 0
			for (let i = 0; i < this.field.value.length; i++) {
				if (this.field.value[i]) length++
			}
			return length
		},
		tr() {
			return this.field
		},
		test() {
			if (this.model) {
				return this.model
			} else {
				return this.field.value
			}
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
		isEmpty: vm => {
			if (vm.disabled) {
				if (Array.isArray(vm.auto.value) && vm.auto.value.length !== 0) {
					vm.$API.car.model(0)
					return false
				}
				if (typeof vm.auto.value === "number") {
					// // todo id
					if (vm.auto.value === 0) {
						vm.$emit('selectAll', vm)
						return true
					} else {
						vm.$emit('getModel', vm.auto.value)
						return false
					}
				} else
					return true
			}
		}
	},
	watch: {
		dialog: function () {
			if (this.dialog) {
				// window.focus()
				// document.querySelector('.v-menu__content').style.display='none'
				// console.log(document.querySelector('.v-menu__content'))
				// this.$refs.select.$refs.menu.$el.classList.add('.v-menu__content')
				// console.log(this.$refs.select.$refs.menu.$el)
				setTimeout(() => {
					// this.$refs.select.$refs.menu.$refs.style.display = 'none'
					this.$refs.select.$children[1].$refs.content.style.display = 'none'
				}, 300)
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

/*.v-menu__content{*/
/*  display:none !important;*/
/*}*/
/*.v-menu__content,.theme--light,.menuable__content__active{*/
/*  display:none !important;*/
/*}*/


@keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}
@-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

@-moz-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

@-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}



.stars {
  background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 0;
}

.twinkling{
  width:10000px;
  height: 100%;
  background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;

  -moz-animation:move-background 70s linear infinite;
  -ms-animation:move-background 70s linear infinite;
  -o-animation:move-background 70s linear infinite;
  -webkit-animation:move-background 70s linear infinite;
  animation:move-background 70s linear infinite;

}

.clouds{
  width:10000px;
  height: 100%;
  background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png") repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;

  -moz-animation:move-background 150s linear infinite;
  -ms-animation:move-background 150s linear infinite;
  -o-animation:move-background 150s linear infinite;
  -webkit-animation:move-background 150s linear infinite;
  animation:move-background 150s linear infinite;
}
img{
  height: 70vh;
  width:70vh;
  position: absolute;
  z-index: 3;
  right: 20px;
}

</style>
