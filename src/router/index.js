import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Data from '../views/Data.vue';
import Graph from '../views/Graph.vue';
import About from '../views/About.vue';
import GraphNative from '../views/GraphNative.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'yiye' }
  },
  {
    path: '/yiye',
    name: 'yiye',
    component: Home
  },
  {
    path: '/data',
    name: 'view-data',
    component: Data
  },
  {
    path: '/graph',
    name: 'graph',
    component: Graph
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/graph-native',
    name: 'graph-native',
    component: GraphNative
  },
  {
    path: '*',
    redirect: { name: 'yiye' }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
