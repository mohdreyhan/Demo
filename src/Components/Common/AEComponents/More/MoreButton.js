import React from 'react';
import { IconButton, Tooltip, MoreHoriz } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { returnValueOrDefault } from '../../commonfunctions';

function MoreButton(props) {
  const disableValue = props.contactInfo || props.disabled ? true : false;
  const disableColor = disableValue ? ColorPallete.Button.Tertiary : ColorPallete.Button.Primary;

  const handleOnClick = (event) => {
    if(typeof props.handleClick === "undefined") return
    if (props.data || props.tableRowData) {
      props.handleClick(event, props.data, props.tableRowData);
    } else if (props.others && 'index' in props.others) {
      props.handleClick(props.others.index);
    } else {
      props.handleClick(event);
    }
  };

  return (
    <>
      <Tooltip
        title={returnValueOrDefault(props?.others?.title, 'More Actions')}
        disableHoverListener={props.hideToolTip}>
        <IconButton
          disabled={disableValue}
          onClick={handleOnClick}
          sx={returnValueOrDefault(props.styles, { pointer: 'cursor' })}>
          <>
            {props?.moreButtonCustom ? (
              props.moreButtonCustom?.icon
            ) : (
              <MoreHoriz style={{ color: disableColor }} />
            )}
          </>
        </IconButton>
      </Tooltip>
    </>
  );
}

export default MoreButton;
