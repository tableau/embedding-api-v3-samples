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
    const worksheet = getViz().workbook.activeSheet as Api.Worksheet;
    const options: Api.ContextMenuOptions = { displayName: menuItem };

    try {
      await worksheet.appendContextMenuAsync(Api.ApiMenuType.Ubertip, options);
    } catch (e: unknown) {
      alert(`An exception was thrown: ${e}`);
    }
  }

  async function renameContextMenu(menuName: string, menuDescription: string) {
    const worksheet = getViz().workbook.activeSheet as Api.Worksheet;

    try {
      await worksheet.renameContextMenuAsync(Api.ApiMenuType.Ubertip, menuName, menuDescription);
    } catch (e: unknown) {
      alert(`An exception was thrown: ${e}`);
    }
  }

  const getViz = (): Api.TableauViz => {
    const viz = vizRef.current;
    if (!viz) {
      throw new Error('TableauViz ref not assigned yet.');
    }

    return viz;
  };

  return (
    <TableauViz
      ref={vizRef}
      src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
      toolbar="hidden"
      hideTabs
      onFirstInteractive={onFirstInteractive}
    />
  );
}
