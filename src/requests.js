export const getIpInfo = async (data, setIpData) => {
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
            console.log(response)
            if(response.status === "404"){
                throw Error(response.status);
            }
            else {
                throw Error("Network error");
            } 
        }
        const data = await response.json();
        setIpData(data);
    } catch (error) {
        console.log(error);
    }
}