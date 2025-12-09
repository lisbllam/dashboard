import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
   arrValues1name: string; 
   arrValues2name: string;
   arrLabelsname: string;
   arrValues1?: readonly (number | null)[] | undefined;
   arrValues2?: readonly (number | null)[] | undefined;
   arrLabels?: readonly any[] | undefined;
 }

export default function ChartUI(props: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div" style={{color: "black" }}>
            Chart {props.arrLabelsname} vs {props.arrValues1name} & {props.arrValues2name}
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.arrValues1, label: props.arrValues1name},
               { data: props.arrValues2, label: props.arrValues2name},
            ]}
            xAxis={[{ scaleType: 'point', data: props.arrLabels}]}
         />
      </>
   );
}