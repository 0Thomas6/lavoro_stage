import React, {Component}   from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card                 from '@mui/material/Card';
import CardActions          from '@mui/material/CardActions';
import CardContent          from '@mui/material/CardContent';
import CircularProgress     from '@mui/material/CircularProgress';
import Button               from '@mui/material/Button';
import Typography           from '@mui/material/Typography';
import TextField            from '@mui/material/TextField';
import Paper                from '@mui/material/Paper';
import {Link, withRouter}   from 'react-router-dom'
import {connect}            from 'react-redux';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppDrawer from '../components/Drawer.js';

function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return{}
}

class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
            openDrawer: false,
        }
        this.setDrawer = this.set_drawer.bind(this)
    }

    set_drawer = () =>  {
        if(this.state.openDrawer){
            this.setState({openDrawer: false})
        }else{
            this.setState({openDrawer:true})
        }
    }

    render(){
        return (
                <>
                <div>
                    <AppBar position="fixed" style={{width: '100%'}}>
                        <Toolbar variant="dense">
                            <IconButton onClick={this.setDrawer} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                Menu
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <AppDrawer open={this.state.openDrawer} onClose={this.setDrawer}/>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                </>
        );
    }
}
//export default connect(mapStateToProps, mapDispatchToProps)(Base)
export default Base
