import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import AccountRoot from './AccountRoot';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AccountRoot,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return (
      <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
        Error: {err}
        <br />
        Info: {info}
        <br />
        Props: {JSON.stringify(props)}
        <br />
      </div>
    );
  }
});

export const { bootstrap, mount, unmount } = lifecycles;

export { default as store } from './Store/Store.js';

export { Provider } from 'react-redux';

export { default as CallWrapUp } from './Components/ConfigurationManager/CallWrapUp/CallWrapUp.js';

export { default as AlertInformation } from './Components/ConfigurationManager/AlertsConfigurationManager/AlertInformation.js';

export { default as RelationshipTypeManagement } from './Components/ConfigurationManager/RelationshipTypeManagement/RelationshipTypeManagement.js';

export { default as DisputeView } from './Components/ConfigurationManager/DisputeView/DisputeView';

export { default as StatusPrioritization } from './Components/ConfigurationManager/StatusCodePrioritization/StatusPrioritization.js';

export { default as Restrictions } from './Components/ConfigurationManager/Restrictions/Restrictions.js';

export {default as CustomField} from './Components/ConfigurationManager/CustomField/CustomField.js';

