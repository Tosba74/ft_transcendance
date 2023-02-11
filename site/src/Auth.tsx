import React, { useState } from "react"
import axios from 'axios';

export default function (props:any) {

  let [authMode, setAuthMode] = useState("signup")

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disable, setDisable] = useState(false);

  // USER MUST LOGIN USING THE OAUTH SYSTEM OF 42 INTRANET
  const handleSubmit = (event:any) => {
	// Prevent page reload
	event.preventDefault();

	// Get form datas
	let { login_name, password, email, pseudo } = document.forms[0];

	// Send new user to API with axios
	axios.post('http://localhost:8080/api/users', {
		login_name: login_name.value,

		// validations
		password: password.value,			// must be hashed (using a strong password hashing algorithm), here or serverside ?

		// make a request to the db to check if unique
		pseudo: pseudo.value,				// MUST BE UNIQUE 

		tfa_email: email.value,				// provisory
		tfa_code: "tfa",					// provisory
	})
	.then(function (response:any) {
		// Display success message
		setIsSubmitted(true);
		setDisable(true)
	})
	.catch(function (error:any) {
		console.log(error);			// handle errors in a better way
	});
  };

  const use42Profile = (event:any) => {
	event.preventDefault();
	alert("hello");
  }

  	if (authMode === "signup") {
		return (
			<div className="Auth-form-container">
				<form className="Auth-form" onSubmit={handleSubmit}>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Create your account</h3>
						<div className="text-center">
							Already registered?{" "}
							<span className="link-primary" onClick={changeAuthMode}>
							Login
							</span>
						</div>
						<div className="form-group mt-3">
							<label>Email address</label>
							<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
							name="email"
							/>
						</div>
						<div className="form-group mt-3">
							<label>Login name</label>
							<input
							type="text"
							className="form-control mt-1"
							placeholder="e.g Jane Doe"
							name="login_name"
							required
							/>
						</div>
						<div className="form-group mt-3">
							<label>Password</label>
							<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
							name="password"
							/>
						</div>
						<div className="form-group mt-3">
							<label>Pseudo</label>
							<input
							type="text"
							className="form-control mt-1"
							placeholder="e.g Jaane"
							name="pseudo"
							required
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary" disabled={disable}>
							Submit
							</button>
						</div>

						<div className="d-grid gap-2 mt-3 separator">
             				<span>Or</span>
            			</div>

						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary profile42" disabled>
							Continue with 42-profile
							</button>
						</div>
						<div className="text-center mt-2 message">
							{isSubmitted ? <span className="success-message">Success: account created</span> : false}
						</div>
					</div>
				</form>				
			</div>
		)
	}

    return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Log in</h3>
					<div className="text-center">
						Not registered yet?{" "}
						<span className="link-primary" onClick={changeAuthMode}>
						Sign up
						</span>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
						Submit
						</button>
					</div>
					<p className="text-center mt-2">
					Forgot <a href="#">password?</a>
					</p>
					<div className="text-center mt-2 message">
						{isSubmitted ? <span className="success-message">Successfully logged in!</span> : false}
					</div>
				</div>
			</form>
		</div>
    )
}