import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints } from '../../redux/slices/points';
import Grid from '@mui/material/Grid';




export const Points = () => {

    const dispatch = useDispatch();

    // const {points} = useSelector(state => state.points);

    // const isPointsLoading = points.status === 'loading';
    
    React.useEffect(() => {
        dispatch(fetchPoints());
      }, []);

console.log()


    // // const userData = useSelector((state) => state.auth.data);
    // const {points} = useSelector(state => state.points);
    // const isPointsLoading = points.status === 'loading';



    //   console.log(points);

    //   return(
    //    <>
    //    <Grid container spacing={4}>
    //     <Grid xs={8} item>
    //       {/* {( isPointsLoading ? [...Array(5)]: points.items).map((obj, index) => 
    //       isPointsLoading ? (<Points key = {index} isLoading={true} />
    //       ):  (  */}
    //       <Points
    //         // Address= {points.Address}
    //       />
    //       {/* ))}  */}
    //       </Grid>
    //       </Grid>
    //       </>
    //   )    
};