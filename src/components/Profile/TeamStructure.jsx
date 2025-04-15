import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataService from "../../services/requestApi";
import { useAuth } from '../../contexts/AuthConext';

const TeamStructure = () => {
  const { authData } = useAuth();
  const { id } = authData;

  const [levelCounts, setLevelCounts] = useState({});
  const [team, setTeam] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);

  const GetTeamHistoryData = async () => {
    try {
      const response = await DataService.GetTeamHistory(id);
      if (response.data.status) {
        setLevelCounts(response.data.data.levelCounts || {});
        setTeam(response.data.data.team || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTeamHistoryData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">My Team Structure</h2>

      {/* LEVEL SUMMARY TABLE */}
      {!selectedLevel && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Levels</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Members Count</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(levelCounts).map(([level, count]) => (
                <tr key={level} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">Level {level}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{count}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => setSelectedLevel(level)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TEAM DETAIL VIEW */}
      {selectedLevel && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Level {selectedLevel} Members</h3>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setSelectedLevel(null)}
            >
              Back
            </button>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Sponsor Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Register Date</th>
              </tr>
            </thead>
            <tbody>
              {team[selectedLevel]?.map(member => (
                <tr key={member.userId} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{member.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{member.userId}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{member.Sponsor_Name}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(member.Register_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamStructure;
