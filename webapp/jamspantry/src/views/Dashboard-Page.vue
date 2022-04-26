<template>
    <div>
        <strong>DASHBOARD</strong>
        <v-container fluid>
        <v-spacer></v-spacer>
        Notifications & Alerts

        <v-alert
            color="red"
            dense
            dismissible
            elevation="20"
            outlined
            prominent
            text-color="black"
            text
            type="error"
            >
            Food Expires Soon!
        </v-alert>
        <v-alert
            dense
            dismissible
            elevation="20"
            outlined
            prominent
            text
            type="success"
            >
            The product <strong>rice</strong> was<strong> successfully added </strong>to pantry.
        </v-alert>

        <v-spacer></v-spacer>
        Analytics
        
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
    </div>
</template>

