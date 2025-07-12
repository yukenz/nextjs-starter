"use client"

import "chart.js/auto";
import type {ChartData, ChartOptions, Plugin} from "chart.js";


import {Line} from "react-chartjs-2";

import {CHART_COLORS, days, transparentize} from '@/lib/chart-utils'
import {useEffect, useRef} from "react";
import {ChartJSOrUndefined} from "@/node_modules/react-chartjs-2/dist/types";


const DATA_COUNT = 30;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const data: ChartData<'line', number[]> = {
    labels: days({count: DATA_COUNT}),
    datasets: [
        {
            label: 'Dataset 1',
            // data: numbers(NUMBER_CFG),
            data: [65.40123457, 77.08419067, 65.20747599, 93.9686214, 46.08367627, 33.89831962, 77.16563786, 47.49056927, 79.44101509, 48.32561728, 14.63820302, 35.16889575, 40.781893, 80.85991084, 34.41529492, 87.86779835, 79.48902606, 10.51354595, 22.91666667, 43.85888203, 96.79698217, 79.26183128, 7.30281207, 26.5989369, 90.23662551, 3.15414952, 33.25274348, 89.17438272, 64.74622771, 50.09173525], // Ethereum Prices
            fill: false,
            pointStyle: 'circle',
            borderColor: CHART_COLORS.green,
            borderWidth: 1,
            backgroundColor: transparentize(CHART_COLORS.red, 0.5),
            pointRadius: 5,
        },
    ],
};

const options: ChartOptions<'line'> = {
    animations: {
        tension: {
            duration: 500,
            easing: 'linear',
            from: 0.2,
            to: 0,
            loop: true
        },
    },
    scales: {
        y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
        }
    },
    interaction: {
        intersect: false,
        // mode: 'index',
    },
    plugins: {
        tooltip: {
            enabled: true,
            // Color
            titleColor: CHART_COLORS.green,
            bodyColor: CHART_COLORS.red,
            footerColor: CHART_COLORS.blue,
            backgroundColor: CHART_COLORS.yellow,
            borderColor: CHART_COLORS.purple,
            cornerRadius: 10,
            animation: {
                duration: 100,
                easing: 'linear',
            },
            // Custom Value
            callbacks: {
                footer: (tooltipItems) => {

                    let sum = 0;
                    tooltipItems.forEach(function (tooltipItem) {
                        sum += tooltipItem.parsed.y;
                    });

                    return 'Sum: ' + sum;
                },
            }
        },
        legend: {
            labels: {
                font: {
                    family: "Monserat",
                    size: 14,
                    style: 'inherit',
                    weight: 'normal',
                    lineHeight: 1,
                }
            }
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
    }
}

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const plugin: Plugin<'line'> = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

export default function Page() {

    const chartRef = useRef({} as ChartJSOrUndefined<"line">);

    useEffect(() => {
        console.log(JSON.stringify(data))

        console.log(chartRef.current)

    }, [])

    return (<>
        <Line
            ref={chartRef}
            data={data}
            options={options}
            // plugins={[plugin]}
        />
    </>)
}
