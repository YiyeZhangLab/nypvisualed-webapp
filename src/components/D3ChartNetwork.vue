<template>
  <div>
    <div class="controls">
      <h1>Control here</h1>
      <div>
        <div id="example-1">
          <button v-on:click="initialize">Initialize</button>
        </div>
      </div>
      <div>
        <label> Node Size </label>
        <input
          type="range"
          min="2"
          max="50"
          v-model="nodeSize"
          v-on:change="updateControl()"
        />
        {{ nodeSize }}
      </div>
      <div>
        <label>Node Label: </label>
        <input
          type="radio"
          :value="false"
          v-model="displayNodeLabels"
          v-on:change="updateControl()"
        />
        <label>Hide</label>
        <input
          type="radio"
          :value="true"
          v-model="displayNodeLabels"
          v-on:change="updateControl()"
        />
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
      counter: 1,
      nodes: Object,
      links: Object,
      width: 1,
      height: 1,
      svg: Object,
      simulation: Object,

      displayNodeLabels: true,
      force: -4000,
      linkWidth: 1,
      nodeSize: 5
    };
  },
  computed: {
    options() {
      return {
        force: this.force,
        nodeSize: this.nodeSize,
        nodeLabels: this.displayNodeLabels,
        linkLabels: true,
        linkWidth: this.linkWidth
      };
    }
  },
  mounted() {
    this.width = 1200;
    this.height = 1200;
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
      this.positions = response.data.positions;
      for (let [, v] of Object.entries(this.nodes)) {
        v.fx = this.positions[v.details].x;
        v.fy = this.positions[v.details].y;
      }
      // console.log(this.nodes);
      // console.log(this.links);
      this.initialize();
    });
  },
  methods: {
    warn(message, event) {
      // now we have access to the native event
      if (event) {
        event.preventDefault();
      }
      alert(message);
      alert(event);
    },
    updateControl() {
      d3.selectAll('circle').attr('r', this.nodeSize);
      d3.selectAll('text').style(
        'display',
        this.displayNodeLabels ? 'block' : 'none'
      );
      console.log(this.displayNodeLabels);
    },
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
        .attr('r', this.options.nodeSize)
        .attr('x', d => d.x)
        .call(d3.drag().on('drag', dragged));

      const nodeTextElemtns = nodeGroupElements
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('pointer-events', 'none')
        .text(d => d.details);

      const linkElements = this.svg
        .append('g')
        .selectAll('line')
        .data(this.links)
        .enter()
        .append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#aaa');

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
  margin: 5px;
  border: 1px solid green;
}

.node > circle {
  stroke: red;
  stroke-width: 1px;
  fill: rgb(207, 207, 207);
  cursor: pointer;
}
.node > text {
  fill: blue;
  stroke-width: 1px;
  font: 10px serif;
}

.node {
}
</style>
