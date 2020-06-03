<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "PieChart",
  props: ["data"],
  mounted() {
    // color list below came from https://stackoverflow.com/a/45489530/52160
    // reformat in the way the lib wants
    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Views by Category",
          data: [],
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA"
          ]
        }
      ]
    };
    chartData.labels = [];
    chartData.datasets[0].data = [];

    this.data.forEach(item => {
      chartData.labels.push(item.name);
      chartData.datasets[0].data.push(item.val);
    });

    let option = {
      responsive: true,
      maintainAspectRatio: true,
      legend: { position: "right", align: "center" }
    };

    this.renderChart(chartData, option);
  }
};
</script>