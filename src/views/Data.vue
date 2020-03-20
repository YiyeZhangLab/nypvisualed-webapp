<template>
  <div>
    <h1>Data here</h1>
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
        console.log(response);
        this.results = response.data;
      })
      .catch(error => {
        console.log("there's an error: " + error.message);
      });
  }
};
</script>
