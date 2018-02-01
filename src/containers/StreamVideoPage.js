import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, red500 ,greenA200} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import { loadStreamVideo} from '../actions'


const LiveTvIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"/>
  </SvgIcon>
);


const MoreIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </SvgIcon>
);

const RefreshIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);


const AddIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </SvgIcon>
);


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
    iconStyles: {
      marginRight: 24,
    },
    editButton: {
      fill: grey500
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '40%'
      },
      accountshare: {
        width: '10%'
      },
      url: {
        width: '20%'
      },
      credit: {
        width: '10%'
      },
      addCredit: {
        width: '10%'
      },
      addcredit: {
        width: '15%'
      },
      price: {
        width: '20%'
      },
      share: {
        width: '15%'
      },
      botshare: {
        width: '10%'
      },
      category: {
        width: '20%'
      },
      live: {
        width: '10%'
      },
      status: {
        width: '10%'
      },
      action: {
        width: '10%'
      }
    }
  };

class StreamVideoPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openAddShareAmount :  false,
      valueCredit : 100,
      shareDetail : []
    };
  }
  
  componentDidMount(){
      this.props.loadStreamVideo({page : 1, per_page : 20, sortBy : 'createdAt'});
  }
  

  handleOpen = (item) => {
    this.setState({open: true, shareDetail : item.ShareDetail});
  };

   handleClose = () => {
    this.setState({open: false});
  };
  
  handleOpenAddShareAmount = () => {
    this.setState({openAddShareAmount: true});
  };

  handleCloseAddShareAmount = () => {
    this.setState({openAddShareAmount: false});
  };
  
  handleChangeCredit = (event, index, valueCredit) => this.setState({valueCredit});
  


 
  render(){
    const actions = [
        <FlatButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
        />,
    ];
    const actionsAddCredit = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleCloseAddShareAmount}
        />,
        <FlatButton
          label="Ok"
          primary={true}
          onClick={this.handleCloseAddShareAmount}
        />
    ];
    
    const {streamvideo} = this.props;
    const shareDetail  = this.state.shareDetail;
    
  return (
      <PageBase title="Stream Video Page"
                navigation="Application / Stream Video Page">
        <div>
          <Dialog
            title="Share Detail"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
             <List>
              <Subheader>List</Subheader>
              {shareDetail && shareDetail.length > 0 ? shareDetail.map(item =>
                <div>
                  <ListItem
                    primaryText={<a target="_blank" href={item.link}>{item.from}</a>}
                    secondaryText={
                      <div>
                        <p>
                          created_time: {(new Date("2017-11-16T11:36:32+0000")).toString()}
                        </p>
                      </div>
                    }
                    secondaryTextLines={2}
                  />
                  <Divider inset={true} />
                </div>
              ): null}
              </List>
          </Dialog>
          <Dialog
            title="Add shares amount"
            actions={actionsAddCredit}
            modal={false}
            open={this.state.openAddShareAmount}
            onRequestClose={this.handleCloseAddShareAmount}
          >
            <SelectField
                  floatingLabelText="Shares amount"
                  value={this.state.valueCredit}
                  onChange={this.handleChangeCredit}
                  fullWidth={true}>
                        <MenuItem value={50} primaryText="50"/>
                        <MenuItem value={100} primaryText="100"/>
                        <MenuItem value={200} primaryText="200"/>
                        <MenuItem value={300} primaryText="300"/>
            </SelectField>
          </Dialog>
          <Link to="/streamVideoForm" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
  
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.url}>URL</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.credit}>Credit</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.addCredit}>Add shares</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.share}>Bot Share / Total Share </TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.botshare}>Share Detail</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.live}>Live</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.status}>Status</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.action}>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody  displayRowCheckbox={0}>
              {streamvideo && streamvideo.length > 0 ? streamvideo.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.url}><a target="_blank" href = {item.videoId ? item.url + '/' + item.videoId : item.url}>{item.videoId ? item.url + '/' + item.videoId : item.url }</a></TableRowColumn>
                  <TableRowColumn style={styles.columns.credit}>{item.credit}</TableRowColumn>
                  <TableRowColumn style={styles.columns.addCredit}>
                    <IconButton>
                      { item.live ?  <AddIcon  color={greenA200}  onClick={this.handleOpenAddShareAmount}/> : <AddIcon  color={grey500}/>}
                    </IconButton>
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.share}>{item.botShare}/{item.share}</TableRowColumn>
                  <TableRowColumn style={styles.columns.botshare}>
                     <IconButton>
                      <MoreIcon  color={greenA200} onClick={() => this.handleOpen(item)}/>
                    </IconButton>
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.live}>
                     { item.live ? <LiveTvIcon style={styles.iconStyles} color={red500} hoverColor={greenA200} /> : 'None'}
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.status}>{item.status == 1 ? 'Processing' : 'Done'}</TableRowColumn>
                   <TableRowColumn style={styles.columns.action}>
                     <IconButton>
                      <RefreshIcon  color={greenA200} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon  color={red500}/>
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

export default connect(
  state => ({streamvideo : state.entities.streamvideo, meta : state.entities.meta}),
  { loadStreamVideo}
)(StreamVideoPage)


