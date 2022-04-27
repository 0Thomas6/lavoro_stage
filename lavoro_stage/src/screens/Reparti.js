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

class Reparti extends Component {

    constructor(props){
    super(props);
    this.state = {
        columns: [],
        rows: [],
        tableLoaded: false,
        columnVisibilityModel : {id: false, record_id: false},
        updateRepartiModal: false,
        addRepartiModal: false,
        deleteRepartiModal: false,
        cdrep: '',
        rpdes: '',
        rpobs: '',
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
                    {field: "cdrep", headerName: "REPARTO", width: 200},
                    {field: "rpdes", headerName: "DESCRIZIONE", width: 200},
                    {field: "rpobs", headerName: "OBSOLETO", width: 200},
                    {
                        field: "actions",
                        headerName: "",
                        width: 100,
                        align: "center",
                        sortable: false,
                        renderCell: (params) => {
                            if(params.row.rpobs == 0){
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_repart(params.row)}>
                                            <EditIcon style={{color:"#007dc6"}} />
                                        </IconButton>
                                        <IconButton onClick={() => this.view_delete_repart(params.row)}>
                                            <DeleteIcon style={{color:"red"}} />
                                        </IconButton>

                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_repart(params.row)}>
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
        fetch('http://127.0.0.1:5000/api/get_repart', requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.status == 200){
                 console.log(res.data)
                 let reparti = res.data
                 let rows = []
                 if(reparti.length > 0){
                    console.log("okoko")
                    reparti.map((reparto, index) =>{
                        let row = {
                            id: index,
                            record_id: reparto.record_id,
                            cdrep: reparto.cdrep,
                            rpdes: reparto.rpdes,
                            rpobs: reparto.rpobs
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


    view_update_repart(row){
        this.setState({
            updateRepartiModal: true,
            cdrep: row.cdrep,
            rpdes: row.rpdes,
            rpobs: row.rpobs,
            record_id: row.record_id
            })
    }


    update_repart = () => {
        let repart_data = {}
        repart_data['record_id'] = this.state.record_id
        repart_data['cdrep'] = this.state.cdrep
        repart_data['rpdes'] = this.state.rpdes
        repart_data['rpobs'] = this.state.rpobs

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            repart_data: repart_data
          })
        }

        fetch('http://127.0.0.1:5000/api/update_repart', requestOptions)
    //    fetch(this.props.server + 'api/update_repart', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                updateRepartiModal: false,
                cdrep: '',
                rpdes: '',
                rpobs: '',
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
            this.setState({rpobs: 1})
        }else{
            this.setState({rpobs: 0})
        }
    }


    view_delete_repart(row){
        this.setState({
            deleteRepartiModal: true,
            cdrep: row.cdrep,
            rpdes: row.rpdes,
            rpobs: row.rpobs,
            record_id: row.record_id
            })
    }

    delete_repart = () => {
        let repart_data = {}
        repart_data['record_id'] = this.state.record_id
        repart_data['rpobs'] = 1

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            repart_data: repart_data
          })
        }

        fetch('http://127.0.0.1:5000/api/toggle_delete_repart', requestOptions)
    //    fetch(this.props.server + 'api/toggle_delete_repart', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                deleteRepartiModal: false,
                cdrep: '',
                rpdes: '',
                rpobs: '',
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

    add_repart = () => {
        let repart_data = {}
        repart_data['cdrep'] = this.state.cdrep
        repart_data['rpdes'] = this.state.rpdes

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            repart_data: repart_data
          })
        }

        fetch('http://127.0.0.1:5000/api/add_repart', requestOptions)
    //    fetch(this.props.server + 'api/add_repart', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                addRepartiModal: false,
                cdrep: '',
                rpdes: '',
                rpobs: '',
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
                        REPARTO {this.state.msg_action} correttamente
                      </Alert>
                    </Collapse>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Reparti</h3>
                        <Box>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={
                                    () => {
                                        this.setState({
                                            addRepartiModal: true,
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
                    open={this.state.updateRepartiModal}
                    onClose={() => this.setState({updateRepartiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>MODIFICA REPARTO</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.cdrep}
                              onChange={(event) => this.setState({cdrep: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.rpdes}
                              onChange={(event) => this.setState({rpdes: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.rpobs === 1}
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
                              onClick={this.update_repart}
                              >
                              Modifica
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.deleteRepartiModal}
                    onClose={() => this.setState({deleteRepartiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>ELIMINA REPARTO</Typography>
                        <Typography sx={{mb:2}} variant="subtitle1">
                            Sei sicuro di volere eliminare questo reparto?
                        </Typography>

                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.cdrep}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.rpdes}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.rpobs === 1}
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
                              onClick={this.delete_repart}
                              >
                              Elimina
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.addRepartiModal}
                    onClose={() => this.setState({addRepartiModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>AGGIUNGI REPARTO</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="REPARTO"
                              value={this.state.cdrep}
                              onChange={(event) => this.setState({cdrep: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="DESCRIZIONE"
                              value={this.state.rpdes}
                              onChange={(event) => this.setState({rpdes: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={this.add_repart}
                              >
                              Aggiungi
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>

            </>
        )
    }
} export default Reparti
