import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUser } from '../../firebase/firebase.util';


class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUser(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }catch(error){
            console.log("There was an error creating your account")
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='displayName' 
                        type='text' 
                        label='Display Name'
                        value={this.state.displayName} 
                        onChange={this.handleChange} 
                    />
                    <FormInput 
                        name='email' 
                        type='email' 
                        label='Email' 
                        value={this.state.email} 
                        onChange={this.handleChange}  
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        label='Password' 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                    />
                    <FormInput 
                        name='confirmPassword' 
                        type='password' 
                        label='Confirm Password' 
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                    />

                    <CustomButton type='submit' >SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;