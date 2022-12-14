import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieComponent = ({ like, dislike }) => {
    const data = {
        labels: ['Like', 'Dislike'],
        datasets: [
            {
                label: '# of Votes',
                data: [like, dislike],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const saveChart = () => {
        const storyChart = document.getElementById('storyChart');
        storyChart.toBlob(function (blob) {
            saveAs(blob, "chart.png")
        });
    };

    return (
        <div style={{ width: '20%', margin: 'auto' }}>
            <Pie id='storyChart' data={data} />
            <Button
                variant='outlined'
                size='small'
                sx={{ marginTop: '3%' }}
                onClick={saveChart}
            >Download</Button>
        </div>
    );
};

export default PieComponent;
