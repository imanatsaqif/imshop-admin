<!-- components/SimpleChart.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: Array,
});

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  chartInstance.setOption({
    xAxis: {
      type: "category",
      data: props.data?.map((item) => item.name) || [],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: props.data?.map((item) => item.value) || [],
        type: "bar",
      },
    ],
  });
});

onUnmounted(() => {
  chartInstance?.dispose();
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 300px"></div>
</template>
