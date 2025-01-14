import { Api, TableauViz, useTableauVizRef } from '@tableau/embedding-api-react';
import { useRef, useState } from 'react';

export default function GetDataTableReader() {
  const vizRef = useTableauVizRef();
  const pageRef = useRef<HTMLSelectElement>(null);
  const [currentTableData, setCurrentTableData] = useState<Api.DataTable>();

  const getData = async () => {
    setCurrentTableData(undefined);

    const sheet = getActiveSheet().worksheets.find((sheet) => sheet.name === 'Storm Map Sheet')!;

    // Get the logical tables from the first data source
    const datasource = await sheet.getDataSourcesAsync();
    const logicalTables = await datasource[0].getLogicalTablesAsync();

    // Loop through each table that was used in creating this data source
    logicalTables.forEach((table) => {
      console.log(`Name of logical table: ${table.caption}`);
      console.log(`ID of logical table: ${table.id}`);
    });

    // Set the page size to 1000 for this sample; the default value is 10000 rows
    const pageRowCount = 1000;

    // Create the data table reader
    const pageReader = await datasource[0].getLogicalTableDataReaderAsync(
      logicalTables[0].id,
      pageRowCount
    );

    try {
      // Display the number of pages to read
      console.log(`Number of pages: ${pageReader.pageCount}`);

      // Get the page data based on page number requested
      const pageNumber = parseInt(pageRef.current?.value ?? '0', 10);
      const currentPageDataTable = await pageReader.getPageAsync(pageNumber);
      setCurrentTableData(currentPageDataTable);
    } catch (e) {
      console.error(e);
    } finally {
      // Free up memory when done
      await pageReader.releaseAsync();
    }
  };

  const getActiveSheet = <T extends Api.Worksheet | Api.Dashboard = Api.Dashboard>(): T => {
    const viz = vizRef.current;
    if (!viz) {
      throw new Error('TableauViz ref not assigned yet.');
    }

    return viz.workbook.activeSheet as T;
  };

  return (
    <>
      <div>
        <p>
          Select a page and click <b>Get Data</b> to get logical table data from the viz.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select ref={pageRef} defaultValue="0">
            <option value="0">Page 0</option>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="4">Page 4</option>
          </select>
          <button onClick={getData}>Get Data</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <TableauViz
            ref={vizRef}
            src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
            toolbar="bottom"
            hideTabs
            // The version check is disabled so these samples can run against Tableau Public even when
            // the version of Tableau is incompatible with this version of the Embedding API.
            // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
            disableVersionCheck
          />
        </div>
        <div
          style={{
            maxHeight: '627px',
            overflowY: 'auto',
            margin: 0,
          }}
        >
          {!currentTableData ? null : (
            <>
              <ul>
                <li>name: {currentTableData.name}</li>
                <li>totalRowCount: {currentTableData.totalRowCount}</li>
                <li>
                  columns:
                  <ol>
                    {currentTableData.columns.map((c) => (
                      <li key={c.fieldId}>
                        {c.fieldName} ({c.dataType})
                      </li>
                    ))}
                  </ol>
                </li>
                <li>
                  data:
                  <ol>
                    {currentTableData.data?.map((array, i) => (
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
