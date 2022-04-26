import React, {Component}   from 'react';
import Base from './Base.js'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, itIT, GridToolbar } from '@mui/x-data-grid';

class Postazioni extends Component {

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
                    {field: "pscap", headerName: "CAPANNONE", width: 200},
                    {field: "pspia", headerName: "PIANO", width: 200},
                    {field: "psuff", headerName: "UFFICIO", width: 200},
                    {field: "psnum", headerName: "NUMERO", width: 200},
                    {field: "cdmat", headerName: "MATRICOLA", width: 200},
                    {field: "psobs", headerName: "OBSOLETO", width: 200},
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
                            record_id: postazione.RECORD_ID,
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


    render(){
        return(
            <>
                <Container style={{maxWidth: '75%'}}>
                    <Base/>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <h3>Postazioni</h3>
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
} export default Postazioni