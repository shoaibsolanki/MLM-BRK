import PropTypes from 'prop-types';

const stages = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

export function OrderProgressBar({ status }) {
  const currentStageIndex = stages.indexOf(status.toUpperCase());
  
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between mb-1">
        {stages.map((stage, index) => (
          <div key={stage} className="text-xs text-gray-500">
            {stage}
          </div>
        ))}
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className={`absolute h-full rounded-full transition-width duration-500 ease-in-out ${
            currentStageIndex >= 3 ? 'bg-green-500' : 
            currentStageIndex >= 2 ? 'bg-blue-500' : 
            currentStageIndex >= 1 ? 'bg-yellow-500' : 'bg-red-400'
          }`}
          style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

OrderProgressBar.propTypes = {
  status: PropTypes.string.isRequired
};
