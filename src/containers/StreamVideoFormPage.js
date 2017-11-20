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
          valueCredit : 100
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

  
    render(){
         return (
            <PageBase title="Stream Video Form Page"
                      navigation="Application / Stream Video Form Page">
              <form>
                <TextField
                  hintText="Url Stream"
                  floatingLabelText="Url Stream"
                  fullWidth={true}
                />
        
                <SelectField
                  floatingLabelText="Credit"
                  value={this.state.valueCredit}
                  onChange={this.handleChangeCredit}
                  fullWidth={true}>
                        <MenuItem value={50} primaryText="50"/>
                        <MenuItem value={100} primaryText="100"/>
                        <MenuItem value={200} primaryText="200"/>
                        <MenuItem value={300} primaryText="300"/>
                </SelectField>
                <div style={styles.toggleDiv}>
                    <Checkbox
                      label="Dịch vụ 1"
                      checked={this.state.checked}
                      onCheck={this.updateCheck.bind(this)}
                      style={styles.checkbox}
                    />
                </div>
        
                <Divider/>
        
                <div style={styles.buttons}>
                  <Link to="/stream">
                    <RaisedButton label="Cancel"/>
                  </Link>
        
                  <RaisedButton label="Start"
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
