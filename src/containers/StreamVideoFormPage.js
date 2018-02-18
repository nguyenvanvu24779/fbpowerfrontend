import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Checkbox from 'material-ui/Checkbox';
import { loadSettingsPage, callCreateStreamVideo} from '../actions'
import { connect } from 'react-redux';
import {browserHistory} from "react-router";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
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
    }
};

class  StreamVideoFormPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          checked: false,
          valueCredit : 0,
          valueTimeShareLimit : 0,
          valueSharesAmount : 0,
          url : '',
          errorTextUrl : "",
          openComfirmOrder : false,
          note : '',
      };
    };
    
    componentDidMount(){
      this.props.loadSettingsPage();
    }
    
    updateCheck = () => {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
    };
    handleChangeUrl = (event) =>this.setState({url : event.target.value})
    handleChangeCredit = (event, index, valueCredit) => this.setState({valueCredit});
    handleChangeTimeShareLimit =  (event, index, valueTimeShareLimit) => this.setState({valueTimeShareLimit});
    handleChangeValueSharesAmount =  (event, index, valueSharesAmount) => this.setState({valueSharesAmount});
    handleCreate = () => {
       
      if(!this.state.url.includes('https://www.facebook.com/')){
        return this.setState({errorTextUrl : 'error url!'})
      } 
      this.setState({openComfirmOrder : true})
      this.setState({errorTextUrl : ''})
     
    }
    
    handleCloseComfirmOrder = () => {
      this.setState({openComfirmOrder : false})
    }
    
    handleComfirmOrder = () => {
      this.props.callCreateStreamVideo({sharesAmount: this.state.valueSharesAmount, timeShareLimit : this.state.valueTimeShareLimit, url : this.state.url, note : this.state.note});
      return browserHistory.goBack();
    }
    
    handleChangeNote = (event) => {
      this.setState({note : event.target.value})
    }
    
    render(){
        const {settings} = this.props;
        
        var timeShareLimit = [];
        var sharesAmount = [];
        for (var i = 0; i < settings.length; i++) {
          if(settings[i].key == 'timeShareLimit') timeShareLimit  =  JSON.parse(settings[i].value);
          if(settings[i].key == 'sharesAmount')   sharesAmount    =  JSON.parse(settings[i].value);
        }
        if(timeShareLimit.length > 0 && this.state.valueTimeShareLimit == 0){
          this.setState({valueTimeShareLimit : timeShareLimit[0]});
        }
         if(sharesAmount.length > 0 && this.state.valueSharesAmount == 0){
          this.setState({valueSharesAmount : sharesAmount[0]});
        }
         const actionsComfirmOrder = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleComfirmOrder.bind(this)}
            />,
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCloseComfirmOrder.bind(this)}
            />,
        ];
         return (
            <PageBase title="Stream Video Order Form"
                      navigation="Application / Stream Video Order Form">
                       
            <Dialog
                title="Comfirm Order"
                actions={actionsComfirmOrder}
                modal={false}
                open={this.state.openComfirmOrder}
                onRequestClose={this.handleCloseComfirmOrder}
                autoScrollBodyContent={true}
            >
            <div>
              Url : {this.state.url}
              <br/>
              Time Share Limit : {this.state.valueTimeShareLimit}
              <br/>
              Shares Amount : {this.state.valueSharesAmount}
              <Divider/>
              Credit : 100
              
            </div> 
            </Dialog>
              <form>
                <TextField
                  hintText="Url live stream / Url profile live stream"
                  floatingLabelText="Url live stream / Url profile live stream"
                  fullWidth={true}
                  onChange={this.handleChangeUrl}
                  errorText={this.state.errorTextUrl}
                />
                
                 <SelectField
                  floatingLabelText="Time Share Limit"
                  value={this.state.valueTimeShareLimit}
                  onChange={this.handleChangeTimeShareLimit}
                  fullWidth={true}>
                  {timeShareLimit.length > 0 ?  timeShareLimit.map(item =>
                        <MenuItem value={item} primaryText={item +  "min"}/>
                  ): null}
                </SelectField>
                
                <SelectField
                  floatingLabelText="Shares Amount"
                  value={this.state.valueSharesAmount}
                  onChange={this.handleChangeValueSharesAmount}
                  fullWidth={true}>
                  {sharesAmount.length > 0 ? sharesAmount.map(item =>
                        <MenuItem value={item} primaryText={item}/>
                  ): null}
                </SelectField>
                

                
                
                <br/>
                <br/>
                {"Credit : " + 100}
                
                <TextField
                  hintText="Note"
                  floatingLabelText="Note"
                  multiLine={true}
                  rows={2}
                  fullWidth={true}
                  onChange={this.handleChangeNote}
                /><br />
        
                <Divider/>
        
                <div style={styles.buttons}>
                  <Link to="/stream">
                    <RaisedButton label="Cancel"/>
                  </Link>
                  
                    <RaisedButton label="Create"
                                  style={styles.saveButton}
                                  onClick={this.handleCreate.bind(this)}
                                  primary={true}/>
                  
                  </div>
              </form>
            </PageBase>
        );
    }
 
};

export default connect(
  state => ({settings : state.entities.settings}),
  { callCreateStreamVideo, loadSettingsPage}
)(StreamVideoFormPage)
