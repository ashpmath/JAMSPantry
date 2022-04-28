<template>

    <v-container fill-height fluid>
        Dashboard
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        item-key="name"
        class="elevation-1"
        :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
    }"
    
    ></v-data-table>
    
    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
    
    </v-container>
    
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Pantry Good',
            align: 'start',
            value: 'name',
          },
          { text: 'Expiration Date', value: 'category' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: '4/22/23',
          },
          {
            name: 'Ice cream sandwich',
            category: '4/22/23',
          },
          {
            name: 'Eclair',
            category: '4/22/23',
          },
          {
            name: 'Cupcake',
            category: '4/22/23',
          },
          {
            name: 'Gingerbread',
            category: '4/22/23',
          },
          {
            name: 'Jelly bean',
            category: '4/22/23',
          },
          {
            name: 'Lollipop',
            category: '4/22/23',
          },
          {
            name: 'Honeycomb',
            category: '4/22/23',
          },
          {
            name: 'Donut',
            category: '4/22/23',
          },
          {
            name: 'KitKat',
            category: '4/22/23',
          },
        ],
      }
    },
  }
</script>
