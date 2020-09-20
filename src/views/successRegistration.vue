<template>
  <div>
    <v-card class="flex-column justify-center fill-height" style="display: flex;justify-content: center;flex-direction: column;height: 100vh;">
      <v-card-title class="justify-center">
        <div>
          <picture>
            <source srcset="../assets/success.webp" type="image/webp">
            <source srcset="../assets/success.jpg" type="image/jpeg">
            <img alt="Изображение" height="50px" src="../assets/success.jpg">
          </picture>
        </div>
        <h2 class="mb-4 text-center" style="width:100%;word-break: break-word;">Ваша заявка зарегистрирована.</h2>
        <span class="mb-0 text-center text-h6" style="width:100%;word-break: break-word;">Ожидайте звонка администратора для подтверждения внесенных вами данных.</span>

      </v-card-title>
      <v-card-text class="text-center">
        <v-btn
            class="px-11 mt-4 text-capitalize text-h6"
            color="primary"
            dark
            rounded
            x-large
            @click="openTelegram"
        >
                <span class="mx-4">
                <v-icon>mdi-telegram</v-icon>
                Telegram
                  </span>
        </v-btn>
      </v-card-text>

    </v-card>
  </div>
</template>

<script>
export default {
  name: "successRegistration",
  methods: {
    openTelegram() {
      window.open('https://t.me/DVS_KPP_Bot', '_blank')
    }
  }
}
</script>

<style scoped>

</style>
