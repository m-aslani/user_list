import React from 'react'
import Users from '../components/Users'

import { Typography } from '@mui/material';

function Home() {
  return (
    <div>
      <Typography align='center' variant='h2' >Add New User</Typography>
        <Users/>
    </div>
  )
}

export default Home