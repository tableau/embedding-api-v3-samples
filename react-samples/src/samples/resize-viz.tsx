import { TableauViz } from '@tableau/embedding-api-react';
import { useRef, useState } from 'react';

const defaults = {
  width: 1600,
  height: 1200,
};

export default function ResizeViz() {
  const [width, setWidth] = useState(defaults.width);
  const [height, setHeight] = useState(defaults.height);

  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        Width: <input ref={widthRef} type="text" defaultValue={width}></input>
        Height: <input ref={heightRef} type="text" defaultValue={height}></input>
        <button
          onClick={() => {
            const width = parseInt(widthRef.current!.value, 10);
            const height = parseInt(heightRef.current!.value, 10);

            setWidth(width > 0 ? width : defaults.width);
            setHeight(height > 0 ? height : defaults.height);
          }}
        >
          Resize
        </button>
      </div>
      <TableauViz
        src="https://public.tableau.com/views/RegionalSampleWorkbook/Stocks"
        hideTabs
        width={`${width}px`}
        height={`${height}px`}
        // The version check is disabled so these samples can run against Tableau Public even when
        // the version of Tableau is incompatible with this version of the Embedding API.
        // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
        disableVersionCheck
      />
    </>
  );
}
