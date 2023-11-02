import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const RadarChart: React.FC = () => {
    // const data = [
    //     {
    //         subject: 'Math',
    //         A: 120,
    //         B: 110,
    //         fullMark: 150,
    //     },
    //     {
    //         subject: 'English',
    //         A: 98,
    //         B: 130,
    //         fullMark: 150,
    //     },
    //     {
    //         subject: 'Science',
    //         A: 86,
    //         B: 130,
    //         fullMark: 150,
    //     },
    //     {
    //         subject: 'History',
    //         A: 99,
    //         B: 100,
    //         fullMark: 150,
    //     },
    //     {
    //         subject: 'Geography',
    //         A: 85,
    //         B: 90,
    //         fullMark: 150,
    //     },
    // ];

    const data = [
        {taste: "chardonay", chardonay:26, carmenere:53,syrah:51},
        {taste: "cola", chardonay:116, carmenere:3,syrah:21},
        {taste: "syrah", chardonay:66, carmenere:83,syrah:41},
        {taste: "ini", chardonay:96, carmenere:23,syrah:71},
        {taste:"carmenere", chardonay:43,carmenere:17,syrah:74}
    ];

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveRadar
                data={data}
                keys={[ 'chardonay', 'carmenere', 'syrah' ]}
                indexBy="taste"
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default RadarChart;
