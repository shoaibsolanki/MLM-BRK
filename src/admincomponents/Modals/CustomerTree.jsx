import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

// Function to transform your custom data to react-d3-tree format
const transformToTree = (data) => {
  if (!Array.isArray(data) || data.length === 0) return {};
  return transformNode(data[0]);
};

const transformNode = (node) => {
  if (!node) return {};
  return {
    name: `${node.name} (ID: ${node.customerId})`,
    attributes: node.direction ? { Direction: node.direction } : {},
    children: Array.isArray(node.children) ? node.children.map(transformNode) : []
  };
};

const CustomNode = ({ nodeDatum, toggleNode }) => (
    <g onClick={toggleNode}>
        <circle 
            r={20} 
            fill={nodeDatum.children && nodeDatum.children.length > 0 ? "#34495e" : "white"} 
            stroke="#34495e"
            strokeWidth="2"
        />
        <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fill: '#2c3e50', fontSize: '12px', fontFamily: 'Segoe UI', fontWeight: '600' }}
        >
            {nodeDatum.customerId || ""}
        </text>
        <text
            x="0"
            y="35"
            textAnchor="middle"
            style={{ fill: '#2c3e50', fontSize: '14px', fontFamily: 'Segoe UI', fontWeight: '100' }}
        >
            {nodeDatum.name}
        </text>
        {nodeDatum.attributes && Object.keys(nodeDatum.attributes).length > 0 && (
            <text
                x="0"
                y="50"
                textAnchor="middle"
                style={{ fill: '#7f8c8d', fontSize: '10px', fontFamily: 'Segoe UI' ,fontWeight:"100"}}
            >
                {Object.entries(nodeDatum.attributes)
                    .map(([key, value]) => `${key}: ${value === 'left' ? 'Org1' : 'Org2'}`)
                    .join(', ')}
            </text>
        )}
    </g>
);

const CustomerTreeCanvas = ({ data }) => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const transformed = transformToTree(data);
      setTreeData(transformed);
    }
  }, [data]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100vh',
        backgroundColor: '#f5f6fa',
        border: '1px solid #dcdde1',
        borderRadius: '8px',
        padding: '20px',
      }} 
      ref={treeContainer}
    >
      {treeData && (
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: dimensions.width / 2, y: 100 }}
          pathFunc="straight"
          separation={{ siblings: 2, nonSiblings: 2.5 }}
          collapsible={true}
          zoomable={true}
          zoom={0.8}
          scaleExtent={{ min: 0.3, max: 2 }}
          nodeSize={{ x: 200, y: 100 }}
          renderCustomNodeElement={CustomNode}
          styles={{
            links: {
              stroke: '#95a5a6',
              strokeWidth: 2,
              strokeLinecap: 'round',
            },
            nodes: {
              node: {
                circle: { fill: '#34495e', strokeWidth: 2 },
                name: { fill: '#2c3e50', fontSize: '14px', fontFamily: 'Arial' },
                attributes: {  fill: '#7f8c8d', fontSize: '10px', fontFamily: 'Arial' },
              },
              leafNode: {
                circle: { fill: '#2ecc71', strokeWidth: 2 },
                name: { fill: '#2c3e50', fontSize: '14px', fontFamily: 'Arial' },
                attributes: { fill: '#7f8c8d', fontSize: '10px', fontFamily: 'Arial'  },
              },
            }
          }}
        />
      )}
    </div>
  );
};

export default CustomerTreeCanvas;
