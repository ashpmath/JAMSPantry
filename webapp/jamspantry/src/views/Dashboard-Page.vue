<template>
    <v-container fill-height fluid>
        Dashboard

    <table class="table" id="dataTable">
        <thead>
            <th>Product</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
        </thead>
    <tbody>
        <tr>
            <td>Rice</td>
            <td>1</td>
            <td>06/26/2022</td>
        </tr>
        <tr>
            <td>Cereal</td>
            <td>3</td>
            <td>07/2/2023</td>
        </tr>
        <tr>
            <td>Chicken Noodle Soup</td>
            <td>4</td>
             <td>02/23/2023</td>
        </tr>
        <tr>
            <td>Gold Fish</td>
            <td>2</td>
            <td>06/12/2022</td>
        </tr>
    </tbody>
    </table>

    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
    </v-container>

</template>
