import { connect } from 'react-redux';
import { createNewUser, clearErrors, login } from '../../actions/session_action';
import Signup from './signup';

const mapStateToProps = ({ errors }) => {
  return { errors }
}

const mapDispatchToProps = dispatch => ({
  createNewUser: formUser => dispatch(createNewUser(formUser)),
  clearErrors: () => dispatch(clearErrors()),
  login: formUser => dispatch(login(formUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);