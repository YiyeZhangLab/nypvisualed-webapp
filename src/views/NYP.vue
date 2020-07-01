<template>
  <v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" top color="error">
      This is for demonstration purposes only using synthetic data. Do not interpret.
      <v-btn color="black" text @click="snackbar = false">X</v-btn>
    </v-snackbar>
    <v-row>
      <v-col>
        <div class="float-right mx-10">
          <span class="mx-10">Trend in the Last 14 Days</span>
          <v-btn v-on:click="printPDF">Print Report</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row id="loading" class="justify-content-center">
      <v-col>
        <Loading class="text-center" />
      </v-col>
    </v-row>
    <v-row id="dashboard">
      <v-col class="iframe-container">
        <iframe
          id="frameToPrint"
          v-bind:src="url"
          height="6000"
          allowfullscreen
          class="border border-dark"
        ></iframe>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'Dashboard',
  components: { Loading },
  data: function() {
    return {
      url:
        process.env.NODE_ENV === 'production'
          ? '/k/app/kibana#/dashboard/fa8adaa0-71d8-11ea-b285-8bb2fd0522c9?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-14d%2Cto%3Anow))'
          : 'https://blank.org/',
      snackbar: false,
      timeout: 15000
    };
  },
  mounted() {
    document.getElementById('dashboard').style.display = 'none';
    setInterval(function() {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    }, 5000);
  },
  created() {},
  methods: {
    printPDF() {
      var frame = document.getElementById('frameToPrint');
      var framedoc = frame.contentWindow;
      framedoc.print();
    }
  }
};
</script>
<style scoped>
.iframe-container {
  padding-top: 20;
  position: relative;
}

.iframe-container iframe {
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
}
</style>
