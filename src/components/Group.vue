<template>
  <div>
    <v-col class="pt-0" cols="12" md="12" sm="6">
      <v-select
        :items="group.auto.items"
        hide-details
        label="Выберите автомобиль"
        v-model="group.auto.value"
      >
        <template v-slot:item="{ item}">
          <div style="display: flex;align-items: center">
            <v-img class="mr-1" height="25px" src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png" width="25px"></v-img>
            <span>{{ item }}</span>
          </div>
        </template>
        <template v-slot:selection="{ item}">
          <div style="display: flex;align-items: center">
            <v-img class="mr-1" height="25px" src="https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png" width="25px"></v-img>
            <span>{{ item }}</span>
          </div>
        </template>
      </v-select>
    </v-col>
    <v-col class="pt-0" cols="12" md="12" sm="6">
      <v-select :items="group.models.items" hide-details label="Выберите модели" multiple v-model="group.models.value">
        <!-- Add a tile with Select All as Label and binded on a method that add or remove all items -->
        <v-list-item @click="toggle" ripple slot="prepend-item">
          <v-list-item-action>
            <v-icon :color="group.models.value.length > 0 ? 'indigo darken-4' : ''">{{ icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>Выбрать все</v-list-item-title>
        </v-list-item>
        <v-divider class="mt-2" slot="prepend-item"/>
        <template v-slot:selection="{ item, index }">
          <span style="white-space: pre" v-if="index===0 || index===1">
            <span>{{ item }}</span>
            <span v-if="index<group.models.value.length-1 && index !==2">, </span>
          </span>
          <span
            class="grey--text caption"
            v-if="index === 3"
          >(+ ещё {{ group.models.value.length - 3 }})</span>
        </template>
      </v-select>
    </v-col>
  </div>
</template>

<script>
export default {
	name: "Group",
	props: {
		group: {},
	},
	mounted() {
		console.log('group')
	},
	methods: {
		toggle() {
			console.log(this.group,'ALLO')
			this.$nextTick(() => {
				if (this.selectedAllGroup) {
					this.group.models.value = []
				} else {
					this.group.models.value = this.group.models.items.slice()
				}
			})
		},
	},
	computed: {
		selectedAllGroup() {
			console.log(this.group.models.value.length === this.group.models.items.length, 'all')
			return this.group.models.value.length === this.group.models.items.length
		},
		selectedSomeGroup() {
			console.log(this.group.models.value.length > 0 && !this.selectedAllGroup, 'some')
			return this.group.models.value.length > 0 && !this.selectedAllGroup
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
