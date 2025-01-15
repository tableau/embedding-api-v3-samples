import { Api, TableauViz, useTableauVizMarksSelectedCallback } from '@tableau/embedding-api-react';
import { useState } from 'react';

export default function UserEvents() {
  const [marksData, setMarksData] = useState<Api.DataTable>();
  const onMarkSelectionChanged = useTableauVizMarksSelectedCallback(async (event) => {
    const marksCollection = await event.detail.getMarksAsync();
    setMarksData(marksCollection.data[0]);
  }, []);

  return (
    <>
      <div>
        <p>Select some marks to view their details.</p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <TableauViz
            src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
            hideTabs
            onMarkSelectionChanged={onMarkSelectionChanged}
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
          {!marksData ? null : (
            <>
              <ul>
                <li>name: {marksData.name}</li>
                <li>totalRowCount: {marksData.totalRowCount}</li>
                <li>
                  columns:
                  <ol>
                    {marksData.columns.map((c) => (
                      <li key={c.fieldId}>
                        {c.fieldName} ({c.dataType})
                      </li>
                    ))}
                  </ol>
                </li>
                <li>
                  data:
                  <ol>
                    {marksData.data?.map((array, i) => (
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
