import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import { useEditable } from "@chakra-ui/react";

const TableComponent = React.forwardRef(({ rowData }, ref) => {
  const gridRef = useRef();

  const tableName = "participants";

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
    {
      headerName: "Any PT Tool Used",
      field: "anyPtToolUsed",
    },
    {
      headerName: "PT Needed",
      field: "ptNeeded",
    },
  ];

  const customExportCsv = useCallback(() => {
    const params = {
      fileName: `${tableName}.csv`,
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  useImperativeHandle(ref, () => ({
    onBtnExport: customExportCsv,
  }));

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
        // Attach the custom export function to the grid
        processGridOptions={(gridOptions) => {
          gridOptions.api.exportDataAsCsv = customExportCsv;
        }}
      />
    </div>
  );
});

export default TableComponent;
