import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const OverView = () => {
    const {user} = use(AuthContext);
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(()=>{
      if(user?.email){
        fetch(``)
        .then(res => res.json())
        .then((data)=>{
            console.log(data);
            setOverview(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false)
        })
      }
   }, [user]);
   
   if(loading){
    return <LoadingSpinner/>
   }

    return (
        <div>
            <h2>OverView</h2>

            {
                overview ? (
                    <div>
                        <div>
                            <div>
                                <h2>Income</h2>
                                <p>${overview.totalIncome}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <h2>Expenses</h2>
                                <p>${overview.totalExpense}</p>
                            </div>
                        </div>

                         <div>
                            <div>
                                <h2>Balance</h2>
                                <p>${overview.totalBalance}</p>
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <p>No transaxtion found</p>
                )}
        </div>
    );
};

export default OverView;