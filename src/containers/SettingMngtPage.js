import React,  {PropTypes} from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import { loadSettingsPage, callupdateSettings,defaultSettings} from '../actions'
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '20%'
    },
    key: {
      width: '20%'
    },
    value: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  },
  btnLoad : {
          marginTop : 10
  },
};


class  SettingMngtPage extends React.Component  {
    constructor(props) {
        super(props);
    
        this.state = {
          openEdit : false,
          value : '',
          key : '',
          textEdit : '',
          openDefaultSetting : false
        };
        
    }
    componentDidMount(){
      this.props.loadSettingsPage();
    }
    
    handleRequestClose = () => {
        this.setState({
            openEdit: false,
            id : '',
            value : '',
            key : '', 
            openDefaultSetting : false
        });
    };
    
    
    
    handleEdit = () => {
      console.log(this.state.textEdit)
      this.props.callupdateSettings({id : this.state.id, value :  this.state.textEdit});
      this.handleRequestClose();
      //this.props.loadSettingsPage();
    };
    
    
    handleOpenEdit = (item) => {
        //this.handleRequestClose();
        this.setState({
          openEdit: true,
          value : item.value,
          key : item.key,
          id : item.id
        });
    };
    handleOnChangeValue = (event) =>{
      this.setState({
        textEdit: event.target.value
      });
    }
    
    handleDefaultSettingOpen = () =>{
      this.setState({openDefaultSetting : true})
    }
    
    handleDefaultSetting = () =>{
      this.props.defaultSettings();
      this.setState({openDefaultSetting : false});
    }
    
    render(){
      const {settings} = this.props;
      const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleEdit.bind(this)}
            />];
      const actionsDefaulSetting = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleRequestClose}
        />,
        <FlatButton
          label="OK"
          primary={true}
          onClick={this.handleDefaultSetting}
        />,
    ];
        return (
                <PageBase title="Setting Page"
                          navigation="Application / Setting Page">
                  <div>
                  <RaisedButton label="Default Setting" style={styles.btnLoad} primary={true} onClick = {this.handleDefaultSettingOpen}/>
                  <Dialog
                      title="Edit Setting"
                      actions={actions}
                      modal={false}
                      open={this.state.openEdit}
                      onRequestClose={this.handleRequestClose}
                      autoScrollBodyContent={true}
                  >
                      <TextField
                        hintText={this.state.value}
                        floatingLabelText={"Key: " + this.state.key }
                        fullWidth={true}
                        onChange={this.handleOnChangeValue}
                      />
                  </Dialog>
                   <Dialog
                      actions={actionsDefaulSetting}
                      modal={false}
                      open={this.state.openDefaultSetting}
                      onRequestClose={this.handleRequestClose}
                    >
                      Default Settings ?
                    </Dialog>
            
                    <Table>
                      <TableHeader  adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columns.key}>Key</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columns.value}>Value</TableHeaderColumn>
                          <TableRowColumn style={styles.columns.edit}>Edit</TableRowColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        { settings.length > 0 ? settings.map(item =>
                          <TableRow key={item.id}>
                            <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                            <TableRowColumn style={styles.columns.key}>{item.key}</TableRowColumn>
                            <TableRowColumn style={styles.columns.value}>{item.value}</TableRowColumn>
                            <TableRowColumn style={styles.columns.edit}>
                            
                              <FloatingActionButton zDepth={0} onClick={() => this.handleOpenEdit(item)}
                                                    mini={true}
                                                    backgroundColor={grey200}
                                                    iconStyle={styles.editButton}>
                                <ContentCreate  />
                              </FloatingActionButton>
                             
                            </TableRowColumn>
                          </TableRow>
                        ) : null}
                      </TableBody>
                    </Table>    
                  </div>
                </PageBase>
              );
    }
    
};

SettingMngtPage.propTypes = {
  loadSettingsPage: PropTypes.func.isRequired
}

export default connect(
  state => ({settings : state.entities.settings}),
  { loadSettingsPage ,callupdateSettings, defaultSettings}
)(SettingMngtPage)
