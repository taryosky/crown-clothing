import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.util';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name] : value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({email: '', password:''});
    }

    render(){
        return (
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>
                <form onSubmit ={this.handleSubmit}>
                    <FormInput type='email' name = 'email' value={this.state.email} handleChange={this.handleChange} label='Email' required/>
                    <FormInput type='password' name = 'password' value={this.state.password} handleChange={this.handleChange} label='Password' required/>
                    <div className='buttons'>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton isGoogleSignIn={true} onClick ={signInWithGoogle} >SignIn with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;