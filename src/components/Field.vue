<template>
  <div>

    <!--&lt;!&ndash;    {{field}}&ndash;&gt;{{field.value}} <h1>{{field}}</h1>-->
    <v-col class="pt-0" cols="12" md="12">
      <v-select :rules="fullName" :clearable="iconInItem" :disabled="disabled && isEmpty" :items="field.items" :label="label" :multiple="multiple"
                hide-details="auto" item-text="name" item-value="id" no-data-text="Нет данных" v-model="field.value">
        <!--        Add a tile with Select All as Label and binded on a method that add or remove all items-->
        <v-list-item @click="toggle" ripple slot="prepend-item" v-if="field.items.length>0 && multiple">
          <v-list-item-action>
            <v-icon :color="field.value.length > 0 ? 'indigo darken-4' : ''">{{icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>Выбрать все</v-list-item-title>
        </v-list-item>
        <v-divider class="mt-2" slot="prepend-item" v-if="multiple"/>
        <template v-if="iconInItem" v-slot:item="{ item}">
          <div style="display: flex;align-items: center">
            <!--            <v-checkbox-->

            <!--              color="accent"-->
            <!--            ></v-checkbox>-->
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
            <span
              class="grey--text caption"
              v-if="index === 2"
            >(+ ещё {{ field.value.length - 2 }})</span>
          </div>
        </template>
      </v-select>
    </v-col>
  </div>
</template>

<script>
export default {
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
		console.log(this.field, 'field')
	},
	data: () => ({
		fullName: [
			v => !!v || 'Не может быть пустым',
			// v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
	}),
	methods: {
		toggle() {
			console.log('toggle')
			this.$nextTick(() => {
				if (this.selectedAllGroup) {
					this.field.value = []
				} else {
					// todo check
					this.field.value = this.field.items.map(e => e.id).slice()
				}
			})
		},
	},
	computed: {
		test() {
			console.log('testComputedInField')
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
					console.log('hm')
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
		// checkEmpty(){
		//
		// }
	},
}
</script>

<style scoped>
</style>
