import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/bisection",
    name: "Bisection",
    component: () => import("@/views/Rootofequation/Bisection"),
  },
  {
    path: "/falseposition",
    name: "Falseposition",
    component: () => import("@/views/Rootofequation/Falseposition"),
  },
  {
    path: "/onepointiteration",
    name: "Onepoint",
    component: () => import("@/views/Rootofequation/Onepoint"),
  },
  {
    path: "/newtonraphson",
    name: "Newtonraphson",
    component: () => import("@/views/Rootofequation/Newtonraphson"),
  },
  {
    path: "/secant",
    name: "Secant",
    component: () => import("@/views/Rootofequation/Secant"),
  },
  {
    path: "/metrix",
    name: "Metrix",
    component: () => import("@/views/Metrix"),
  },
  {
    path: "/gausselimination",
    name: "Gausselimination",
    component: () => import("@/views/Gausselimination"),
  },
  {
    path: "/graph",
    name: "Graph",
    component: () => import("@/views/Graph"),
  },
  {
    path: "/callapi",
    name: "CallApi",
    component: () => import("@/views/CallApi"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test"),
  },

  {
    path: "/Lagange",
    name: "Lagange",
    component: () => import("@/views/Interpolation/Lagange"),
  },

];

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes,
});

export default router;
