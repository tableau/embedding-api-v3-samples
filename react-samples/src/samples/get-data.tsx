import { Api, TableauViz, useTableauVizRef } from '@tableau/embedding-api-react';
import { useState } from 'react';

export default function GetData() {
  const vizRef = useTableauVizRef();
  const [tableData, setTableData] = useState<Api.DataTable>();

  const getData = async () => {
    const dashboard = getViz().workbook.activeSheet as Api.Dashboard;
    const sheet = dashboard.worksheets.find((sheet) => sheet.name === 'Storm Map Sheet')!;

    const tables = await sheet.getUnderlyingTablesAsync();
    const options: Api.GetUnderlyingDataOptions = {
      maxRows: 10, // Max rows to return. Use 0 to return all rows.
      ignoreAliases: false,
      ignoreSelection: true,
      includeAllColumns: false,
    };
    const underlyingTableData = await sheet.getUnderlyingTableDataAsync(tables[0].id, options);
    setTableData(underlyingTableData);
  };

  const getViz = (): Api.TableauViz => {
    const viz = vizRef.current;
    if (!viz) {
      throw new Error('TableauViz ref not assigned yet.');
    }

    return viz;
  };

  return (
    <>
      <div>
        <p>
          Click the <b>Get Data</b> button to get underlying data for the viz.
        </p>
        <p>
          <button onClick={getData}>Get Data</button>
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <TableauViz
            ref={vizRef}
            src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
            toolbar="bottom"
            hideTabs
          />
        </div>
        <div
          style={{
            maxHeight: '627px',
            overflowY: 'auto',
            margin: 0,
          }}
        >
          {!tableData ? null : (
            <>
              <ul>
                <li>name: {tableData.name}</li>
                <li>totalRowCount: {tableData.totalRowCount}</li>
                <li>
                  columns:
                  <ol>
                    {tableData.columns.map((c) => (
                      <li key={c.fieldId}>
                        {c.fieldName} ({c.dataType})
                      </li>
                    ))}
                  </ol>
                </li>
                <li>
                  data:
                  <ol>
                    {tableData.data?.map((array, i) => (
                      <li key={i}>{array.map((d) => d.value).join(' | ')}</li>
                    ))}
                  </ol>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
