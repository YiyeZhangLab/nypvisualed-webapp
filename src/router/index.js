import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Queens from '../views/Queens.vue';
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
    component: Home,
    meta: {
      title: 'Visual(ED) - Dashboard'
    }
  },
  {
    path: '/yiye/queens',
    name: 'queens',
    component: Queens
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
    component: About,
    meta: {
      title: 'Visual(ED) - About'
    }
  },
  {
    path: '/graph-native',
    name: 'graph-native',
    component: GraphNative
  },
  {
    path: '*',
    redirect: { name: 'about' }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
