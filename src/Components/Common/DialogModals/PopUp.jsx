import { Dialog, DialogTitle, DialogContent, DialogActions, MuiButton } from '@oasis/react-core';
import useStyles from './PopupStyles';
import { extractImagePath } from '../commonfunctions';
import { ButtonsActions } from '../../BusinessProcess/Business.Data';

const PopUp = (props) => {
  const classes = useStyles();
  const {
    title,
    children,
    openPopUp,
    imageSrc,
    leftButton,
    beforeCancel,
    showCancel,
    maxWidth,
    showButton,
    showConfirm,
    showNext,
    showTemp,
    handleButtonResponse,
    afterTitleIconSrc,
    action,
    actionType,
    showViewSummary,
    styles
  } = props;

  return (
    <Dialog
      open={openPopUp}
      maxWidth={maxWidth ?? `md`}
      classes={{ paper: `${classes.dialogWrapper} ${action == 'thankyou' && classes.thankyou}` }}>
      <DialogTitle style={{ padding: '0px' ,display: "initial"}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.popupTitle}>
            {imageSrc ? (
              <img
                className={classes.imageSource}
                style={styles?.viewSummaryImageSrc}
                src={imageSrc}
                alt=""
              />
            ) : (
              ''
            )}
            <div className={classes.header}>{title}</div>
            {afterTitleIconSrc ? (
              <img className={classes.imageSource} src={afterTitleIconSrc} alt="" />
            ) : (
              ''
            )}
          </div>
          <div>
            <img
              src={extractImagePath('close.png')}
              alt=""
              style={{ marginTop: '10px', cursor: 'pointer', marginRight: '20px' }}
              onClick={() => {
                handleButtonResponse('closeInTitle', action);
              }}
            />{' '}
          </div>
        </div>
      </DialogTitle>
      <DialogContent style={{ padding: '0px', overflow: 'hidden' }}>{children}</DialogContent>
      <DialogActions style={{ justifyContent: 'space-between', paddingTop: '5px' }}>
        <div>
          {leftButton ? (
            <>
              {leftButton?.map((lfield) => {
                if (lfield?.type == 'button') {
                  return (
                    <span key={`button_${lfield?.action}`}>
                      <MuiButton
                        className={classes.buttonDiv}
                        variant={lfield.variant ?? 'outlined'}
                        disabled={lfield?.disabled ?? false}
                        onClick={() => {
                          handleButtonResponse(lfield?.action, action, actionType);
                        }}>
                        {lfield?.title}
                      </MuiButton>
                    </span>
                  );
                }
              })}
            </>
          ) : (
            ''
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          {beforeCancel ? (
            <>
              {beforeCancel?.map((bfield) => {
                if (bfield?.type == 'button') {
                  return (
                    <span key={`button_${bfield?.action}`}>
                      <MuiButton
                        className={classes.cancelActionBtn}
                        variant={bfield.variant ?? 'outlined'}
                        onClick={() => {
                          handleButtonResponse(bfield?.action, bfield?.failedPage);
                        }}>
                        {bfield?.title}
                      </MuiButton>
                    </span>
                  );
                } else if (bfield?.type == 'image') {
                  return (
                    <span key={`button_${bfield?.action}`} style={{ marginLeft: '5px' }}>
                      <img
                        style={{ marginTop: '10px', marginRight: '10px' }}
                        src={bfield.src}
                        alt=""
                        onClick={() => {
                          handleButtonResponse(bfield?.action);
                        }}
                      />
                    </span>
                  );
                }
              })}
            </>
          ) : (
            ''
          )}
          {showTemp ? (
            <>
              {showTemp?.map((field) => {
                if (field?.type == 'button') {
                  return (
                    <span key={`button_${field?.action}`}>
                      <MuiButton
                        className={classes.buttonDiv}
                        variant={field.variant ?? 'outlined'}
                        disabled={field?.disabled ?? false}
                        onClick={() => {
                          handleButtonResponse(field?.action);
                        }}>
                        {field?.title}
                      </MuiButton>
                    </span>
                  );
                }
              })}
            </>
          ) : (
            ''
          )}
          {showViewSummary ? (
            <>
              {showViewSummary?.map((field) => {
                if (field?.type == 'button') {
                  return (
                    <span key={`button_${field?.action}`}>
                      <MuiButton
                        className={classes.buttonDiv}
                        variant={field.variant ?? 'outlined'}
                        disabled={field?.disabled ?? false}
                        onClick={() => {
                          handleButtonResponse(field?.action);
                        }}>
                        {field?.title}
                      </MuiButton>
                    </span>
                  );
                }
              })}
            </>
          ) : (
            ''
          )}
          {showCancel ? (
            <MuiButton
              className={classes.buttonDiv}
              onClick={() => {
                handleButtonResponse('close', action, actionType);
              }}>
              Close
            </MuiButton>
          ) : (
            ''
          )}
          {showConfirm ? (
            <>
              {showConfirm?.map((field) => {
                if (field?.type == 'button') {
                  return (
                    <span key={`button_${field?.action}`}>
                      <MuiButton
                        className={classes.buttonDiv}
                        variant={field.variant ?? 'outlined'}
                        disabled={field?.disabled ?? false}
                        onClick={() => {
                          handleButtonResponse(field?.nextAction);
                        }}>
                        {field?.title ? field?.title : 'Confirm'}
                      </MuiButton>
                    </span>
                  );
                }
              })}
            </>
          ) : (
            ''
          )}
          {showButton && (
            <MuiButton
              className={classes.buttonDiv}
              onClick={() => {
                handleButtonResponse(ButtonsActions.SUBMIT_FORM);
              }}>
              {showButton.title.length > 0 ? showButton.title : 'Submit'}
            </MuiButton>
          )}
          {showNext && (
            <>
              {showNext?.map((field) => {
                if (field?.type == 'button') {
                  return (
                    <span key={`button_${field?.action}`}>
                      <MuiButton
                        className={classes.buttonDiv}
                        variant={field.variant ?? 'outlined'}
                        disabled={field?.disabled ?? false}
                        onClick={() => {
                          handleButtonResponse(field?.nextAction);
                        }}>
                        {field?.title}
                      </MuiButton>
                    </span>
                  );
                }
              })}
            </>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
