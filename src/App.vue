<template>
  <b-container>
    <div>
      <NavBar />
      <router-view />
      <Footer />
    </div>
  </b-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    NavBar,
    Footer
  }
};
</script>
