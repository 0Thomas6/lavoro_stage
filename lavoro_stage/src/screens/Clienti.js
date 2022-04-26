import React, {Component}   from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, itIT, GridToolbar } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Base from './Base.js'


const modalStyle = {
  position: 'absolute',
  width: '50vh',
  height: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
  direction:"column",
  alignItems:"center",
  justifyContent:"center"
};

const gridRowStyle = {
    width:'100%',
    display:'flex',
    justifyContent:'center'
}

class Clienti extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows: [],
      columns: [],
      tableLoaded: false,
      columnVisibilityModel : {id: false, record_id: false},
      addCustomerModal: false,
      deleteCustomerModal: false,
      updateCustomerModal: false,
      coras: '',
      cdcon: '',
      success: false,
      error: false,
      msg_action: '',
      active: 0,
      view_deleted: 0
      }
    }

  componentDidMount(){
    this.load_table()
  }


load_table = () => {
    console.log("Loading table...")

    if(this.state.columns.length == 0){
        this.setState({
            columns:[
                {field: 'id', headerName: 'id', width: 0},
                {field: 'record_id', headerName: 'RECORD_ID', width: 0},
                {field: 'cdcon', headerName: 'CODICE', width: 100},
                {field: 'coras', headerName: 'RAGIONE SOCIALE', width: 400},
                {field: 'coins', headerName: 'DATA INSERIMENTO', width: 200, sortable: false },
                {field: 'cofin', headerName: 'DATA FINE RAPPORTO', width: 200, sortable: false},
                {field: 'costa', headerName: 'STATO', width: 100, renderCell: (params) => {
                if(params.value == 0){
                    return(
                        <>
                            Attivo
                        </>
                    )
                }else{
                    return(
                        <>
                            Obsoleto
                        </>
                    )
                }}},
                {
                    field: 'actions',
                    headerName: '',
                    width: 100,
                    align:'center',
                    sortable: false,
                    renderCell: (params) => {
                        if(params.row.costa == 0){
                            return(
                                <>
                                    <IconButton onClick={() => this.update_modal(params.row)}>
                                        <EditIcon style={{color: '#007dc6', fontSize: 30}}/>
                                    </IconButton>
                                    <IconButton onClick={() => this.delete_modal(params.row)}>
                                        <DeleteIcon style={{color:'red', fontSize: 30}} />
                                    </IconButton>
                                </>
                            )
                        }else{
                            return(
                                <>
                                    <IconButton onClick={() => this.update_modal(params.row)}>
                                        <EditIcon style={{color: '#007dc6', fontSize: 30}}/>
                                    </IconButton>
                                    <IconButton disabled>
                                        <DeleteIcon style={{color:'grey', fontSize: 30}} />
                                    </IconButton>
                                </>
                            )
                        }
                    }
                  },
            ]
        })
    }

    console.log('columns')
    console.log(this.state.columns)

    this.setState({rows: [], tableLoaded: true})

    const requestOptions = {
      method : 'GET',
      headers: {'Content-Type': 'application/json' },
    }

    fetch('http://127.0.0.1:5000/api/clienti', requestOptions)
//    fetch(this.props.server + 'api/clienti', requestOptions)
    .then(res => res.json())
    .then(res => {
      if(res.status == 200){
        console.log(res.data)
        let clienti = JSON.parse(res.data)
        let rows = []

        if(clienti.length > 0){
            clienti.map((cliente, index) =>{
                let row = {
                    id: index,
                    record_id: cliente.RECORD_ID,
                    coras: cliente.coras,
                    cdcon: cliente.cdcon,
                    coins: cliente.coins,
                    cofin: cliente.cofin,
                    costa: cliente.costa
                }
                if(this.state.view_deleted == 0){
                    if(row.costa == 0){
                        rows.push(row)
                    }
                }else{
                    rows.push(row)
                }
            })
        }

        this.setState({rows: rows})
        this.setState({tableLoaded: false})
      }
    }).catch(e => {
        console.log(e)
    })
  }


open_add_customer = () => {
    console.log("Open Adding Customer...")

    const requestOptions = {
      method : 'GET',
      headers: {'Content-Type': 'application/json' },
    }

    fetch('http://127.0.0.1:5000/api/new_cdcon', requestOptions)
//    fetch(this.props.server + 'api/new_cdcon', requestOptions)
    .then(res => res.json())
    .then(res => {
      if(res.status == 200){
        console.log(res.data)
        let new_cdcon = res.data
        this.setState({cdcon: new_cdcon})
      }
    }).catch(e => {
        console.log(e)
    })
    this.setState({addCustomerModal: true})
}

add_customer = () => {
    console.log("Adding Customer...")
    let coras_trimmed = this.state.coras.trim()
    this.setState({coras: coras_trimmed})
    let contro_data = {}
    contro_data['coras'] = this.state.coras
    contro_data['cdcon'] = this.state.cdcon
    if(this.state.coras.length > 0){
        console.log(contro_data)
        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            contro_data: contro_data
          })
        }

        fetch('http://127.0.0.1:5000/api/add_contro', requestOptions)
    //    fetch(this.props.server + 'api/add_contro', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({addCustomerModal: false, success:true, coras:'', cdcon:'', msg_action: 'aggiunto'})
            setTimeout(() => {
              this.setState({success: false, error: false})
            }, 3500)
            this.load_table()
          }
        }).catch(e => {
            console.log(e)
        })
    }else{
        this.setState({error: true})
    }
}

delete_modal(row){
    console.log('sto cancellando modal...')
    console.log(row)
    this.setState({deleteCustomerModal: true, cdcon: row.cdcon, coras: row.coras})
}

update_modal(row){
    console.log('sto modificando modal...')
    console.log(row)
    if(row.costa == 0){
        this.setState({active: 1})
    }else{
        this.setState({active: 0})
    }
    this.setState({updateCustomerModal: true, cdcon: row.cdcon, coras: row.coras})
}

delete_customer = () => {
    console.log('sto cancellando...')
    const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            cdcon: this.state.cdcon
          })
    }
    fetch('http://127.0.0.1:5000/api/delete_contro', requestOptions)
    //    fetch(this.props.server + 'api/delete_contro', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({deleteCustomerModal:false, coras:'', cdcon:'', msg_action:'eliminato', success: true})
            setTimeout(() => {
              this.setState({success: false})
            }, 3500)
            this.load_table()
          }
        }).catch(e => {
            console.log(e)
        })
}

handleSwitch = (event) => {
    if(event.target.checked){
        this.setState({active: 1})
        this.state.active = 1
    }else{
        this.setState({active: 0})
        this.state.active = 0
    }
}

handleSwitchView = (event) => {
    if(event.target.checked){
        this.setState({view_deleted: 1})
        this.state.view_deleted = 1
    }else{
        this.setState({view_deleted: 0})
        this.state.view_deleted = 0
    }
    this.load_table()
}

update_customer = () => {
    console.log("Updating Customer...")
    let contro_data = {}
    contro_data['cdcon'] = this.state.cdcon
    if(this.state.active == 0){
        contro_data['costa'] = 1
    }else{
        contro_data['costa'] = 0
    }

    console.log(contro_data)
    const requestOptions = {
      method : 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        contro_data: contro_data
      })
    }

    fetch('http://127.0.0.1:5000/api/update_contro', requestOptions)
//    fetch(this.props.server + 'api/update_contro', requestOptions)
    .then(res => res.json())
    .then(res => {
      if(res.status == 200){
        this.setState({updateCustomerModal: false, success:true, coras:'', cdcon:'', msg_action: 'modificato'})
        setTimeout(() => {
          this.setState({success: false, error: false})
        }, 3500)
        this.load_table()
      }
    }).catch(e => {
        console.log(e)
    })
}

    render(){
        return(
            <>
                <Container style={{maxWidth: '75%'}}>
                <Base/>
                <Collapse in={this.state.success}>
                  <Alert
                    severity="success"
                    action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            this.setState({success: false})
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Cliente {this.state.msg_action} correttamente
                  </Alert>
                </Collapse>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Clienti</h3>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.view_deleted === 1}
                                        onChange={this.handleSwitchView.bind(this)}
                                        color="primary"
                                    />
                                }
                                label="Visualizza eliminati"
                            />
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={this.open_add_customer}
                                >
                                Aggiungi
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}  sx={{height: '80vh'}}>
                    <DataGrid
                      density="compact"
                      columns={this.state.columns}
                      rows={this.state.rows}
                      loading={this.state.tableLoaded}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      columnVisibilityModel={this.state.columnVisibilityModel}
                      onColumnVisibilityModelChange={(newModel) =>
                        this.setState({columnVisibilityModel: newModel})
                      }
                      localeText={itIT.components.MuiDataGrid.defaultProps.localeText}
                      disableVirtualization={true}
                      rowHeight={75}
                    />
                    </Grid>
                </Container>
                <Modal
                    open={this.state.addCustomerModal}
                    onClose={() => this.setState({addCustomerModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                     <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>NUOVO CLIENTE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="Codice"
                              value={this.state.cdcon}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="Ragione Sociale"
                              value={this.state.coras}
                              onChange={(event) => this.setState({coras: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <Typography sx={{color:'red'}}>
                                {
                                    this.state.error &&
                                    'Inserisci la Ragione Sociale!'
                                }
                           </Typography>
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={this.add_customer}
                              >
                              Aggiungi
                            </Button>
                        </Grid>
                     </Grid>
                </Modal>
                <Modal
                    open={this.state.deleteCustomerModal}
                    onClose={() => this.setState({deleteCustomerModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Box>
                            <Box>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Elimina Cliente
                                </Typography>
                            </Box>
                            <Box sx={{mt:1}}>
                                <Typography variant='subtitle1'>
                                    Sei sicuro di voler eliminare {this.state.coras} ?
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'center', mt:3}}>
                                <Button onClick={() => this.delete_customer()}> Elimina </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={this.state.updateCustomerModal}
                    onClose={() => this.setState({updateCustomerModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                     <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>MODIFICA CLIENTE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="Codice"
                              value={this.state.cdcon}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="Ragione Sociale"
                              value={this.state.coras}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={{width:500, display:'flex', justifyContent:'center',}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.active === 1}
                                        onChange={this.handleSwitch.bind(this)}
                                        color="primary"
                                    />
                                }
                                label="Attivo"
                            />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<EditIcon />}
                              onClick={this.update_customer}
                              >
                              MODIFICA
                            </Button>
                        </Grid>
                     </Grid>
                </Modal>
            </>
        )
    }
//} export default connect(mapStateToProps, mapDispatchToProps)(Clienti)
} export default Clienti