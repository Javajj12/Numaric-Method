<template>
  <v-container>
    <v-text-field v-model="metrixNum"  label="x y" />
    <!-- <v-text-field v-model="colNum" label="Col" /> -->
    <v-btn color="success" @click="cal" block>calculate</v-btn>

    <v-card>
      <v-container class="of-custom">
        <table>
          <tr v-for="(r, rIndex) in metrix" :key="rIndex">
            <td v-for="(r, cIndex) in r" :key="cIndex">

              <input
                type="number"
                v-model.number="metrix[rIndex][cIndex]"
                style="width: 50px  border-radius: 2px;border: 2px solid gray;"/>

            </td>
          </tr>
        </table>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "LagangeView",
  data: () => ({
    metrixNum: 0,
    // colNum: 0,
    metrix: [],
  }),
  methods: {
    cal: function () {
      this.metrix = [];
       
      for (let i = 0; i < this.metrixNum; i++) {
        let col = [];
          col.push(0);
          col.push(0);
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
