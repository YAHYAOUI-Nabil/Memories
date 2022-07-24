import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import {gapi} from 'gapi-script'

import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import {signin, signup} from '../../actions/auth'


const Auth = () => {
    const classes = useStyles()
    const [isSignup, setisSignup] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState= {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
    const [formData, setformData] = useState(initialState)

    const handleShowPassword = () => {
        setshowPassword((prevShowPwd)=> !prevShowPwd)
    }

    const switchMode = () => {
        setisSignup((isSignup)=>!isSignup)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData, history)) 
        }else{
            const userData = {
                email : formData.email,
                password : formData.password
            }
            dispatch(signin(userData, history))
        }
    }
    const handleChange = (e) => {
        setformData({...formData, [e.target.name]:e.target.value,})
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type : 'AUTH', data : {result, token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (err) => {
        console.log(err)
        console.log('Google sign in failed! try again later.')
    }

    // useEffect(() => {
    //   const start=()=>{
    //     gapi.client.init({
    //         clientId:'152431167825-hsj7n6qmb38mkia4q4cvt2lgp5afqamf.apps.googleusercontent.com',
    //         scope:''
    //     })
    //   }
    //   gapi.load('client:auth2', start)
    
    // }, [])
    

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar} elevation={3}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label='Last Name' handleChange={handleChange}  half/>
                        </>
                    )}
                    <Input name='email' label='Email Adress' handleChange={handleChange} type='email'/>
                    <Input name='password' label='Password' handleChange={handleChange} 
                           type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name='confirmPassword' label='Confirm password' handleChange={handleChange}
                                        type='password'/>}
                </Grid>
                
                <Button type='submit' variant='contained' fullWidth color='primary' className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    clientId='152431167825-hsj7n6qmb38mkia4q4cvt2lgp5afqamf.apps.googleusercontent.com' 
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth 
                        onClick={renderProps.onClick} disabled={renderProps.disabled} 
                        startIcon={<Icon/>} variant='contained'>
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : `Don't have an account? Sign Up`}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth