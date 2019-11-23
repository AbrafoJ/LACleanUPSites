import React from 'react';
import { Authors, Logo, GitHubLink } from "../Utils.js";

class DashBoard extends React.Component {
  render(){
    return(
      <div className="dashboard container">
        <div style={{marginTop:'250px'}}>

              <div className="card z-depth-0 prop-summary"style={{backgroundColor:"#e3f2fd"}}>
                  <div className='card-content grey-text text-darken-3'>
                      <span className="card-title"style={{fontSize:'xxx-large',backgroundColor:"#e3f2fd"}}>LA Clean Up</span>
                      <p><Authors/></p>
                      <span><GitHubLink/></span>
                  </div>
              </div>

{/* 
              <div className="card z-depth-0 prop-summary"style={{backgroundColor:"#c4d4da"}}>
            <div className='card-content grey-text text-darken-3'>
                <span className="card-title">LACleanUp</span>
                <p>From LoopNet</p>
                <p className="grey-text">17, Nov 2:34am</p>
            </div>
        </div> */}

        </div>
      </div>
    )
  }
}

export default DashBoard;