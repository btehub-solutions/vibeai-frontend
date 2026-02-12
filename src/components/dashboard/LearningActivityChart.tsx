import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 3.0 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 2.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
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
  return (
    <div className="card-elevated p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Learning Activity
        </h2>
        <select className="bg-secondary/50 text-xs text-muted-foreground border-none rounded-lg px-2 py-1 outline-none">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#666" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="hsl(var(--primary))"
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
