<template>
  <v-container>
    NewPage
    <v-row>
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
          <v-container>
            <v-text-field
              outlined
              label="input"
              v-model="fx"
              type="String"
              dense
            />
            <v-text-field
              outlined
              label="input1"
              v-model.number="input1"
              type="number"
              dense
            />
            <v-text-field
              outlined
              label="input2"
              v-model.number="input2"
              type="number"
              dense
            />
            <v-btn color="success" @click="test" block>calculate</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="result != 0">
      <v-col sm="6" md="4" offset-md="4" offset-sm="3">
        <v-card>
          <v-card-title
            >test input
            <v-chip color="success lighten-2">
              {{ result }}</v-chip
            ></v-card-title
          >
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { compile } from "mathjs";
export default {
  name: "testView",

  data: () => ({
    fx: "",
    input1: 0,
    input2: 0,
    result: 0,
  }),

  methods: {
    test: function () {
      this.testpage(this.fx);
    },
    testpage: function(fx) {
      const fn = (e) => {
        let scope = { x: Number(e) };
        let code1 = compile(fx);
        return code1.evaluate(scope);
      };
      // let testinput=0;
      let fxx;
      fxx=fn(fx);
      console.log(fxx);
      this.result = fxx;
    },
  },
};
</script>
