import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import {userInfo } from '../../App';
import firebaseConfig from './firebase.config';
import './Login.css'
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {
   const [loggedInUser,setLoggedInUser]=useContext(userInfo);
   const [newUser,setNewUser]=useState(false)
   let history = useHistory();
   let location = useLocation();
   let { from } = location.state || { from: { pathname: "/" } };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn=()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const nuser=result.user;
            const { displayName, email } =nuser;
            const signedInUser = { name: displayName, email:email,error:false }
           setLoggedInUser(signedInUser);
           history.replace(from);
          }).catch(err=> {
            const errorMessage = err.message;
            console.log(errorMessage)
            
          });
    }
    const handleSubmit = (e) => {
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser}
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    newUserInfo.success="Succesfully Created! Please Login"
                    setLoggedInUser(newUserInfo)
                    updateUserName(loggedInUser.fname+loggedInUser.lname)

            
                })
                .catch(error => {

                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    newUserInfo.success=''
                    setLoggedInUser(newUserInfo)

                });

        }
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    console.log(res.user.displayName)
                    const newUserInfo = { ...loggedInUser}
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    newUserInfo.name=res.user.displayName
                    setLoggedInUser(newUserInfo)
                    history.replace(from);

                })
                .catch(function (error) {

                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = error.message

                    newUserInfo.success = false
                    setLoggedInUser(newUserInfo)
                })
        }
        e.preventDefault();
    }
    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }

        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = (isPasswordValid && passHasNumber);
        }

        if (event.target.name === 'cpassword') {

            const password = document.getElementById("Password").value;
            isFormValid = event.target.value === password;
            if (!isFormValid) {
                alert("Password does not match!")
            }
        }
        if (isFormValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo);
        }
    }
    const toggole = () => {
        const newUserInfo = { ...loggedInUser }
        newUserInfo.error = ''
        newUserInfo.success=''
        newUserInfo.success = true
        setLoggedInUser(newUserInfo)
        setNewUser(!newUser)
    }
    const updateUserName=name=>{
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName:name,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
        // Update successful.
        }).catch(function(error) {
        console.log(error)
        });
    }
    return (
        <div className='login'>
        <div className='login-border'>
            {newUser ? <h3>Create an Account</h3> : <h3>Login</h3>}
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="fname" onBlur={handleBlur} placeholder='First Name' required />}<br /><br />
                {newUser && <input type="text" name="lname" onBlur={handleBlur} placeholder='Last Name' required />}<br /><br />
                <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required /><br /><br />
                <input type="password" name="password" id='Password' onBlur={handleBlur} placeholder='Password' required /><br /><br />
                {newUser && <input type="password" name="cpassword" onBlur={handleBlur} placeholder='Confirm Password' required />}<br /><br />
                <input className='submit' type="submit" value={newUser ? "Created an Account" : "Login"} />
            </form><br />
            {newUser ? <p>Already have an account? <span style={{ cursor: 'pointer' }} onClick={toggole}><u>Login</u></span></p> : <p>Don't have an account? <span style={{ cursor: 'pointer' }} onClick={toggole}><u>Create an account</u></span></p>}
        </div>
        <div>
    {!loggedInUser.success && <p style={{ color: 'red' }}>{loggedInUser.error}</p>}
    {loggedInUser.success && <p style={{ color: 'green' }}>{loggedInUser.success}</p>}
            <p style={{ marginLeft: '280px' }}>or</p>

            <button className="btn-login" onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    <p>{loggedInUser.email}</p>
    </div>
    );
};

export default Login;