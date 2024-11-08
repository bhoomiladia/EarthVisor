import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { fetchEmissions } from '../services/api';

const EmissionsDashboard = () => {
  const [emissionsData, setEmissionsData] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [doughnutChartData, setDoughnutChartData] = useState({});

  useEffect(() => {
    const getEmissionsData = async () => {
      const data = await fetchEmissions();
      setEmissionsData(data);

      // Prepare data for the line chart (emissions over time)
      setLineChartData({
        labels: data.map(entry => entry.date), // x-axis: dates
        datasets: [
          {
            label: 'Emissions (kg CO2)',
            data: data.map(entry => entry.emissions_calculated), // y-axis: emissions values
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
        ],
      });

      // Prepare data for the doughnut chart (emissions per vehicle)
      const vehicleEmissions = data.reduce((acc, entry) => {
        acc[entry.vehicle_id] = (acc[entry.vehicle_id] || 0) + entry.emissions_calculated;
        return acc;
      }, {});

      setDoughnutChartData({
        labels: Object.keys(vehicleEmissions),
        datasets: [
          {
            data: Object.values(vehicleEmissions),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      });
    };

    getEmissionsData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emissions Dashboard</h1>

      {/* Line Chart for Emissions Over Time */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Emissions Over Time</h2>
        <Line data={lineChartData} />
      </div>

      {/* Doughnut Chart for Emissions per Vehicle */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Emissions per Vehicle</h2>
        <Doughnut data={doughnutChartData} />
      </div>

      {/* List of Emissions Entries */}
      <ul className="grid grid-cols-1 gap-4">
        {emissionsData.map((entry) => (
          <li key={entry.id} className="p-4 bg-gray-100 rounded shadow">
            <p>Vehicle ID: {entry.vehicle_id}</p>
            <p>Distance Traveled: {entry.distance_traveled} miles</p>
            <p>Emissions: {entry.emissions_calculated} kg CO2</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmissionsDashboard;
