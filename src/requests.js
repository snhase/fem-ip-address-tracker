const domainNameRegex = /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/;

export const getIpInfo = async (data, setIpData, setLoading, setMarker, setErrorMessage) => {
    let url = "https://geo.ipify.org/api/v2/country,city?apiKey="+ process.env.REACT_APP_API_KEY
    let cacheKey = "user"
    if(data) {
        if(data.domain) {
            cacheKey=data.domain;
            url = url + "&domain=" + data.domain;
        }
        else if(data.ipAddress) {
            cacheKey=data.ipAddress;
            url = url + "&ipAddress=" + data.ipAddress;
        }
    }
    try {
        const response = await fetch( url, {
            method:"GET"
        });

        if(!response.ok) {
            const error = await response.json();
            setLoading(false);
            if(error && error.messages){
                setErrorMessage(error.messages);
            }
            else{
                setErrorMessage(response.status +"-"+ response.statusText);
            }
            throw Error(response.status +":"+ response.statusText);
        }

        const responseJson = await response.json();

        if(responseJson) {
            setIpData(responseJson);
            setLoading(false);
            setErrorMessage("");
            sessionStorage.setItem(cacheKey,JSON.stringify(responseJson))
            if(cacheKey.match(domainNameRegex) || cacheKey === "user") {
                sessionStorage.setItem(responseJson.ip,JSON.stringify(responseJson))
            }
            setMarker([responseJson.location?responseJson.location.lat:"" , responseJson.location?responseJson.location.lng:""]);
        }
        else{
            setLoading(false);
            setErrorMessage("No data returned, retry or contact support if error persists");
            throw Error("No data returned..."+response.status +":"+ response.statusText);
        }

    } catch (error) {
        console.log(error);
    }
}
