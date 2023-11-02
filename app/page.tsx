"use client";
import { Box, Grid, Heading } from '@radix-ui/themes'
import Image from 'next/image'
import BarChart from './helper/chart/dash/BarChart';
import RadarChart from './helper/chart/dash/RadarChart';

export default function Home() {
  return (
    <main>
      <Heading as='h1'>Dashboard</Heading>
      <Grid columns='2' gap="7" width="auto" >
        <Box>
          <div>
            <h1>Bar Chart Example</h1>
            <BarChart />
          </div>
        </Box>
        <Box>
          <div>
            <h1>Radar Chart Example</h1>
            <RadarChart />
          </div>
        </Box>
      </Grid>
    </main>
  )
}
