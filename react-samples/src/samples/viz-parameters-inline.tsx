import { TableauViz } from '@tableau/embedding-api-react';

export default function VizParametersInline() {
  return (
    <TableauViz
      src="https://public.tableau.com/views/DeveloperSuperstore/Overview"
      vizParameters={[{ name: 'Label to display', value: 'Postal' }]}
      // The version check is disabled so these samples can run against Tableau Public even when
      // the version of Tableau is incompatible with this version of the Embedding API.
      // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
      disableVersionCheck
    />
  );
}