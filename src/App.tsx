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
import { useState } from 'react';

import './App.css'

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dataFetcherOutput = useFetchData(selectedOption);

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
         <Grid size={{xs: 12, md: 3}} style= {{backgroundColor: "#FFFFFF", borderRadius: "4px"}}>
            <SelectorUI onOptionSelect={setSelectedOption} />
        </Grid>

         {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9}}>
              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput.data &&
                      (<IndicatorUI
                          title='Temperatura (2m)'
                          description={ `${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}` } />
                      )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput.data &&
                      (<IndicatorUI
                          title='Temperatura aparente'
                          description={ `${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}` } />
                      )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput.data &&
                    (<IndicatorUI
                        title='Velocidad del viento' 
                        description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`} />  
                    )
                  }
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                  {dataFetcherOutput.data &&
                    (<IndicatorUI
                        title='Humedad relativa'
                        description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`} />  
                    )
                  }
              </Grid>
          </Grid>

         {/* Gráfico */}
         <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block"} }} style= {{backgroundColor: "#FFFF"}}>
            {dataFetcherOutput.data &&
                (<ChartUI
                    arrValues1name= {"Temperatura [°C]"}
                    arrValues2name= {"Velocidad de Viento [km/h]"}
                    arrLabelsname= {"Hora"}
                    arrValues1= {dataFetcherOutput.data.hourly.temperature_2m.slice(0, 20)}
                    arrValues2= {dataFetcherOutput.data.hourly.wind_speed_10m.slice(0, 20)}
                    arrLabels= {dataFetcherOutput.data.hourly.time.slice(0, 20)
                        .map(t =>
                            new Date(t).toLocaleTimeString("es-EC", {
                            hour: "2-digit",
                            minute: "2-digit",
                            })
                        )}
                />
                )
            }
         </Grid>

         {/* Tabla */}
         <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block" } }}>
            {dataFetcherOutput.data &&
                (<TableUI
                    arrValues1name= {"Temperatura"}
                    arrValues2name= {"Velocidad de Viento"}
                    arrLabelsname= {"Hora"}
                    arrValues1= {dataFetcherOutput.data.hourly.temperature_2m.slice(0, 20)}
                    arrValues2= {dataFetcherOutput.data.hourly.wind_speed_10m.slice(0, 20)}
                    arrLabels= {dataFetcherOutput.data.hourly.time.slice(0, 20)
                        .map(t =>
                            new Date(t).toLocaleTimeString("es-EC", {
                            hour: "2-digit",
                            minute: "2-digit",
                            })
                        )}
                    arrValues1Unit= {dataFetcherOutput.data.hourly_units.temperature_2m}
                    arrValues2Unit= {dataFetcherOutput.data.hourly_units.wind_speed_10m}
                />
                )
            }
         </Grid>

         {/* Información adicional */}
         <Grid size={12}>Elemento: Información adicional</Grid>

      </Grid>
  )
}
export default App
