<template>
    <div>
        <v-container fluid>
            Welcome to JAMSPantry home page! Here you will find everything you need to know about your pantrys inventory to product information, expiration dates, and analytics.
            <v-spacer></v-spacer>
            Notifications & Alerts
            <v-spacer></v-spacer>

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
                The product <strong>rice</strong> was<strong>
                successfully added </strong
                >to pantry.
            </v-alert>
                        
        </v-container>
    </div>
</template>

