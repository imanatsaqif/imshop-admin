<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed,
  inject,
  nextTick,
} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "Distribution Chart",
  },
});

const theme = inject("theme");
const chartRef = ref(null);
let chartInstance = null;

const colorPalette = ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6", "#f1c40f"];

const getThemeOptions = computed(() => {
  const isDark = theme?.value === "dark";

  return {
    backgroundColor: isDark ? "#1e272e" : "#ffffff",
    textStyle: {
      color: isDark ? "#ecf0f1" : "#2c3e50",
    },
  };
});

const generatePieChartOptions = computed(() => {
  const themeOptions = getThemeOptions.value;

  return {
    ...themeOptions,

    title: { show: false },

    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderColor: "#0072ff",
      textStyle: { color: "#ffffff" },
    },

    legend: {
      orient: "horizontal",
      left: "center",
      bottom: 8,
      itemGap: 16,
      icon: "circle",
      textStyle: {
        color: themeOptions.textStyle.color,
        fontSize: 12,
      },
    },

    series: [
      {
        name: props.title,
        type: "pie",
        radius: ["45%", "70%"],
        center: ["50%", "48%"],

        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: themeOptions.backgroundColor,
          borderWidth: 2,
        },

        label: {
          show: true,
          formatter: "{b}: {d}%",
          fontSize: 12,
          lineHeight: 14,
        },

        labelLine: {
          show: true,
          length: 10,
          length2: 8,
          smooth: true,
        },

        data: props.data.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: colorPalette[index % colorPalette.length],
          },
        })),
      },
    ],

    animation: true,
    animationDuration: 800,
  };
});

const renderChart = async () => {
  await nextTick();

  if (!chartRef.value) return;

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
  }

  chartInstance.setOption(generatePieChartOptions.value, true);

  chartInstance.resize({
    width: chartRef.value.clientWidth,
    height: chartRef.value.clientHeight,
  });
};

onMounted(() => {
  renderChart();

  const handleResize = () => {
    if (!chartRef.value || !chartInstance) return;

    chartInstance.resize({
      width: chartRef.value.clientWidth,
      height: chartRef.value.clientHeight,
    });
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    chartInstance?.dispose();
    chartInstance = null;
  });
});

watch(
  () => props.data,
  () => {
    if (chartInstance) {
      chartInstance.setOption(generatePieChartOptions.value, true);
    }
  },
  { deep: true },
);

watch(
  () => theme?.value,
  () => {
    if (chartInstance) {
      chartInstance.setOption(generatePieChartOptions.value, true);
    }
  },
);
</script>

<template>
  <div class="chart-container">
    <!-- FIXED semantic heading -->
    <h2 v-if="title" class="chart-title">
      {{ title }}
    </h2>

    <div
      ref="chartRef"
      class="chart-canvas"
      :style="{
        backgroundColor: theme === 'dark' ? '#1e272e' : '#ffffff',
      }"
    ></div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  padding: 0.5rem;
}

/* fixed semantic title */
.chart-title {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  line-height: 1.25;
  color: var(--blu-color-neutral-text-high);
  text-align: center;
  font-size: 1.25rem; /* h2 */
}

.chart-canvas {
  width: 100%;
  height: 360px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--blu-color-neutral-border-default);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  border-radius: 8px;
}

.chart-canvas:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.chart-canvas canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

@media (max-width: 768px) {
  .chart-canvas {
    height: 340px;
  }
}
</style>
