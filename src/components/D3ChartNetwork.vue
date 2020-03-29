<template>
  <div>
    <div class="controls">
      <h1>Control here</h1>
      <div>
        <label> Force </label>
        <input type="range" min="-2000" max="0" v-model="force" />
        {{ options.force }}
      </div>
      <div>
        <label> Edge width </label>
        <input type="range" min="0" max="10" v-model="linkWidth" />
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
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import DataService from '@/services/DataService.js';

export default {
  name: 'D3ChartNetwork',
  data() {
    return {
      nodes: Object,
      links: Object,
      width: 1,
      height: 1,
      svg: Object,
      simulation: Object,

      displayNodeLabels: true,
      force: -1000,
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
  mounted() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.svg = d3
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  },
  created() {
    var res = DataService.getGraph();
    res.then(response => {
      this.nodes = response.data.nodes;
      this.links = response.data.links;
      // console.log(this.nodes);
      // console.log(this.links);
      this.initialize();
    });
  },
  methods: {
    initialize() {
      const nodeGroupElements = this.svg
        .append('g')
        .selectAll('node')
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

      const nodeCircleElemtns = nodeGroupElements
        .append('circle')
        .attr('r', 20)
        .call(d3.drag().on('drag', dragged));

      const nodeTextElemtns = nodeGroupElements
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('pointer-events', 'none')
        .text(d => d.name);

      const linkElements = this.svg
        .append('g')
        .selectAll('line')
        .data(this.links)
        .enter()
        .append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#aaa');
      console.log(nodeCircleElemtns.nodes()[0]);
      console.log(nodeCircleElemtns.nodes()[0].cx);

      this.simulation = d3
        .forceSimulation(this.nodes)
        .force('charge', d3.forceManyBody().strength(this.options.force))
        .force(
          'link',
          d3
            .forceLink()
            // .id(d => d.id)
            .links(this.links)
        )
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .on('tick', ticked)
        .velocityDecay(0.4);

      function ticked() {
        nodeCircleElemtns
          .attr('cx', function(d) {
            return d.x;
          })
          .attr('cy', d => d.y);
        nodeTextElemtns.attr('dx', d => d.x).attr('dy', d => d.y);

        linkElements
          .attr('x1', function(d) {
            return d.source.x;
          })
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
      }
      function dragged(d) {
        (d.x = d3.event.x), (d.y = d3.event.y);
        d3.select(this)
          .attr('cx', d.x)
          .attr('cy', d.y);
        d3.select(this.parentNode)
          .select('text')
          .attr('dx', d.x)
          .attr('dy', d.y);
        linkElements
          .filter(function(l) {
            return l.source === d;
          })
          .attr('x1', d.x)
          .attr('y1', d.y);
        linkElements
          .filter(function(l) {
            return l.target === d;
          })
          .attr('x2', d.x)
          .attr('y2', d.y);
      }
    }
  }
};
</script>

<style>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: red;
  stroke-width: 3px;
}
.node > text {
  stroke: #333;
}

.node > circle {
  stroke: #555;
  stroke-width: 3px;
  fill: white;
  cursor: pointer;
}
</style>
