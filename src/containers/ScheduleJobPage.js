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
import {loadScheduleJobPage} from '../actions'

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
      jobName: {
        width: '15%'
      },
      nextRunAt: {
        width: '15%'
      },
      repeatInterval: {
        width: '15%'
      },
      lastRunAt: {
        width: '15%'
      },
       actions: {
        width: '10%'
      },
      
    },
};

class  ScheduleJobPage extends React.Component {
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
          account : {}
      };
    };
    
    componentDidMount(){
      this.props.loadScheduleJobPage();
    
    }
 
    render(){
      const {schedulejob} = this.props;
      const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
             
            />
      ];
      return (
            <PageBase title="Schedule Job Page"
                      navigation="Application / Schedule Job Page">
              <div>
                <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.jobName}>Job Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.nextRunAt}>Next RunAt</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.repeatInterval}>Repeat Interval</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.lastRunAt}>Last RunAt</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.actions}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {schedulejob && schedulejob.length > 0 ?  schedulejob.map(item =>
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles.columns.jobName}>{item.name}</TableRowColumn>
                      <TableRowColumn style={styles.columns.nextRunAt}>{(new Date(item.nextRunAt)).toLocaleDateString() + ' ' + (new Date(item.nextRunAt)).toLocaleTimeString()}</TableRowColumn>
                      <TableRowColumn style={styles.columns.repeatInterval}>{item.repeatInterval}</TableRowColumn>
                      <TableRowColumn style={styles.columns.lastRunAt}>{(new Date(item.lastRunAt)).toLocaleDateString() + ' ' + (new Date(item.lastRunAt)).toLocaleTimeString()}</TableRowColumn>
                      <TableRowColumn style={styles.columns.actions}>
                          <IconButton >
                            <DeleteIcon  color={red500} />
                          </IconButton>
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

ScheduleJobPage.propTypes = {
}

export default connect(
  state => ({schedulejob : state.entities.schedulejob}),
  { loadScheduleJobPage }
)(ScheduleJobPage)

