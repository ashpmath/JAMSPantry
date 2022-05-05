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
                elevation="20"
                outlined
                prominent
                text-color="black"
                text
                type="error"
            >
            <v-data-table
            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="expired"
            :items-per-page="5"
            item-key="name"
            class="elevation-1">
            </v-data-table>  
            </v-alert>
            <v-alert
                color="yellow"
                dense
                elevation="20"
                outlined
                prominent
                text-color="black"
                text
                type="error"
            >
            <v-data-table
            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="warning"
            :items-per-page="5"
            item-key="name"
            class="elevation-1">
            </v-data-table>  
            </v-alert>        
        </v-container>
    </div>
</template>

<script>
import { auth, db } from "../firebase";
import { ref, query, get, orderByChild } from "firebase/database";

export default {
  data() {
    return {
      headers: [
        {
          text: "Pantry Good",
          align: "start",
          value: "description",
        },
        { text: "Expiration Date", value: "expir" },
      ],
      expired: [],
      warning: [],
    };
  },
  
  methods: {
    getAlerts() {
      get(
        query(
          ref(db, auth.currentUser.uid + "/inventory"),
          orderByChild("description")
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
            const year = new Date().getFullYear()
            const month = new Date().getMonth()+1
            const day = new Date().getDay()
            console.log(snapshot.val());
            // expiration for loop
            for (const itemKey in snapshot.val()) {
                let dateArray = snapshot.val()[itemKey]["expiration"].split("/");
                // check if year is correct
                if (dateArray[2]<year){
                    this.expired.push({
                                description: snapshot.val()[itemKey].description,
                                expir: snapshot.val()[itemKey].expiration,
                            })
                }
                else{ if (dateArray[2]==year & dateArray[0]<month){
                    this.expired.push({
                                description: snapshot.val()[itemKey].description,
                                expir: snapshot.val()[itemKey].expiration,
                            })
                }
                    else{ if(dateArray[0]==month & dateArray[1]<day){
                        this.expired.push({
                                description: snapshot.val()[itemKey].description,
                                expir: snapshot.val()[itemKey].expiration,
                            })
                    }

                    }
                }    
            }
            const check = new Date()
            check.setDate(check.getDate()+7)
            const dayCheck = check.getDate()
            const monthCheck = check.getMonth()+1
            const yearCheck = check.getFullYear()
            //warning loop
            for (const itemKey in snapshot.val()) {
                let dateArray = snapshot.val()[itemKey]["expiration"].split("/");
                if (dateArray[2]<=yearCheck & dateArray[2]>=year){
                    if (dateArray[0]<=monthCheck & dateArray[0]>=month){
                        if (dateArray[1]<=dayCheck & dateArray[1]>=day){
                                this.warning.push({
                                    description: snapshot.val()[itemKey].description,
                                    expir: snapshot.val()[itemKey].expiration,
                                })
                        }
                    }
                }
                   
            }
        } else {
          this.expired = [];
        }
      });
    },
    },

  mounted() {
    this.getAlerts();
  },
};
</script>