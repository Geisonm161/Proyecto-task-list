
import styles from './LoginView.module.scss';
import styleGlobal from '../../SASS/Global.module.scss';
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
  const [handleLoader, setHandleLoader] = useState();
  const [userInvalid, setUserInvalid] = useState();

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
    <div className={styleGlobal.containerMain}>
      <div className={styleGlobal.containerTop}>
        <div className={styleGlobal.containerImageTopLeft} >
          <img className={styleGlobal.imageTopLeft}
            alt='Logo'
            src={Imagen}
          />
        </div>

        <div>
          <button
            className={styleGlobal.buttonLogOutTopRight}
            onClick={register}>
            Register
          </button>
        </div>

      </div>

      <div className={styleGlobal.containerSubContainer}>
        <div className={styleGlobal.subContainer}>
          <div className={styles.containerTitle}>
            <h1 className={styleGlobal.title}>Login</h1>

          </div>

          <div className={styleGlobal.containerInput}>

            <form onSubmit={handleSendFormulary}>

              <Input
                aboveInput='User Name'
                onChange={onChange}
                className='true'
                name='userName'
                placeholder='User Name here'
                value={users.userName}
                type='text'
                required
              />

              <Input
                aboveInput='Password'
                onChange={onChange}
                className='true'
                name='password'
                placeholder='Password here'
                value={users.password}
                type='password'
                required
              />

              <div className={styleGlobal.containerButtonLower}>
              {
                handleLoader
                  ?
                  <AlertsAndLogin
                    handleAccessLoader={handleLoader}
                    userInvalid={userInvalid}
                  />
                  :
                  <Button
                    type='submit'
                    className='true'
                    Text='login'
                  />
              }

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginView;