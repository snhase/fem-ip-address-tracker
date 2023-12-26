export const getIpInfo = async (data, setIpData, setLoading, setMarker, setErrorMessage) => {
    let url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_EDgSOOvGBBNLobH5CPrahI1vGqZFz"
    if(data) {
        if(data.domain) {
            url = url + "&domain=" + data.domain;
        }
        else if(data.ipAddress) {
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

        const data = await response.json();

        if(data) {
            setIpData(data);
            setLoading(false);
            setErrorMessage("");
            setMarker([data.location?data.location.lat:"" , data.location?data.location.lng:""]);
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
