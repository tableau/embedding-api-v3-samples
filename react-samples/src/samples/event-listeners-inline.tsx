import { TableauViz } from '@tableau/embedding-api-react';

export default function EventListenersInline() {
  return (
    <TableauViz
      src="https://public.tableau.com/views/RegionalSampleWorkbook/Flights"
      onFirstVizSizeKnown={(event) => {
        const { vizSize } = event.detail;

        console.log('---onFirstVizSizeKnown---');
        console.log(event);
        console.log('---Size---');
        console.log(vizSize);
      }}
      onFirstInteractive={() => {
        console.log('---onFirstInteractive---');
        console.log('Viz Embedding Successful!');
      }}
      onToolbarStateChanged={(event) => {
        const { canRedo, canUndo } = event.detail;

        console.log('---handleToolbarStateChanged---');
        console.log(`canRedo: ${canRedo}`);
        console.log(`canUndo: ${canUndo}`);
      }}
      onTabSwitched={(event) => {
        const { target: viz } = event;
        const name = viz.workbook.activeSheet.name;

        console.log('---handleTabSwitch---');
        console.log(`Tab switched to ${name}.`);
      }}
    />
  );
}
