import {LoggedUser} from './LoggedUser';

interface ProfilePublicProps {
    user: LoggedUser,
}

export default function ProfilePublic({user}: ProfilePublicProps) {

	const { login_name, } = user;

	return (
		<>
		<h3>Public informations</h3>
		</>
	);
}
