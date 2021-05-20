import React from 'react'
import { NextPage } from 'next'
import router from 'next/router'
import { IContext } from '../state/interfaces'
import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getClassList } from '../state/admin'
import { RootState } from '../state/store'
import { getUserDetails, setEmail } from '../state/user'
import { getStudentDetails } from '../state/students'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: '1rem',
    textAlign: 'center'
  }
}))

const Index: NextPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    user: { email, isAdmin }
  } = useSelector<RootState, RootState>((state) => state)

  return (
    <form noValidate autoComplete='off'>
      <Grid container justify='center' alignItems='center' style={{ height: '20vh', marginTop: '15rem' }}>
        <Grid item sm={3} lg={4}></Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
          <TextField label='Email' fullWidth value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
        </Grid>
        <Grid item sm={3} lg={4}></Grid>
        <Grid item sm={3} lg={4}></Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
          <Button
            variant='contained'
            color='default'
            fullWidth
            onClick={async () => {
              const data: any = await dispatch(getUserDetails(email))
              if (data.payload.data.isAdmin) {
                await dispatch(getClassList())
                router.push('/admin')
              } else {
                await dispatch(getStudentDetails(email))
                router.push('/student')
              }
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item sm={3} lg={4}></Grid>
      </Grid>
    </form>
  )
}

Index.getInitialProps = async (ctx: IContext) => {
  const { store } = ctx
  const {
    // userStore: { users }
  } = store.getState()

  // if (users.length !== 0) return {}

  // await store.dispatch(getUsers())
  return {}
}

export default Index
