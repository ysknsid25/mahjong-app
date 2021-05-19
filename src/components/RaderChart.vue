<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  mounted() {
    this.renderChart(
      {
        labels: ["攻", "守", "運"],
        datasets: [
          {
            label: "能力",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [70, 70, 70],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  },
};
</script>