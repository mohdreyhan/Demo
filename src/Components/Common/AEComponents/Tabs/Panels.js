import * as React from 'react';
import { Box } from '@oasis/react-core';
import './panels.css';

export default function Panels({ components, TabsData, others, value }) {
  const applyCSSClassname = () => {
    if ('fixedTableHeight' in others && others.fixedTableHeight) {
      return 'tableContainer';
    }
    return '';
  };

  return (
    <Box>
      {TabsData.map((tabData, index) => {
        return (
          <div role="tabpanel" key={`${tabData.id}_${index + 1}`}>
            {components.map((component, compIndex) => {
              if (tabData.value == value && tabData.component == component.key) {
                return <div key={`${component.key}_${compIndex + 1}`} className={applyCSSClassname()}>{component.value}</div>;
              }
            })}
          </div>
        );
      })}
    </Box>
  );
}

Panels.defaultProps = {
  others: {}
};
