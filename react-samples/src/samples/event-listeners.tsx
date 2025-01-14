import {
  TableauViz,
  useTableauVizFirstInteractiveCallback,
  useTableauVizFirstVizSizeKnownCallback,
  useTableauVizTabSwitchedCallback,
  useTableauVizToolbarStateChangedCallback,
} from '@tableau/embedding-api-react';

export default function EventListeners() {
  const onFirstVizSizeKnown = useTableauVizFirstVizSizeKnownCallback((event) => {
    const { vizSize } = event.detail;

    console.log('---onFirstVizSizeKnown---');
    console.log(event);
    console.log('---Size---');
    console.log(vizSize);
  }, []);

  const onFirstInteractive = useTableauVizFirstInteractiveCallback(() => {
    console.log('---onFirstInteractive---');
    console.log('Viz Embedding Successful!');
  }, []);

  const onToolbarStateChanged = useTableauVizToolbarStateChangedCallback((event) => {
    const { canRedo, canUndo } = event.detail;

    console.log('---handleToolbarStateChanged---');
    console.log(`canRedo: ${canRedo}`);
    console.log(`canUndo: ${canUndo}`);
  }, []);

  const onTabSwitched = useTableauVizTabSwitchedCallback((event) => {
    const { target: viz } = event;
    const name = viz.workbook.activeSheet.name;

    console.log('---handleTabSwitch---');
    console.log(`Tab switched to ${name}.`);
  }, []);

  return (
    <TableauViz
      src="https://public.tableau.com/views/RegionalSampleWorkbook/Flights"
      onFirstVizSizeKnown={onFirstVizSizeKnown}
      onFirstInteractive={onFirstInteractive}
      onToolbarStateChanged={onToolbarStateChanged}
      onTabSwitched={onTabSwitched}
    />
  );
}
