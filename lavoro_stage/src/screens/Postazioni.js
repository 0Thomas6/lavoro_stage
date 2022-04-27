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

class Postazioni extends Component {

    constructor(props){
    super(props);
    this.state = {
        columns: [],
        rows: [],
        tableLoaded: false,
        columnVisibilityModel : {id: false, record_id: false},
        updatePostazioniModal: false,
        addPostazioniModal: false,
        deletePostazioniModal: false,
        pscap: '',
        pspia: '',
        psuff: '',
        psnum: '',
        cdmat: '',
        psobs: '',
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
                    {field: "pscap", headerName: "CAPANNONE", width: 200},
                    {field: "pspia", headerName: "PIANO", width: 200},
                    {field: "psuff", headerName: "UFFICIO", width: 200},
                    {field: "psnum", headerName: "NUMERO", width: 200},
                    {field: "cdmat", headerName: "MATRICOLA", width: 200},
                    {field: "psobs", headerName: "OBSOLETO", width: 200},
                    {
                        field: "actions",
                        headerName: "",
                        width: 100,
                        align: "center",
                        sortable: false,
                        renderCell: (params) => {
                            if(params.row.psobs == 0){
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_poszio(params.row)}>
                                            <EditIcon style={{color:"#007dc6"}} />
                                        </IconButton>
                                        <IconButton onClick={() => this.view_delete_poszio(params.row)}>
                                            <DeleteIcon style={{color:"red"}} />
                                        </IconButton>

                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <IconButton onClick={() => this.view_update_poszio(params.row)}>
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
        fetch('http://127.0.0.1:5000/api/get_poszio', requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.status == 200){
                 console.log(res.data)
                 let postazioni = res.data
                 let rows = []
                 if(postazioni.length > 0){
                    console.log("okoko")
                   postazioni.map((postazione, index) =>{
                        let row = {
                            id: index,
                            record_id: postazione.record_id,
                            pscap: postazione.pscap,
                            pspia: postazione.pspia,
                            psuff: postazione.psuff,
                            psnum: postazione.psnum,
                            cdmat: postazione.cdmat,
                            psobs: postazione.psobs
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


    view_update_poszio(row){
        this.setState({
            updatePostazioniModal: true,
            pscap: row.pscap,
            pspia: row.pspia,
            psuff: row.psuff,
            psnum: row.psnum,
            cdmat: row.cdmat,
            psobs: row.psobs,
            record_id: row.record_id
            })
    }


    update_poszio = () => {
        let poszio_data = {}
        poszio_data['record_id'] = this.state.record_id
        poszio_data['pscap'] = this.state.pscap
        poszio_data['pspia'] = this.state.pspia
        poszio_data['psuff'] = this.state.psuff
        poszio_data['psnum'] = this.state.psnum
        poszio_data['cdmat'] = this.state.cdmat
        poszio_data['psobs'] = this.state.psobs

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            poszio_data: poszio_data
          })
        }

        fetch('http://127.0.0.1:5000/api/update_poszio', requestOptions)
    //    fetch(this.props.server + 'api/update_poszio', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                updatePostazioniModal: false,
                pscap: '',
                pspia: '',
                psuff: '',
                psnum: '',
                cdmat: '',
                psobs: '',
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
            this.setState({psobs: 1})
        }else{
            this.setState({psobs: 0})
        }
    }


    view_delete_poszio(row){
        this.setState({
            deletePostazioniModal: true,
            pscap: row.pscap,
            pspia: row.pspia,
            psuff: row.psuff,
            psnum: row.psnum,
            cdmat: row.cdmat,
            psobs: row.psobs,
            record_id: row.record_id
            })
    }

    delete_poszio = () => {
        let poszio_data = {}
        poszio_data['record_id'] = this.state.record_id
        poszio_data['psobs'] = 1

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            poszio_data: poszio_data
          })
        }

        fetch('http://127.0.0.1:5000/api/toggle_delete_poszio', requestOptions)
    //    fetch(this.props.server + 'api/toggle_delete_poszio', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                deletePostazioniModal: false,
                pscap: '',
                pspia: '',
                psuff: '',
                psnum: '',
                cdmat: '',
                psobs: '',
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

    add_poszio = () => {
        let poszio_data = {}
        poszio_data['pscap'] = this.state.pscap
        poszio_data['pspia'] = this.state.pspia
        poszio_data['psuff'] = this.state.psuff
        poszio_data['psnum'] = this.state.psnum
        poszio_data['cdmat'] = this.state.cdmat

        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
            poszio_data: poszio_data
          })
        }

        fetch('http://127.0.0.1:5000/api/add_poszio', requestOptions)
    //    fetch(this.props.server + 'api/add_poszio', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status == 200){
            this.setState({
                addPostazioniModal: false,
                pscap: '',
                pspia: '',
                psuff: '',
                psnum: '',
                cdmat: '',
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
                        Postazione {this.state.msg_action} correttamente
                      </Alert>
                    </Collapse>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Postazioni</h3>
                        <Box>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={
                                    () => {
                                        this.setState({
                                            addPostazioniModal: true,
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
                    open={this.state.updatePostazioniModal}
                    onClose={() => this.setState({updatePostazioniModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>MODIFICA POSTAZIONE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="CAPANNONE"
                              value={this.state.pscap}
                              onChange={(event) => this.setState({pscap: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="PIANO"
                              value={this.state.pspia}
                              onChange={(event) => this.setState({pspia: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="UFFICIO"
                              value={this.state.psuff}
                              onChange={(event) => this.setState({psuff: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NUMERO"
                              value={this.state.psnum}
                              onChange={(event) => this.setState({psnum: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.cdmat}
                              onChange={(event) => this.setState({cdmat: event.target.value})}
                              variant="outlined" />
                        </Grid>
                         <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.psobs === 1}
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
                              onClick={this.update_poszio}
                              >
                              Modifica
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.deletePostazioniModal}
                    onClose={() => this.setState({deletePostazioniModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>ELIMINA POSTAZIONE</Typography>
                        <Typography sx={{mb:2}} variant="subtitle1">
                            Sei sicuro di volere eliminare questa postazione?
                        </Typography>

                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="CAPANNONE"
                              value={this.state.pscap}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="PIANO"
                              value={this.state.pspia}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="UFFICIO"
                              value={this.state.psuff}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NUMERO"
                              value={this.state.psnum}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.cdmat}
                              inputProps={{ readOnly: true}}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                           <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.psobs === 1}
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
                              onClick={this.delete_poszio}
                              >
                              Elimina
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal
                    open={this.state.addPostazioniModal}
                    onClose={() => this.setState({addPostazioniModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid sx={modalStyle} container  spacing={1} >
                        <Typography sx={{mb:2}}>AGGIUNGI POSTAZIONE</Typography>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="CAPANNONE"
                              value={this.state.pscap}
                              onChange={(event) => this.setState({pscap: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="PIANO"
                              value={this.state.pspia}
                              onChange={(event) => this.setState({pspia: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="UFFICIO"
                              value={this.state.psuff}
                              onChange={(event) => this.setState({psuff: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="NUMERO"
                              value={this.state.psnum}
                              onChange={(event) => this.setState({psnum: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <TextField
                              id="outlined-basic"
                              label="MATRICOLA"
                              value={this.state.cdmat}
                              onChange={(event) => this.setState({cdmat: event.target.value})}
                              variant="outlined" />
                        </Grid>
                        <Grid item sx={gridRowStyle}>
                            <Button sx={{mt:2}}
                              size="medium"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={this.add_poszio}
                              >
                              Aggiungi
                            </Button>
                        </Grid>
                    </Grid>
                </Modal>

            </>
        )
    }
} export default Postazioni