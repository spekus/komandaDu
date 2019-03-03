import React, {Component} from 'react';
import axios from 'axios'
import $ from "jquery";

class NewUserForm extends Component {

    constructor() {
        super();
        this.state = this.emptyState
    }

    emptyState = {
        editmode: false,
        userIdentifier: '',
        username: '',
        firstname: '',
        lastname: '',
        password: ''
    }


    handleChangeInput = (event) => this.setState({[event.target.name]: event.target.value});


    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        var newUser = {
            userIdentifier: this.state.userIdentifier,
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
        };


        console.log("New User: " + newUser);

        if (this.state.editmode) {
            axios.put('/api/users/' + this.state.username, null, {
                params: {
                    newFirstname: this.state.firstname,
                    newLastname: this.state.lastname
                }
            })
                .then(response => {
                        this.setState(this.emptyState);

                        if (this.props.onSubmit) {
                            this.props.onSubmit();
                        }
                    }
                )
        } else {
            axios.post('/api/users', newUser)
                .then(response => {
                    console.log(response);
                    this.setState(this.emptyState);
                    if (this.props.onSubmit) {
                        this.props.onSubmit();
                    }

                })
                .catch(error => {
                    console.log("Klaida is addNewUser: " + error.response.data.message);
                });
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.editmode) {
            this.setState(nextProps);
        }
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    {/*<h4 className="my-4" align="center">*/}
                    {/*{this.props.editmode ? "Naudotojo redagavimas" : "Naujo naudotojo registravimas"}*/}
                    {/*</h4>*/}
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <form className="col-md-11" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Vardas</label>
                                    <input type="text" className="form-control" id="exampleFormName"
                                           minLength="2"
                                           maxLength="50"
                                           pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z]+['-]?)+$"
                                           title="Only letters should be provided!"
                                           placeholder="Įveskite darbuotojo vardą" name="firstname"
                                           value={this.state.firstname}
                                           onChange={this.handleChangeInput} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Pavardė</label>
                                    <input type="text" className="form-control" id="exampleFormSurname"
                                           minLength="2"
                                           maxLength="50"
                                           pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z]+['-]?)+$"
                                           title="Only letters should be provided!"
                                           placeholder="Įveskite darbuotojo pavardę" name="lastname"
                                           value={this.state.lastname}
                                           onChange={this.handleChangeInput} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Naudotojo vardas</label>
                                    <input type="text" className="form-control" id="exampleFormUsername"
                                           minLength="2"
                                           maxLength="50"
                                           pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                           title="Only letters and numbers should be provided!"
                                           placeholder="Įveskite vartotojo prisijungimo vardą" name="username"
                                           value={this.state.username}
                                           onChange={this.handleChangeInput} required/>
                                </div>

                                {this.props.editmode ? '' :
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Identifikatorius</label>
                                        <input type="text" className="form-control" id="exampleFormIdentifier"
                                               placeholder="Įveskite vartotojo identifikatorių" name="userIdentifier"
                                               value={this.state.userIdentifier}
                                               onChange={this.handleChangeInput} required/>
                                    </div>}

                                {/*<div className="form-group">*/}
                                {/*<label htmlFor="exampleFormControlSelect2">Darbuotojų grupės</label>*/}
                                {/*<select multiple className="form-control" id="exampleFormControlSelect2"*/}
                                {/*value="" onChange={this.state.handleChangeSelect} name="group">*/}
                                {/*{this.state.availableGroups.map(group =>(*/}
                                {/*<option value={group.title}>{group.title}</option>*/}
                                {/*))}*/}
                                {/*</select>*/}
                                {/*<small id="passwordHelpBlock" className="form-text text-muted">*/}
                                {/*Galima pasirinkti daugiau nei vieną grupę.*/}
                                {/*</small>*/}
                                {/*</div>*/}
                                {this.state.editmode ? '' :
                                    <React.Fragment>
                                        <label htmlFor="inputPassword5">Slaptažodis</label>
                                        <input type="password" id="inputPassword5" className="form-control"
                                               minLength="8"
                                               maxLength="20"
                                               pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                               title="Password must be 8-20 symbols length!"
                                               value={this.state.password}
                                               aria-describedby="passwordHelpBlock" onChange={this.handleChangeInput}
                                               name="password" required/>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            {/*Your password must be 8-20 characters long, contain letters and numbers, and must*/}
                                            {/*not*/}
                                            {/*contain spaces, special characters, or emoji.*/}
                                            Slaptažodis privalo būti 8-20 simbolių ilgio.
                                        </small>
                                    </React.Fragment>
                                }
                                <div className="text-center">
                                    <button type="submit" className="btn btn-info my-4">Išsaugoti</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NewUserForm;