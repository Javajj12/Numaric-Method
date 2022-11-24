<template>
  <v-navigation-drawer permanent app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group :value="False" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Root of Equation</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="item in rootofeqation"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <!-- <v-icon>{{ item.icon }}</v-icon> -->
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>bisection</v-list-item-title> -->
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

<v-list-group :value="False" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Linear Algebra</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="item in linearalgebra"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>



      <v-list-group :value="False" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Module_test</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="item in test"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

        
       

      <!-- <v-list-item link to="/gausselimination"> -->
        <!-- <v-list-item-icon> -->
          <!-- <v-icon>{{ item.icon }}</v-icon> -->
        <!-- </v-list-item-icon> -->
        <!-- <v-list-item-content> -->
          <!-- <v-list-item-title>Gauss Eliminate</v-list-item-title> -->
        <!-- </v-list-item-content> -->
      <!-- </v-list-item> -->

    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",

  data: () => ({
    rootofeqation: [
      {
        name: "Bisection Method",
        icon: "mdi-account-multiple-outline",
        route: "/bisection",
      },
      {
        name: "False-Position Method",
        icon: "mdi-account-multiple-outline",
        route: "/falseposition",
      },
      {
        name: "ONE-POINT ITERATION Method",
        icon: "mdi-account-multiple-outline",
        route: "/onepointiteration",
      },
      {
        name: "Newton Raphson",
        icon: "mdi-account-multiple-outline",
        route: "/newtonraphson",
      },
      {
        name: "Secant",
        icon: "mdi-account-multiple-outline",
        route: "/secant",
      },
    ],
    linearalgebra:[{
      name: "Gauss Eliminate",
       icon: "mdi-account-multiple-outline",
       route:"/gausselimination"
       }
    ],
    test: [
      {
        name: "Page_test",
        icon: "mdi-account-multiple-outline",
        route: "/Test",
      },
      {
        name: "Graph_test",
        icon: "mdi-account-multiple-outline",
        route: "/Graph",
      },
      {
        name: "Metrix_test",
        icon: "mdi-account-multiple-outline",
        route: "/metrix",
      },

      {
        name: "Api_test",
        icon: "mdi-account-multiple-outline",
        route: "/CallApi",
      },

      {
        name: "Test",
        icon: "mdi-account-multiple-outline",
        route: "/Lagange",
      },
    ],
    


  }),
};
</script>
