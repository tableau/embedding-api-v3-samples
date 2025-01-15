import {
  Api,
  TableauViz,
  useTableauVizFirstInteractiveCallback,
  useTableauVizRef,
} from '@tableau/embedding-api-react';

export default function CustomContextMenu() {
  const vizRef = useTableauVizRef();

  const onFirstInteractive = useTableauVizFirstInteractiveCallback(async () => {
    // Add custom context menu items.
    const menuItemNames = ['Item 0', 'Item 1', 'Item 2'];
    for (let name of menuItemNames) {
      await addContextMenuItem(name);
    }

    // Rename custom context menu, and add description.
    const menuName = 'Custom Context Menu Name';
    const menuDescription = 'A sample custom context menu';
    await renameContextMenu(menuName, menuDescription);
  }, []);

  async function addContextMenuItem(menuItem: string) {
    const options: Api.ContextMenuOptions = { displayName: menuItem };

    try {
      await getActiveSheet().appendContextMenuAsync(Api.ApiMenuType.Ubertip, options);
    } catch (e: unknown) {
      alert(`An exception was thrown: ${e}`);
    }
  }

  async function renameContextMenu(menuName: string, menuDescription: string) {
    try {
      await getActiveSheet().renameContextMenuAsync(
        Api.ApiMenuType.Ubertip,
        menuName,
        menuDescription
      );
    } catch (e: unknown) {
      alert(`An exception was thrown: ${e}`);
    }
  }

  const getActiveSheet = <T extends Api.Worksheet | Api.Dashboard = Api.Worksheet>(): T => {
    const viz = vizRef.current;
    if (!viz) {
      throw new Error('TableauViz ref not assigned yet.');
    }

    return viz.workbook.activeSheet as T;
  };

  return (
    <TableauViz
      ref={vizRef}
      src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
      toolbar="hidden"
      hideTabs
      onFirstInteractive={onFirstInteractive}
      // The version check is disabled so these samples can run against Tableau Public even when
      // the version of Tableau is incompatible with this version of the Embedding API.
      // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
      disableVersionCheck
    />
  );
}
