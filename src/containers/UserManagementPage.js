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
import {loadUsers, addUser} from '../actions'

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
         width: '20%'
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

class  UserManagementPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          checked: false,
          valueCredit : 100,
          openAddUser : false,
          loadding : false,
          page : 1,
          per_page : 100 ,
          accountText : '',
          hashtag  : '',
          openAccountDetail : false,
          account : {},
          openComfirm : false,
          idDelete : '',
          email : '',
          password : '',
          group : 'User'
      };
    };
    componentDidMount(){
    this.props.loadUsers({page : 1, per_page : 100});
    
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
      this.setState({openAddUser : true})
    };
    handleCloseAddUser = () => {
      this.setState({openAddUser : false})
    };
    handleDeleteAccountsFB = (id) =>  {
        this.setState({openComfirm : true, idDelete : id})
      //this.props.callDeleteAccountsFB({id : id})
    };
    handleCallDeleteAccountsFB = () => {
      this.setState( {openComfirm : false});
     // this.props.callDeleteAccountsFB({id : this.state.idDelete})
    }
    handleLoadAccountsFB = () => {
       //this.props.loadAccountsFB({page : this.state.page, per_page : this.state.per_page});
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

    handleOnChangeEmail = (event) => {
      this.setState({email : event.target.value})
    }
    handleOnChangePassword = (event) => {
      this.setState({password : event.target.value})
    }
    handleChangeGroup = (event, index, value) =>{
      this.setState({group : value})
    }
    handleAddUser = () => {
      this.props.addUser({email : this.state.email,password:  this.state.password});
    }
   
    
    
    render(){
      const {users, meta} = this.props;
  
       const actions= [
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCloseAddUser.bind(this)}
            />,
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
            onClick={this.handleAddUser.bind(this)}
            />
      ];
      return (
            <PageBase title="User Mngt Page"
                      navigation="Application / User Mngt Page">
              <div>
               <Dialog
                title="Add Account"
                actions={actions}
                modal={false}
                open={this.state.openAddUser}
                onRequestClose={this.handleCloseAddUser}
               >  
                <TextField
                      style ={{marginTop : 10}}
                      hintText={"Email"}
                      fullWidth={true}
                      floatingLabelText={"Email"}
                      onChange = {this.handleOnChangeEmail}
                />
                
                <TextField
                      style ={{marginTop : 10}}
                      hintText={"Password"}
                      fullWidth={true}
                      floatingLabelText={"Password"}
                      type="password"
                      onChange = {this.handleOnChangePassword}
                />
                 <SelectField
                  floatingLabelText="Group"
                  value={this.state.group}
                  fullWidth={true}
                  style ={{marginLeft : 10}}
                  onChange={this.handleChangeGroup}>
                      <MenuItem value={'Administrator'} primaryText={"Administrator"}/>
                      <MenuItem value={'User'} primaryText={"User"}/>
                </SelectField>
              </Dialog>
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
              
                <FloatingActionButton onClick={this.handleOpenAddAccount} style={styles.floatingActionButton} backgroundColor={pink500}>
                  <ContentAdd />
                </FloatingActionButton>
                <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.username}>UserName</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.actions}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {users && users.length > 0 ?  users.map(item =>
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles.columns.username}>{item.email}</TableRowColumn>
                      <TableRowColumn style={styles.columns.actions}>
                          <IconButton >
                            <DetailIcon  color={greenA200} />
                          </IconButton>
                          <IconButton>
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

UserManagementPage.propTypes = {
  
}


export default connect(
  state => ({users : state.entities.users, meta : state.entities.meta}),
  {  loadUsers, addUser}
)(UserManagementPage)