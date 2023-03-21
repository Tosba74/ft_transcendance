import {LoggedUser} from '../LoggedUser';

interface ProfilePrivateProps {
    user: LoggedUser,
}

export default function ProfilePrivate({user}: ProfilePrivateProps) {

	return (
		<>
		<h3>Private informations</h3>
		</>
	);
}
