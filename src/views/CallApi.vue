<template>
  <div>
    <v-row>
      <v-spacer />
      <v-col cols="6">
        <h1>Call Api</h1>
        <v-btn elevation="2" @click="api">Get Api</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CallApiView",
  data: () => ({
    test: 0,
    result: [],
  }),
  methods: {
    createApi: function () {
    },

    testApi: function () {
      this.createApi();
    },
    api: function () {
      const calapi = () => {
        // data.forEach = (e) => { console.log(e)}; //.id 
        axios.get('http://localhost:3002').then(res=>{
            console.log(res.data);
        })
    }
    calapi();
},

    },
  };

</script>
