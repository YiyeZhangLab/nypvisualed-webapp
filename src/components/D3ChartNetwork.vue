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
        <label>Node Size</label>
        <input type="range" min="2" max="50" v-model="nodeSize" v-on:change="updateControl()" />
        {{ nodeSize }}
      </div>
      <div>
        <label>Node Label:</label>
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

    <svg />
  </div>
</template>

<script>
import * as d3 from 'd3';
import DataService from '@/services/DataService.js';
import _ from 'lodash';
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
      d3.selectAll('text').style('display', this.displayNodeLabels ? 'block' : 'none');
    },
    initialize() {
      this.svg
        .append('defs')
        .selectAll('marker')
        .data(['end']) // Different link/path types can be defined here
        .enter()
        .append('marker') // This section adds in the arrows
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', -1.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5');

      const nodeGroupElements = this.svg
        .append('g')
        .selectAll('node')
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

      var links = this.links;
      _.each(links, function(link) {
        // find other links with same target+source or source+target
        var same = _.filter(links, {
          source: link.source,
          target: link.target
        });
        var sameAlt = _.filter(links, {
          source: link.target,
          target: link.source
        });
        var sameAll = same.concat(sameAlt);

        _.each(sameAll, function(s, i) {
          s.sameIndex = i + 1;
          s.sameTotal = sameAll.length;
          s.sameTotalHalf = s.sameTotal / 2;
          s.sameUneven = s.sameTotal % 2 !== 0;
          s.sameMiddleLink = s.sameUneven === true && Math.ceil(s.sameTotalHalf) === s.sameIndex;
          s.sameLowerHalf = s.sameIndex <= s.sameTotalHalf;
          s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
          s.sameIndexCorrected = s.sameLowerHalf
            ? s.sameIndex
            : s.sameIndex - Math.ceil(s.sameTotalHalf);
        });
      });

      var maxSame = _.chain(links)
        .sortBy(function(x) {
          return x.sameTotal;
        })
        .last()
        .value().sameTotal;

      _.each(links, function(link) {
        link.maxSameHalf = Math.floor(maxSame / 3);
      });

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
        .selectAll('path')
        .data(this.links)
        .enter()
        .append('svg:path')
        .attr('class', 'link')
        .attr('stroke-width', 1)
        .attr('stroke', 'red');

      for (var i = 0; i < linkElements.length; i++) {
        if (
          i != 0 &&
          linkElements[i].source == linkElements[i - 1].source &&
          linkElements[i].target == linkElements[i - 1].target
        ) {
          linkElements[i].linknum = linkElements[i - 1].linknum + 1;
        } else {
          linkElements[i].linknum = 1;
        }
      }

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
        .on('tick', ticked);
      // .velocityDecay(0.4);

      function linkArc(d) {
        var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy) * 3,
          unevenCorrection = d.sameUneven ? 0 : 0.5,
          arc = (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection);

        if (d.sameMiddleLink) {
          arc = 0;
        }

        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          'A' +
          arc +
          ',' +
          arc +
          ' 0 0,' +
          d.sameArcDirection +
          ' ' +
          d.target.x +
          ',' +
          d.target.y
        );
      }
      function ticked() {
        nodeCircleElemtns
          .attr('cx', function(d) {
            return d.x;
          })
          .attr('cy', d => d.y);
        nodeTextElemtns.attr('dx', d => d.x).attr('dy', d => d.y);

        linkElements.attr('d', linkArc);
      }
      var sim = this.simulation;
      function dragged(d) {
        if (!d3.event.active) sim.alphaTarget(0.3).restart();
        (d.fx = d.x), (d.fy = d.y);

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
.link {
  fill: none;
  stroke: black;
  stroke-width: 0.2px;
}
</style>
