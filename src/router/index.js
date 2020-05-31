import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Queens from '../views/Queens.vue';
import Data from '../views/Data.vue';
import Graph from '../views/Graph.vue';
import About from '../views/About.vue';
import GraphNative from '../views/GraphNative.vue';
import CRRT from '../views/CRRT.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Visual(ED) - Dashboard'
    }
  },
  {
    path: '/yiye',
    redirect: { name: 'home' }
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
    path: '/crrt',
    name: 'crrt',
    component: CRRT
  },
  {
    path: '*',
    redirect: { name: 'about' }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
