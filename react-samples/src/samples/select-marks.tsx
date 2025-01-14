import { Api, TableauViz, useTableauVizRef } from '@tableau/embedding-api-react';
import { useState } from 'react';

export default function SelectMarks() {
  const vizRef = useTableauVizRef();
  const [buttonsDisabled, setButtonsDisabled] = useState(true);

  const selectValue = async () => {
    const selections: Api.SelectionCriteria[] = [
      {
        fieldName: 'College',
        value: 'Engineering',
      },
    ];
    await getActiveSheet().selectMarksByValueAsync(selections, Api.SelectionUpdateType.Replace);
  };

  const addToSelection = async () => {
    const selections: Api.SelectionCriteria[] = [
      {
        fieldName: 'College',
        value: 'Business',
      },
    ];

    await getActiveSheet().selectMarksByValueAsync(selections, Api.SelectionUpdateType.Add);
  };

  const clearMarks = async () => {
    await getActiveSheet().clearSelectedMarksAsync();
  };

  const getActiveSheet = <T extends Api.Worksheet | Api.Dashboard = Api.Worksheet>(): T => {
    const viz = vizRef.current;
    if (!viz) {
      throw new Error('TableauViz ref not assigned yet.');
    }

    return viz.workbook.activeSheet as T;
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button disabled={buttonsDisabled} onClick={selectValue}>
            Select a value
          </button>
          <button disabled={buttonsDisabled} onClick={addToSelection}>
            Add to the selection
          </button>
          <button disabled={buttonsDisabled} onClick={clearMarks}>
            Clear all
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <TableauViz
            ref={vizRef}
            src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
            toolbar="bottom"
            hideTabs
            onFirstInteractive={() => setButtonsDisabled(false)}
            // The version check is disabled so these samples can run against Tableau Public even when
            // the version of Tableau is incompatible with this version of the Embedding API.
            // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
            disableVersionCheck
          />
        </div>
      </div>
    </>
  );
}
