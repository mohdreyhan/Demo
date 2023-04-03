import { useState, useEffect } from 'react';
import makeStyles from './useStyles';
import { defaultSelectId } from './formData';

const SelectedValue = ({ selected, name, selectedStatus }) => {
  const classes = makeStyles();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(true);
  useEffect(() => {
    if (selected !== defaultSelectId) {
      setValue(name);
      setStatus(selectedStatus);
    }
  }, [selected]);

  const ActiveSelected = () => <span className={classes.activeSelectItem}>{value}</span>;

  const InActiveSelected = () => <span className={classes.inactiveSelectedItem}>{value}</span>;

  const StatusComponent = () => {
    return <> {status ? <ActiveSelected /> : <InActiveSelected />}</>;
  };

  return (
    <div
      data-testid="selected-value-test"
      style={{
        maxWidth: '90%',
        display: 'inline-flex'
      }}>
      {selected == defaultSelectId ? 'Select' : <StatusComponent />}
    </div>
  );
};

export default SelectedValue;
