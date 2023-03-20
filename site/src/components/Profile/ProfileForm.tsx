import React, { SyntheticEvent, useState } from "react";
import { Profile } from './Profile';

interface ProfileFormProps {
	profile: Profile;
	onSave: (profile: Profile) => void;
	onCancel: () => void;
}

export default function ProfileForm({
	profile: initialProfile,
	onSave,
	onCancel
}: ProfileFormProps) {
	const [profile, setProfile] = useState(initialProfile);
	const [errors, setErrors] = useState({
		name: '',
		description: '',
	});

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onSave(new Profile({ name: "Updated Profile" }));
	};
	const handleChange = (event: any) => {
		const { type, name, value, checked } = event.target;
		// if input type is checkbox use checked
		// otherwise it's type is text, number etc. so use value
		let updatedValue = type === "checkbox" ? checked : value;
		//if input type is number convert the updatedValue string to a +number
		if (type === "number") {
			updatedValue = Number(updatedValue);
		}
		const change = {
			[name]: updatedValue
		};
		let updatedProfile: Profile;
		// need to do functional update b/c
		// the new profile state is based on the previous profile state
		// so we can keep the profile properties that aren't being edited +like profile.id
		// the spread operator (...) is used to
		// spread the previous profile properties and the new change
		setProfile((p) => {
			updatedProfile = new Profile({ ...p, ...change });
			return updatedProfile;
		});
		setErrors(() => validate(updatedProfile));
	};
	function validate(profile: Profile) {
	  let errors: any = { name: '', description: '', budget: '' };
	  if (profile.name.length === 0) {
	    errors.name = 'Name is required';
	  }
	  if (profile.name.length > 0 && profile.name.length < 3) {
	    errors.name = 'Name needs to be at least 3 characters.';
	  }
	  if (profile.description.length === 0) {
	    errors.description = 'Description is required.';
	  }
	  return errors;
	}
		
	function isValid() {
	  return (
	    errors.name.length === 0 &&
	    errors.description.length === 0
	  );
	}

	return (
		<form className="input-group vertical" onSubmit={handleSubmit}>
			<label htmlFor="name">Profile Name</label>
			<input
				type="text"
				name="name"
				placeholder="enter name"
				value={profile.name}
				onChange={handleChange}
			/>
			{errors.name.length > 0 && (
				<div className="card error">
					<p>{errors.name}</p>
				</div>
			)}
			<label htmlFor="description">Profile Description</label>
			<textarea
				name="description"
				placeholder="enter description"
				value={profile.description}
				onChange={handleChange}
			/>
			{errors.description.length > 0 && (
				<div className="card error">
					<p>{errors.description}</p>
				</div>
			)}
			<label htmlFor="isActive">Active?</label>
			<input
				type="checkbox"
				name="isActive"
				checked={profile.isActive}
				onChange={handleChange}
			/>
			<div className="input-group">
				<button className="primary bordered medium">Save</button>
				<span />
				<button type="button" className="bordered medium" onClick={onCancel}>
					cancel
				</button>
			</div>
		</form>
	);
}