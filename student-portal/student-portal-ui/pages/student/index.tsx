import React from 'react'
import { NextPage } from 'next'
import { IContext } from '../../state/interfaces'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RootState } from '../../state/store'
import { useDispatch, useSelector } from 'react-redux'
import { DropzoneArea } from 'material-ui-dropzone'
import { setDocumentFile, setDocumentNumber, uploadDocument } from '../../state/students'

const useStyles = makeStyles((theme) => ({
  Info: {
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
      textAlign: 'center'
    }
  },
  Label: {
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
      textAlign: 'center'
    },
    textAlign: 'end'
  },
  Document: {
    padding: '0.5rem !important'
  },
  UploadBox: {
    height: '3rem',
    width: '3rem'
  }
}))

const Student: NextPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    students: {
      details: {
        id,
        fullName,
        gender,
        email,
        country,
        contactNumber,
        schoolClass,
        dateOfBirth,
        state,
        street,
        city,
        postalCode
      },
      documentDetails: { file, number }
    }
  } = useSelector<RootState, RootState>((state) => state)

  return (
    <Grid container justify='space-around' spacing={1} alignItems='center' style={{ marginTop: '1rem' }}>
      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Full Name :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {fullName}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Email :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {email}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Gender :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {gender}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Date Of Birth :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {dateOfBirth}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Contact Number :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {contactNumber}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Class :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {schoolClass}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Address :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Info}>
        <Typography variant='subtitle1' gutterBottom>
          {`${street}, ${city}, ${state}, ${country} - ${postalCode}`}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Upload Document :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Document}>
        <DropzoneArea filesLimit={1} onChange={(file) => dispatch(setDocumentFile(file))} />
      </Grid>

      <Grid item xs={12} sm={6} className={classes.Label}>
        <Typography variant='h6' gutterBottom>
          Document Number :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.Document}>
        <TextField label='' fullWidth value={number} onChange={(e) => dispatch(setDocumentNumber(e.target.value))} />
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
      <Grid item xs={12} sm={6}>
        <Button
          style={{ width: '100%', marginBottom: '1rem' }}
          variant='contained'
          color='default'
          onClick={() => dispatch(uploadDocument({ file, number, studentId: id }))}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

Student.getInitialProps = async (ctx: IContext) => {
  const { store } = ctx
  const {
    // userStore: { users }
  } = store.getState()
  return {}
}

export default Student
