import React,  {PropTypes} from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500,red500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import { callAddContentShare, loadContentShare, callUpdateContentShare, callDeleteContentShare} from '../actions'
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

const DeleteIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
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
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '20%'
    },
    content: {
      width: '30%'
    },
    edit: {
      width: '10%'
    }
  },
  btnLoad : {
          marginTop : 10
  },
  input : {
    marginLeft : 10,
  },
};


class  ContentShareManagementPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
          openAddContentShare : false,
          openUpdateContentShare : false,
          contentShare : '',
          contentShareUpdateItem : '',
          page : 1,
          per_page : 50 ,
        }
        
    }
    componentDidMount(){
      this.props.loadContentShare({page : 1, per_page : 50});
    }
    
    handleOpenAddContentShare = () => {
      this.setState({openAddContentShare : true})
    };
    handleCloseAddContentShare = () => {
      this.setState({openAddContentShare : false})
    }
    handleCallAddContentShare = () =>{
      this.props.callAddContentShare({contents : this.state.contentShare })
      this.setState({openAddContentShare : false})
    }
    handleChangeTextContentShare = (event) => {
      this.setState({contentShare : event.target.value})
      
    }
     handleChangeTextUpdateContentShare = (event) => {
       var contentShareUpdateItem = this.state.contentShareUpdateItem;
       contentShareUpdateItem.content = event.target.value;
      this.setState({contentShareUpdateItem : contentShareUpdateItem})
      
    }
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
    
    handleLoadShareContent = () =>{
      this.props.loadContentShare({page : this.state.page, per_page : this.state.per_page});
      
    }
    handleUpdateContentShare = (item) =>{
      this.setState({openUpdateContentShare : true, contentShareUpdateItem : item})
    }
    handleCloseUpdateContentShare = () =>{
      this.setState({openUpdateContentShare : false})
      
    }
    handleCallUpdateContentShare = () =>{
      this.props.callUpdateContentShare({content : this.state.contentShareUpdateItem.content, id : this.state.contentShareUpdateItem.id })
      this.setState({openUpdateContentShare : false})
    }
    
    handleDeleteContentShare = (item) =>{
      this.props.callDeleteContentShare({id : item.id });
      
    }
   
    render(){
      const {contentShare, meta} =  this.props;
      const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCallAddContentShare.bind(this)}
            />];
      const actionsUpdateContentShare = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleCloseUpdateContentShare.bind(this)}
        />,
        <FlatButton
          label="OK"
          primary={true}
          onClick={this.handleCallUpdateContentShare.bind(this)}
        />,
    ];
        return (
                <PageBase title="Content Share Page"
                          navigation="Application / Content Share Page">
                  <div>
                    <RaisedButton label="Load" style={styles.btnLoad} primary={true} onClick = {this.handleLoadShareContent} disabled = {this.state.loadding}/>
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
                      title="Add Content Share"
                      actions={actions}
                      modal={false}
                      open={this.state.openAddContentShare}
                      onRequestClose={this.handleCloseAddContentShare}
                      autoScrollBodyContent={true}
                  >
                      <textarea
                        style={{height : 150, width : 500}}
                        placeholder={ "content 1|content 2|content 3|..."}
                        onChange={this.handleChangeTextContentShare}
                      />
                  </Dialog>
                  <Dialog
                      title="Edit Content Share"
                      actions={actionsUpdateContentShare}
                      modal={false}
                      open={this.state.openUpdateContentShare}
                      onRequestClose={this.handleCloseUpdateContentShare}
                      autoScrollBodyContent={true}
                  >
                      <textarea
                        style={{height : 150, width : 500}}
                        value={this.state.contentShareUpdateItem.content}
                        onChange={this.handleChangeTextUpdateContentShare}
                      />
                  </Dialog>
                    <FloatingActionButton  style={styles.floatingActionButton} backgroundColor={pink500}  onClick={this.handleOpenAddContentShare}>
                        <ContentAdd />
                    </FloatingActionButton>
            
                    <Table>
                      <TableHeader  adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columns.content}>Content</TableHeaderColumn>
                          <TableRowColumn style={styles.columns.edit}>Edit</TableRowColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        { contentShare &&   contentShare.length > 0 ? contentShare.map(item =>
                          <TableRow key={item.id}>
                            <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                            <TableRowColumn style={styles.columns.content}>{item.content}</TableRowColumn>
                            <TableRowColumn style={styles.columns.edit}>
                              <FloatingActionButton zDepth={0}
                                                    mini={true}
                                                    backgroundColor={grey200}
                                                    onClick={() => this.handleUpdateContentShare(item)}
                                                    iconStyle={styles.editButton}>
                                <ContentCreate  />
                              </FloatingActionButton>
                              <IconButton onClick={() => this.handleDeleteContentShare(item)} >
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

ContentShareManagementPage.propTypes = {

}

export default connect(
  state => ({contentShare :  state.entities.contentShare,  meta : state.entities.meta}),
  {callAddContentShare, loadContentShare, callUpdateContentShare, callDeleteContentShare}
)(ContentShareManagementPage)
