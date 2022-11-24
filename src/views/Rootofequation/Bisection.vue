<template>
  <v-container>
    Bisection
    <v-row>
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
          <v-container>
            <!-- set data to element -->
            <v-text-field
              outlined
              label="fx"
              v-model="fx"
              type="String"
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
            <v-btn color="success" @click="calBisection" block>calculate</v-btn>

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
            >xM is
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
  name: "BisectionView",
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    fx: "", //13-x^4
    xL: 0, //0.5
    xR: 0, //2
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
        text: "XM",
        align: "center",
        value: "xm",
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
    //function in Vue Instance
    calBisection: function () {
      this.bisection(this.xL, this.xR, this.fx);
      this.updateChart();
    },
    // clearData: function () {
    //   this.fx.forEach(async (item)=>{
    //    axios.delete("http://localhost:3002/posts/"+item.id);//+item.id
    //   });
    // },
    getDataApi: function () {
      axios.get("http://localhost:3002/bisection").then((res) => {
         res.data;
        //  console.log(res.data);//operation array Json
        var res_size=res.data.length-1;
        this.fx=res.data[res_size]['index'];//index,value
        this.xL=res.data[res_size]['left'];
        this.xR=res.data[res_size]['right'];
      // console.log(obj.index);
      });
    },
    calapi: function (data) {//async
      // data.forEach = (e) => { console.log(e)}; //.id
      return axios.post("http://localhost:3002/bisection", data).then((res) => {//promise
        console.log(res.data);
      });
    },
    bisection: function (xL, xR, fx) {//async
      //  this.clearData();//await
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

      let err = 1,
        xOld = 0,
        xM = 0,
        fxM = 0,
        fxR = 0,
        i = 0;
      while (err > 0.0000002) {
        xOld = xM;
        xM = (xL + xR) / 2;
        fxM = fn(xM);
        fxR = fn(xR);
        if (fxM * fxR > 0) {
          xR = xM;
        } else if (fxM * fxR < 0) {
          xL = xM;
        }
        err = Math.abs((xM - xOld) / xM) * 100;
        this.error = err;
        console.log("error :" + err);
        this.chartOptions.xaxis.categories.push(i.toString());
        this.series[0].data.push(xM);

this.dataTableItems.push({
          index:i,
          left:xL,
          right:xR,
          xm:xM,
          error:err,
        });
        i++;
      }
      this.result = xM;
    },
  },
};
</script>
