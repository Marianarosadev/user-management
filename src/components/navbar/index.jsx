import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './index.css'

import Register from '../register/index'

import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
  const dispatch = useDispatch()
  const { usersList } = useSelector((rootReducer) => rootReducer.usersReducer)

  const [changeDialog, setOpenRegister] = useState(false);
  const [search, setSearch ] = useState('');

  const handleClickChangeDialogStateRegister = (value) => {
    setOpenRegister(value);
  };

  const handleFilterUsersList = () => {
    const filteredUsersList = usersList.filter(user => user.nome.includes(search))

    dispatch({
      type: 'user/list',
      payload: filteredUsersList
    })
  }

  return (
    <>
      <div className='navbar'>
        <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
          <List role="menubar" orientation="horizontal">
            <ListItem role="none" className="navbar__title">
              <h2>Gerenciar usuários</h2>
            </ListItem>
            <ListItem role="none" sx={{ marginInlineStart: 'auto' }} >
              <div className="navbar__search">
                <FormControl variant="standard" className='navbar__search-input'>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Buscar por usuário
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    name="nome"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </FormControl>
                <Button variant="outlined" onClick={handleFilterUsersList} className='ml-2'>
                  <SearchIcon />
                </Button>
              </div>
              <div className="navbar__user-logged">
                <AccountCircle sx={{ fontSize: 40 }} />
                <div className='navbar__user-name'>
                  <div>Fulano da silva</div>
                  <div>Admin</div>
                </div>
              </div>
            </ListItem>
          </List>
          <ListDivider/>
          <List role="menubar" orientation="horizontal">
            <div className="navbar__register">
              <ListItem role="none">
                Usuários
              </ListItem>
              <ListItem role="none" sx={{ marginInlineStart: 'auto' }} >
                <Button onClick={() => handleClickChangeDialogStateRegister(true)}>Cadastrar</Button>
              </ListItem>
            </div>
          </List>
        </Box>
      </div>

      <Register changeDialog={changeDialog} changeDialogState={handleClickChangeDialogStateRegister}/>
    </>
  )
}