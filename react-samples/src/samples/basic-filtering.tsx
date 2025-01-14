import { Api, TableauViz, useTableauVizRef } from '@tableau/embedding-api-react';

const field = 'Academic Year';

export default function BasicFiltering() {
  const vizRef = useTableauVizRef();

  const applyYearFilter = async (year: string) => {
    const sheet = getViz().workbook.activeSheet as Api.Worksheet;
    if (year) {
      const options: Api.FilterOptions = { isExcludeMode: false };
      await sheet.applyFilterAsync(field, [year], Api.FilterUpdateType.Replace, options);
    } else {
      await sheet.clearFilterAsync(field);
    }
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
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <span>Year:</span>
        <select defaultValue="2013" onChange={(event) => applyYearFilter(event.target.value)}>
          <option value="">All</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
        </select>
      </div>
      <TableauViz
        ref={vizRef}
        src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
        vizFilters={[{ field, value: '2013' }]}
        hideTabs
        // The version check is disabled so these samples can run against Tableau Public even when
        // the version of Tableau is incompatible with this version of the Embedding API.
        // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
        disableVersionCheck
      />
    </>
  );
}
