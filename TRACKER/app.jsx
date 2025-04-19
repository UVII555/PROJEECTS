// App.jsx
"homepage": 
"https://UVI155.github.io/CONVERGETRACK"
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const habitsList = [
  "Sleep (7+ hrs)",
  "Workout",
  "Diet Clean",
  "Water Intake",
  "Sunlight",
  "Cold Shower",
  "Mindset Practice",
  "Supplements"
];

export default function App() {
  const [habits, setHabits] = useState({});
  const [water, setWater] = useState(0);
  const [date, setDate] = useState('');
  const [weeklyData, setWeeklyData] = useState([]);

  // Load today's data
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setDate(todayStr);

    const saved = JSON.parse(localStorage.getItem(todayStr)) || {};
    setHabits(saved);
    setWater(saved.water || 0);
  }, []);

  // Save today's data on change
  useEffect(() => {
    if (date) {
      localStorage.setItem(date, JSON.stringify({ ...habits, water }));
    }
  }, [habits, water, date]);

  // Load weekly progress chart data
  useEffect(() => {
    if (!date) return;

    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const entry = JSON.parse(localStorage.getItem(key)) || {};

      let score = habitsList.reduce((acc, habit) => acc + (entry[habit] ? 1 : 0), 0);
      score += entry.water || 0;
      data.push({ day: key.slice(5), score: Math.round(score * 10) / 10 });
    }

    setWeeklyData(data);
  }, [date]);

  const toggleHabit = (habit) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">ConvergeTrack</h1>
      <p className="text-center text-sm text-gray-400">Boost your mind & body daily</p>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="grid gap-4 py-4">
          {habitsList.map((habit) => (
            <Toggle
              key={habit}
              pressed={habits[habit]}
              onPressedChange={() => toggleHabit(habit)}
              className="justify-start w-full text-left"
            >
              {habit} {habits[habit] ? "✔️" : ""}
            </Toggle>
          ))}
          <div className="mt-4">
            <label className="block text-sm">Water Intake: {water}L</label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={water}
              onChange={(e) => setWater(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-500 text-sm">Date: {date}</p>
      </div>
    </div>
  );
}
// App.jsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const habitsList = [
  "Sleep (7+ hrs)",
  "Workout",
  "Diet Clean",
  "Water Intake",
  "Sunlight",
  "Cold Shower",
  "Mindset Practice",
  "Supplements"
];

export default function App() {
  const [habits, setHabits] = useState({});
  const [water, setWater] = useState(0);
  const [date, setDate] = useState('');
  const [weeklyData, setWeeklyData] = useState([]);

  // Load today's habits
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setDate(todayStr);

    const saved = JSON.parse(localStorage.getItem(todayStr)) || {};
    setHabits(saved);
    setWater(saved.water || 0);
  }, []);

  // Save changes to today's habits
  useEffect(() => {
    if (date) {
      localStorage.setItem(date, JSON.stringify({ ...habits, water }));
    }
  }, [habits, water, date]);

  // Generate weekly progress data
  useEffect(() => {
    if (!date) return;

    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const entry = JSON.parse(localStorage.getItem(key)) || {};

      let score = habitsList.reduce(
        (acc, habit) => acc + (entry[habit] ? 1 : 0),
        0
      );
      score += entry.water || 0;

      data.push({
        day: key.slice(5), // MM-DD
        score: Math.round(score * 10) / 10
      });
    }

    setWeeklyData(data);
  }, [date]);

  const toggleHabit = (habit) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">ConvergeTrack</h1>
      <p className="text-center text-sm text-gray-400">
        Boost your mind & body daily
      </p>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="grid gap-4 py-4">
          {habitsList.map((habit) => (
            <Toggle
              key={habit}
              pressed={habits[habit]}
              onPressedChange={() => toggleHabit(habit)}
              className="justify-start w-full text-left"
            >
              {habit} {habits[habit] ? "✔️" : ""}
            </Toggle>
          ))}

          <div className="mt-4">
            <label className="block text-sm">Water Intake: {water}L</label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={water}
              onChange={(e) => setWater(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-500 text-sm">Date: {date}</p>
      </div>
    </div>
  );
}
// App.jsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const habitsList = [
  "Sleep (7+ hrs)",
  "Workout",
  "Diet Clean",
  "Water Intake",
  "Sunlight",
  "Cold Shower",
  "Mindset Practice",
  "Supplements"
];

export default function App() {
  const [habits, setHabits] = useState({});
  const [water, setWater] = useState(0);
  const [date, setDate] = useState('');
  const [weeklyData, setWeeklyData] = useState([]);

  // Load today's habits
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setDate(todayStr);

    const saved = JSON.parse(localStorage.getItem(todayStr)) || {};
    setHabits(saved);
    setWater(saved.water || 0);
  }, []);

  // Save changes to today's habits
  useEffect(() => {
    if (date) {
      localStorage.setItem(date, JSON.stringify({ ...habits, water }));
    }
  }, [habits, water, date]);

  // Generate weekly progress data
  useEffect(() => {
    if (!date) return;

    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const entry = JSON.parse(localStorage.getItem(key)) || {};

      let score = habitsList.reduce(
        (acc, habit) => acc + (entry[habit] ? 1 : 0),
        0
      );
      score += entry.water || 0;

      data.push({
        day: key.slice(5), // MM-DD
        score: Math.round(score * 10) / 10
      });
    }

    setWeeklyData(data);
  }, [date]);

  const toggleHabit = (habit) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">ConvergeTrack</h1>
      <p className="text-center text-sm text-gray-400">
        Boost your mind & body daily
      </p>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="grid gap-4 py-4">
          {habitsList.map((habit) => (
            <Toggle
              key={habit}
              pressed={habits[habit]}
              onPressedChange={() => toggleHabit(habit)}
              className="justify-start w-full text-left"
            >
              {habit} {habits[habit] ? "✔️" : ""}
            </Toggle>
          ))}

          <div className="mt-4">
            <label className="block text-sm">Water Intake: {water}L</label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={water}
              onChange={(e) => setWater(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-700">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-500 text-sm">Date: {date}</p>
      </div>
    </div>
  );
}
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}


