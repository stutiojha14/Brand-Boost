
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { TrendingUp, Users, MousePointer, Target, BarChart as BarChartIcon, PieChart as PieChartIcon, Activity } from "lucide-react";

const analyticsData = [
  { name: 'Jan', impressions: 4000, clicks: 2400, conversions: 600, ctr: 5.2 },
  { name: 'Feb', impressions: 5000, clicks: 2800, conversions: 820, ctr: 5.6 },
  { name: 'Mar', impressions: 6000, clicks: 3400, conversions: 950, ctr: 5.8 },
  { name: 'Apr', impressions: 8000, clicks: 4300, conversions: 1200, ctr: 5.4 },
  { name: 'May', impressions: 9500, clicks: 5200, conversions: 1500, ctr: 5.5 },
  { name: 'Jun', impressions: 11000, clicks: 6100, conversions: 1700, ctr: 5.6 },
  { name: 'Jul', impressions: 13000, clicks: 7300, conversions: 2000, ctr: 5.7 },
  { name: 'Aug', impressions: 14500, clicks: 8000, conversions: 2200, ctr: 5.5 },
];

const performanceData = [
  { name: 'Campaign A', performance: 85 },
  { name: 'Campaign B', performance: 72 },
  { name: 'Campaign C', performance: 90 },
  { name: 'Campaign D', performance: 65 },
  { name: 'Campaign E', performance: 78 },
];

const audienceData = [
  { name: 'Male', value: 65 },
  { name: 'Female', value: 32 },
  { name: 'Other', value: 3 },
];

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const radarData = [
  {
    subject: 'Engagement',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Reach',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Conversion',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Retention',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Growth',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Satisfaction',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const hourlyData = [
  { hour: '00:00', traffic: 2400 },
  { hour: '03:00', traffic: 1800 },
  { hour: '06:00', traffic: 2800 },
  { hour: '09:00', traffic: 5800 },
  { hour: '12:00', traffic: 7800 },
  { hour: '15:00', traffic: 8200 },
  { hour: '18:00', traffic: 6500 },
  { hour: '21:00', traffic: 4200 },
];

const StatCard = ({ title, value, icon, description, trend, color }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-md bg-${color}/10`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`text-xs flex items-center mt-1 text-${trend === "up" ? "green" : "red"}-600`}>
          {trend === "up" ? "↑" : "↓"} {Math.abs(Math.random() * 10).toFixed(1)}%
        </div>
      </CardContent>
    </Card>
  );
};

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "#8B5CF6",
  },
  clicks: {
    label: "Clicks",
    color: "#3B82F6",
  },
  conversions: {
    label: "Conversions",
    color: "#10B981",
  },
  ctr: {
    label: "CTR %",
    color: "#F59E0B",
  },
};

const AnalyticsDashboard = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Impressions" 
            value="43.5k"
            icon={<Users className="h-4 w-4 text-purple-500" />}
            description="Total ad views last 30 days" 
            trend="up"
            color="purple"
          />
          <StatCard 
            title="Click-through Rate" 
            value="5.2%"
            icon={<MousePointer className="h-4 w-4 text-blue-500" />}
            description="Average CTR across all campaigns" 
            trend="up"
            color="blue"
          />
          <StatCard 
            title="Conversion Rate" 
            value="3.8%"
            icon={<Target className="h-4 w-4 text-emerald-500" />}
            description="Of clicks resulting in conversions" 
            trend="down"
            color="emerald"
          />
          <StatCard 
            title="Growth" 
            value="18.2%"
            icon={<TrendingUp className="h-4 w-4 text-amber-500" />}
            description="Month over month performance" 
            trend="up"
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Overall metrics for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={chartConfig}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="#8B5CF6" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#3B82F6" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      stroke="#10B981" 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Audience Engagement</CardTitle>
              <CardDescription>Engagement scores by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Demographics</CardTitle>
                <PieChartIcon size={16} className="text-muted-foreground" />
              </div>
              <CardDescription>Audience breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Daily Traffic</CardTitle>
                <BarChartIcon size={16} className="text-muted-foreground" />
              </div>
              <CardDescription>Hourly visitor distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="traffic" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Campaign Analysis</CardTitle>
                <Activity size={16} className="text-muted-foreground" />
              </div>
              <CardDescription>Current vs Previous</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={80} data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Current" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                    <Radar name="Previous" dataKey="B" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Extended campaign performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="impressions" name="Impressions" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#3B82F6" />
                  <Line yAxisId="right" type="monotone" dataKey="ctr" name="CTR %" stroke="#F59E0B" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
