import { Api, TableauPulse, useTableauPulseRef } from '@tableau/embedding-api-react';
import { useEffect, useState } from 'react';

export default function PulseMethods() {
  const tableauPulseRef = useTableauPulseRef();
  const [jwt, setJwt] = useState('');

  // Use your preferred method for asynchronously retrieving the JWT from your backend
  // e.g. react-query, RTK Query, SWR, etc.
  // For simplicity, the sample uses a useEffect.
  useEffect(() => {
    getJWT().then((jwt) => setJwt(jwt));
  }, []);

  const getJWT = () => {
    // Call your backend API to get the JWT.
    // Simulate it here with a promise for the sample.
    const apiCallPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        // https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_auth.html#pass-the-jwt-to-the-tableau-web-component
        const jwt = '';
        resolve(jwt);
      }, 2000);
    });

    return apiCallPromise;
  };

  const applyFilter = async () => {
    const adjustedFilter = tableauPulseRef.current?.applyFilterAsync(
      'Category',
      ['Furniture'],
      Api.FilterUpdateType.Replace,
      {
        isExcludeMode: false,
      }
    );

    console.log('adjustedFilter', adjustedFilter);
  };

  const applyMultipleFilters = async () => {
    const filters = [
      {
        fieldName: 'Sub-Category',
        values: ['Art', 'Phones'],
        updateType: Api.FilterUpdateType.Replace,
        options: { isExcludeMode: false },
      },
      {
        fieldName: 'Region',
        values: ['North Asia'],
        updateType: Api.FilterUpdateType.Replace,
        options: { isExcludeMode: false },
      },
    ];

    const adjustedFilters = tableauPulseRef.current?.applyFiltersAsync(filters);
    console.log('adjustedFilters', adjustedFilters);
  };

  const applyTimeDimension = async () => {
    const options = Object.keys(Api.PulseTimeDimension);
    await tableauPulseRef.current?.applyTimeDimensionAsync(
      prompt(
        `Enter time dimension. Options are: ${options.join(', ')}`,
        Api.PulseTimeDimension.QuarterToDate
      ) as Api.PulseTimeDimension
    );
  };

  const getTimeDimension = async () => {
    alert(await tableauPulseRef.current?.getTimeDimensionAsync());
  };

  const getFilters = async () => {
    const tableauPulse = tableauPulseRef.current;
    if (!tableauPulse) return;

    const filters = (await tableauPulse.getFiltersAsync()) as Array<Api.CategoricalPulseFilter>;
    console.log('filters', filters);

    let domain: Api.PulseFieldValueArray = [];
    let page = undefined;
    let pageSize = 100;
    do {
      page = await filters[2].getDomainAsync(
        '',
        pageSize,
        page?.nextPageToken,
        Api.FilterDomainType.Database
      );
      domain = domain.concat(page.values) as Api.PulseFieldValueArray;
      console.log(`Retrieved ${domain.length} of ${page.totalAvailable} field values`);
      pageSize = page.totalAvailable - domain.length;
    } while (page.nextPageToken);

    console.log('domain (database)', domain);

    domain = [];
    page = undefined;
    pageSize = 100;
    do {
      page = await filters[2].getDomainAsync(
        '',
        pageSize,
        page?.nextPageToken,
        Api.FilterDomainType.Relevant
      );
      domain = domain.concat(page.values) as Api.PulseFieldValueArray;
      console.log(`Retrieved ${domain.length} of ${page.totalAvailable} field values`);
      pageSize = page.totalAvailable - domain.length;
    } while (page.nextPageToken);

    console.log('domain (relevant)', domain);

    domain = [];
    page = undefined;
    pageSize = 100;
    do {
      page = await filters[1].getDomainAsync(
        '',
        pageSize,
        page?.nextPageToken,
        Api.FilterDomainType.Relevant
      );
      domain = domain.concat(page.values) as Api.PulseFieldValueArray;
      console.log(`Retrieved ${domain.length} of ${page.totalAvailable} field values`);
      pageSize = page.totalAvailable - domain.length;
    } while (page.nextPageToken);

    console.log('domain', domain);

    domain = [];
    page = undefined;
    pageSize = 100;
    do {
      page = await filters[1].getDomainAsync(
        'Hoover',
        pageSize,
        page?.nextPageToken,
        Api.FilterDomainType.Relevant
      );
      domain = domain.concat(page.values) as Api.PulseFieldValueArray;
      console.log(`Retrieved ${domain.length} of ${page.totalAvailable} field values`);
      pageSize = page.totalAvailable - domain.length;
    } while (page.nextPageToken);

    console.log('domain (Hoover)', domain);
  };

  const clearFilter = async () => {
    await tableauPulseRef.current?.clearFilterAsync('Sub-Category');
  };

  const clearMultipleFilters = async () => {
    await tableauPulseRef.current?.clearFiltersAsync(['Sub-Category', 'Region']);
  };

  const clearAllFilters = async () => {
    await tableauPulseRef.current?.clearAllFiltersAsync();
  };

  return !jwt ? (
    <p>Retrieving JWT...</p>
  ) : (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={applyFilter}>Apply filter</button>
        <button onClick={applyMultipleFilters}>Apply 2 Filters</button>
        <button onClick={applyTimeDimension}>Apply Time Dimension</button>
        <button onClick={getTimeDimension}>Get Time Dimension</button>
        <button onClick={getFilters}>Get filters</button>
        <button onClick={clearFilter}>Clear 1 Filter</button>
        <button onClick={clearMultipleFilters}>Clear 2 Filters</button>
        <button onClick={clearAllFilters}>Clear All Filters</button>
      </div>
      <TableauPulse
        ref={tableauPulseRef}
        token={jwt}
        src="https://10ax.online.tableau.com/pulse/site/{your_site}/metrics/{your_metric_id}"
      />
    </>
  );
}
