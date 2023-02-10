import React, { useState } from "react"

// export default function (props) {
export default function () {
  let [authMode, setAuthMode] = useState("signup")

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event:any) => {
	//Prevent page reload
	event.preventDefault();

	var { display_name, login_name } = document.forms[0];
	alert(display_name.value);
	alert(login_name.value);

	// Send new user to API (AXIOS)
	// const userData = database.find((user) => user.username === uname.value);

	// Display success message
	setIsSubmitted(true);
  };

  	if (authMode === "signup") {
		return (
			<div className="Auth-form-container">
				<form className="Auth-form" onSubmit={handleSubmit}>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Sign In</h3>
						<div className="text-center">
							Already registered?{" "}
							<span className="link-primary" onClick={changeAuthMode}>
							Login
							</span>
						</div>
						<div className="form-group mt-3">
							<label>Login name</label>
							<input
							type="text"
							className="form-control mt-1"
							placeholder="e.g Jane Doe"
							name="display_name"
							required
							/>
						</div>
						<div className="form-group mt-3">
							<label>Pseudo</label>
							<input
							type="text"
							className="form-control mt-1"
							placeholder="e.g Jaane"
							name="login_name"
							required
							/>
						</div>
						{/* <div className="form-group mt-3">
							<label>Email address</label>
							<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
							/>
						</div>
						<div className="form-group mt-3">
							<label>Password</label>
							<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
							/>
						</div> */}
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">
							Submit
							</button>
						</div>
						<p className="text-center mt-2">
							Forgot <a href="#">password?</a>
						</p>
						<div className="text-center mt-2 message">
							{isSubmitted ? <span className="success-message">Successfully signed up!</span> : false}
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
					<h3 className="Auth-form-title">Login</h3>
					<div className="text-center">
						Not registered yet?{" "}
						<span className="link-primary" onClick={changeAuthMode}>
						Sign Up
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