import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import { restructureArray } from '../../../../../Common/commonfunctions';
import { LitigiousData} from './ViewLitigious.Data';
import useStyles from '../../../PersonalDetails/PersonalDetails.style.js';


function ViewLitigious(props){
    const styles = useStyles();

    const [litigiousInfo,setLitigiousInfo] = React.useState([])

    React.useEffect(()=>{
        if(props.litigiousInfo.length > 0){
            setLitigiousInfo(props.litigiousInfo)   
        }
    },[props.litigiousInfo])

    return(
        <>
        {litigiousInfo.length > 0 && <Grid container style={{ padding: '0px 24px 24px' }}>
        {restructureArray(litigiousInfo, LitigiousData).map((litigious) =>
          LitigiousData.map((data, index) => {
              return (
                <Grid item xs={data.xs} key={`${data.id}_${index+1}`} style={{ marginTop: '24px' }}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>
                  {data.label == 'Litigious' ? 'Yes':litigious[data.accessor]}
                </div>
              </Grid>
              );
            
            })
          )}
        </Grid>}   
        </>
    )
}

function mapStateToProps(state) {
    return {
    litigiousInfo: state.ConsumerQuickActionsReducer.litigiousInfo
    }
}
export default connect(mapStateToProps, null)(ViewLitigious);
