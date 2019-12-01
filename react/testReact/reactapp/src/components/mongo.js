
import React, { Component } from "react";
import axios from 'axios';

// Required for password hashing
import crypto from 'crypto';

// ------------------------------------------------------------------------------
// *** PASSWORD HASHING ***

// Salts the password so the same pasword given by two different users 
//		wont go to the same hash value.
export var genRandomString = function(length){                                                                                                                                                                                        return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex') /** convert to hexadecimal format */
	.slice(0,length);   /** return required number of characters */
};


// cryptographic  hash for  the user password using sha 512 to protect 
//		the users password.
// That way enemy can't get the user's password.
export var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	var value = hash.digest('hex');
	return {
		salt:salt,
		passwordHash:value
	};
};
// ------------------------------------------------------------------------------
export var getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

    // our put method that uses our backend api
  // to create new query into our data base
export var putDataToDB = (salt,hashed_psswd) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      salt: salt,
      hashed_psswd: hashed_psswd,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
export var deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  export var updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };


class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    salt: null,
    message: null,
    hashed_psswd: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    //objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (salt,hashed_psswd) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      salt: salt,
      hashed_psswd: hashed_psswd,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
		<div>
			{/* Unordered List of the Current MongoDB Entries */}
		    <ul>
		        {data.length <= 0 ? 'NO DB ENTRIES YET' : data.map((dat)=> (
		            <li style={{ padding: '10px' }} key={data.id}>
		                <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
		                <span style={{ color: 'gray' }}> salt: </span> {dat.salt} <br />
		                <span style={{ color: 'gray' }}> hashed_psswd: </span> {dat.hashed_psswd}
		            </li>
		            ))}
		    </ul>
			{/* Single text entry box to collect an entry for the database */}
		    <div style={{ padding: '10px' }}>
		        <input type="text" onChange={(e)=>
		        	this.setState({ 
		        		salt: genRandomString(16),
		        		message: e.target.value
		        	})
		        }
		        placeholder="add something in the database"
		        style={{ width: '200px' }}
		        />
		        <button onClick={()=> this.putDataToDB(this.state.salt,sha512(this.state.message,this.state.salt).passwordHash)}>
		            ADD
		        </button>
		    </div>
			{/* Single text entry box to collect the ID number of an entry to be deleted */}
		    <div style={{ padding: '10px' }}>
		        <input type="text" style={{ width: '200px' }} onChange={(e)=> this.setState({ idToDelete: e.target.value })}
		        placeholder="put id of item to delete here"
		        />
		        <button onClick={()=> this.deleteFromDB(this.state.idToDelete)}>
		            DELETE
		        </button>
		    </div>
			{/* Two text entry boxes to collect the ID number of an entry to be updated, and the value to update to */}
		    <div style={{ padding: '10px' }}>
		        <input type="text" style={{ width: '200px' }} onChange={(e)=> this.setState({ idToUpdate: e.target.value })}
		        placeholder="id of item to update here"
		        />
		        <input type="text" style={{ width: '200px' }} onChange={(e)=> this.setState({ updateToApply: e.target.value })}
		        placeholder="put new value of the item here"
		        />
		        <button onClick={()=> this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>
		            UPDATE
		        </button>
		    </div>
		</div>
    );
  }
}

export default App;