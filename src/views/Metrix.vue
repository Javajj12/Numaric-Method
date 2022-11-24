<template>
  <v-container>
    <v-text-field v-model="metrixNum"  label="Row Col" />
    <!-- <v-text-field v-model="colNum" label="Col" /> -->
    <v-btn color="success" @click="cal" block>calculate</v-btn>
    <!-- onClick -->
    <!-- <v-row > -->
    <!-- <v-col > -->

    <!-- </v-col> -->
    <!-- </v-row> -->

    <v-card>
      <v-container class="of-custom">
        <table>
          <tr v-for="(r, rIndex) in metrix" :key="rIndex">
            <td v-for="(r, cIndex) in r" :key="cIndex">

              <input
                type="number"
                v-model.number="metrix[rIndex][cIndex]"
                style="width: 50px  border-radius: 2px;border: 2px solid gray;"/>

              <!-- <v-text-field
                dense
                hide-details
                solo
                type="number"
                v-model.number="metrix[rIndex][cIndex]"
              ></v-text-field> -->
            </td>
          </tr>
        </table>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "MetrixView",
  data: () => ({
    metrixNum: 0,
    // colNum: 0,
    metrix: [],
  }),
  methods: {
    cal: function () {
      this.metrix = [];


      this.metrix.push();

      for (let i = 0; i < this.metrixNum; i++) {
        let col = [];
        //  col.push(0);
        //  let col2 = [];
        //   col2.push(0);
        for (let c = 0; c < this.metrixNum; c++) {
          col.push(0);
        }
        this.metrix.push(col);
         
      }
    },
  },
};
</script>
<style>
.of-custom {
  overflow: scroll;
}
</style>
