import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './index.css'

import Navbar from '../../components/navbar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CreateIcon from '@mui/icons-material/Create';

function Users() {
  const dispatch = useDispatch()
  const { usersList } = useSelector((rootReducer) => rootReducer.usersReducer)

  const [selectedUser, setSelectedUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {        
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios');
      const jsonData = await response.json();

      dispatch({
        type: 'user/list',
        payload: jsonData
      })
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try { 
      await fetch(`http://localhost:3001/usuarios/${selectedUser}`, {
        method: 'DELETE',
      });

      fetchUsersData();
      handleClose()

      alert('Usuário excluído com sucesso');
    } catch (e) {
      alert('Erro ao excluír usuário:', e.message);
    }
  }

  const handleClickEditUser = () => {
    //...
  }

  const handleClick = (event, userId) => {
    setSelectedUser(userId)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Navbar/>
      <div className='table'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell align="right">Tipo de usuário</TableCell>
                <TableCell align="right">Usuário ativo</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList && usersList.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.nome} {user.sobrenome}
                  </TableCell>
                  <TableCell align="right">{user.tipoUsuario}</TableCell>
                  <TableCell align="right">{user.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(event) => handleClickEditUser(event, user.id)}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton 
                      id="basic-button"
                      aria-haspopup="true"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event, user.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleDeleteUser(user.id)}>Excluir</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Users
