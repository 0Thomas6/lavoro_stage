import React, {Component}   from 'react';
import Base from './Base.js'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, itIT, GridToolbar } from '@mui/x-data-grid';

class Dipendenti extends Component {

    constructor(props){
    super(props);
    this.state = {
        columns: [],
        rows: [],
        tableLoaded: false,
        columnVisibilityModel : {id: false, record_id: false},
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


    render(){
        return(
            <>
                <Container style={{maxWidth: '75%'}}>
                    <Base/>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Dipendenti</h3>
                        <Box>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={this.load_table}
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
            </>
        )
    }
} export default Dipendenti