import {useState, useEffect} from 'react'
import './App.css';
import buttonImg from './assets/images/icon-arrow.svg'
import { getIpInfo } from './requests';

function App() {
  
  const [ipData, setIpData] = useState('');
  const [ipQuery, setIpQuery] = useState('');

  useEffect(() => {
    if(!ipData){
      getIpInfo(null,setIpData)
    }
  },[ipData, setIpData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(ipQuery){
      let parsedQuery = ipQuery.split('.')
      let ipAddress = null;
      let domain = null;
      if(parsedQuery.length>2) {
        ipAddress=ipQuery
        getIpInfo({ipAddress:ipAddress},setIpData)
      }
      else{
        domain=ipQuery
        getIpInfo({domain:domain},setIpData);

      }
    }
    else {
      if(!ipData){
        getIpInfo(null,setIpData)
      }
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-bg-img text-center">
          <div className="py-3 h1" style={{color:"white"}}>IP Address Tracker</div>
          <div className='col-9 col-md-6 mx-auto'>
          <form className="input-group mb-3 mx-auto" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="form-control rounded-start-4" 
              style={{padding:"0.75rem 1rem", fontSize:"18px"}} 
              placeholder="Search for any IP address or domain" 
              aria-label="search for ip address or domain" 
              aria-describedby="basic-addon2"
              onChange={e =>setIpQuery(e.target.value)}
              />
            <button 
              className="input-group-text m-0 border-0 rounded-end-4" 
              id="basic-addon2" 
              style={{background:"black"}}
              type="submit"
              ><img src={buttonImg}></img></button>
          </form> 
          </div>    
        </div>
      </header>
      <main>
        <div className="mx-auto p-4 card rounded-4 flex-md-row align-content-center justify-content-around text-center text-md-start">
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>IP Address</div>
            <div className="my-md-2 card-data">{ipData? ipData.ip : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Location</div>
            <div className="my-md-2 card-data">{ipData && ipData.location && ipData.location.country && ipData.location.city ? (ipData.location.city +", "+ ipData.location.region +", "+ ipData.location.postalCode)  : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Timezone</div>
            <div className="my-md-2 card-data">{ipData && ipData.location && ipData.location.timezone ? ("UTC "+ ipData.location.timezone)  : '-'}</div>
          </div>
          <div className="d-none d-md-block my-4 vr me-md-4"></div>
          <div className="m-md-2 mb-2 col-sm">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>ISP</div>
            <div className="my-md-2 card-data">{ipData && ipData.isp? ipData.isp : '-'}</div>
          </div>
        </div>
        <div></div>
      </main>
      <footer className="footer p-3 text-center">
      Challenge by <a 
            href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca" 
            alt="frontend-mentor challenge link" 
            target="_blank" 
            rel="noopener noreferrer">Frontend Mentor</a>. Coded by <a href="https://github.com/snhase" alt="github url" target="_blank" rel="noopener noreferrer">snhase</a>
      </footer>
    </div>
  );
}

export default App;
