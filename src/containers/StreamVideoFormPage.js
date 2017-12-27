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
          valueCredit : 100,
          valueTimeShareLimit : 30,
          valueSharesAmount : 50,
      };
    };
    
    updateCheck = () => {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
    };
    handleChangeCredit = (event, index, valueCredit) => this.setState({valueCredit});
    handleChangeTimeShareLimit =  (event, index, valueTimeShareLimit) => this.setState({valueTimeShareLimit});
    handleChangeValueSharesAmount =  (event, index, valueSharesAmount) => this.setState({valueSharesAmount});
    
    
    render(){
         return (
            <PageBase title="Stream Video Order Form"
                      navigation="Application / Stream Video Order Form">
              <form>
                <TextField
                  hintText="Url live stream / Url profile live stream"
                  floatingLabelText="Url live stream / Url profile live stream"
                  fullWidth={true}
                />
                
                 <SelectField
                  floatingLabelText="Time Share Limit"
                  value={this.state.valueTimeShareLimit}
                  onChange={this.handleChangeTimeShareLimit}
                  fullWidth={true}>
                        <MenuItem value={30} primaryText="30min"/>
                        <MenuItem value={60} primaryText="1h"/>
                        <MenuItem value={90} primaryText="1h30"/>
                        <MenuItem value={120} primaryText="2h"/>
                </SelectField>
                
                <SelectField
                  floatingLabelText="Shares Amount"
                  value={this.state.valueSharesAmount}
                  onChange={this.handleChangeValueSharesAmount}
                  fullWidth={true}>
                        <MenuItem value={50} primaryText="50"/>
                        <MenuItem value={100} primaryText="100"/>
                        <MenuItem value={150} primaryText="150"/>
                        <MenuItem value={200} primaryText="200"/>
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
                /><br />
        
                <Divider/>
        
                <div style={styles.buttons}>
                  <Link to="/stream">
                    <RaisedButton label="Cancel"/>
                  </Link>
        
                  <RaisedButton label="Create"
                                style={styles.saveButton}
                                type="submit"
                                primary={true}/>
                  </div>
              </form>
            </PageBase>
        );
    }
 
};

export default StreamVideoFormPage;
