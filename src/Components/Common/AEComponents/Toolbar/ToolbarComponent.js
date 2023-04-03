import * as React from 'react';
import { Toolbar, Grid } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import './toolbar.css';

export default function ToolbarComponent(props) {
  const onPressClick = (ToolbarData) => {
    if (!ToolbarData.disabled) {
      if (ToolbarData.operation?.includes('click') && props.data) {
        return (event) => props.handleClick(event, props.data);
      }
      if (ToolbarData.operation?.includes('click')) {
        return (event) => props.handleClick(event);
      }
    }
  };

  return (
    <Toolbar>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            borderBottom: '1px solid',
            borderBottomColor: ColorPallete.Border.Primary,
            alignItems: 'center',
            height: props.toolbarHeight,
            marginLeft: props.toolbarLeftMargin,
            justifyContent: props.justifyContent
          }}>
          {props.ToolbarData.map((ToolbarData) =>
            props.ToolbarStructure.map((ToolbarStructureData) => {
              if (props.tabs && ToolbarData.accessor == 'tabs') ToolbarData.label = props.tabs;
              if (ToolbarData.accessor == ToolbarStructureData.accessor) {
                return (
                  <ToolbarStructureData.tag
                    style={ToolbarStructureData.styles}
                    key={`toolbar${ToolbarData?.label}_${ToolbarStructureData?.id}`}>
                    <div
                      style={{ display: 'flex' }}
                      onClick={onPressClick(ToolbarData)}>
                      {ToolbarData[ToolbarStructureData.component]}
                    </div>
                  </ToolbarStructureData.tag>
                );
              }
            })
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
}
