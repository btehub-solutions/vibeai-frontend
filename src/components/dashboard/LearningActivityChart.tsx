import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weeklyData = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 3.0 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 2.0 },
];

const monthlyData = [
  { name: "Week 1", hours: 12.5 },
  { name: "Week 2", hours: 15.8 },
  { name: "Week 3", hours: 10.5 },
  { name: "Week 4", hours: 18.2 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 !bg-black/80 !border-white/10 backdrop-blur-md rounded-xl shadow-xl">
        <p className="text-sm font-medium text-white mb-1">{label}</p>
        <p className="text-xs text-accent font-semibold">
          {payload[0].value} Hours
        </p>
      </div>
    );
  }
  return null;
};

export function LearningActivityChart() {
  const [view, setView] = useState("Weekly");
  const data = view === "Weekly" ? weeklyData : monthlyData;

  return (
    <div className="card-elevated p-4 sm:p-6 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          Learning Activity
        </h2>
        <select 
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="bg-secondary/50 text-[10px] sm:text-xs text-muted-foreground border-none rounded-lg px-2 py-1 outline-none"
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-[200px] sm:min-h-[250px] min-w-0">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHours)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
