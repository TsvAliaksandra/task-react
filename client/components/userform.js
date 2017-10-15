import  React from 'react';
import {userActions} from '../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import Request from 'superagent';
import validateInput from '../../server/validations/userValidation';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import TextField from 'material-ui/TextField';
import RaisedButton from "material-ui/RaisedButton";


class Userform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            email: '',
            long: null,
            lat: null,
            errors: {},
            isLoading: false
        }
    }

    componentDidMount() {
        this.getPosition();
    }

    getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let long = position.coords.longitude;
                let lat = position.coords.latitude;
                this.setState({long: long, lat: lat});
            });
        }

    }


    setInformation() {
        if (this.isValid()) {
            Request
                .post('/')
                .send({
                    username: this.state.username,
                    phone: this.state.phone,
                    email: this.state.email,
                    lat: this.state.lat,
                    long: this.state.long
                })
                .end((err, res) => {
                    if (err) {
                      throw err;
                    }
                    else {
                    }
                });
        }
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
            this.setState({isLoading: false});
        }
        if (isValid) {
            this.setState({errors: {}});
            this.setState({isLoading: true});
            this.props.userActions(this.state.username, this.state.phone, this.state.email);
        }
        return isValid;
    }

    setUsers() {
        this.isValid();
        this.setInformation();
    }

    sendFrom(e) {
        e.preventDefault();
    }

    setName(e) {
        this.setState({username: e.target.value});
    }

    setPhone(e) {
        this.setState({phone: e.target.value});
    }

    setEmail(e) {
        this.setState({email: e.target.value});
    }

    render() {
        const MapWithAMarker = withGoogleMap(props =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat: parseFloat(this.state.lat), lng: parseFloat(this.state.long)}}
            >
                <Marker
                    position={{lat: parseFloat(this.state.lat), lng: parseFloat(this.state.long)}}
                />
            </GoogleMap>
        );

        return (
            <div className="main">
                <form onSubmit={this.sendFrom.bind(this)} className="form">
                    <TextField
                        hintText="Name"
                        onChange={this.setName.bind(this)}
                        value={this.state.username}
                        errorText={ this.state.errors.username}
                    /><br />

                    <TextField
                        hintText="Phone"
                        onChange={this.setPhone.bind(this)}
                        value={this.state.phone}
                        errorText={ this.state.errors.phone}
                    /><br />

                    <TextField
                        hintText="Email"
                        onChange={this.setEmail.bind(this)}
                        value={this.state.email}
                        errorText={ this.state.errors.email}
                    /><br />

                    <RaisedButton label="Submit"
                                  onClick={this.setUsers.bind(this)}
                                  className="btn"
                                  primary/>

                </form>

                <div className="map">
                    <MapWithAMarker
                        containerElement={<div style={{height: `400px`, width: `600px`}}/>}
                        mapElement={<div style={{height: `400px`, width: `600px`}}/>}
                    />
                </div>
                {this.state.isLoading && <span className="successMsg">{'The form successfully sent'}</span>}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({userActions}, dispatch);
}

export default connect(null, mapDispatchToProps)(Userform) ;