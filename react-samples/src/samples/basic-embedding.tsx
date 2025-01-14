import { TableauViz } from '@tableau/embedding-api-react';

export default function BasicEmbedding() {
  return (
    <TableauViz
      src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
      toolbar="bottom"
      hideTabs
    />
  );
}
