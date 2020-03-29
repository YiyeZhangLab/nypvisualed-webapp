<template>
  <div>
    <h1>D3GraphNetwork</h1>
    <D3ChartNetwork />
    <h1>D3GraphArea</h1>
    <D3ChartArea />
    <h1>D3Graph Basic</h1>
    <D3Chart />
  </div>
</template>

<script>
import D3Chart from '@/components/D3Chart.vue';
import D3ChartArea from '@/components/D3ChartArea.vue';
import D3ChartNetwork from '@/components/D3ChartNetwork.vue';

export default {
  name: 'GraphNative',
  components: {
    D3Chart,
    D3ChartArea,
    D3ChartNetwork
  }
};
</script>

<style scoped></style>
