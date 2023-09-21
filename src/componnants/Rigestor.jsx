import React, { useState } from 'react';
import Joi from "joi";

export default function Rigestor() {

    let[errorlist,seterrorlist] =useState([]);
    let[user,setUser]=useState({
name:'',
email:'',
age:0
    });
    function getData(e) {
        let myUser=user;
       /* myUser.name=e.target.value;*/
       
        
   
     myUser[e.target.name]=e.target.value;
        setUser(myUser);
        console.log(user);
      


        }
        
    
    function submitRegistor(e){
        e.preventDefault();
        let RuseltValedation=validateUser(user);

        if(RuseltValedation.error){
            //list error
            seterrorlist(RuseltValedation.error.details);
        }
        else{
            //go to back end
            console.log("OK");
        }}
    
    function validateUser(user){
        let schema= Joi.object({
            name:Joi.string().min(4).max(20).required(),
            age:Joi.number().min(16).max(80),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
     
    })
    return schema.validate(user,{abortEarly:false});  
  }

  return (
    
    
    <>
    {errorlist.map((err,index)=>
    <div className='alert alert-danger'>
{err.message}
    </div>
    )}
   <div>
  <h2 className='mb-5 mt-2'>Rigestor Form</h2>
  <form onSubmit={submitRegistor} className='container'>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" className="form-control" id="name" onChange={getData} name='name' />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" className="form-control" id="email"onChange={getData} name='email' />
    </div>
    <div className="form-group">
      <label htmlFor="age">Age</label>
      <input type="number" className="form-control " id="age"onChange={getData} name='age' />
    </div>
      
    <button type="submit" className="btn btn-info mt-3 ">Submit</button>
  </form>
</div>

    </>
  )
    }
