'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Card, Rating, colors } from "@mui/material";
import { dateformat } from "@/lib/dateformat";

const drawerWidth = 200;

export default function Home({ params }: { params: { id: number } }) {
  const [movies,setMovies] = useState([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    async function carregaRepositorios () {
      const movies = await fetch("http://localhost:3000/api/movie", {
        method: "GET"});
      const repository= await movies.json();
      setMovies(repository)
      const id = params.id
      const userData = await fetch(`http://localhost:3000/api/login/${id}`)
      const user = await userData.json()
      setUserName(user.name)
      console.log('dsdssds', user)
      console.log(userData)
    }
    carregaRepositorios();
  }, [])
return(
    <>
    <main>
      <Box sx={{ display: 'flex' }}>
        lklnkl<CssBaseline />
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Acelera Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        Hello {userName}
        <Divider />
        
        Adicionar Filme
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'black', p: 3 }}
      >
        <Toolbar />
       
        <section>
      <Box 
      component="ul" 
      sx={{boxSizing: 'border-box',}}
      >
        {movies.map((movie:any) => (
      <>
      <Card variant="outlined" 
      sx={{ 
        display: 'flex', 
        mw:`100vh`, 
        mb: '16px', 
        bgcolor: '#524E4E', 
        color: 'white',
        border:'20rem' }}
      style={{  }}>
      <Image
              src={`${movie.image}`}
              alt={`${movie.title}`}
              className=""
              width={200}
              height={24}
              priority
      />
      <Typography paragraph sx={{marginLeft:'12px'}}>
      <Typography    variant="h5" component="div" sx={{display:'flex',justifyContent: 'space-between', marginRight:'2rem'}} >
          {movie.title}   
          <Rating name="rating" defaultValue={movie.note/2} precision={0.5} />
      </Typography>
      <li>Date: {dateformat(`${movie.releasedate}`)}</li>
      
        <li><strong>Resumo</strong></li>
        <li>{movie.resume}</li>
      </Typography>
     
      </Card>
      </>
      ))}
      </Box>
      </section>
        {/* </Typography> */}

      </Box>
    </Box>
      
    </main>
    </>
)
}