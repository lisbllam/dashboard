import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps{
   arrValues1name: string; 
   arrValues2name: string;
   arrLabelsname: string;
   arrValues1: number[];
   arrValues2: number[];
   arrLabels: string[];
   arrValues1Unit: string;
   arrValues2Unit: string
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>, arrValues1Unit: string, arrValues2Unit: string) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index] + " " + arrValues1Unit,
      value2: arrValues2[index] + " " + arrValues2Unit
   }));
}

export default function TableUI(props: TableUIProps) {

   const rows = combineArrays(props.arrLabels, props.arrValues1, props.arrValues2, props.arrValues1Unit, props.arrValues2Unit);

   const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: props.arrLabelsname,
      width: 125,
   },
   {
      field: 'value1',
      headerName: props.arrValues1name,
      width: 125,
   },
   {
      field: 'value2',
      headerName: props.arrValues2name,
      width: 125,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
   ];

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}