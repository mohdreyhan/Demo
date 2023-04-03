
export const TableHeaders = [
  // {
  //   title: ' ',
  //   noSorting: true,
  //   property: 'moreIcon',
  //   style: {
  //   body: {width: '10px',height:'25px'}
  //   }
  // },
  {
    title: 'FIELD NAME',
    property: 'fieldName',
    defaultSorting: true,
    defaultSortingOrder: 'asc',
    style: {
      body: { width: '100px' }
    },
     typeFomart: 'string'
  },
  {
    title: 'FIELD LOCATION',
    property: 'locationName',
    // operation: ['trimData'],
    style: {
      body: { width: '100px' }
    }
  },
  {
    title: 'DATA TYPE',
    property: 'dataType',
    // operation: ['trimData'],
    style: {
      body: { width: '100px' }
    }
  },
  {
    title: 'SUB-TAB',
    property: 'groupName',
    // operation: ['trimData'],
    // showTooltip: true,
    style: { width: '130px' },
  },
  
];

const GetMenuOptions = ({ label, imgSrc }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img src={imgSrc} />
      </div>
      <div style={{ paddingLeft: '5px', fontWeight: 400 }}>{label}</div>
    </div>
  );
};

export const menuOptions = {
  edit: [
    <div key={''}></div>
    
  ]
};

