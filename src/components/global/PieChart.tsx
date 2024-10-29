import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface PieChartProps {
  data: [string, number][];
  name: string;
  halfPie?: boolean;
  title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  name,
  title,
  halfPie,
}) => {
  const titleOptions: Highcharts.TitleOptions = {
    text: title,
    ...(halfPie ? { align: "center", verticalAlign: "middle", y: 60 } : {}),
  };

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      plotShadow: false,
      height: 300,
    },
    ...(title ? { title: titleOptions } : {}),
    plotOptions: {
      pie: {
        ...(halfPie
          ? {
              startAngle: -90,
              endAngle: 90,
              center: ["50%", "75%"],
              size: "110%",
              innerSize: "60%",
            }
          : {}),
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
        },
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    series: [
      {
        type: "pie",
        name,
        data,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};
