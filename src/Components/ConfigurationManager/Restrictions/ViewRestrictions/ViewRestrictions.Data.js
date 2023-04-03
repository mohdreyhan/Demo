import { extractImagePath } from '../../../Common/commonfunctions';
import { ColorPallete } from '../../../../theme/ColorPallete'

export const restrictionsMockData = [
  {
    status: 'Default',
    validationMethod: 'Letter',
    deliveryDays: 10,
    validationPeriodWaitDays: 45
  },
  {
    status: 'Default',
    validationMethod: 'Digital',
    deliveryDays: 2,
    validationPeriodWaitDays: 45
  },
  {
    status: 'Default',
    validationMethod: 'Oral',
    deliveryDays: 0,
    validationPeriodWaitDays: 45
  }
];

export const TableHeaders = [
  {
    title: 'STATUS',
    property: 'status',
    defaultSorting: true,
    defaultSortingOrder: 'asc',
    style: { align: 'left', width: '118px' }
  },
  {
    title: 'VALIDATION METHOD',
    property: 'validationMethod',
    style: { align: 'left', width: '148px' }
  },
  {
    title: 'DELIVERY DAYS',
    property: 'deliveryDays',
    style: { align: 'left', width: '112px' }
  },
  {
    title: 'VALIDATION PERIOD WAIT DAYS',
    property: 'validationPeriodWaitDays',
    style: { align: 'left', width: '522px' }
  }
];

const getMenuOptions = (label, img) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img src={img} />
      </div>
      <div style={{ paddingLeft: '10px', fontWeight: 400, fontFamily: ' Poppins',color: ColorPallete.Text.Primary  }}>{label}</div>
    </div>
  );
};

export const PositionedMenuEditItems = {
  edit: [
    {
      id: 1,
      label: getMenuOptions(
        'Update Validation Delivery and Wait Days',
        extractImagePath('edit.png')
      ),
      parentComponent: 'Restrictions',
      componentToRender: 'EditRestrictions',
      name: 'Update Validation Delivery and Wait Days'
    }
    // {
    //   id: 2,
    //   label: getMenuOptions('Inactive Validation Method', extractImagePath('disable.png')),
    //   parentComponent: 'Restrictions',
    //   componentToRender: 'EditRestrictions',
    //   name: 'Inactive Validation Method'
    // }
  ],
  view: [
    {
      id: 1,
      label: getMenuOptions('View Validation Method', extractImagePath('view.png')),
      parentComponent: 'Restrictions',
      componentToRender: 'EditRestrictions',
      name: 'View Validation Method'
    }
  ]
};
