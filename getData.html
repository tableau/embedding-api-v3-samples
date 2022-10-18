<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Get Data</title>

    <script type="module">
        // TableauEventType represents the type of Tableau embedding event that can be listened for.
        import { TableauEventType } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

        async function handleFirstInteractive(e) {
            const getDataButton = document.getElementById("getData");

            // Get data from a specified sheet.
            getDataButton.onclick = async () => {
                const sheet = viz.workbook.activeSheet.worksheets.find(sheet => sheet.name === "Storm Map Sheet");

                const tables = await sheet.getUnderlyingTablesAsync();
                const options = {
                    maxRows: 10, // Max rows to return. Use 0 to return all rows.
                    ignoreAliases: false,
                    ignoreSelection: true,
                    includeAllColumns: false
                };
                const underlyingTableData = await sheet.getUnderlyingTableDataAsync(tables[0].id, options);

                // Add data to HTML element.
                const target = document.getElementById("dataTarget");
                target.innerHTML = `<h4>Underlying Data:</h4><p>${JSON.stringify(underlyingTableData.data)}</p>`;
            };
        }

        const viz = document.getElementById("tableauViz");

        // Event fired when a viz first becomes interactive.
        viz.addEventListener(TableauEventType.FirstInteractive, handleFirstInteractive);
    </script>
</head>

<body>
    <div>
        <h1>Get Data Example</h1>
        <p>Click the "Get Data" button to get underlying data for the viz.</p>
        <button id="getData">Get Data</button>
    </div>
    <div style="width:800px; height:700px;">
        <!-- Initialization of the Tableau visualization. -->
        <tableau-viz id="tableauViz" src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
            toolbar="bottom" hide-tabs>
        </tableau-viz>
    </div>
    <!-- Placeholder for the Underlying Data.  -->
    <div id="dataTarget"></div>
</body>

</html>