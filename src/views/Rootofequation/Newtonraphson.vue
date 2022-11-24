<template>
  <v-container>
    Newton Raphson
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
            <v-btn color="success" @click="calNewtonraphson" block
              >calculate</v-btn
            >
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
  name: "NewtonView",
    components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    fx: "",//x^2-7
    x: 0,//2
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
        text: "X_new",
        align: "center",
        value: "x_new",
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
      axios.get("http://localhost:3002/newtonraphson").then((res) => {
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

      return axios.post("http://localhost:3002/newtonraphson", data).then((res) => {
        console.log(res.data);

      });
    },
    calNewtonraphson: function () {
      this.newtonraphson(this.x, this.fx);
       this.updateChart();
    },
    newtonraphson: function (x, fx) {
      this.getDataApi({//await
          index: fx,
          X: x,
        });
      const fn = (e) => {
        let scope = { x: Number(e) };
        let code1 = compile(fx);
        return code1.evaluate(scope);
      };

      // function F(x){return Math.pow(x, 2) - 7;}//Math.pow(x, 2) - 7
      function F_cal_diff(x) {
        return 2 * x;
      }
      function F_res(x) {
        return fn(x) / F_cal_diff(x);
      }
      this.calapi({//await
          index: fx,
          X: x,
        });
       this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];

      let i = 0,
        err = 1,
        x_new;
      do {
        // console.log("Round in loop:"+roundNum);
        x_new = x - F_res(x);
        x = x_new;
        if (i > 0) {
          err = Math.abs(F_res(x) / x_new) * 100;
        }
            this.dataTableItems.push({
          index: i,
          x_new: x_new,
          x: x,
          error: err,
        });
        i++;
        this.chartOptions.xaxis.categories.push(i.toString());
        this.series[0].data.push(x);
      } while (err > 0.000002);
      //   console.log("x is " + x_new.toFixed(10));
      this.result = x.toFixed(10);
      this.error = err.toFixed(10);
      //   console.log("Error is " + err.toFixed(10));
    },
  },
};
</script>
