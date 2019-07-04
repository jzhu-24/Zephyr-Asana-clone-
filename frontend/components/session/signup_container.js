import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session_action';
import Signup from './signup';

const mapStateToProps = ({ errors }) => {
  return { errors }
}

const mapDispatchToProps = dispatch => ({
  createNewUser: formUser => dispatch(createNewUser(formUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);