import React from "react";
import "./index.css";


export const Logo = () =>
<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>

<br />
  <a href="/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/AbrafoJ/LACleanUPSites/master/LCULogo.png"
      style={{ width: `400px`, marginTop: "2.5em" }}
      alt=""
    />
  </a>
</div>;

export const GitHubLink = () =>
<div style={{margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
Link to GitHub: {''}
<br />
  <a href="https://github.com/AbrafoJ/LACleanUPSites" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/AbrafoJ/LACleanUPSites/master/githublogo.png"
      style={{ width: `30px`, margin: ".10em .3em" }}
      alt=""
    />
  </a>
</div>;

export const Authors = () =>
<div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
Jordan Dorham | Diego Garcia | Joseph Gomez | Flo Yao {''}

</div>;