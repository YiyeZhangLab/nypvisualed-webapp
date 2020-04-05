<template>
  <b-navbar variant="light">
    <b-navbar-brand>
      <router-link to="/" class="brand">CLIP</router-link>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link :to="{ name: 'yiye' }">Covid Dashboard</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'about' }">About</router-link>
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2em;
  color: #39b982;
  text-decoration: none;
}
</style>
