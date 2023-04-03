import { Outlet } from 'react-router-dom';
import useStyles from './Home.styles';
import TopSubMenu from './Components/TopSubMenu/TopSubMenu';
import AlertNotificationBar from './Components/AlertNotification/AlertNotificationBar';
import { Grid, styled, KeyboardArrowRightIcon, Tooltip } from '@oasis/react-core';
import { useEffect, useState } from 'react';
import LeftPanel from './Components/ConsumerAccountDetails/LeftPanel/LeftPanel';
import RightPanel from './Components/ConsumerAccountDetails/RightPanel/RightPanel';
import { connect } from 'react-redux';
import { ColorPallete } from './theme/ColorPallete';
import { tooltipClasses } from '@mui/material/Tooltip';
import ConsumerQuickActionAddFunctionality from './Components/ConsumerAccountDetails/GeneralInformation/ConsumerQuickAction/ConsumerQuickActionAddFunctionality'

const Adjustment = (isRightPanelExpandeds, isLeftPanelExpandeds) => {
  //case 1
  if (!isRightPanelExpandeds && isLeftPanelExpandeds) {
    return 9;
  }
  if (isRightPanelExpandeds && !isLeftPanelExpandeds) {
    return 8.7;
  }
  //case3
  if (isRightPanelExpandeds && isLeftPanelExpandeds) {
    return 7.3;
  }
  //case 4
  if (!isRightPanelExpandeds && !isLeftPanelExpandeds) {
    return 10.4;
  }
};

const getExpandCollapse = (val) => {
  if (val) {
    return 'collapse';
  }
  return 'expand';
};

const getExapandSize = (isLeft, isRight) => {
  if (isLeft) {
    return 2.2;
  }
  if (isRight) {
    return 2.5;
  }

  return 0.8;
};

const checkConsumerVerification = (props) => {
  return props.consumerSkipVerification || props.consumerVerification;
};

const LayoutPage = (props) => {
  const styles = useStyles();
  const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(true);
  const [rotation, setRotation] = useState('unset');

  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [rotationleft, setRotationleft] = useState('rotate(180deg)');

  const expandLeftPanal = () => {
    setIsLeftPanelExpanded(!isLeftPanelExpanded);
    if (rotationleft == 'unset') {
      setRotationleft('rotate(180deg)');
      return true;
    }
    setRotationleft('unset');
  };

  const expandRightPanal = () => {
    setIsRightPanelExpanded(!isRightPanelExpanded);
    if (rotation == 'rotate(180deg)') {
      setRotation('unset');
      return true;
    }
    setRotation('rotate(180deg)');
  };

  useEffect(() => {
    if (checkConsumerVerification(props)) {
      window.addEventListener('keyup', onKeyBoardButtonPressed);
      return () => {
        window.removeEventListener('keyup', onKeyBoardButtonPressed);
      };
    }
  }, [rotation, rotationleft, props.consumerSkipVerification, props.consumerVerification]);

  const onKeyBoardButtonPressed = (event) => {
    const code = event.code;
    const source = event.target || event.srcElement;
    const sourceTag = source.tagName;
    if (code === 'BracketRight' && sourceTag !== 'TEXTAREA' && sourceTag !== 'INPUT') {
      expandRightPanal();
    }

    if (code === 'BracketLeft' && sourceTag !== 'TEXTAREA' && sourceTag !== 'INPUT') {
      expandLeftPanal();
    }
  };

  const BootstrapTooltip = styled(({ className, ...data }) => (
    <Tooltip {...data} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: '17px',
      font: 'Poppins'
    }
  }));

  return (
    <div className={styles.MainLayout}>
      <TopSubMenu />
      <AlertNotificationBar />
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={getExapandSize(isLeftPanelExpanded, false)}
          style={{ padding: 5, position: 'relative' }}>
          <div className={`${styles.leftPanel}`} style={{ height: '100%' }}>
            {checkConsumerVerification(props) && (
              <BootstrapTooltip
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {getExpandCollapse(isLeftPanelExpanded)} &nbsp;
                    <span
                      style={{
                        backgroundColor: ColorPallete.Color.TooltipColor,
                        borderRadius: '2px',
                        padding: '3px 6px'
                      }}>
                      [
                    </span>
                  </div>
                }
                placement="right">
                <KeyboardArrowRightIcon
                  className={'arrowIcon'}
                  onClick={() => expandLeftPanal()}
                  style={{ pointerEvents: 'auto', transform: rotationleft, zIndex: 90 }}
                />
              </BootstrapTooltip>
            )}

            <LeftPanel isLeftPanelExpanded={isLeftPanelExpanded} />
          </div>
        </Grid>
        <Grid
          item
          xs={Adjustment(isRightPanelExpanded, isLeftPanelExpanded)}
          style={{ padding: 5 }}>
          <Outlet />
        </Grid>
        <Grid
          item
          xs={getExapandSize(false, isRightPanelExpanded)}
          style={{ padding: 5, position: 'relative' }}>
          <div className={`${styles.rightPanel}`} style={{ height: '100%' }}>
            {checkConsumerVerification(props) && (
              <BootstrapTooltip
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {getExpandCollapse(isRightPanelExpanded)} &nbsp;
                    <span
                      style={{
                        backgroundColor: ColorPallete.Color.TooltipColor,
                        borderRadius: '2px',
                        padding: '3px 6px'
                      }}>
                      ]
                    </span>
                  </div>
                }
                placement="left-start">
                <KeyboardArrowRightIcon
                  className={'arrowIcon'}
                  onClick={() => expandRightPanal()}
                  style={{ pointerEvents: 'auto', transform: rotation, zIndex: 90 }}
                />
              </BootstrapTooltip>
            )}
            <RightPanel isRightPanelExpanded={isRightPanelExpanded} />
            <ConsumerQuickActionAddFunctionality/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification
  };
}

export default connect(mapStateToProps, null)(LayoutPage);
