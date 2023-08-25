import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";

const TableComponent = ({ rowData }) => {
  const gridRef = useRef();
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      minWidth: 200,
      sortable: true,
      filter: true,
    };
  }, []);
  const columnDefs = [
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    {
      headerName: "Company Name",
      field: "companyName",
    },
    {
      headerName: "Designation",
      field: "designation",
    },
    {
      headerName: "Mobile Number",
      field: "mobileNumber",
    },
    { headerName: "Event ID", field: "eventId", sortable: true, filter: true },
    {
      headerName: "Any PT Tool Used",
      field: "anyPtToolUsed",
    },
    {
      headerName: "PT Needed",
      field: "ptNeeded",
    },
  ];

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        animateRows={true}
        suppressCellSelection={true}
        ref={gridRef}
        suppressExcelExport={true}
      />
    </div>
  );
};

export default TableComponent;
