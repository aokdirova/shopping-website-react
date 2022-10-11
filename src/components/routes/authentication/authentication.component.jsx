import SignUp from '../../sign-up/sign-up.component.jsx';
import SignIn from '../../sign-in/sign-in.component.jsx';
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
	return (
		<AuthenticationContainer>
			<SignIn />
			<SignUp />
		</AuthenticationContainer>
	);
};

export default Authentication;
