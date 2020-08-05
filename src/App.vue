<template>
  <v-app>
<!--    <v-app-bar-->
<!--      app-->
<!--      color="primary"-->
<!--      dark-->
<!--    >-->
<!--    </v-app-bar>-->

<!--    <v-main>-->
<!--      <HelloWorld/>-->
<!--    </v-main>-->
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/Auth'

export default {
	name: 'App',

	components: {
		// HelloWorld,
	},

	data: () => ({
		//
	}),
}
</script>
