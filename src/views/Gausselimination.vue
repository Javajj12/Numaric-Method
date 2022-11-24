<template>
  <v-container>
    Gausse Elimination Method
    <v-text-field v-model="metrixNum" label="Row Col" />
    <!-- <v-text-field v-model="colNum" label="Col" /> -->
    <!-- @input -->
    <v-btn color="success" @click="setDimention" block>Set Dimension</v-btn>
    <v-col sm="6" md="4" offset-sm="5">
      <v-btn color="success" @click="getDataApi"> API</v-btn>
    </v-col>
    <!-- use event on to @ -->
    <v-card>
      <v-container class="of-custom">
        <table>
          <!-- obj -->
          <!-- binding -->
          <!-- item,index -->
          <tr v-for="(r, rIndex) in metrix" :key="rIndex">
            <td v-for="(c, cIndex) in r" :key="cIndex">
              <!-- :attribute-->
              <input
                type="number"
                v-model.number="metrix[rIndex][cIndex]"
                style="width: 50px  border-radius: 2px;border: 2px solid gray;"
              />

              <!-- <v-text-field
                dense
                hide-details
                solo
                type="number"
                v-model.number="metrix[rIndex][cIndex]"
              ></v-text-field> -->
            </td>
          </tr>
          <v-btn color="success" @click="check">Calculate</v-btn>
        </table>

        <div v-if="result.length > 0">
          <!-- mustache -->
          <v-card>
            <v-card-title>
              x1:
              <v-chip color="warning lighten-2">
                {{ result[result.length - 3] }}
              </v-chip>
            </v-card-title>

            <v-card-title>
              x2:
              <v-chip color="warning lighten-2">
                {{ result[result.length - 2] }}
              </v-chip>
            </v-card-title>
            <v-card-title>
              x3:
              <v-chip color="warning lighten-2">
                {{ result[result.length - 1] }}
              </v-chip>
            </v-card-title>
          </v-card>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "GausseliminationView",
  data: () => ({
    metrixNum: 0,
    //defult

    // colNum: 0,
    metrix: [],
    result: [],
    metrixId: null,
  }),
  methods: {
    setDimention: function () {
      this.metrix = [];
      for (let i = 0; i < this.metrixNum; i++) {
        let col = [];
        for (let j = 0; j < this.metrixNum; j++) {
          col.push(0);
        }
        col.push(0);
        this.metrix.push(col);
      }
    },
    check: function () {
      this.gausseliminate(this.metrix);
    },
    getDataApi: function () {
      axios.get("http://localhost:3002/gausslimination").then((res) => {
        res.data; //// this.calapi =
        //  console.log(res.data[0]['index']);
        console.log(res.data.length);
        if (res.data.length > 0) {
          var res_size = res.data.length - 1;
          //  this.metrixNum=res.data[res_size]['metrixNum'];
          this.metrix = res.data[res_size]["metrix"];
          this.metrixId = res.data[res_size].id;
        }
        // console.log(obj.index);
      });
    },
    calapi:  function (data) {//async
      if (this.metrixId) {
        return axios.put(
          "http://localhost:3002/gausslimination/" + this.metrixId,
          data
        );
      } else {
        axios.get("http://localhost:3002/gausslimination").then((res) => {//await 
          if (res.data.length > 0) {
            var res_size = res.data.length - 1;
            this.metrixId = res.data[res_size].id;
            return axios.put(
              "http://localhost:3002/gausslimination/" + this.metrixId,
              data
            );
          } else {
            axios
              .post("http://localhost:3002/gausslimination", data)
              .then((res) => {
                this.metrixId = res.data.id;
              });
          }
        });
      }
    },
    gausseliminate: function (matrix) {
      let x = [];
      let i = 0;
      let j = 0;

      console.log(matrix);

      this.calapi({
        metrix: this.metrix,
      });
      const copymet = (m) => {
        var arr = [[]];
        for (let p = 0; p < m.length; p++) {
          arr[p] = [];
          for (let h = 0; h <= matrix.length; h++) {
            arr[p][h] = m[p][h];
          }
        }
        console.log(arr);
        return arr;
      };
      let getarray = [[]];
      getarray = copymet(matrix);
      console.log(getarray);

      for (let k = 0; k < getarray.length; k++) {
        for (i = k + 1; i < getarray.length; i++) {
          let temp = getarray[i][k] / getarray[k][k];
          for (j = k + 1; j <= getarray.length; j++) {
            getarray[i][j] = getarray[i][j] - temp * getarray[k][j];

            console.log("Row" + i + "Colum" + j + ";" + getarray[i][j]);
          }
        }
        for (i = getarray.length - 1; i >= 0; i--) {
          x[i] = getarray[i][getarray.length];
          for (j = i + 1; j < getarray.length; j++) {
            x[i] = x[i] - getarray[i][j] * x[j];
          }
          x[i] = x[i] / getarray[i][i];
        }

        for (i = 0; i < getarray.length; i++) {
          this.result.push(x[i]);
          console.log(x);
        }
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
