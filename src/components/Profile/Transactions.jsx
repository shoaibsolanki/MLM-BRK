import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, DollarSign, Filter } from 'lucide-react';
import DataService from "../../services/requestApi";

const Transactions = ({ customerId }) => {
  const [filter, setFilter] = useState('ALL');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (customerId) {
      DataService.GetPointHistory(customerId)
        .then((res) => {
          if (res.data?.status && Array.isArray(res.data?.data)) {
            const formattedData = res.data.data
              .filter(item => {
                const type = item.transactionType?.toUpperCase();
                return ['ISSUED', 'REDEEMED',"Monthly_Rp_To_Points","MONTHLY_RP_BONUS","EARLY_PURCHASE_BONUS","6_MONTHS_AVG_RP_BONUS","12_MONTHS_AVG_RP_BONUS"].includes(type);
              })
              .map((item) => {
                const type = item.transactionType?.toUpperCase();
                const amount = item.transactionAmount != null ? item.transactionAmount : item.rp || 0;

                return {
                  id: item.id,
                  type,
                  amount:item.transactionAmount || 0,
                  rp: item.rp || 0,
                  description: item.description || type || '—',
                  date: item.createdAt,
                  status: item.status || 'completed',
                  source: `SaaS ID: ${item.saasId}` || '—',
                };
              });

            setTransactions(formattedData);
          }
        })
        .catch((err) => console.error('Error fetching transactions:', err));
    }
  }, [customerId]);

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'ALL') return true;
    return tx.type === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 mt-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Recent Transactions</h3>
          <div className="flex items-center">
            <Filter size={16} className="text-gray-500 mr-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border-0 bg-gray-50 rounded p-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="ISSUED">Issued</option>
              <option value="REDEEMED">Redeemed</option>
              <option value="EARLY_PURCHASE_BONUS">EARLY_PURCHASE_BONUS</option>
              <option value="MONTHLY_RP_BONUS">MONTHLY_RP_BONUS</option>
              <option value="Monthly_Rp_To_Points">Monthly_Rp_To_Points</option>
              <option value="6_MONTHS_AVG_RP_BONUS">6_MONTHS_AVG_RP_BONUS</option>
              <option value="12_MONTHS_AVG_RP_BONUS">12_MONTHS_AVG_RP_BONUS</option>



            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          tx.type === 'REDEEMED' ?  'bg-red-100':'bg-green-100'
                        }`}
                      >
                        {tx.type === 'REDEEMED' ? (
                          <ArrowDownLeft size={16} className="text-red-600" />

                        ) : (
                          <ArrowUpRight size={16} className="text-green-600" />

                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{tx.type}</div>
                        <div className="text-xs text-gray-500">{tx.source}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tx.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(tx.date)}</td>
                 
 <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx?.type === 'REDEEMED' ?  'text-red-600':'text-green-600'}`}>
                    {tx?.type === 'REDEEMED'  ? '-' : '+'}{tx?.rp?.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx?.type === 'REDEEMED' ?  'text-red-600':'text-green-600'}`}>
                    {tx?.type === 'REDEEMED'  ? '-' : '+'}{tx?.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 capitalize">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No transactions found for selected type.
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
