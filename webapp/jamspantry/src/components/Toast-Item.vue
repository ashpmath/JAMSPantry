<template>
  <v-snackbar
    color="secondary"
    :timeout="timer"
    v-model="showSnackbar"
    rounded="pill"
    min-width='10px'
    transition="slide-y-reverse-transition"
    >{{ message }}</v-snackbar
  >
</template>

<script>
export default {
  name: "toastItem",
  data: () => {
    return {
      showSnackbar: false,
      message: "",
      timer: 4000,
    }
  },
  methods: {
    show(data) {
      this.showSnackbar = true
      this.message = data.message || ""
      this.timer = data.timer || 4000
    },
  },
}
</script>