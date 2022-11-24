<template>
  <div id="chart">
    <!-- <Chart /> -->
    <apexchart
      width="550"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div>
      <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>
<script>
// import Chart from '@/components/Chart.vue'
import VueApexCharts from "vue-apexcharts";

export default {
  name: "GraphView",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [35, 23, 17, 21],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      // const max = 90;
      // const min = 20;
      // const data = [35, 23, 17, 21];
      const newData = this.series[0].data.map((number) => {
        // number = [13,25,44,20];
        // let i=100;
        return number*2;
      });

      const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      };
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
 
</script>
