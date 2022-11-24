<template>
  <v-container>
    One-point iteration
    <v-row>
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
          <v-container>
             <v-text-field
              outlined
              label="fx"
              v-model="fx"
              type="string"
              dense
            />
            <v-text-field
              outlined
              label="x"
              v-model.number="x"
              type="number"
              dense
            />
            <v-btn color="success" @click="calOnepoint" block>calculate</v-btn>
             <v-col sm="6" md="4" offset-sm="4">
           <v-btn color="success" @click="getDataApi"> API</v-btn>
        </v-col>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="result != 0">
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
          <v-card-title
            >x is
            <v-chip color="warning lighten-2">
              {{ result }}</v-chip
            ></v-card-title
          ><v-card-title
            >Error is
            <v-chip color="warning lighten-2">
              {{ error }}</v-chip
            ></v-card-title
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />
      <v-col cols="8">
        <v-card>
          <v-container fluid>
            <apexchart
              type="line"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-container>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>

    <v-row>
      <v-spacer />
        <v-col cols="8">
          <v-card>
          <v-container fluid>
            <v-data-table :headers="headers" :items="dataTableItems" />
          </v-container>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>

  </v-container>
</template>
<script>
import { compile } from "mathjs";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
export default {
  name: "OnePointView",
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    fx:"",
    x: 0,
    result: 0,
    error:0,
    chartOptions: {
      chart: {
        id: "vuechart-example",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],

      headers: [
      {
        text: "Iteration",
        align: "center",
        sortable: true,
        value: "index",
      },
      {
        text: "Xold",
        align: "center",
        value: "xold",
      },
    
      {
        text: "X",
        align: "center",
        value: "x",
      },
      {
        text: "Error",
        align: "center",
        value: "error",
      },
    ],
     dataTableItems: [],
  }),
  methods: {
      updateChart: function () {
      const newData = this.series[0].data.map((v) => v);
      this.series = [
        {
          data: newData,
        },
      ];
    },
getDataApi: function () {
      axios.get("http://localhost:3002/onepoint").then((res) => {
         res.data;//// this.calapi =
         console.log(res.data[0]);
         console.log(res.data[0]['index']);
         console.log(res.data.length)
        var res_size=res.data.length-1;
        this.fx=res.data[res_size]['index'];
        this.x=res.data[res_size]['X'];
     
      // console.log(obj.index);
      });
    },
    calapi: function (data) {//async
      // data.forEach = (e) => { console.log(e)}; //.id
      return axios.post("http://localhost:3002/onepoint", data).then((res) => {
        console.log(res.data);
      });
    },
    

    calOnepoint: function () {
      this.onepointiteration(this.x,this.fx);
      this.updateChart();
    },
    onepointiteration: function (x,fx) {

        this.getDataApi({//await
          index: fx,
          X: x,
        });

        const fn = (e) => {
        let scope = { x: Number(e) };
        let code1 = compile(fx);
        return code1.evaluate(scope);
      };
       this.calapi({//await
          index: fx,
          X: x,
        });
      this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];

      let i= 0,
        xold = 0,fxCal=0,
        err=1;
      do {
        x = fn(fxCal) * Math.pow(xold, 0);
        console.log(x);
        err = Math.abs((x - xold) / x) * 100;
        xold = x;
        if (i > 0) {
          console.log("Error Estimates : " + err);
        }
        this.chartOptions.xaxis.categories.push(i.toString());
        this.series[0].data.push(x);
        this.dataTableItems.push({
          index:i,
          xold:xold,
          x:x,
          error:err,
        });

        i++;
      } while (err > 0.000002);
       this.error = err;
      this.result = x;
    },
  },
};
</script>
