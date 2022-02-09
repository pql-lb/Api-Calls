import {connect, useDispatch} from 'react-redux';
import { Dispatch } from 'redux';
import { allData, manualData, twitterData, instaData }from '../actions/index';
import { useEffect } from 'react';
import { RootState } from '../store';
import DashboardTemp from '../templates/dashboard';
import {Reducer} from '../types';

type Props = {
    reducer: Reducer
}
type IndividualItem = {
    service_name: string,
    item_published: string
}
const Dashboard = ({reducer}: Props) => {
    let dispatch = useDispatch();
    useEffect(() => {
       fetch('https://private-cc77e-aff.apiary-mock.com/posts')
       .then(res => res.json())
       .then(data => {
           const {items} = data;
           if (items) {
               //ADD PROMISES
               let manualArr = new Array; let instaArr = new Array; let twitterArr = new Array;
               let arr = items.map((item: IndividualItem) => {
                   let timestamp = Date.parse(item.item_published)
                   let newItem = {...item, timestamp}
                   return newItem;
               })
               let timeOrderArr = arr.sort((a:any, b:any) => {
                   return b.timestamp - a.timestamp;
                });
               timeOrderArr.map((a: IndividualItem) => {
                   if (a.service_name === 'Manual') {
                    manualArr.push(a)
                    manualArr.push(a)
                   } else if (a.service_name === 'Instagram') {
                    instaArr.push(a)
                    instaArr.push(a)
                   } else if (a.service_name === 'Twitter') {
                    twitterArr.push(a)
                    twitterArr.push(a)
                   } 
               })
               let newArr = [timeOrderArr, timeOrderArr].flat()
               dispatch(allData(newArr))
               dispatch(manualData(manualArr))
               dispatch(twitterData(twitterArr))
               dispatch(instaData(instaArr))
               //AFTER FINAL DISPATCH TURN OFF LOADER

           }
        })
    }, [dispatch])
    return (
        <div>
            {reducer.all.length && reducer.twitter && reducer.instagram && reducer.manual ?
            <DashboardTemp />
            :
            <div>Loading</div>
            }
        </div>
    )
}
  
const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})

export default connect(mapStateToProps)(Dashboard)