<template>
  <div>
    <b-row>
      <b-col>
        <h1>VISUAL(ED)</h1>
      </b-col>
      <b-col>
        <div class="float-right">
          Daily Trends Since March 1st, 2020
          <b-button variant="outline-primary" v-on:click="printPDF">Print Report</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="border border-primary">
      <b-col class="iframe-container">
        <iframe
          id="frameToPrint"
          src="http://yiyeserver.duckdns.org/k/app/kibana#/dashboard/fa8adaa0-71d8-11ea-b285-8bb2fd0522c9?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2020-03-01T17%3A50%3A00.000Z'%2Cto%3Anow))"
          height="6000"
          allowfullscreen
        ></iframe>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
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
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
