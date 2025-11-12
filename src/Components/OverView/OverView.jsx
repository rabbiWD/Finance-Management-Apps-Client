import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const OverView = () => {
    const {user} = use(AuthContext);
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(()=>{
      if(user?.email){
        fetch(`http://localhost:3000/overview?email=${user.email}`)
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
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-5'>OverView</h2>

            {
                overview ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 text-center'>
                        <div className='card bg-outline border shadow-lg'>
                            <div className='card-body'>
                                <h2 className='text-2xl font-semibold'>Income</h2>
                                <p className='text-3xl font-bold'>${overview.totalIncome}</p>
                            </div>
                        </div>

                        <div className='card bg-red-100 border border-red-400 shadow-lg'>
                            <div className="card-body">
                                <h2 className='text-2xl font-semibold'>Expenses</h2>
                                <p className="text-3xl font-bold">${overview.totalExpense}</p>
                            </div>
                        </div>

                         <div className="card bg-blue-100 border border-blue-400 shadow-lg">
                            <div className='card-body'>
                                <h2 className='text-2xl font-semibold'>Balance</h2>
                                <p className='text-3xl font-bold'>${overview.totalBalance}</p>
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <p className='text-center'>No transaxtion found</p>
                )}
        </div>
    );
};

export default OverView;