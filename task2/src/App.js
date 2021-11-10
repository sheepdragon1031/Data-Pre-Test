
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';

import Container from '@mui/material/Container';

import DataGrids from './components/datagird'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {  grey, blue, yellow } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

const theme = createTheme({
  
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: blue[700],
    },
  },
});

const themeDark = createTheme({
	
  palette: {
    background: {
		default:  grey[700]
    },
	text: {
		primary: grey[50]
	},
	primary: {
		main: yellow[700],
	},
  }
});


function App() {
	const [page, setPage] = useState(false);
	const [row, setRow] = useState();

	const  handleClick = (event) => {
		event.preventDefault();
		setPage(false)
	}
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" >
            <Toolbar>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
            	<img src={`${process.env.PUBLIC_URL}/logo_160.png`} width={120}  alt="lndata"/>
              </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                
                </Typography>
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle  />
                  </IconButton>
            </Toolbar>
          </AppBar>
          </Box>
		  <ThemeProvider theme={themeDark}>
		  	<CssBaseline />
			<Container disableGutters={false} sx={{m: 2}}>
			<div role="presentation" onClick={handleClick}>
			<Breadcrumbs maxItems={2} aria-label="breadcrumb">
			<Link underline="hover" color="primary" href="#" size="large">
				Player List
			</Link>
          </Breadcrumbs>
        </div>
			</Container>
        </ThemeProvider>
		 
		{page ?  
		<Paper sx={{ width: '100%', overflow: 'hidden' }} >
			<Container sx={{p:2}}>
				<Card sx={{ maxWidth: 345, m: 'auto' }}>
					<CardHeader
						avatar={
						<Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
							{row.name.slice(0,1)}
						</Avatar>
						}
						title={row.name}
						subheader={row.team_name}
					/>
					
					<CardContent>
						{Object.entries(row).map((key)=>{
							// console.log(key);
							if(key[0] === 'id'){
								return <></>
							}
							return <Typography key={`Typography-${key[0]}`} variant="body1" color="text.secondary">
									{key[0].slice(0,1).toUpperCase()}{key[0].slice(1,key[0].length).replaceAll('_',' ')}:{key[1]}
							</Typography>
						})}
						
					</CardContent>
					<CardActions disableSpacing>
						
					</CardActions>
					
					</Card>
			</Container>

		</Paper>
		:
		<DataGrids pageData={setRow} isPage={setPage}/>}
          
      </ThemeProvider>
    
    </div>
  );
}

export default App;
