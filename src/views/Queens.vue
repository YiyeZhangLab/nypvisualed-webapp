<template>
  <div>
    <b-row>
      <b-col></b-col>

      <b-col>
        <div class="float-right">
          Daily Trends Since March 1st, 2020
          <b-button variant="outline-primary" v-on:click="printPDF">Print Report</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row id="loading" class="justify-content-center">
      <Loading class="text-center" />
    </b-row>
    <b-row id="dashboard">
      <b-col class="iframe-container">
        <iframe
          id="frameToPrint"
          src="/k/app/kibana#/dashboard/1c73f1c0-7db3-11ea-89f3-434a552848e1?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2020-03-02T00%3A51%3A02.329Z'%2Cto%3Anow))"
          height="3000"
          allowfullscreen
          class="border border-dark"
        ></iframe>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'Queens',
  components: { Loading },
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
