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

import { Button, Card, Modal, Rating, TextField, colors } from "@mui/material";
import { dateformat } from "@/lib/dateformat";

const drawerWidth = 200;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#524E4E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  alingitems:'center'
  };
//adicionar o modal a um component
export default function Home({ params }: { params: { id: number } }) {
  const [movies,setMovies] = useState([])
  const [userName, setUserName] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Toolbar sx={{bgcolor:'#524E4E'}}>
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
            backgroundColor:'white',          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        
        Olá {userName}
        <Divider />
        <div>
          <Button onClick={handleOpen} sx={{color:'black'
          }}>Adicionar Filme</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Adicione Novo Filme
                </Typography>
                <TextField
                required
                id="outlined-required"
                label="Obrigatório"
                placeholder="informe"
                />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <form>

              </form>
            </Box>
          </Modal>
        </div>
      
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'white', p: 3 }}
      >
        <Toolbar />
       
        <section>
      <Box 
      component="ul" 
      sx={{boxSizing: 'border-box',}}
      >
        {movies.map((movie:any) => (
      <>
      <a href={`/movie/${movie.id}`} >
      <Card variant="outlined" 
      sx={{ 
        display: 'flex', 
        mw:`100vh`, 
        mb: '16px', 
        bgcolor: 'white', 
        border:'20rem',
        boxShadow:3 }}
      >
        
      <Image
        src={`${movie.image}`}
        alt={`${movie.title}`}
        className=""
        width={200}
        height={24}
        priority
      />
      <Typography paragraph sx={{marginLeft:'12px'}}>
      <Typography    
        variant="h5" 
        component="div" 
        sx={{display:'flex',
            justifyContent: 'space-between', 
            marginRight:'2rem'}} >

          {movie.title}   
          <Rating name="rating" defaultValue={movie.note/2} precision={0.5} />
      </Typography>
      <li>Date: {dateformat(`${movie.releasedate}`)}</li>
      <li><strong>Resumo</strong></li>
      <li>{movie.resume}</li>
      </Typography>
    
      </Card>
      </a>
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