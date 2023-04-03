import Restrictions from '../../../Images/Restrictions.png';
import EditInMenu from "../../../../Icons/IconsInMenu/EditInMenu.svg";
import { ColorPallete } from '../../../theme/ColorPallete';

export const ToolbarData = [
  {
    label: (
      <>
        <img
          src={Restrictions}
          style={{ width: '24px', alignSelf: 'center', display: 'flex', paddingRight: '8px' }}
        />
        <div>Restrictions</div>
      </>
    ),
    accessor: 'heading'
  }
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: 'div',
    size: 3,
    component: 'label',
    accessor: 'heading',
    styles: {
      display: 'flex',
      alignSelf: 'center',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      color: ColorPallete.Text.Primary,
      fontFamily: "Poppins",
      lineHeight: "24px",
      textAlign: "left"
    }
  }
];


const getMenuOptions = (icon, label) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={icon} />
      </div>
      <div style={{ paddingLeft: "5px", fontWeight: 400 }}>{label}</div>
    </div>
  );
};

export const PositionedMenuEditItems = [
  {
    id: 1,
    label: getMenuOptions(EditInMenu, "Update Restrictions"),
    parentComponent: "Restrictions",
    componentToRender: "EditRestrictions",
    operation: ["edit"],
    name: "Update Validation Delivery and Wait Days"
  },
];
