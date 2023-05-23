
import styles from './RegisterView.module.scss'
import styleGlobal from '../../SASS/Global.module.scss';
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services';
import AlertsAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';

function RegisterView() {

  const navigate = useNavigate();

  const [users, setUsers] = useState({ userName: '', password: '' });
  const [handleAccessLoader, setHandleAccessLoader] = useState();
  const [userExist, setUserExist] = useState();

  const onChange = (e) => {

    const { value, name } = e.target;

    setUsers({
      ...users,
      [name]: value
    })

  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    setHandleAccessLoader(true);

    const res = await register(users.userName, users.password);

    if (res.message === 'User already exist') {

      setUserExist(true);
      setHandleAccessLoader(false);

      setTimeout(() => {
        setUserExist(false);
      }, 3000);

      return;

    }

    handleAccessLogin();

  }

  const handleAccessLogin = () => {
    navigate('/login');
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
            onClick={handleAccessLogin}>
            Login
          </button>
        </div>

      </div>

      <div className={styleGlobal.containerSubContainer}>
        <div className={styleGlobal.subContainer}>
          <div className={styles.containerTitle}>
            <h1 className={styleGlobal.title}>Register Screen</h1>

          </div>

          <div className={styleGlobal.containerInput}>

            <form onSubmit={handleSendFormulary}>

              <Input
                aboveInput='UserName'
                onChange={onChange}
                className="true"
                name='userName'
                placeholder='UserName here'
                value={users.userName}
                type='email'
                required
              />

              <Input
                aboveInput='Pasword'
                onChange={onChange}
                className="true"
                name='password'
                placeholder='Pasword here'
                value={users.password}
                type='password'
                required
              />

              <div className={styleGlobal.containerButtonLower}>

              {
                handleAccessLoader || userExist
                  ?
                  <AlertsAndLogin
                  userExist={userExist}
                  handleAccessLoader={handleAccessLoader}
                  />
                  :
                  <Button
                    type='submit'
                    className='true'
                    Text='Register'
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

export default RegisterView;