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

class Articoli extends Component {

    constructor(props){
    super(props);
    this.state = {
        columns: [],
        rows: [],
        tableLoaded: false,
        columnVisibilityModel : {id: false, record_id: false},
        updateArticoliModal: false,
        addArticoliModal: false,
        deleteArticoliModal: false,
        armod: '',
        armar: '',
        arser: '',
        ardes: '',
        cdpos: '',
        arobs: '',
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
                    {field: "armod", headerName: "MODELLO", width: 200},
                    {field: "armar", headerName: "MARCA", width: 200},
                    {field: "arser", headerName: "SERIALE", width: 200},
                    {field: "ardes", headerName: "DESCRIZIONE", width: 200},
                    {field: "cdpos", headerName: "POSTAZIONE", width: 200},
                    {field: "arobs", headerName: "OBSOLETO", width: 200},
                    {
                        field: "actions",
                        headerName: "",
                        width: 100,
                        align: "center",
                        sortable: false,
                        renderCell: (params) => {
                            if(params.row.arobs == 0){
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_artico(params.row)}>
                                            <EditIcon style={{color:"#007dc6"}} />
                                        </IconButton>
                                        <IconButton onClick={() => this.view_delete_artico(params.row)}>
                                            <DeleteIcon style={{color:"red"}} />
                                        </IconButton>

                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_artico(params.row)}>
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
        fetch('http://127.0.0.1:5000/api/get_artico', requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.status == 200){
                 console.log(res.data)
                 let articoli = res.data
                 let rows = []
                 if(articoli.length > 0){
                    console.log("okoko")
                    articoli.map((articolo, index) =>{
                        let row = {
                            id: index,
                            record_id: articolo.record_id,
                            armod: articolo.armod,
                            armar: articolo.armar,
                            arser: articolo.arser,
                            ardes: articolo.ardes,
                            cdpos: articolo.cdpos,
                            arobs: articolo.arobs
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


    view_update_artico(row){
        this.setState({
            updateArticoliModal: true,
            armod: row.armod,
            armar: row.armar,
            arser: row.arser,
            ardes: row.ardes,
            cdpos: row.cdpos,
            arobs: row.arobs,
            record_id: row.record_id
            })
    }


    update_artico = () => {
        let artico_data = {}
        artico_data['record_id'] = this.state.record_id
        artico_data['armod'] = this.state.armod
        artico_data['armar'] = this.state.armar
        artico_data['arser'] = this.state.arser
        artico_data['ardes'] = this.state.ardes
        artico_data['cdpos'] = this.state.cdpos
        artico_data['arobs'] = this.state.arobs

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            artico_data: artico_data
          })
        }

        fetch('http://127.0.0.1:5000/api/update_artico', requestOptions)
    //    fetch(this.props.server + 'api/update_artico', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                updateArticoliModal: false,
                armod: '',
                armar: '',
                arser: '',
                ardes: '',
                cdpos: '',
                arobs: '',
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
            this.setState({arobs: 1})
        }else{
            this.setState({arobs: 0})
        }
    }


    view_delete_artico(row){
        this.setState({
            deleteArticoliModal: true,
            armod: row.armod,
            armar: row.armar,
            arser: row.arser,
            ardes: row.ardes,
            cdpos: row.cdpos,
            arobs: row.arobs,
            record_id: row.record_id
            })
    }

    delete_artico = () => {
        let artico_data = {}
        artico_data['record_id'] = this.state.record_id
        artico_data['arobs'] = 1

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            artico_data: artico_data
          })
        }

        fetch('http://127.0.0.1:5000/api/toggle_delete_artico', requestOptions)
    //    fetch(this.props.server + 'api/toggle_delete_artico', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                deleteArticoliModal: false,
                armod: '',
                armar: '',
                arser: '',
                ardes: '',
                cdpos: '',
                arobs: '',
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

    add_artico = () => {
        let artico_data = {}
        artico_data['armod'] = this.state.armod
        artico_data['armar'] = this.state.armar
        artico_data['arser'] = this.state.arser
        artico_data['ardes'] = this.state.ardes
        artico_data['cdpos'] = this.state.cdpos

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            artico_data: artico_data
          })
        }

        fetch('http://127.0.0.1:5000/api/add_artico', requestOptions)
    //    fetch(this.props.server + 'api/add_artico', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                addArticoliModal: false,
                armod: '',
                armar: '',
                arser: '',
                ardes: '',
                cdpos: '',
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
                        Articolo {this.state.msg_action} correttamente
                      </Alert>
                    </Collapse>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Articoli</h3>
                        <Box>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={
                                    () => {
                                        this.setState({
                                            addArticoliModal: true,
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
                    open={this.state.updateArticoliModal}
                    onClose={() => this.setState({updateArticoliModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>MODIFICA ARTICOLO</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MODELLO"
                              value={this.state.armod}
                              onChange={(event) => this.setState({armod: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MARCA"
                              value={this.state.armar}
                              onChange={(event) => this.setState({armar: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="SERIALE"
                              value={this.state.arser}
                              onChange={(event) => this.setState({arser: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.ardes}
                              onChange={(event) => this.setState({ardes: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="POSTAZIONE"
                              value={this.state.cdpos}
                              onChange={(event) => this.setState({cdpos: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.arobs === 1}
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
                              onClick={this.update_artico}
                              >
                              Modifica
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.deleteArticoliModal}
                    onClose={() => this.setState({deleteArticoliModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>ELIMINA ARTICOLO</Typography>
                        <Typography sx={{mb:2}} variant="subtitle1">
                            Sei sicuro di volere eliminare questo articolo?
                        </Typography>

                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MODELLO"
                              value={this.state.armod}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MARCA"
                              value={this.state.armar}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="SERIALE"
                              value={this.state.arser}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.ardes}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="POSTAZIONE"
                              value={this.state.cdpos}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.arobs === 1}
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
                              onClick={this.delete_artico}
                              >
                              Elimina
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.addArticoliModal}
                    onClose={() => this.setState({addArticoliModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>AGGIUNGI ARTICOLO</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MODELLO"
                              value={this.state.armod}
                              onChange={(event) => this.setState({armod: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MARCA"
                              value={this.state.armar}
                              onChange={(event) => this.setState({armar: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="SERIALE"
                              value={this.state.arser}
                              onChange={(event) => this.setState({arser: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.ardes}
                              onChange={(event) => this.setState({ardes: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="POSTAZIONE"
                              value={this.state.cdpos}
                              onChange={(event) => this.setState({cdpos: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={this.add_artico}
                              >
                              Aggiungi
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>

            </>
        )
    }
} export default Articoli