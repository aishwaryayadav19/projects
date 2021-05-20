import React from 'react'

import { Typography, Grid } from '@material-ui/core'

const Header = (): JSX.Element => {
  return (
    <Grid container justify='space-between' alignItems='center' style={{ backgroundColor: '#948282', padding: '1rem' }}>
      <Grid item xs={12}>
        <Typography variant='h5' noWrap align='center'>
          Student Portal
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
