import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useEffect } from "react";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [alias, setAlias] = useState("");
	const [bio, setBio] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

			const formData = new FormData()
            formData.append('email', email.trim())
            formData.append('username', username.trim())
            formData.append('first_name', firstName.trim())
            formData.append('last_name', lastName.trim())
            formData.append('bio', bio.trim())
            formData.append('profile_picture', profilePicture)
            formData.append('password', password.trim())
			formData.append('alias', alias.trim())

			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	useEffect(() => {
        const errors = [];
        // Only adding to the validation errors for fields that are nullable=False in the Video model
        if (!email.trim()) errors.push('Email required')
        if (!username.trim()) errors.push('Username required')
        if (!password.trim()) errors.push('Password required')
        if (!firstName.trim()) errors.push('First name required')
        if (!lastName.trim()) errors.push('Last name required')
        setValidationErrors(errors)
    }, [email, username, password, firstName, lastName])

	return (
		<div className="signup-div">
			<h1 className="modalText">Create Your Profile</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul className="signup-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Email (required)"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Username (required)"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="password"
						placeholder="Password (required)"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={6}
						maxLength={15}
					/>
				</label>
				<label className="signup-text">
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						minLength={6}
						maxLength={15}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Alias"
						value={alias}
						onChange={(e) => setAlias(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="textarea"
						placeholder="Bio"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</label>
				<label className="signup-text">
					<input
						type="file"
						accept="image/*"
						name="image"
						onChange={(e) => setProfilePicture(e.target.files[0])}
						// onChange={(e) => console.log(e.target.files[0])}
						required={true}
					/>
				</label>
				<div className="form-input-box">

            </div>
				<button className="confirm-signup" type="submit">Sign Up!</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
