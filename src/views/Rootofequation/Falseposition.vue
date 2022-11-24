<template>
  <v-container>
    False-Position
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
              label="xL"
              v-model.number="xL"
              type="number"
              dense
            />
            <v-text-field
              outlined
              label="xR"
              v-model.number="xR"
              type="number"
              dense
            />
            <v-btn color="success" @click="calFalseposition" block
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
            >x1 is
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
       <v-spacer/>
      <v-col cols="8">
        <v-card>
          <v-container fluid>
              <v-data-table :headers="headers" :items="dataTableItems"/>
            </v-container> 
        </v-card>
        </v-col>
      <v-spacer/>
    </v-row>
  </v-container>
</template>
<script>
import { compile } from "mathjs";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
export default {
  name: "FalsePositionView",
    components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    fx: "",//43*x-1
    xL: 0,//0.2
    xR: 0,//0.3
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
 headers:[
         {
        text: "Iteration",
        align: "center",
        sortable: true,
        value: "index",
      },
      {
        text: "XL",
        align: "center",
        value: "left",
      },
      {
        text: "XR",
        align: "center",
        value: "right",
      },
      {
        text: "X1",
        align: "center",
        value: "X1",
      },
      {
        text: "Error",
        align: "center",
        value: "error",
      },
 ],
dataTableItems:[],
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
      axios.get("http://localhost:3002/falseposition").then((res) => {
         res.data;//// this.calapi =
        //  console.log(res.data[0]);
        //  console.log(res.data[0]['index']);
        //  console.log(res.data.length)
        var res_size=res.data.length-1;
        this.fx=res.data[res_size]['index'];
        this.xL=res.data[res_size]['left'];
        this.xR=res.data[res_size]['right'];
      // console.log(obj.index);
      });
    },
    calapi: function (data) {//async
      // data.forEach = (e) => { console.log(e)}; //.id
      return axios.post("http://localhost:3002/falseposition", data).then((res) => {
        console.log(res.data);
      });
    },

    calFalseposition: function () {
      this.falseposition(this.xL, this.xR, this.fx);
      this.updateChart();
    },
    falseposition: function (xL, xR, fx) {
      this.getDataApi({//await
          index: fx,
          left: xL,
          right: xR,
        });
      const fn = (e) => {
        let scope = { x: Number(e) };
        let code1 = compile(fx);
        return code1.evaluate(scope);
      };
        this.calapi({//await
          index: fx,
          left: xL,
          right: xR,
        });

      this.chartOptions.xaxis.categories = [];
      this.series[0].data = [];

      let i = 0,
        x1 = 0,
        fxr = 0,
        fxl = 0,
        fx1 = 0,
        x1old = 0,
        err = 1;

     while (err > 0.000001){
        fxl = fn(xL);
        fxr = fn(xR);
        x1 = (xL * fxr - xR * fxl) / (fxr - fxl);
        fx1 = fn(x1);
        console.log(
          "Iteration " + i + " XL =" + xL + " XR =" + xR + "\nx1 =" + x1
        );
        this.chartOptions.xaxis.categories.push(i.toString());
        this.series[0].data.push(x1);

        if (fx1 * fxr < 0) {
          xL = x1;
        } else if (fx1 * fxr > 0) {
          xR = x1;
        }
        err = Math.abs((x1 - x1old) / x1) * 100;
        x1old = x1;
        if (i > 0.0000002) {
          console.log("Error Estimates : " + err.toFixed(18));
          this.error = err;
        }
        this.dataTableItems.push({
          index:i,
          left:xL,
          right:xR,
          X1:x1,
          error:err,
        });

        i++;
      } 
      this.result = x1;
    },
  },
};
</script>
