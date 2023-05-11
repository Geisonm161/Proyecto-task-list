import './LoginView.css'
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services';
import AlertsAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';

function LoginView({ handleUserSession }) {

  const navigate = useNavigate();

  const [users, setUsers] = useState({ userName: '', password: '' });
  const [HandleLoader, setHandleLoader] = useState(false);
  const [userInvalid, setUserInvalid] = useState(null);

  const onChange = (e) => {

    const { value, name } = e.target;
    setUsers({
      ...users,
      [name]: value
    })

  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    setHandleLoader(true);

    const res = await login(users.userName, users.password);

    setHandleLoader(false);

    if (res.message === 'User and/or Password Incorrect') {
      setUserInvalid(true);
      setHandleLoader(false);
      setTimeout(() => {
        setUserInvalid(false);
      }, 5000);

      return;

    }

    handleUserSession(res);

    navigate('/list');

  }

  const register = () => {
    navigate('/register');
  }

  return (
    <div className='container-login'>
      <div className='container-top-login'>
        <div className='container-image-login' >
          <img className='image-login'
            alt='Logo'
            src={Imagen}
          />
        </div>
        <div className='container-log-out-login'>
          <button className='button-log-out-login' onClick={register}>Register</button>
        </div>

      </div>
      <div className='sub-container-login'>

        <div className='container-title-login'>

          <h1 className='title-login'>Login</h1>

        </div>

        <div className='container-input-login'>

          <form onSubmit={handleSendFormulary}>

            <Input
              aboveInput='UserName'
              onChange={onChange}
              className={true}
              name='userName'
              placeholder='UserName here'
              value={users.userName}
              type='text'
              required
            />

            <Input
              aboveInput='Pasword'
              onChange={onChange}
              className={true}
              name='password'
              placeholder='Pasword here'
              value={users.password}
              type='password'
              required
            />

            <AlertsAndLogin
              handleAccessLoader={HandleLoader}
              userInvalid={userInvalid}
            />

            <div className='container-button-login'>
              <Button
                type='submit'
                className={true}
                Text='Login'
              />

            </div>
          </form>
        </div>

      </div>
    </div>
  )
}


export default LoginView;