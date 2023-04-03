import GeneralInformation from "../../../../../Icons/GeneralInformation.svg";
import History from "../../../../../Icons/History.svg";
import GeneralInformationOnSelectIcon from "../../../../../Icons/IconsOnSelect/GeneralInformationOnSelect.svg";
import HistoryOnSelectIcon from "../../../../../Icons/IconsOnSelect/HistoryOnSelect.svg";
import PeopleGrey from "../../../../../Icons/PeopleGrey.png";
import PeopleWhite from "../../../../../Icons/IconsOnSelect/PeopleWhite.png";

//NO SONAR
// import SupportOnSelectIcon from "../../../../../Icons/IconsOnSelect/SupportOnSelect.svg";
// import TransactionsOnSelectIcon from "../../../../../Icons/IconsOnSelect/TransactionsOnSelect.svg";
// import SensitiveOnSelectIcon from "../../../../../Icons/IconsOnSelect/SensitiveOnSelect.svg";
// import CustomOnSelectIcon from "../../../../../Icons/IconsOnSelect/CustomOnSelect.svg";
// import Settings from "../../../../../Icons/Settings.svg";
// import SettingsOnSelectIcon from "../../../../../Icons/IconsOnSelect/SettingsOnSelect.svg";

export const ListData = [
  {
    id: 1,
    name: "General Information",
    icon: <img height="18" width= "22" src={GeneralInformation} />,
    iconOnSelect: <img height="18" width= "22" src={GeneralInformationOnSelectIcon} />,
    routePath: "/consumer",
  },
  {
    id: 2,
    name: "History",
    icon: <img height="18" width= "22" src={History} />,
    iconOnSelect: <img height="18" width= "22" src={HistoryOnSelectIcon} />,
    routePath: "/consumer/history",
  },
  {
    id: 3,
    name: "Legal",
    icon: <img height="18" width= "22" src={PeopleGrey} />,
    iconOnSelect: <img height="18" width= "22" src={PeopleWhite} />,
    routePath: "/consumer/legal",
  },
];
