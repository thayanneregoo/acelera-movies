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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Card, Rating } from "@mui/material";
import { dateformat } from "@/components/dateformat";

const drawerWidth = 200;

export default function login() {
  const [movies,setMovies] = useState([])

  useEffect(() => {
    async function carregaRepositorios () {
      const resposta = await fetch("http://localhost:3000/api/movie", {
        method: "GET"});
      const repository= await resposta.json();
     
      setMovies(repository)
      console.log(repository)
 return repository;
    }
    carregaRepositorios();
  }, [])
return(
    <>
    <main>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
        <List>
          {[`Hello`].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Add Movie'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
       
        <section>
      <Box 
      component="ul" 
      sx={{boxSizing: 'border-box'}}
      >
        {movies.map((movie:any) => (
      <>
      <Card variant="outlined" 
      sx={{ display: 'flex', maxWidth:`100vh`, marginBottom: '16px' }}
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
          <Rating name="half-rating" defaultValue={movie.note/2} precision={0.5} />
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