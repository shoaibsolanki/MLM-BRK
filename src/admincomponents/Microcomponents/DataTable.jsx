import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({ columns, data, title }) => {
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg mt-2">
            <div style={{ height: "fit-content", overflow: "auto" }}>
                <DataTable
                    title={title}
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    selectableRows
                    responsive
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};

export default CustomDataTable;