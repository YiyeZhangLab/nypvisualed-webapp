<template>
  <div>
    <h1>
      Data here
      <b-badge>bla</b-badge>
    </h1>
    <b-table striped hover :items="results.results_list"></b-table>
  </div>
</template>

<script>
import DataService from '@/services/DataService.js';
export default {
  name: 'Data',
  components: {},
  data() {
    return {
      inputdata: Object,
      results: Object
    };
  },
  created() {
    this.inputdata = {
      path: 'data/sample_data.json',
      pid: '',
      cluster: '',
      prob: 0,
      count: 0
    };
    const formData = new FormData();
    for (let [key, value] of Object.entries(this.inputdata)) {
      formData.append(key, value);
    }

    DataService.getResults(formData)
      .then(response => {
        this.results = response.data;
      })
      .catch(error => {});
  }
};
</script>
