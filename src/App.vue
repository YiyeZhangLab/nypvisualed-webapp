<template>
  <v-app>
    <v-app-bar app dense dark>
      <v-toolbar-title>
        <span class="font-weight-black">VISUAL(ED)</span>
        <span class="ml-10">COVID-19 Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="link in links" :key="`${link.label}-header-link`" text rounded :to="link.url">{{
        link.label
      }}</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer dark padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text">
          {{ new Date().getFullYear() }} —
          <a href="https://www.yiyezhang.com" class="white--text">
            <strong>Yiye Zhang Lab</strong>
          </a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.title = 'Visual(ED)';
  },
  components: {},

  data: () => ({
    links: [
      { label: '30-Day', url: '/' },
      { label: '60-Day', url: '/60days' },
      { label: '120-Day', url: '/120days' },
      { label: 'About', url: '/about' }
    ]
    //
  })
};
</script>
