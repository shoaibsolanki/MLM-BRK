import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({ columns, data, title , handlePageChange ,handleRowsPerPageChange ,count}) => {
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
    };

    // const handlePageChange = (page) => {
    //     console.log(`Page changed to: ${page}`);
    //     // Call your API here with the new page number
    // };
   

    // const handleRowsPerPageChange = (newLimit, page) => {
    //     console.log("Rows per page changed to:", newLimit);
    //     console.log("Current Page:", page);
    //     // Call your API or function here based on the new limit
    // };

    return (
        <div className="bg-white p-6 shadow rounded-lg mt-2">
            <div style={{ height: "fit-content", overflow: "auto" }}>
            <DataTable
            title={title}
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationPerPage={10} // Default per page limit
            paginationRowsPerPageOptions={[10, 25, 50, 100]} // Allow users to select
            onChangePage={handlePageChange} // Called when the page changes
            onChangeRowsPerPage={handleRowsPerPageChange} // Called when rows per page change
            paginationTotalRows={count}
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