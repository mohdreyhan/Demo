export const TableHeaders = [
  {
    title: 'TYPE',
    property: 'typeId'
  },
  {
    title: 'ADDRESS',
    property: 'address',
    style: { width: 145, cursor: 'pointer' },
    pattern: '^.{0,1000}',
    tableBody: {
      showTooltip: true
    }
  },
  {
    title: 'CITY',
    property: 'city',
    style: { whiteSpace: "nowrap" },
  },
  {
    title: 'STATE',
    property: 'stateCode',
  },
  {
    title: 'COUNTRY',
    property: 'countryCode',
    style: { whiteSpace: "nowrap" }
  },
  {
    title: 'ZIP CODE',
    property: 'zipCode',
    operation: ['formatZipCode']
  },
  {
    title: 'SOURCE',
    property: 'source',
  },
  {
    title: 'STATUS',
    property: 'active'
  },
  {
    title: 'PRIMARY',
    property: 'isDefault',
    defaultSorting: true,
    defaultSortingOrder: "desc",
  }
];
