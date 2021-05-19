<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: ["", "", "", "", "", "", "", "", "", ""],
        datasets: [
          {
            label: "順位",
            data: [1, 1, 2, 4, 3, 3, 4, 2, 1, 4],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
            lineTension: 0,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                reverse: true,
                min: 0,
                max: 5,
                stepSize: 1,
                callback: (value) => {
                  if (value > 0 && value < 5) {
                    return value;
                  }
                  return "";
                },
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }
    );
  },
};
</script>