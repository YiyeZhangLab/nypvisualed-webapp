import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'nyp',
    component: () => import('../views/NYP.vue'),
    meta: {
      title: 'Visual(ED) - Dashboard'
    }
  },
  {
    path: '/60days',
    name: 'nyp60days',
    component: () => import('../views/NYPTwoMonth.vue'),
    meta: {
      title: 'Visual(ED) - Dashboard'
    }
  },
  {
    path: '/120days',
    name: 'nyp120days',
    component: () => import('../views/NYPFourMonth.vue'),
    meta: {
      title: 'Visual(ED) - Dashboard'
    }
  },
  {
    path: '/yiye',
    redirect: { name: 'nyp' }
  },
  {
    path: '/yiye/queens',
    name: 'queens',
    component: () => import('../views/Queens.vue')
  },
  {
    path: '/data',
    name: 'view-data',
    component: () => import('../views/Data.vue')
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import('../views/Graph.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Visual(ED) - About'
    }
  },
  {
    path: '/graph-native',
    name: 'graph-native',
    component: () => import('../views/GraphNative.vue')
  },
  {
    path: '/crrt',
    name: 'crrt',
    component: () => import('../views/CRRT.vue')
  },
  {
    path: '*',
    name: 'all',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Visual - About'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
