import React from 'react';
import { Box, Paper, Grid, CircularProgress, Stack } from '@oasis/react-core';
import ToolbarComponent from '../AEComponents/Toolbar/ToolbarComponent';
import { restructureArray } from '../commonfunctions';
import useStyles from './WidgetComponent.style';

const RenderLoader = () => {
  return (
    <Stack sx={{ alignItems: 'center', paddingBlock: '15px' }}>
      <CircularProgress key={0} />
    </Stack>
  );
};

const WidgetComponent = ({
  toolbarStructure,
  toolbarData,
  stateData,
  columnData,
  handleMoreButtonClick,
  loading
}) => {
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
        <ToolbarComponent
          ToolbarData={toolbarData}
          ToolbarStructure={toolbarStructure}
          handleClick={handleMoreButtonClick}
        />
        {loading && <RenderLoader />}
        {!loading && (
          <Grid container style={{ padding: '10px 24px' }}>
            {restructureArray(stateData, columnData).map((accountDatas) =>
              columnData.map((data, index) => {
                return (
                  <Grid
                    item
                    xs={data.xs}
                    key={`${data.accessor}_${index + 1}`}
                    style={{ padding: '15px 0px' }}>
                    <div
                      className={classes.widgetDetailsLabel}
                      style={{ color: data.labelColor ?? '#444444' }}>
                      {data.label}
                    </div>
                    <div className={classes.widgetDetailsAccessor}>
                      {!accountDatas[data.accessor] || accountDatas[data.accessor] === 'N/A'
                        ? ` `
                        : accountDatas[data.accessor]}
                    </div>
                  </Grid>
                );
              })
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default WidgetComponent;
