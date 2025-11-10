import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const MyTransaction = () => {
    const {user} = use(AuthContext)
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/my-transaction?email=${user.email}`)
            .then(res => res.json())
            .then((data)=>{
                console.log(data);
                setTransactions(data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }, [user]);

    if(loading){
        return <LoadingSpinner/>
    }

    return (
        <div>
            <h2>My Transaction</h2>

            {
                transactions.length === 0 ? (
                    <p>Transaction Not Found</p>
                ) : (
                    <div>
                        {
                            transactions.map((transaction) => (
                                <div key={transaction._id}>
                                    <h2>{transaction.category}</h2>
                                    <p>Type: {transaction.type}</p>
                                    <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default MyTransaction;