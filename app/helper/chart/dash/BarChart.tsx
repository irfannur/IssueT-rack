import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart: React.FC = () => {
    const data = [
        { country: 'A', value: 10 },
        { country: 'B', value: 20 },
        { country: 'C', value: 15 },
        { country: 'D', value: 25 },
        { country: 'E', value: 30 },
    ];

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveBar
                data={data}
                keys={['value']}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default BarChart;
