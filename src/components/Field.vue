<template>
  <div>
<!--    {{field}}-->{{field.value}}
    <v-col class="pt-0" cols="12" md="12" sm="6">
      <v-select :items="field.items" :label="label" :multiple="true" hide-details v-model="field.value">
        <!-- Add a tile with Select All as Label and binded on a method that add or remove all items -->
        <v-list-item @click="toggle" ripple slot="prepend-item">
          <v-list-item-action>
            <v-icon :color="field.value.length > 0 ? 'indigo darken-4' : ''">{{icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>Выбрать все</v-list-item-title>
        </v-list-item>
        <v-divider class="mt-2" slot="prepend-item"/>
        <template v-slot:item="{ item}">
          <div style="display: flex;align-items: center">
            <v-img class="mr-1" height="25px" src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png" v-if="iconInItem" width="25px"></v-img>
            <span>{{ item.name }}</span>
          </div>
        </template>
        <template v-slot:selection="{ item, index }">
          <div style="display: flex;align-items: center">
            <v-img class="mr-1" height="25px" src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png" v-if="iconInItem && index<2" width="25px"></v-img>
            <span style="white-space: pre" v-if="index===0 || index===1">
            <span>{{ item.text }}</span>
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
		field: {},
		label: {
			required: true,
			default: '',
			type: String,
		},
		iconInItem: {
			default: false
		},
    // eslint-disable-next-line vue/require-prop-type-constructor
    itemText:'',
    // eslint-disable-next-line vue/require-prop-type-constructor
    itemValue:'',
	},
	mounted() {
		console.log(this.field, 'field')
	},
	methods: {
		toggle() {
			console.log(this.field)
			this.$nextTick(() => {
				if (this.selectedAllGroup) {
					this.field.value = []
				} else {
					this.field.value = this.field.items.slice()
				}
			})
		},
	},
	computed: {
		selectedAllGroup() {
			console.log(this.field.value.length === this.field.items.length, 'all')
			return this.field.value.length === this.field.items.length
		},
		selectedSomeGroup() {
			console.log(this.field.value.length > 0 && !this.selectedAllGroup, 'some')
			return this.field.value.length > 0 && !this.selectedAllGroup
		},
		icon() {
			if (this.selectedAllGroup) return 'mdi-close-box'
			if (this.selectedSomeGroup) return 'mdi-minus-box'
			return 'mdi-checkbox-blank-outline'
		}
	},
}
</script>

<style scoped>
</style>
