import React, {useState} from 'react';

import {Interval} from './components/utils';
import {RetrieveADaiBalance} from './components/contact_interact';
import {LineChart} from './components/line_chart';
import {UpdateBalanceData} from './components/manage_data'


export const ADai_Scan = () =>
{
    const [displayData, setDisplayData] = useState([{}]);
    const [intervalRate, setIntervalRate] = useState(500);

    Interval(() => {
        const GetBalanceAsync = async () => {
            const balance = await RetrieveADaiBalance();
            if(balance.empty !== undefined) {
                return;
            }
            await UpdateBalanceData(balance, setDisplayData);
        }
        GetBalanceAsync();
        setIntervalRate(1000 * 15);
    }, intervalRate);
    
    return(
        <div>
            <LineChart
                data={displayData}
            />
        </div>
    );
}