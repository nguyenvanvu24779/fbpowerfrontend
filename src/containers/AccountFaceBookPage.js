import React ,  {PropTypes} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Checkbox from 'material-ui/Checkbox';
import SvgIcon from 'material-ui/SvgIcon';
import {pink500, grey200, grey500, red500 ,greenA200} from 'material-ui/styles/colors';
import Data from '../data';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux'
import {loadAccountsFB, callDeleteAccountsFB, callAddAccountsFB, callRefreshAccountsFB} from '../actions'

const DeleteIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
);
const DetailIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"/>
  </SvgIcon>
)


const RefreshIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);

const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    },
    btnLoad : {
        marginTop : 10
    },
     input : {
      marginLeft : 10,
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '10%'
      },
      url: {
        width: '10%'
      },
      sex: {
        width: '10%'
      },
      from: {
        width: '10%'
      },
      birthDay: {
        width: '10%'
      },
      groups: {
        width: '10%'
      },
      email : {
         width: '10%'
      },
      username : {
         width: '20%'
      },
       passwd : {
         width: '10%'
      },
       actions: {
        width: '15%'
      },
      status : {
        width : '10%'
      }
      
    },
};

class  AccountFaceBookPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          checked: false,
          valueCredit : 100,
          openAddAccount : false,
          loadding : false,
          page : 1,
          per_page : 20 ,
          accountText : '',
          hashtag  : '',
          openAccountDetail : false,
          account : {},
          openComfirm : false,
          idDelete : ''
      };
    };
    componentDidMount(){
      this.props.loadAccountsFB({page : 1, per_page : 20});
    
    };
    componentWillReceiveProps(newProps) {
      //console.log(newProps)
      this.setState({loadding : false})
    };
    
    updateCheck = () => {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
    };
    handleChangeCredit = (event, index, valueCredit) => this.setState({valueCredit});
    
    handleOpenAddAccount = () =>{
      this.setState({openAddAccount : true})
    };
    handleCloseAddAccount = () => {
      this.setState({openAddAccount : false})
    };
    handleDeleteAccountsFB = (id) =>  {
        this.setState({openComfirm : true, idDelete : id})
      //this.props.callDeleteAccountsFB({id : id})
    };
    handleCallDeleteAccountsFB = () => {
      this.setState( {openComfirm : false});
      this.props.callDeleteAccountsFB({id : this.state.idDelete})
    }
    handleLoadAccountsFB = () => {
       this.props.loadAccountsFB({page : this.state.page, per_page : this.state.per_page});
      this.setState({loadding : true})
    };
   handleOnChangePageNumber = (event) =>{
      this.setState({
        page: event.target.value,
      });
    };
    
    handleOnChangePerPage = (event) =>{
      this.setState({
        per_page: event.target.value,
      });
    };
    handleCallAddAccountsFB = () => {
      var account = this.state.accountText;
      this.props.callAddAccountsFB({account : account});
      this.setState({openAddAccount : false})
    };
    handleChangeTextAccount = (event) => {
      this.setState({accountText : event.target.value, hashtag : this.state.hashtag ? this.state.hashtag  : '#default'})
      
    }
    handleOnChangeHashTag = (event) => {
      this.setState({hashtag : event.target.value})
    }
    handleCloseAccountDetail = () => {
      this.setState({openAccountDetail : false})
    }
    handleOpenAccountDetail = (item) => {
      this.setState({openAccountDetail : true});
      this.setState({account : item})
    }
    
    handleRefreshAccount = (item) => {
      this.props.callRefreshAccountsFB({id : item.id, account : item.username + '|' + item.password})
      
    }
    
    handleCloseComfirm = () => {
      this.setState({openComfirm : false})
    }
    
    
    

  
    render(){
      const {accountsfb, meta} = this.props;
      const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCallAddAccountsFB.bind(this)}
            />
      ];
       const actionsComfirm = [
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCloseComfirm.bind(this)}
            />,
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
               onClick={this.handleCallDeleteAccountsFB.bind(this)}
            />
      ];
      return (
            <PageBase title="Account FB Page"
                      navigation="Application / Account FB Page">
              <div>
              <RaisedButton label="Load" style={styles.btnLoad} primary={true} onClick = {this.handleLoadAccountsFB} disabled = {this.state.loadding}/>
                <TextField
                      style ={styles.input}
                      hintText={"Page Number"}
                      floatingLabelText={"Page Number"}
                      onChange = {this.handleOnChangePageNumber}
                      />
                 <TextField
                      style ={styles.input}
                      hintText={"Row per Page"}
                      floatingLabelText={"Row per Page"}
                      onChange = {this.handleOnChangePerPage}
                      />      
                {meta ?  "    Total: "  + meta.total : null}
               <Dialog
                title="Add Account"
                actions={actions}
                modal={false}
                open={this.state.openAddAccount}
                onRequestClose={this.handleCloseAddAccount}
               >
                  <textarea
                    placeholder={ "username|password\nusername|password\n..."}
                    style={{height : 150, width : 500}}
                    onChange={this.handleChangeTextAccount}
                  />
                  <TextField
                      style ={{marginTop : 10}}
                      hintText={"#hashtag"}
                      floatingLabelText={"#hashtag"}
                      onChange = {this.handleOnChangeHashTag}
                      />
              </Dialog>
               <Dialog
                title="Account detail"
                modal={false}
                autoScrollBodyContent={true}
                open={this.state.openAccountDetail}
                onRequestClose={this.handleCloseAccountDetail}
               >
                  {JSON.stringify(this.state.account)}
              </Dialog>
              <Dialog
                title="Comfirm account delete?"
                actions={actionsComfirm}
                modal={false}
                open={this.state.openComfirm}
                onRequestClose={this.handleCloseComfirm}
               >
              </Dialog>
                <FloatingActionButton onClick={this.handleOpenAddAccount} style={styles.floatingActionButton} backgroundColor={pink500}>
                  <ContentAdd />
                </FloatingActionButton>
                <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.username}>username</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.passwd}>passwd</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.url}>URL</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.status}>Status</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.groups}>Groups</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.actions}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {accountsfb && accountsfb.length > 0 ?  accountsfb.map(item =>
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles.columns.id}>{item.__user}</TableRowColumn>
                      <TableRowColumn style={styles.columns.username}>{item.username}</TableRowColumn>
                      <TableRowColumn style={styles.columns.passwd}>{item.password}</TableRowColumn>
                      <TableRowColumn style={styles.columns.url}>
                          {item.__user ?  <a target='_blank' className="active" href={"http://fb.com/" + item.__user} >{"http://fb.com/" + item.__user} </a> : null}
                      </TableRowColumn>
                      <TableRowColumn style={styles.columns.status}>{item.__user ? item.status ?  item.status : 'OK' : 'Fail'}</TableRowColumn>
                      <TableRowColumn style={styles.columns.groups}>{item.groups ?  item.groups.length : 'none'}</TableRowColumn>
                      <TableRowColumn style={styles.columns.actions}>
                          <IconButton onClick={() => this.handleOpenAccountDetail(item)}>
                            <DetailIcon  color={greenA200} />
                          </IconButton>
                           <IconButton onClick={() => this.handleRefreshAccount(item)}>
                            <RefreshIcon  color={greenA200} />
                          </IconButton>
                          <IconButton onClick={() => this.handleDeleteAccountsFB(item.id)} >
                            <DeleteIcon  color={red500} />
                          </IconButton>
                          
                      </TableRowColumn>
                    </TableRow>
                  ): null}
                </TableBody>
              </Table>
              </div>
            </PageBase>
        );
    }
 
};

AccountFaceBookPage.propTypes = {
  loadAccountsFB: PropTypes.func.isRequired,
  callDeleteAccountsFB: PropTypes.func.isRequired,
  callAddAccountsFB : PropTypes.func.isRequired
}

export default connect(
  state => ({accountsfb : state.entities.accountsfb, meta : state.entities.meta}),
  {  loadAccountsFB , callDeleteAccountsFB, callAddAccountsFB, callRefreshAccountsFB}
)(AccountFaceBookPage)

