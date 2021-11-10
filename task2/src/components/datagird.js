import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import json from '../players.json'
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Pie } from 'react-chartjs-2';
import Popover from '@mui/material/Popover';
import Pagination from '@mui/material/Pagination';

const columns = [
    { field: 'name', headerName: 'Name', minWidth: 130, numeric: false},
    { field: 'team_acronym', headerName: 'Team', minWidth: 50, numeric: false },
    { field: 'team_name', headerName: 'TeamName', minWidth: 150, numeric: false },
    { field: 'games_played', headerName: 'Games', minWidth: 50, numeric: true },
    { field: 'minutes_per_game', headerName: 'MPG', minWidth: 50 , numeric: true},
    { field: 'field_goals_attempted_per_game', headerName: 'FGAS', minWidth: 50 , numeric: true},
    { field: 'field_goals_made_per_game', headerName: 'FGM', minWidth: 50 , numeric: true},
    { field: 'field_goal_percentage', headerName: 'FG%', minWidth: 50 , numeric: true},
    { field: 'free_throw_percentage', headerName: 'FT%', minWidth: 50 , numeric: true},
    { field: 'three_point_attempted_per_game', headerName: '3PA', minWidth: 50 , numeric: true},
    { field: 'three_point_made_per_game', headerName: '3PM', minWidth: 50 , numeric: true},
    { field: 'three_point_percentage', headerName: '3PT%', minWidth: 50 , numeric: true},
    { field: 'points_per_game', headerName: 'Points', minWidth: 50 , numeric: true},
    { field: 'offensive_rebounds_per_game', headerName: 'ORebounds', minWidth: 50 , numeric: true},
    { field: 'defensive_rebounds_per_game', headerName: 'DRebounds', minWidth: 50 , numeric: true},
    { field: 'rebounds_per_game', headerName: 'Rebounds', minWidth: 80 , numeric: true},
    { field: 'assists_per_game', headerName: 'Assists', minWidth: 50 , numeric: true},
    { field: 'steals_per_game', headerName: 'Steals', minWidth: 50 , numeric: true},
    { field: 'blocks_per_game', headerName: 'Blocks', minWidth: 50 , numeric: true},
    { field: 'turnovers_per_game', headerName: 'Turnovers', minWidth: 80 , numeric: true},
    { field: 'player_efficiency_rating', headerName: 'Efficiency', minWidth: 80 , numeric: true,},
  ];
let i = 0
let teamList = new Set()
const rows = [ ...json ].map((val) =>{
    teamList.add(val.team_acronym)
    return { ...val, 'id': i++}
})
function EnhancedTableHead(props) {
    // onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              key={headCell.field}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.field ? order : false}
              style={{ minWidth: headCell.minWidth }}
            >
              <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={createSortHandler(headCell.field)}
              >
                {headCell.headerName}
                {orderBy === headCell.field ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
    
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
export default function StickyHeadTable({pageData, isPage}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [team, setTeam] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name')
  const [selected, setSelected] = useState([]);
  const [rowData, setrowData] = useState(rows);

  const [anchorEl, setAnchorEl] = useState(null);
  const [chartData, setChartData] = useState();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    
    let temp = {}
    for(let i = 0; i < rowData.length; i++){
       if(!temp[rowData[i].team_acronym] ){
          temp[`${rowData[i].team_acronym}`] = 1
       }
       else{
          temp[`${rowData[i].team_acronym}`]++
       }
    }
    let limittemp = {}
    let backgroundColorList = []
    let borderColorList = []
    for (const [key, value] of Object.entries(temp)) {
      if(value <= 15){
        limittemp[key] = value
        let rgb  =`${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}`
        backgroundColorList.push(`rgba(${rgb}, 0.3)`)
        borderColorList.push(`rgba(${rgb}, 1)`)
      }
      
    }
    const data = {
      labels:  Object.keys(limittemp),
      datasets: [
        {
          label: '# of Votes',
          data: Object.values(limittemp), 
          backgroundColor: backgroundColorList,
          borderColor: borderColorList,
          borderWidth: 1,
        },
      ],
    };
    setChartData(data)
  },[rowData]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChange = (event) => {
    setTeam(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    if(event.target.localName === "svg"){
      setPage(newPage);
    }
    else{
      setPage(newPage - 1);
    }
   
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => orderBy === "minutes_per_game"? descendingComparator(b, a, orderBy):-descendingComparator(a, b, orderBy);
  }
  const descendingComparator = (a, b, orderBy) => {
    
    if(orderBy === "minutes_per_game"|| orderBy === "field_goals_attempted_per_game"){
      const regex = new RegExp(`[0-9]{1,2}:[0-9]{2}`, 'gm');
      // console.log(a[orderBy].search(regex) > -1 , b[orderBy].search(regex) > -1 );
      if(a[orderBy].search(regex) > -1 && b[orderBy].search(regex) > -1 ){
        const minA = parseInt(a[orderBy].split(':')[0]) * 60 + parseInt(a[orderBy].split(':')[1])
        const minB = parseInt(b[orderBy].split(':')[0]) * 60 + parseInt(b[orderBy].split(':')[1])
        // console.log(minA, a[orderBy], minB, b[orderBy]);
        if (minA < minB) {
          return -1;
        }
        if (minB > minA) {
          return 1;
        }
        return 0;
      }
      else{
        if (b[orderBy] * 1 < a[orderBy] * 1) {
          return -1;
        }
        if (b[orderBy] * 1 > a[orderBy] * 1) {
          return 1;
        }
        return 0;
      }
      
    }
    else{
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
 const search = () =>{
    setPage(0)
    setrowData(rows)
    const teamrows = rows.filter((val) =>{
      const thatTeam = team === "" ? val.team_acronym : team
      if(val.team_acronym === thatTeam){
        return val
      }
      return null
    })
    if(name !== ""){
      
      const namerows = teamrows.filter((val) =>{
        const regex = new RegExp(`${name}`, 'gi');
        if(val.name.search(regex) > -1){
          return val
        }
        return null
      })
      
      setrowData(namerows)
    }
    else{
      setrowData(teamrows)
    }
 }
 const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const chartsJS = (event) =>{
    search()
    setAnchorEl(event.currentTarget);
  }
  const tableRowClick = (row) =>{
    pageData(row)
    isPage(true)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
    <Container>
        <FormControl margin="dense" sx={{ m: 2, minWidth: 320, display: 'flex',
        '& > :not(style)': { m: 1 },}}>
            <InputLabel id="Team">Team</InputLabel>
                <Select
                labelId="Team"
                id="Team"
                value={team}
                onChange={handleChange}
                autoWidth
                label="Team"
                >
                    <MenuItem value="">ALL</MenuItem>
                {[...teamList].map((val) =>{
                    return <MenuItem key={`MenuItem-${val}`}value={val}>{val}</MenuItem>
                })}
              
                </Select>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleChangeName}/>
            <Grid container 
              direction="row"
              justifyContent="flex-start"
              alignItems="center" columnSpacing={0} spacing={2}>
              <Grid item xs={10} style={{paddingLeft: '0px'}} >
                <Button variant="contained"  color="secondary" fullWidth onClick={search}>Search</Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained"  color="secondary" onClick={chartsJS} >Show Charts</Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Container style={{width: '400px',height: '400px'}}>
                        <Pie data={chartData} />
                       </Container>
                    </Popover>
              </Grid>
            </Grid>
           
        </FormControl>
    </Container>
      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label="sticky table">
        <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
          {/* <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.headerName}
                </TableCell>
              ))}
              
            </TableRow>
          </TableHead> */}
          <TableBody>
            {stableSort(rowData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`TableRow-${row.id}`} 
                    onClick={()=>{
                      tableRowClick(row)
                    }}>
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell key={column.field} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        
      </TableContainer>
      <Grid container  direction="row"  justifyContent="flex-end"  alignItems="flex-end">
        <Pagination sx={{pt: '8px'}} count={Math.floor(rowData.length / rowsPerPage)}
              id="Pagination"
              defaultPage={0}
              page={page+1}
              hidePrevButton
              hideNextButton 
              onChange={handleChangePage}
              showFirstButton 
              showLastButton />
      </Grid>
      
      <TablePagination
          rowsPerPageOptions={[15, 25, 50]}//
          component="div"
          id="TablePagination"
          count={rowData.length}
          rowsPerPage={rowsPerPage}
          // labelDisplayedRows={({ page }) => {
          //   return <Typography>{page}</Typography>
          // }}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  );
}