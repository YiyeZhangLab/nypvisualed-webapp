<template>
  <div>
    <div class="controls">
      <h1>Control here</h1>
      <div>
        <label> Force </label>
        <input type="range" min="1" max="3000" v-model="force" />
        {{ options.force }}
      </div>
      <div>
        <label> Edge width </label>
        <input type="range" min="1" max="20" v-model="linkWidth" />
        {{ options.linkWidth }}
      </div>
      <div>
        <label>Node Label: </label>
        <input type="radio" :value="false" v-model="displayNodeLabels" />
        <label>Hide</label>
        <input type="radio" :value="true" v-model="displayNodeLabels" />
        <label>Show</label>
      </div>
    </div>
    <div class="graph">
      <h1>Graph here</h1>

      <d3-network
        :net-nodes="nodes"
        :net-links="links"
        :options="options"
        @node-click="nodeClick"
      />
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService.js';

import D3Network from 'vue-d3-network';
export default {
  name: 'Graph',
  components: { D3Network },
  data() {
    return {
      nodes: Object,
      links: Object,
      displayNodeLabels: true,
      force: 1000,
      linkWidth: 1
    };
  },
  computed: {
    options() {
      return {
        force: this.force,

        nodeSize: 20,
        nodeLabels: this.displayNodeLabels,
        linkLabels: true,
        linkWidth: this.linkWidth
      };
    }
  },
  created() {
    var res = DataService.getGraph();
    res.then(response => {
      this.nodes = response.data.nodes;
      this.links = response.data.links;
    });
  },
  methods: {
    nodeClick(event, node) {
      node._cssClass = '';
    }
  }
};
</script>

<style scoped src="vue-d3-network/dist/vue-d3-network.css"></style>
