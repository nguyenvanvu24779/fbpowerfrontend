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
import {} from '../actions'

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
        width: '10%'
      },
      startTime: {
        width: '10%'
      },
      endTime: {
        width: '10%'
      },
      message: {
        width: '10%'
      },
      status: {
        width: '10%'
      },
      loopTime: {
        width: '10%'
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
 
    render(){
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
                <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                  <ContentAdd />
                </FloatingActionButton>
                <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.jobName}>Job Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.startTime}>Start Time</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.endTime}>Start Time</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.message}>Message</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.status}>Status</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.loopTime}>Loop Time</TableHeaderColumn>
                    <TableHeaderColumn style={styles.columns.actions}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {Data.scheduleJobPage.items.map(item =>
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles.columns.jobName}>{item.jobName}</TableRowColumn>
                      <TableRowColumn style={styles.columns.startTime}>{item.startTime}</TableRowColumn>
                      <TableRowColumn style={styles.columns.endTime}>{item.endTime}</TableRowColumn>
                      <TableRowColumn style={styles.columns.message}>{item.message}</TableRowColumn>
                      <TableRowColumn style={styles.columns.status}>{item.status}</TableRowColumn>
                      <TableRowColumn style={styles.columns.loopTime}>{item.loopTime}</TableRowColumn>
                      <TableRowColumn style={styles.columns.actions}>
                          <IconButton >
                            <DetailIcon  color={greenA200} />
                          </IconButton>
                          <IconButton >
                            <DeleteIcon  color={red500} />
                          </IconButton>
                      </TableRowColumn>
                    </TableRow>
                  )}
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
  state => ({}),
  {  }
)(ScheduleJobPage)

