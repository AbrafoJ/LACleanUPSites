import React from "react";
import "./index.css";


export const Logo = () =>
<div className='logo' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>

<br />
  <a href="/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/AbrafoJ/LACleanUPSites/master/Logo.png"
      style={{ width: `300px`, marginTop: "4em" }}
      alt=""
    />
  </a>
</div>;

export const GitHubLink = () =>
<div style={{margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
GitHub {''}
<br />
  <a href="https://github.com/AbrafoJ/LACleanUPSites" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/AbrafoJ/LACleanUPSites/master/githublogo.png"
      style={{ width: `20px`, margin: ".10em .3em" }}
      alt=""
    />
  </a>
</div>;

export const Authors = () =>
<div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
J. Dorham | D. Garcia | J. Gomez | F. Yao {''}

</div>;