import {ColorPallete} from '../../../../theme/ColorPallete';

export const ConsumerDetailsIntro = [
  {
    label: "",
    accessor: "fullName",
    operation: [],
    styles: {
      fontSize: "16px",
      color: ColorPallete.Text.Primary
    },
  },
  {
    label: "ID : ",
    accessor: "customerId",
    operation: 'tooltipAdd',
    styles: {
      fontSize: "12px",
      color: ColorPallete.Color.Black,
    },
    
  },
];

export const ConsumerDetailsApiList = [
  {
    firstName : 'Bart',
    lastName : 'Fenwick',
    customerId: '87698709785646565676743355555555555',
    responsibleId: '418c6e7e-56bd-11ed-ba8a-12fafa95e8f9'
  },
  {
    firstName : 'Mayer',  
    lastName : 'Eldon',
    customerId: "939345346534542525523532532525253333",
    responsibleId: '4164005e-56bd-11ed-ba8a-12fafa95e8f9'
  },
  
];

export const customerDetailsStyles = {
  titleStyle: {
    fontSize: "16px",
    color: ColorPallete.Text.Primary,
    fontFamily: 'Poppins',
    pointerEvents: "auto",
    cursor: "pointer",
    lineBreak: 'anywhere'
  },
  subTitleStyle: {
    fontSize: "12px",
    paddingTop: "3px",
    color: ColorPallete.Text.Secondary,
    fontFamily: 'Poppins',
    pointerEvents: "auto",
    cursor: "pointer",

      align: "left" ,    
      display: "block",
      width: "70px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",

  }
}