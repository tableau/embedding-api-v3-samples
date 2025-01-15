import { TableauViz } from '@tableau/embedding-api-react';
import { useState } from 'react';

// List of visualizations to cycle through.
const vizList = [
  'https://public.tableau.com/views/RegionalSampleWorkbook/Flights',
  'https://public.tableau.com/views/RegionalSampleWorkbook/Obesity',
  'https://public.tableau.com/views/RegionalSampleWorkbook/College',
  'https://public.tableau.com/views/RegionalSampleWorkbook/Stocks',
  'https://public.tableau.com/views/RegionalSampleWorkbook/Storms',
];

export default function DynamicLoad() {
  const [vizCount, setVizCount] = useState(0);
  const [vizSrc, setVizSrc] = useState(vizList[0]);

  const loadViz = (vizPlusMinus: -1 | 1) => {
    let newVizCount = vizCount + vizPlusMinus;
    if (newVizCount >= vizList.length) {
      // Keep the vizCount in the bounds of the array index.
      newVizCount = 0;
    } else if (newVizCount < 0) {
      newVizCount = vizList.length - 1;
    }

    setVizCount(newVizCount);
    setVizSrc(vizList[newVizCount]);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => loadViz(-1)}>Previous</button>
        <button onClick={() => loadViz(1)}>Next</button>
      </div>
      <div>
        <p>
          Current src: <code>{vizSrc}</code>
        </p>
      </div>
      <TableauViz
        src={vizSrc}
        hideTabs
        // The version check is disabled so these samples can run against Tableau Public even when
        // the version of Tableau is incompatible with this version of the Embedding API.
        // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
        disableVersionCheck
      />
    </>
  );
}
