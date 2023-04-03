import * as React from 'react';
import { Menu, MenuItem, Divider, styled, Tooltip, tooltipClasses } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import './PositionedMenu.css';

export default function PositionedMenu(props) {
  const handleMenuItemClick = (menuItemsData) => {
    props.handleClose();
    if (menuItemsData.operation?.includes('callApi')) {
      props.handleApiCall();
    }
    props.handleDialog(!props.showDialog, menuItemsData);
  };

  const BootstrapTooltip = styled(({ className, ...data }) => (
    <Tooltip {...data} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: ColorPallete.Border.Grid,
      borderRadius: '8px',
      fontSize: '12px',
      font: 'Poppins',
      maxWidth: 550
    }
  }));

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      anchorReference="anchorEl"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      sx={{
        '& .MuiPaper-root': {
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          marginTop: '-5px',
          width: props.styles?.width,
          maxHeight: 'unset !important',
          maxWidth: 'unset !important',
          overflowX: 'hidden !important'
        }
      }}>
      {props.MenuItems?.map((menuItemsData, menuItemsIndex) => (
        <div key={`${menuItemsData.label}_${menuItemsIndex+1}`}>
          <BootstrapTooltip
            title={menuItemsData.disabled ? menuItemsData?.tooltip : ''}
            placement="bottom-start">
            <div>
              <MenuItem
                disabled={menuItemsData.disabled}
                onClick={() => handleMenuItemClick(menuItemsData)}
                sx={menuItemsData.styles?.menuItem ?? {}}>
                <div style={menuItemsData.styles?.icon ?? {}}>{menuItemsData.label}</div>
                <div style={menuItemsData.styles?.text ?? {}}>{menuItemsData.accessor}</div>
              </MenuItem>
            </div>
          </BootstrapTooltip>
          {menuItemsData.divider && (
            <div>
              <Divider />
            </div>
          )}
        </div>
      ))}
    </Menu>
  );
}
