import { Award, ChevronRight, Star, Users } from 'lucide-react';

const TeamStructure = () => {
  // Mock downline team data
  const teamMembers = [
    { 
      id: 1, 
      name: 'Robert Johnson', 
      rank: 'Silver Executive', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
      monthlySales: 1850,
      teamSize: 12,
      isDirectRecruit: true,
      joinDate: '2022-08-10',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      rank: 'Gold Associate', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
      monthlySales: 2730,
      teamSize: 8,
      isDirectRecruit: true,
      joinDate: '2022-09-15',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'David Brown', 
      rank: 'Bronze Associate', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
      monthlySales: 950,
      teamSize: 3,
      isDirectRecruit: true,
      joinDate: '2022-11-20',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Emily Chen', 
      rank: 'Gold Executive', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
      monthlySales: 3150,
      teamSize: 15,
      isDirectRecruit: false,
      joinDate: '2022-07-05',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Michael Davis', 
      rank: 'Silver Associate', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
      monthlySales: 1430,
      teamSize: 5,
      isDirectRecruit: true,
      joinDate: '2023-01-18',
      status: 'active'
    }
  ];

  // Team statistics
  const teamStats = {
    totalMembers: 43,
    activeMembersPct: 92,
    totalTeamSales: 18230,
    avgMemberSales: 424,
    teamGrowthRate: '18%'
  };

  // Upcoming rank advancements
  const upcomingAdvancements = [
    { id: 1, name: 'Sarah Williams', currentRank: 'Gold Associate', nextRank: 'Gold Executive', progress: 85 },
    { id: 2, name: 'Michael Davis', currentRank: 'Silver Associate', nextRank: 'Silver Executive', progress: 62 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">My Team Structure</h2>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Users className="text-indigo-600 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Team Size</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{teamStats.totalMembers}</p>
          <p className="text-sm text-gray-500 mt-1">{teamStats.activeMembersPct}% active members</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Star className="text-indigo-600 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Team Sales</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">${teamStats.totalTeamSales}</p>
          <p className="text-sm text-gray-500 mt-1">Avg ${teamStats.avgMemberSales} per member</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Award className="text-indigo-600 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-800">Growth</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{teamStats.teamGrowthRate}</p>
          <p className="text-sm text-gray-500 mt-1">Month-over-month increase</p>
        </div>
      </div>

      {/* Direct Recruits */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Direct Recruits</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Sales</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Size</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.filter(member => member.isDirectRecruit).map(member => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full mr-3" />
                      <div className="font-medium text-gray-800">{member.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{member.rank}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">${member.monthlySales}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{member.teamSize}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Rank Advancements */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Rank Advancements</h3>
        
        <div className="space-y-4">
          {upcomingAdvancements.map(member => (
            <div key={member.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-gray-800">{member.name}</div>
                <div className="text-sm text-indigo-600">{member.progress}% complete</div>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>{member.currentRank}</span>
                <ChevronRight size={16} className="mx-2" />
                <span className="font-medium">{member.nextRank}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${member.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStructure;
