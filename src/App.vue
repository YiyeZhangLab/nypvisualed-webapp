<template>
  <b-container>
    <div>
      <NavBar />
      <router-view />
    </div>
  </b-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    //
  })
};
</script>
