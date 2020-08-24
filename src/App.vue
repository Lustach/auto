<template>
  <v-app>
<!--    <v-app-bar-->
<!--      app-->
<!--      color="primary"-->
<!--      dark-->
<!--    >-->
<!--    </v-app-bar>-->
    <v-main>
      <vue-particles color="#4E77DE" style="position:absolute;width:100%;height:100%;" :particlesNumber="180" :clickEffect="false"></vue-particles>
      <keep-alive include="SignUpSettings"><router-view></router-view></keep-alive>
    </v-main>
  </v-app>
</template>

<script>

export default {
	name: 'App',

	data: () => ({
	}),
}
</script>
<style>
.v-text-field__details{
  margin-bottom: 0 !important;
}
</style>
