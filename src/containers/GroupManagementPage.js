import React , {PropTypes} from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, red500 ,greenA200} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import SvgIcon from 'material-ui/SvgIcon';
import Data from '../data';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import { addGroup, loadGroup, deleteGroup, updateGroup} from '../actions'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';


const DeleteIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
);

const RefreshIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);

const styles = {
    radioButton: {
     marginBottom: 16,
    },
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
        width: '10%'
      },
      name: {
        width: '15%'
      },
      url: {
        width: '15%'
      },
      botShare: {
        width: '10%'
      },
      actions: {
        width: '15%'
      },
      botInGroup: {
        width: '10%'
      },
      question: {
        width: '15%'
      },
      members : {
        width : '10%'
      },
    },
    btnLoad : {
        marginTop : 10
    },
    input : {
      marginLeft : 10,
    }
  };


class GroupManagementPage extends React.Component  {
    
    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
          openAddGroup : false,
          openAnswer : false,
          typeAdd : 0, // 0 - group id, 1 - video id,
          ids : [],
          page : 1,
          per_page : 20 ,
          loadding : false,
          arrAnswer : [],
          arrQuestion : [],
          group : {},
          sortBy : 'createdAt'
        };
    }
    componentDidMount(){
      this.props.loadGroup({page : 1, per_page : 20, sortBy : 'createdAt'});
    
    }
    componentWillReceiveProps(newProps) {
      //console.log(newProps)
      this.setState({loadding : false})
    }
    
    handleTouchTap = (event) => {
         // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
            openAddGroup : false,
        });
    };
    
    
    handleOpenAddGroup = (type) => {
        this.setState({typeAdd : type});
        this.handleRequestClose();
        this.setState({openAddGroup: true});
    };
    
    handleCloseAddGroup = () => {
        this.setState({openAddGroup: false});
    };
    
    handleAddGroup = () => {
      if(this.state.ids.length > 0 ){
        this.props.addGroup({typeAdd:  this.state.typeAdd , ids : this.state.ids})
        this.setState({openAddGroup: false});
      }
    };
    handleOnChangeIds = (event) =>{
      this.setState({
        ids: event.target.value.split("|"),
      });
    }
    
    handleLoadGroups = () => {
      this.props.loadGroup({page : this.state.page, per_page : this.state.per_page, sortBy : this.state.sortBy});
      this.setState({loadding : true})
    }
    
    handleOnChangePageNumber = (event) =>{
      this.setState({
        page: event.target.value,
      });
    }
    
    handleOnChangePerPage = (event) =>{
      this.setState({
        per_page: event.target.value,
      });
    }
    handleDeleteGroup = (id) => {
      this.props.deleteGroup({id: id })
    }
    handleAddAnswer  = (item) => {
       //console.log(item)
       this.setState({openAnswer: true, arrQuestion : item.question, group : item, arrAnswer : item.answer ? item.answer : []  });
       //console.log(thi)
    }
    
    handleCloseAnswer = () => {
       this.setState({openAnswer: false});
    }
    handleCallAddAnswer = () => {
      //console.log(this.state.arrAnswer)
      this.props.updateGroup({ id : this.state.group.id,answer : this.state.arrAnswer })
      this.setState({openAnswer: false});
      
    }
    handleChangeTextAnswer = (item, index , event) => {
      var arrAnswer = this.state.arrAnswer;
      arrAnswer[index] = event.target.value;
      this.setState({arrAnswer :  arrAnswer})
    }
    handleChangeSortBy = (event, index, value) => {
      this.setState({sortBy : value})
    }
  

    render(){
      const {groups, meta} = this.props;
      const {arrQuestion, group ,arrAnswer} = this.state;
      const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleAddGroup.bind(this)}
            />
        ];  
      const actionsAddAnswer = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCallAddAnswer.bind(this)}
            />
        ];  
    return (
        <PageBase title="Group Management Page"
                  navigation="Application / Group Management Page">
                  
        <div>
            <RaisedButton label="Load" style={styles.btnLoad} primary={true} onClick = {this.handleLoadGroups} disabled = {this.state.loadding}/>
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
              <SelectField
                  floatingLabelText="Sort By"
                  value={this.state.sortBy}
                  style ={{marginLeft : 10}}
                  onChange={this.handleChangeSortBy}>
                      <MenuItem value={'countMembers'} primaryText={"Members"}/>
                      <MenuItem value={'createdAt'} primaryText={"createdAt"}/>
                </SelectField>
            {meta ?  "    Total: "  + meta.total : null}
            <Dialog
                title="Add Group"
                actions={actions}
                modal={false}
                open={this.state.openAddGroup}
                onRequestClose={this.handleCloseAddGroup}
                autoScrollBodyContent={true}
            >
                <TextField
                  hintText={this.state.typeAdd == 0 ? "GroupID1|GroupID2|GroupID3..." : "VideoID1|VideoID2|VideoID3..."}
                  floatingLabelText={this.state.typeAdd == 0 ? "Group ID" : "Video ID"}
                  fullWidth={true}
                  onChange={this.handleOnChangeIds}
                />
            </Dialog>
            <Dialog
                title="Answer"
                actions={actionsAddAnswer}
                modal={false}
                open={this.state.openAnswer}
                onRequestClose={this.handleCloseAnswer}
                autoScrollBodyContent={true}
            >
                {arrQuestion.map( (item, index) => 
                  <div>
                  <div dangerouslySetInnerHTML={{__html: item}} />
                  <textarea   onChange={(event) => this.handleChangeTextAnswer(item, index, event)} style={{height : 150, width : 500}} value={arrAnswer && arrAnswer.length > 0 ? arrAnswer[index] : ''}></textarea>
                  </div>
                )}    
            </Dialog>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
                <Menu>
                    <MenuItem onClick={ () => this.handleOpenAddGroup(0)} primaryText="by Group ID" />
                    <MenuItem onClick={ () => this.handleOpenAddGroup(1)} primaryText="by Video ID" />
                    <MenuItem onClick={ () => this.handleOpenAddGroup(2)} primaryText="add Hashtag" />
                </Menu>
            </Popover>
            <FloatingActionButton onClick={this.handleTouchTap} style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd />
            </FloatingActionButton>
    
            <Table selectable={false}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.url}>URL</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.question}>Question</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.members}>Members</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.botInGroup}>Accounts in Group</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.botShare}>Bot Shares</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.actions}>Actions</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {groups && groups.length > 0 ? groups.map(item =>
                  <TableRow key={item.groupId}>
                    <TableRowColumn style={styles.columns.id}>{item.groupId}</TableRowColumn>
                    <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                    <TableRowColumn style={styles.columns.url}>
                        <a target='_blank' className="active" href={"http://fb.com/" + item.groupId}>{"http://fb.com/" + item.groupId} </a>
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.question}>
                      {item.question && item.question.length > 0 ? 
                        <a onClick={() => this.handleAddAnswer(item)}>{ item.answer && item.answer.length > 0 ? 'Answer/Edit' : 'Answer'}</a> 
                        : 
                        'None'}
                    </TableRowColumn>
                    <TableHeaderColumn style={styles.columns.members}>{item.countMembers}</TableHeaderColumn>
                    <TableRowColumn style={styles.columns.botInGroup}>{item.countMemberSystem}</TableRowColumn>
                    <TableRowColumn style={styles.columns.botShare}>{item.botShares}</TableRowColumn>
                    <TableRowColumn style={styles.columns.actions}>
                        <IconButton onClick={() => this.handleDeleteGroup(item.id)}>
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

GroupManagementPage.propTypes = {
  addGroup: PropTypes.func.isRequired
}

export default connect(
  state => ({groups : state.entities.groups, meta : state.entities.meta}),
  { addGroup , loadGroup, deleteGroup, updateGroup}
)(GroupManagementPage)
