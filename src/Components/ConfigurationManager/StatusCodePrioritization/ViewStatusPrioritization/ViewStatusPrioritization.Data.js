
export const TableHeaders = [
  {
    title: 'PRIORITY',
    property: 'priority',
    defaultSorting: true,
    defaultSortingOrder: 'asc',
    style: {
      body: { width: '100px' }
    },
    typeFomart: 'number'
  },
  {
    title: 'ACCOUNTHOLDER STATUS',
    property: 'description',
    operation: ['trimData'],
    style: {
      body: { width: '100px' }
    }
  },
  {
    title: 'PHASE',
    property: 'accounHolderPhaseName',
    operation: ['trimData'],
    style: {
      body: { width: '100px' }
    }
  },
  {
    title: 'EVALUATION CRITERIA DESCRIPTION',
    property: 'criteriaDescription',
    operation: ['trimData'],
    showTooltip: true,
    style: { width: '170px', cursor: 'pointer' },
    pattern: '^.{0,1000}'
  },
  {
    title: 'EVALUATION CRITERIA',
    property: 'criteria',
    operation: ['trimData'],
    showTooltip: true,
    style: {
      cursor: 'pointer',
      body: { width: '140px' }
    },
    pattern: '^.{0,1000}'
  }
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
    <div key={1}></div>
    // <GetMenuOptions label="Update Priority" key="update" imgSrc={extractImagePath('edit.png')} />,
    // <GetMenuOptions
    //   label="Remove Status Code Priority"
    //   key="Delete"
    //   imgSrc={extractImagePath('delete_mini.png')}
    // />
  ]
};
