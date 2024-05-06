import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './index.css'

import Button from '@mui/joy/Button';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Navbar({changeDialog, changeDialogState}) {
  const dispatch = useDispatch()
  const { usersReducer } = useSelector((rootReducer) => rootReducer.usersReducer)

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    tipoUsuario: 'UsuarioPadrao',
    email: '',
    senha: '',
    ativo: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickChild = () => {
    changeDialogState(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      await fetchUsersData();

      alert('Usuário adicionado com sucesso!');
    } catch (e) {
      alert('Erro ao adicionar usuário:', e.message);
    }
  };

  const fetchUsersData = async () => {
    const response = await fetch('http://localhost:3001/usuarios');
    const jsonData = await response.json();

    dispatch({
      type: 'user/list',
      payload: jsonData
    })
  };

  return (
    <>
      <Dialog open={changeDialog}>
        <DialogTitle>
          Cadastro de usuário
        </DialogTitle>
        <form action="register-user" className='form-register' onSubmit={handleSubmit}>
          <DialogContent>
            <FormControlLabel 
              className='mb-3'
              control={<Switch defaultChecked />} 
              label="Usuário Ativo"  
              value={formData.ativo} 
            />
            <FormControl className='mb-2'>
              <FormLabel id="demo-radio-buttons-group-label">Tipo de Usuário</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
              >
                <FormControlLabel value="administrador" control={<Radio />} label="Administrador" />
                <FormControlLabel value="UsuarioPadrao" control={<Radio />} label="Usuário Padrão" />
              </RadioGroup>
            </FormControl>
            <FormControl className='mb-2'>
              <FormLabel>Nome*</FormLabel>
              <Input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className='mb-2'>
              <FormLabel>Sobrenome*</FormLabel>
              <Input
                type="text"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className='mb-2'>
              <FormLabel>Email*</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className='mb-2'>
              <FormLabel>Password*</FormLabel>
              <Input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClickChild}>CANCELAR</Button>
            <Button type="submit">CADASTRAR</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}