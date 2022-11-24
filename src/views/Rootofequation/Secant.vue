<template>
  <v-container>
    Secant
    <v-row>
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
        <v-container>
        <v-text-field
              outlined
              label="fx"
              v-model.lazy="fx"
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
          <v-text-field
            outlined
            label="x1"
            v-model.number="x1"
            type="number"
            dense
          />
          <v-btn color="success" @click="calSecant" block>calculate</v-btn>
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
          >
          <v-card-title
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
  name: "SecantView",
   components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    fx: "",
    x: 0,
    x1: 0,
    result: 0,
    error: 0,
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
        text: "X",
        align: "center",
        value: "x",
      },
      {
        text: "X1",
        align: "center",
        value: "x1",
      },
       {
        text: "ResNew",
        align: "center",
        value: "resNew",
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
      axios.get("http://localhost:3002/secant").then((res) => {
         res.data;//// this.calapi =
        //  console.log(res.data[0]);
        //  console.log(res.data[0]['index']);
        //  console.log(res.data.length)
        var res_size=res.data.length-1;
        this.fx=res.data[res_size]['index'];
        this.x=res.data[res_size]['X'];
        this.x1=res.data[res_size]['X1'];
      // console.log(obj.index);
      });
    },
    calapi: function (data) {//async
      // data.forEach = (e) => { console.log(e)}; //.id
      return axios.post("http://localhost:3002/secant", data).then((res) => {
        console.log(res.data);
      });
    },
    calSecant: function () {
      this.secant(this.x, this.x1,this.fx);
      this.updateChart();
    },
    secant: function (x, x1,fx) {
       this.getDataApi({//await
          index: fx,
          X: x,
          X1: x1,
        });

      const fn = (e) => {
        let scope = { x: Number(e) };
        let code1 = compile(fx);
        return code1.evaluate(scope);
      };
        this.calapi({//await
          index: fx,
          X: x,
          X1: x1,
        });

      this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];

      let i = 0,
        xNew = 0,
        resNew = 0,
        xOld;
      // function F(x) {
      //   return Math.pow(x, 2) - 7;
      // }
      
      xNew = x1 - (fn(x1) * (x - x1)) / (fn(x) - fn(x1));
      xOld = x1;
      do {
        resNew = xNew - (fn(xNew) * (xOld - xNew)) / (fn(xOld) - fn(xNew));
        var err = 1;
        if (i > 0) {
          err = Math.abs((xNew - xOld) / xNew) * 100;
        }
        xOld = xNew;
        xNew = resNew;
this.chartOptions.xaxis.categories.push(i.toString());
        this.series[0].data.push(resNew);

          this.dataTableItems.push({
          index: i,
          x: x,
          x1: x1,
          resNew: resNew,
          error: err,
        });
        i++;
      } while (err > 0.000001);
      this.result = resNew.toFixed(10);
      this.error = err.toFixed(10);
    },
  },
};
</script>
