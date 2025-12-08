import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
     arrValues1?: readonly (number | null)[] | undefined;
     arrValues2?: readonly (number | null)[] | undefined;
     arrLabels?: readonly any[] | undefined;
 }

export default function ChartUI(props: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Chart arrLabels vs arrValues1 & arrValues2
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.arrValues1, label: 'value1'},
               { data: props.arrValues2, label: 'value2'},
            ]}
            xAxis={[{ scaleType: 'point', data: props.arrLabels }]}
         />
      </>
   );
}