<template>
  <div class="camera">
    <video autoplay class="feed"></video>
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
