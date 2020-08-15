<template>
  <v-app>
    <div class="stars"></div>
    <div class="twinkling"></div>
<!--    <v-app-bar-->
<!--      app-->
<!--      color="primary"-->
<!--      dark-->
<!--    >-->
<!--    </v-app-bar>-->
    <v-main style="z-index: 3">
    <router-view></router-view>
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
