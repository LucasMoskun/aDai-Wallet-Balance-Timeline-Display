
export const UpdateBalanceData = async (currentData, setDisplayData) => {
    if(currentData.balance === -1) {
        return;
    }

    const pastData = await GetData();
    if(pastData.length === 0) {
        PostNewEntry(currentData);
    } else {
        //post new data point to existing entry
        var i;
        for(i = 0; i < pastData.length; i++) {
            if(pastData[i].hasOwnProperty(currentData.account)){
                pastData[i][currentData.account].push(
                    {'x':currentData.date, 'y':currentData.balance}
                )
                const setData = pastData[i][currentData.account];
                setDisplayData(setData);
                UpdateData(pastData[i],pastData[i].id);
                return;
            } 
        }
        //if adding new account, but not first account
        PostNewEntry(currentData);
    }
}

export const GetData = async() => { 
    const result = await fetch("http://localhost:5112/account_balances");
    const data = await result.json();
    if(JSON.stringify(data) === '{}') {
        return {empty: true};
    }
    return data;
}

export const PostData = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(bodyObject)
    };
    const response = await fetch("http://localhost:5112/account_balances", requestOptions);
}

function PostNewEntry(currentData) {
    const firstEntry = CreateFirstEntry(currentData);
    PostData(firstEntry);
}

export const UpdateData = async (bodyObject, ID) => {
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObject)
    }
    const fetchURL = "http://localhost:5112/account_balances/" + ID.toString();
    const response = await fetch(fetchURL, requestOptions);
}

function CreateFirstEntry(currentData) {
    const dataBody = {x:currentData.date, y:currentData.balance};
    return {[currentData.account]: [dataBody]};  
}
