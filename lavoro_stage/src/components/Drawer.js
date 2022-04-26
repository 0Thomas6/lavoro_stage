import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import FactoryIcon from '@mui/icons-material/Factory';


const link_style = {
    textDecoration: 'none',
    color:'black'
    }

class AppDrawer extends React.Component {

    constructor(props){
    super(props);
    }

    render(){
    return(
            <Drawer
                open={this.props.open}
                anchor='left'
                onClose={this.props.onClose}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        <Box sx={{mt:1}}>
                        </Box>
                        <Link to="/" style={link_style}>
                            <ListItem button onClick={this.props.onClose}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/articoli" style={link_style}>
                            <ListItem button onClick={this.props.onClose}>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Articoli'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/postazioni" style={link_style}>
                            <ListItem button onClick={this.props.onClose}>
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Postazioni'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/dipendenti" style={link_style}>
                            <ListItem button onClick={this.props.onClose}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Dipendenti'} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/reparti" style={link_style}>
                            <ListItem button onClick={this.props.onClose}>
                                <ListItemIcon>
                                    <FactoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Reparti'} />
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
        )
    }
}
export default AppDrawer
