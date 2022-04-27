import React, {Component}   from 'react';
import Base from './Base.js'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, itIT, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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

class Dipendenti extends Component {

    constructor(props){
    super(props);
    this.state = {
        columns: [],
        rows: [],
        tableLoaded: false,
        columnVisibilityModel : {id: false, record_id: false},
        updateDipendentiModal: false,
        addDipendentiModal: false,
        deleteDipendentiModal: false,
        dpmat: '',
        dpnom: '',
        dpcog: '',
        dprep: '',
        dpobs: '',
        record_id: '',
        success: false,
        msg_action: '',

      }
    }

    componentDidMount(){
        this.load_table()
    }

    load_table = () => {
        if(this.state.columns.length == 0){
            this.setState({
                columns: [
                    {field: "id", headerName: "id", width: 0},
                    {field: "record_id", headerName: "RECORD_ID", width: 0},
                    {field: "dpmat", headerName: "MATRICOLA", width: 200},
                    {field: "dpnom", headerName: "NOME", width: 200},
                    {field: "dpcog", headerName: "COGNOME", width: 200},
                    {field: "dprep", headerName: "REPARTO", width: 200},
                    {field: "dpobs", headerName: "OBSOLETO", width: 200},
                    {
                        field: "actions",
                        headerName: "",
                        width: 100,
                        align: "center",
                        sortable: false,
                        renderCell: (params) => {
                            if(params.row.dpobs == 0){
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_dipend(params.row)}>
                                            <EditIcon style={{color:"#007dc6"}} />
                                        </IconButton>
                                        <IconButton onClick={() => this.view_delete_dipend(params.row)}>
                                            <DeleteIcon style={{color:"red"}} />
                                        </IconButton>

                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_dipend(params.row)}>
                                            <EditIcon style={{color:"#007dc6"}} />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon style={{color:"grey"}} />
                                        </IconButton>

                                    </>
                                )
                            }

                        }
                    }
                ]
            })
        }
        this.setState({
            rows: [],
            tableLoaded: true
        })
        const requestOptions = {
          method : 'GET',
          headers: {'Content-Type': 'application/json' },
        }
        fetch('http://127.0.0.1:5000/api/get_dipend', requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.status == 200){
                 console.log(res.data)
                 let dipendenti = res.data
                 let rows = []
                 if(dipendenti.length > 0){
                    console.log("okoko")
                    dipendenti.map((dipendente, index) =>{
                        let row = {
                            id: index,
                            record_id: dipendente.RECORD_ID,
                            dpmat: dipendente.dpmat,
                            dpnom: dipendente.dpnom,
                            dpcog: dipendente.dpcog,
                            dprep: dipendente.dprep,
                            dpobs: dipendente.dpobs
                        }
                        rows.push(row)
                    })
                 }
                 this.setState({
                    rows: rows,
                    tableLoaded: false
                 })
            }
        }).catch(e => {
            console.log(e)
        })
    }


    view_update_dipend(row){
        this.setState({
            updateDipendentiModal: true,
            dpmat: row.dpmat,
            dpnom: row.dpnom,
            dpcog: row.dpcog,
            dprep: row.dprep,
            dpobs: row.dpobs,
            record_id: row.record_id
            })
    }


    update_dipend = () => {
        let dipend_data = {}
        dipend_data['record_id'] = this.state.record_id
        dipend_data['dpmat'] = this.state.dpmat
        dipend_data['dpnom'] = this.state.dpnom
        dipend_data['dpcog'] = this.state.dpcog
        dipend_data['dprep'] = this.state.dprep
        dipend_data['dpobs'] = this.state.dpobs

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            dipend_data: dipend_data
          })
        }

        fetch('http://127.0.0.1:5000/api/update_dipend', requestOptions)
    //    fetch(this.props.server + 'api/update_dipend', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                updateDipendentiModal: false,
                dpmat: '',
                dpnom: '',
                dpcog: '',
                dprep: '',
                dpobs: '',
                record_id: '',
                success: true,
                msg_action: 'modificato',

            })
            setTimeout(() => {
                this.setState({success: false})
            }, 3500)
            this.load_table()
          }
        }).catch(e => {
            console.log(e)
        })
    }

    handleSwitchView = (event) => {
        if(event.target.checked){
            this.setState({dpobs: 1})
        }else{
            this.setState({dpobs: 0})
        }
    }


    view_delete_dipend(row){
        this.setState({
            deleteDipendentiModal: true,
            dpmat: row.dpmat,
            dpnom: row.dpnom,
            dpcog: row.dpcog,
            dprep: row.dprep,
            dpobs: row.dpobs,
            record_id: row.record_id
            })
    }

    delete_dipend = () => {
        let dipend_data = {}
        dipend_data['record_id'] = this.state.record_id
        dipend_data['dpobs'] = 1

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            dipend_data: dipend_data
          })
        }

        fetch('http://127.0.0.1:5000/api/toggle_delete_dipend', requestOptions)
    //    fetch(this.props.server + 'api/toggle_delete_dipend', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                deleteDipendentiModal: false,
                dpmat: '',
                dpnom: '',
                dpcog: '',
                dprep: '',
                dpobs: '',
                record_id: '',
                success: true,
                msg_action: 'eliminato',

            })
            setTimeout(() => {
                this.setState({success: false})
            }, 3500)
            this.load_table()
          }
        }).catch(e => {
            console.log(e)
        })

    }

    add_dipend = () => {
        let dipend_data = {}
        dipend_data['dpmat'] = this.state.dpmat
        dipend_data['dpnom'] = this.state.dpnom
        dipend_data['dpcog'] = this.state.dpcog
        dipend_data['dprep'] = this.state.dprep

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            dipend_data: dipend_data
          })
        }

        fetch('http://127.0.0.1:5000/api/add_dipend', requestOptions)
    //    fetch(this.props.server + 'api/add_dipend', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                addDipendentiModal: false,
                dpmat: '',
                dpnom: '',
                dpcog: '',
                dprep: '',
                success: true,
                msg_action: 'aggiunto',

            })
            setTimeout(() => {
                this.setState({success: false})
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
                        Dipendente {this.state.msg_action} correttamente
                      </Alert>
                    </Collapse>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Dipendenti</h3>
                        <Box>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={
                                    () => {
                                        this.setState({
                                            addDipendentiModal: true,
                                        })
                                    }
                                }
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
                    open={this.state.updateDipendentiModal}
                    onClose={() => this.setState({updateDipendentiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>MODIFICA DIPENDENTE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.dpmat}
                              onChange={(event) => this.setState({dpmat: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NOME"
                              value={this.state.dpnom}
                              onChange={(event) => this.setState({dpnom: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="COGNOME"
                              value={this.state.dpcog}
                              onChange={(event) => this.setState({dpcog: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.dprep}
                              onChange={(event) => this.setState({dprep: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.dpobs === 1}
                                        onChange={this.handleSwitchView.bind(this)}
                                        color="primary"
                                    />
                                }
                                label="OBSOLETO"
                            />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<EditIcon />}
                              onClick={this.update_dipend}
                              >
                              Modifica
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.deleteDipendentiModal}
                    onClose={() => this.setState({deleteDipendentiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>ELIMINA DIPENDENTE</Typography>
                        <Typography sx={{mb:2}} variant="subtitle1">
                            Sei sicuro di volere eliminare questo dipentende?
                        </Typography>

                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.dpmat}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NOME"
                              value={this.state.dpnom}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="COGNOME"
                              value={this.state.dpcog}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.dprep}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.dpobs === 1}
                                        inputProps={{ readOnly: true}}
                                        color="primary"
                                    />
                                }
                                label="OBSOLETO"
                            />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={this.delete_dipend}
                              >
                              Elimina
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.addDipendentiModal}
                    onClose={() => this.setState({addDipendentiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>AGGIUNGI DIPENDENTE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.dpmat}
                              onChange={(event) => this.setState({dpmat: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NOME"
                              value={this.state.dpnom}
                              onChange={(event) => this.setState({dpnom: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="COGNOME"
                              value={this.state.dpcog}
                              onChange={(event) => this.setState({dpcog: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.dprep}
                              onChange={(event) => this.setState({dprep: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={this.add_dipend}
                              >
                              Aggiungi
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>

            </>
        )
    }
} export default Dipendenti