//import { useState } from 'react'
import { Grid } from '@mui/material'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import './App.css'

function App() {
  const dataFetcherOutput = useFetchData();


  return (

    <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={12}>
          <HeaderUI/>
          </Grid>

         {/* Alertas */}
         <Grid container justifyContent="right" alignItems="center">
          <AlertUI description="No se preveen lluvias"/>
         </Grid>

         {/* Selector */}
         <Grid size={{xs: 12, md: 3}}><SelectorUI/></Grid>

         {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9}}>
              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput &&
                      (<IndicatorUI
                          title='Temperatura (2m)'
                          description={ `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` } />
                      )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput &&
                      (<IndicatorUI
                          title='Temperatura aparente'
                          description={ `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}` } />
                      )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput &&
                    (<IndicatorUI
                        title='Velocidad del viento' 
                        description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />  
                    )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput &&
                    (<IndicatorUI
                        title='Humedad relativa'
                        description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />  
                    )
                  }
              </Grid>
          </Grid>

         {/* Gráfico */}
         <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block"} }}>
            {dataFetcherOutput &&
                (<ChartUI
                    arrValues2={dataFetcherOutput.hourly.time.map(t => new Date(t).getTime()).slice(0, 10)}
                    arrValues1={dataFetcherOutput.hourly.temperature_2m.slice(0, 10)}
                    arrLabels= {["Hora", "Temperatura"]}
                />
                )
            }
         </Grid>

         {/* Tabla */}
         <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block" } }}>
            <TableUI/>
         </Grid>

         {/* Información adicional */}
         <Grid size={12}>Elemento: Información adicional</Grid>

      </Grid>
  )
}
export default App
