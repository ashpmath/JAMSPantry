<template>
    <div class="camera">
        <video autoplay class="feed"></video>
    </div>
</template>

<script>
export default {
    name: "camera-item",
    methods: {
        init() {
            if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                navigator.mediaDevices.getUserMedia({video: true}).then(stream =>{
                    const videoPlayer = document.querySelector("video");
                    videoPlayer.srcObject = stream;
                    videoPlayer.play();
                });    
            } else{
                alert("Cannot get Media Devices")
            }
        }
    },
    beforeMount (){
        this.init();
    }
        
}
</script>

<style lang="scss" scoped>
.camera {
    width: 100vw;
    height: 100vh;
    padding: 25 px;
    box-sizing: border-box;
}
.feed{
    display: block;
    width: 100%;
    max-width: 1280 px;

    margin: 0 auto;

    box-shadow: 4px 4px 12px 0px;
}
</style>