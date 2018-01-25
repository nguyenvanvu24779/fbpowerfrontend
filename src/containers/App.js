import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import {pink500, greenA200} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'material-ui/SvgIcon';

// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {MessageBox} from 'react-chat-elements';
import { SystemMessage } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');


// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://45.117.169.77:1337/';


import Data from '../data';

const ChatListIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      chatShow : false,
      numNewMsg : 0,
      dataSourceChat : [],
      alertMsg : '',
      open : false
    };
    
    // Send a GET request to `http://localhost:1337/hello`:
    io.socket.get('/root/join', function serverResponded (body, JWR) {
      // body === JWR.body
      console.log('Sails responded with: ', body);
      console.log('with headers: ', JWR.headers);
      console.log('and with status code: ', JWR.statusCode);
    
      // ...
      // more stuff
      // ...
    
    
      // When you are finished with `io.socket`, or any other sockets you connect manually,
      // you should make sure and disconnect them, e.g.:
     // io.socket.disconnect();
    
      // (note that there is no callback argument to the `.disconnect` method)
    });
    io.socket.on('message', (function (broadcastedData){
      
       if(broadcastedData.msg){
          console.log(broadcastedData.msg);
          var dataSourceChat = this.state.dataSourceChat;
          if(dataSourceChat.length > 15) dataSourceChat.shift();
          dataSourceChat.push({
                position: 'left',
                type: 'text',
                text: broadcastedData.msg,
                date: new Date(),
          });
          this.setState({dataSourceChat : dataSourceChat});
          this.setState({numNewMsg : this.state.numNewMsg + 1});
       }
       if(broadcastedData.alert){
         this.setState({alertMsg : broadcastedData.alert, open : true })
       }
       // => 'hi there!'
    }).bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }
  handleOpenChat(){
    this.setState({chatShow : !this.state.chatShow, numNewMsg : 0})
  }
  
  handleClose  (){
    this.setState({open : false})
  } 

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;
    const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose.bind(this)}
            />
    ];
        
    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      },
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 0,
        bottom: 100,
        left: 'auto',
        position: 'fixed',
      },
      cardChat: {
        margin: 0,
        marginTop : 200, 
        top: 'auto',
        right: 0,
        bottom: 160,
        left: 'auto',
        position: 'fixed',
        zIndex: '9998',
      },
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
      
            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>
            <Dialog
                title="System Message"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
              {this.state.alertMsg}
            </Dialog>

            <div style={styles.container}>
                 { this.state.chatShow ? <Card style={styles.cardChat}>
                  <MessageList
                  className='message-list'
                  lockable={false}
                  toBottomHeight={'100%'}
                  dataSource= {this.state.dataSourceChat}/>
                </Card> : null}
                <Badge
                  badgeContent={this.state.numNewMsg}
                  primary={this.state.numNewMsg == 0 ? true : false}
                  secondary={this.state.numNewMsg == 0 ? false : true}
                  badgeStyle={{top: 4, right: 4}}
                  style={styles.floatingActionButton}
                >
                  <FloatingActionButton onClick={this.handleOpenChat.bind(this)}  backgroundColor={greenA200}>
                    <ChatListIcon />
                  </FloatingActionButton>
                </Badge>
              
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
