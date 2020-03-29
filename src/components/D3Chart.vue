<template>
  <div>
    <svg>
      <g>
        <path :d="line" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'D3Chart',
  data() {
    return {
      data: [10, 20, 50, 30, 100, 50, 30],
      line: ''
    };
  },
  mounted() {
    this.calculatePath();
  },
  methods: {
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
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
</style>
