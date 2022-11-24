<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn to="/" color="deep-purple darken-3">home</v-btn>
    </v-app-bar>
   <NavigationDrawer />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavDrawer.vue'
export default {
  name: "App",
  components: {NavigationDrawer},
  data: () => ({
    //
  }),
};
</script>
