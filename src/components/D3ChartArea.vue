<template>
  <div>
    <svg @mousemove="mouseover" :width="width" :height="height">
      <g :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <path class="area" :d="paths.area" />
        <path class="line" :d="paths.line" />
        <path class="selector" :d="paths.selector" />
      </g>
    </svg>
  </div>
</template>

<script>
// /* globals window, requestAnimationFrame */

import * as d3 from 'd3';
const TWEEN = require('@tweenjs/tween.js');
const props = {
  data: {
    type: Array,
    default: () => []
  },
  margin: {
    type: Object,
    default: () => ({
      left: 0,
      right: 0,
      top: 10,
      bottom: 10
    })
  },
  ceil: {
    type: Number,
    default: 100
  }
};
export default {
  name: 'D3ChartArea',
  props,
  data() {
    return {
      width: 0,
      height: 0,
      paths: {
        area: '',
        line: '',
        selector: ''
      },
      lastHoverPoint: {},
      scaled: {
        x: null,
        y: null
      },
      animatedData: [],
      points: []
    };
  },
  computed: {
    padded() {
      const width = this.width - this.margin.left - this.margin.right;
      const height = this.height - this.margin.top - this.margin.bottom;
      return { width, height };
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    data: function dataChanged(newData, oldData) {
      this.tweenData(newData, oldData);
    },
    width: function widthChanged() {
      this.initialize();
      this.update();
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    },
    createArea: d3
      .area()
      .x(d => d.x)
      .y0(d => d.max)
      .y1(d => d.y),
    createLine: d3
      .line()
      .x(d => d.x)
      .y(d => d.y),
    createValueSelector: d3
      .area()
      .x(d => d.x)
      .y0(d => d.max)
      .y1(0),
    initialize() {
      this.scaled.x = d3.scaleLinear().range([0, this.padded.width]);
      this.scaled.y = d3.scaleLinear().range([this.padded.height, 0]);
      d3.axisLeft().scale(this.scaled.x);
      d3.axisBottom().scale(this.scaled.y);
    },
    tweenData(newData, oldData) {
      const vm = this;
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      new TWEEN.Tween(oldData)
        .easing(TWEEN.Easing.Quadratic.Out)
        .to(newData, 500)
        .onUpdate(function onUpdate() {
          vm.animatedData = this;
          vm.update();
        })
        .start();
      animate();
    },
    update() {
      this.scaled.x.domain(d3.extent(this.data, (d, i) => i));
      this.scaled.y.domain([0, this.ceil]);
      this.points = [];
      for (const [i, d] of this.animatedData.entries()) {
        this.points.push({
          x: this.scaled.x(i),
          y: this.scaled.y(d),
          max: this.height
        });
      }
      this.paths.area = this.createArea(this.points);
      this.paths.line = this.createLine(this.points);
    },
    mouseover({ offsetX }) {
      if (this.points.length > 0) {
        const x = offsetX - this.margin.left;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.points[closestPoint.index];
          this.paths.selector = this.createValueSelector([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.points
        .map((point, index) => ({
          x: point.x,
          diff: Math.abs(point.x - x),
          index
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    }
  }
};
</script>
