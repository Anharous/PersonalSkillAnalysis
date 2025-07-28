import React from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function Analytics() {
  const platformStats = [
    { title: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Learners', value: '892', change: '+8%', icon: BookOpen, color: 'green' },
    { title: 'Avg. Completion Rate', value: '76%', change: '+5%', icon: Target, color: 'purple' },
    { title: 'Platform Uptime', value: '99.9%', change: '0%', icon: CheckCircle, color: 'emerald' },
  ];

  const learningMetrics = [
    { metric: 'Quiz Completion Rate', value: '84%', trend: 'up' },
    { metric: 'Average Study Time', value: '2.3h/day', trend: 'up' },
    { metric: 'Skill Gap Closure', value: '67%', trend: 'up' },
    { metric: 'Interview Success Rate', value: '73%', trend: 'down' },
  ];

  const topSkills = [
    { skill: 'JavaScript', learners: 456, completion: 78 },
    { skill: 'Python', learners: 389, completion: 82 },
    { skill: 'React', learners: 334, completion: 75 },
    { skill: 'System Design', learners: 298, completion: 65 },
    { skill: 'Docker', learners: 267, completion: 71 },
  ];

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected in region US-East', time: '5 min ago' },
    { type: 'info', message: 'Weekly backup completed successfully', time: '1 hour ago' },
    { type: 'success', message: 'New feature deployment completed', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 p-6 rounded-xl border border-${stat.color}-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-${stat.color}-800`}>{stat.title}</p>
                  <p className={`text-3xl font-bold text-${stat.color}-900 mt-2`}>{stat.value}</p>
                  <p className={`text-sm text-${stat.color}-700 mt-1`}>
                    <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span> vs last month
                  </p>
                </div>
                <IconComponent className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Learning Metrics</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          
          <div className="space-y-4">
            {learningMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{metric.metric}</p>
                  <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                alert.type === 'success' ? 'bg-green-50 border-green-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-sm font-medium ${
                  alert.type === 'warning' ? 'text-yellow-800' :
                  alert.type === 'success' ? 'text-green-800' :
                  'text-blue-800'
                }`}>
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Skills Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Most Popular Skills</h3>
          <Award className="w-5 h-5 text-purple-500" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Skill</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Active Learners</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Completion Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
              </tr>
            </thead>
            <tbody>
              {topSkills.map((skill, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{skill.skill}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-700">{skill.learners}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-700">{skill.completion}%</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${skill.completion}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Clock className="w-5 h-5 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'New user registration', user: 'john.doe@company.com', time: '2 minutes ago' },
            { action: 'Quiz completed', user: 'jane.smith@company.com', time: '5 minutes ago' },
            { action: 'Learning module finished', user: 'mike.wilson@company.com', time: '12 minutes ago' },
            { action: 'Mock interview completed', user: 'sarah.jones@company.com', time: '18 minutes ago' },
            { action: 'Skill assessment taken', user: 'alex.brown@company.com', time: '25 minutes ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}