<template>
  <div class="container">
    <video autoplay class="feed"></video>
    <img class="overlay" src="../assets/imageOverlay.svg" /><img />
  </div>
</template>

<script>
export default {
  name: "cameraItem",
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot get Media Devices");
      }
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.feed {
  width: 100%;
  max-width: 1280 px;
  border-radius: 5px;
}
.container {
  position: relative;
  width: auto;
  aspect-ratio: 4/3;
  margin: 10px;
  padding: 0;
}
video {
  position: absolute;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
</style>
