import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const habitsList = [
  "Sleep (7+ hrs)", "Workout", "Diet Clean", "Water Intake",
  "Sunlight", "Cold Shower", "Mindset Practice", "Supplements"
];

export default function App() {
  const [habits, setHabits] = useState(habitsList);
  const [keyData, setKeyData] = useState([]);

  useEffect(() => {
    // Fake demo data for the chart
    const demoData = [
      { date: 'Mon', value: 3 },
      { date: 'Tue', value: 5 },
      { date: 'Wed', value: 4 },
      { date: 'Thu', value: 6 },
      { date: 'Fri', value: 7 },
      { date: 'Sat', value: 5 },
      { date: 'Sun', value: 6 },
    ];
    setKeyData(demoData);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>ConvergeTrack</h1>
      <ul>
        {habits.map((habit, i) => (
          <li key={i}>{habit}</li>
        ))}
      </ul>

      <h2>Weekly Habit Score</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={keyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}