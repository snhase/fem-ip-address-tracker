import './App.css';
import buttonImg from './assets/images/icon-arrow.svg'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-bg-img text-center">
          <div className="py-3 h1" style={{color:"white"}}>IP Address Tracker</div>
          <div className='col-9 col-md-6 mx-auto'>
          <div class="input-group mb-3 mx-auto">
            <input type="text" class="form-control rounded-start-4" style={{padding:"0.75rem 1rem", fontSize:"18px"}} placeholder="Search for any IP address or domain" aria-label="search for ip address or domain" aria-describedby="basic-addon2"/>
            <span class="input-group-text m-0 border-0 rounded-end-4" id="basic-addon2" style={{background:"black"}}><img src={buttonImg}></img></span>
          </div> 
          </div>    
        </div>
      </header>
      <main>
        <div className="mx-auto p-4 card rounded-4 flex-md-row align-content-center align-items-center justify-content-around text-center text-md-start">
          <div className="m-md-2 mb-2">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>IP Address</div>
            <div className="my-md-2 h3 fw-bold">IP Address value</div>
          </div>
          <div className="d-none d-md-block my-2 vr"></div>
          <div className="m-md-2 mb-2">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Location</div>
            <div className="my-md-2 h3 fw-bold">Location value</div>
          </div>
          <div className="d-none d-md-block my-2 vr"></div>
          <div className="m-md-2 mb-2">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>Timezone</div>
            <div className="my-md-2 h3 fw-bold">Timezone value</div>
          </div>
          <div className="d-none d-md-block my-2 vr"></div>
          <div className="m-md-2 mb-2">
            <div className="text-uppercase fw-bold" style={{color:"hsl(0, 0%, 59%)"}}>ISP</div>
            <div className="my-md-2 h3 fw-bold">ISP value</div>
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
