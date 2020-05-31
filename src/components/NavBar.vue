<template>
  <b-navbar>
    <b-navbar-brand>
      <router-link to="/" class="brand">VISUAL(ED)</router-link>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link :to="{ name: 'home' }" class="brand1">COVID Dashboard</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'about' }" class="brand1">About</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
.brand {
  font: normal normal normal 40px/1.35em raleway, sans-serif;
  color: black;
}
.brand1 {
  font: normal normal normal 20px/1.35em raleway, sans-serif;
  color: black;
}
</style>
