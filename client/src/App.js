import React, { useState, useEffect} from 'react'
import {Container, AppBar, Grid, Typography, Grow} from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'
import {getPosts} from './actions/posts' 

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  
  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={4}>
            <Grid item xs={12} sm={7}>
             <Posts setCurrentId={setCurrentId} /> 
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App