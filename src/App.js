import {useState, useEffect} from 'react'
import './App.css';
import buttonImg from './assets/images/icon-arrow.svg'
import { getIpInfo } from './requests';
import { MapWithMarker } from './components/MapWithMarker';

function App() {

  const [ipData, setIpData] = useState("");
  const [ipQuery, setIpQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [marker, setMarker] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const ipAddressRegex =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const domainNameRegex = /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/;

  useEffect(() => {
    if(!ipData){
      getIpInfo(null,setIpData,setLoading,setMarker,setErrorMessage)
    }
  },[ipData, setIpData]);

  const handleChange = (event) => {
    setValidationError("")
    setIpQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if(ipQuery){
      let ipAddress = null;
      let domain = null;
      if(ipQuery.match(ipAddressRegex)){
        setValidationError("")
        ipAddress=ipQuery;
        getIpInfo({ipAddress:ipAddress},setIpData, setLoading,setMarker,setErrorMessage)
      } else if (ipQuery.match(domainNameRegex)){
        setValidationError("")
        domain=ipQuery;
        getIpInfo({domain:domain},setIpData,setLoading,setMarker,setErrorMessage);
      } else {
        setLoading(false);
        setValidationError("IP address or domain is invalid, please check entered value and retry.");
      }
    }
    else {
      if(!ipData){
        getIpInfo(null,setIpData,setLoading,setMarker,setErrorMessage);
      }
    }
  }

  return (
    <div className="app">
      <header>
        <div className="header-bg-img text-center">
          <div className="py-3 h1" style={{color:"white"}}>IP Address Tracker</div>
          <div className='col-9 col-md-6 mx-auto'>
          <form className="input-group mx-auto" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="form-control rounded-start-4" 
              style={{padding:"0.75rem 1rem", fontSize:"18px", transition:"none"}} 
              placeholder="Search for any IP address or domain" 
              aria-label="search for ip address or domain" 
              aria-describedby="basic-addon2"
              onChange={handleChange}
              disabled={isLoading}
              required
                            />
            <button 
              className="input-group-text m-0 border-0 rounded-end-4" 
              id="basic-addon2" 
              type="submit"
              disabled={isLoading}
              ><img className={isLoading?'opacity-25':''}src={buttonImg} alt="search button"></img></button>
          </form>
          {
            validationError?
            <div className="p-2 fw-bold text-left text-warning">{validationError}</div>
            :
            <></>
          }
          </div>    
        </div>
      </header>
      <main>
      <div className="mx-auto p-4 card position-absolute rounded-4 flex-md-row align-content-center justify-content-around text-center text-md-start">
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>IP Address</div>
            <div className="my-md-2 card-data">{!isLoading && ipData? ipData.ip : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Location</div>
            <div className="my-md-2 card-data">{
              !isLoading && (ipData && ipData.location && 
              (ipData.location.city||ipData.location.region||ipData.location.postalCode))?
                <span>
                  <span>{ipData.location.city?ipData.location.city +", ":"" }</span>
                  <span>{ipData.location.region?ipData.location.region+" ":"" }</span>
                  <span>{ipData.location.postalCode}</span>
                </span>
                : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Timezone</div>
            <div className="my-md-2 card-data">{!isLoading && ipData && ipData.location && ipData.location.timezone ? ("UTC "+ ipData.location.timezone)  : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>ISP</div>
            <div className="my-md-2 card-data">{!isLoading && ipData && ipData.isp? ipData.isp : '-'}</div>
          </div>
        </div>
        {
          isLoading?
          <div className="position-absolute notification-text">
            <div className="spinner-border" role="status"></div>
            <div className="sr-only">Loading...</div>
          </div>
          :
          errorMessage?
          <div className="position-absolute notification-text">
           <div className="h4 text-danger">Error : {errorMessage}</div>
        </div>
          :
          <MapWithMarker marker={marker}/>
        }
      </main>
      <footer className="footer p-3 text-center">
      Challenge by <a 
            href="https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0" 
            alt="frontend mentor challenge link" 
            target="_blank" 
            rel="noopener noreferrer">Frontend Mentor</a>. Coded by <a href="https://github.com/snhase" alt="github url" target="_blank" rel="noopener noreferrer">snhase</a>
      </footer>
    </div>
  );
}

export default App;
