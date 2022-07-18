import React, { useState, useEffect} from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux'


import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {getPosts} from '../../actions/posts' 

const Home = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
  return (
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
  )
}

export default Home