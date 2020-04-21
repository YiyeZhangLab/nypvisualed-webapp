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
          src="/k/app/kibana#/dashboard/9acf18a0-834f-11ea-89f3-434a552848e1?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))"
          height="6000"
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
  name: 'CRRT',
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
