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

const drawerWidth = 240;

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
          {[ 'Hello User'].map((text, index) => (
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
      <ul>
        {movies.map((movie:any) => (
      <>
      <Image
              src={`${movie.image}`}
              alt={`${movie.title}`}
              className=""
              width={100}
              height={24}
              priority
      />
      <li>{movie.title} adiconar aqui as estrelas</li>
      <li>{movie.releasedate}</li>
      <Typography paragraph>
        <li>Resume</li>
        <li>{movie.resume}</li>
      </Typography>
      </>
      ))}
      </ul>
      </section>
        {/* </Typography> */}

      </Box>
    </Box>
      
    </main>
    </>
)
}