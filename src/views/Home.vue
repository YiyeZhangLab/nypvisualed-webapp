<template>
  <div class="home">
    <h1>VISUAL(ED)</h1>
    <iframe
      id="frameToPrint"
      src="http://yiyeserver.duckdns.org/k/app/kibana#/dashboard/fa8adaa0-71d8-11ea-b285-8bb2fd0522c9?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3A'2020-03-01T17%3A50%3A00.000Z'%2Cto%3Anow))"
      height="3300"
      width="1200"
    ></iframe>
    <button v-on:click="printPDF">print</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    printPDF() {
      var frame = document.getElementById('frameToPrint');
      var framedoc = frame.contentWindow;
      framedoc.print();
      console.log('blabla');
    }
  }
};
</script>
