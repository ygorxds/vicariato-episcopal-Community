<template>
  <div>
    <pie-chart :data="datacollection" :options="options"/>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => [40, 20, 10]
    },
    chartLabels: {
      type: Array,
      required: true,
      default: () => ["Masculino", "Feminino", "Outro"]
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    datacollection() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            data: this.chartData
          }
        ]
      };
    }
  },
  mounted() {
    this.renderChart(this.datacollection, this.options)
  }
}
</script>
