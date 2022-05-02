<template>
  <div>
     
  </div>
</template>
 
<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
  
    };
  }
};
</script>

<script>
  function gotData(data) {
    console.log(data);
  }
</script>
<script src="https://docs-examples.firebaseio.com/fireblog/posts.json?callback=gotData">