import {
  Api,
  TableauViz,
  useTableauVizFirstInteractiveCallback,
  useTableauVizRef,
} from '@tableau/embedding-api-react';
import { useRef, useState } from 'react';

export default function VizParameters() {
  const vizRef = useTableauVizRef();
  const [param, setParam] = useState<Api.Parameter>();
  const paramValuesRef = useRef<HTMLSelectElement>(null);

  const onFirstInteractive = useTableauVizFirstInteractiveCallback(async (event) => {
    const viz = event.target;
    const parameters = await viz.workbook.getParametersAsync();
    const parameter = parameters.find((p) => p.name === 'Label to display')!;
    setParam(parameter);
  }, []);

  const assignParamValue = async () => {
    await vizRef.current!.workbook.changeParameterValueAsync(
      param!.name,
      paramValuesRef.current!.value
    );
  };

  return (
    <>
      <div>
        <p>
          Change the value of the <b>Label to display</b> parameter, and then click{' '}
          <b>Assign Value</b> to assign the parameter the updated value.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <span>Label to display: </span>
          {param && (
            <select ref={paramValuesRef} defaultValue={param.currentValue.value}>
              {param.allowableValues.allowableValues?.map((v, i) => (
                <option key={i} value={v.value}>
                  {v.value}
                </option>
              ))}
            </select>
          )}
          {param && <button onClick={assignParamValue}>Assign Value</button>}
        </div>
      </div>
      <TableauViz
        ref={vizRef}
        src="https://public.tableau.com/views/DeveloperSuperstore/Overview"
        onFirstInteractive={onFirstInteractive}
        // The version check is disabled so these samples can run against Tableau Public even when
        // the version of Tableau is incompatible with this version of the Embedding API.
        // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
        disableVersionCheck
      />
    </>
  );
}
