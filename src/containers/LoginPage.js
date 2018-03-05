import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white,red500} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import ThemeDefault from '../theme-default';
import { connect } from 'react-redux'
import {callLogin} from '../actions'
import {browserHistory} from "react-router";
import Subheader from 'material-ui/Subheader';


const styles = {
    loginContainer: {
      minWidth: 320,
      maxWidth: 400,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    paper: {
      padding: 20,
      overflow: 'auto'
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
};
  
class  LoginPage extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
         user : {},
         email : '',
         password : '',
         errorMessage : ''
      };
  };
  
  handleChangeEmail  = (event) => {
    this.setState({email : event.target.value})
  }
  
  handleChangePassword  = (event) => {
    this.setState({password : event.target.value})
  }
  handleLogin = () => {
    this.props.callLogin({identifier : this.state.email,  password : this.state.password});
  }
  componentWillReceiveProps(){
    const {user,LOGIN_FAILURE} = this.props;
    if(user && user.id)
    {
      return browserHistory.push('/');
    }
  }
    
  render(){
    const {user, LOGIN_FAILURE} = this.props;
    if(user && user.id)
    {
      return browserHistory.push('/');
    }
   
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
  
            <Paper style={styles.paper}>
  
              <form>
                <TextField
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  onChange={this.handleChangeEmail}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  onChange={this.handleChangePassword}
                />
  
                <div>
                  <Subheader style={{color : red500}}>{LOGIN_FAILURE ? 'Login fail!' : ''}</Subheader>
                  
                  
                  <RaisedButton label="Login"
                    onClick={this.handleLogin}
                    primary={true}
                    style={styles.loginBtn}/>
                  
                </div>
              </form>
            </Paper>
  
            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />
  
              <FlatButton
                label="Forgot Password?"
                href="/"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div>
  
            <div style={styles.buttonsDiv}>
              <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
                <i className="fa fa-facebook fa-lg"/>
                <span style={styles.btnSpan}>Log in with Facebook</span>
              </Link>
              <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
                <i className="fa fa-google-plus fa-lg"/>
                <span style={styles.btnSpan}>Log in with Google</span>
              </Link>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};


export default connect(
  state => ({user : state.entities.user, LOGIN_FAILURE : state.entities.LOGIN_FAILURE}),
  {  callLogin  }
)(LoginPage)