import styles from './CreateTaskView.module.scss';
import styleGlobal from '../../SASS/Global.module.scss';
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { task } from '../../services';
import { getItem, setItem } from '../../services/localStorage';
import AlertAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';

function CreateTaskView({ handleUserSession }) {

  const userTokenKey = process.env.REACT_APP_TASK_YEY
  const navigate = useNavigate();

  const [group, setGroup] = useState({ title: "", description: "" });
  const [handleAccessloader, setHandleAccessLoader] = useState();

  const onChange = (e) => {

    const { value, name } = e.target;
    setGroup({
      ...group,
      [name]: value
    })
  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    setHandleAccessLoader(true);

    if (group.title && group.description) {

      const res = await task(group.title, group.description);

      const DatosLocal = getItem(userTokenKey) ?? '[]';
      setItem(userTokenKey, [...DatosLocal, group])

      navigate('/list');

    }
  }

  const handleAccessToMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  const Back = () => {
    navigate('/list');
  }

  return (
    <div className={styleGlobal.containerMain}>
      <div className={styleGlobal.containerTop}>
        <div className={styleGlobal.containerImageTopLeft} >
          <img className={styleGlobal.imageTopLeft}
            alt='Logo'
            src={Imagen}
            onClick={handleAccessToMainView}
          />
        </div>

        <div>
          <button
            className={styleGlobal.buttonLogOutTopRight}
            onClick={handleLogOut}>
            Log Out
          </button>
        </div>

      </div>

      <div className={styleGlobal.containerSubContainer}>
        <div className={styleGlobal.subContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styleGlobal.title}>New Task</h1>
            <div className={styles.containerButton}>

              <button
                onClick={Back}
                className={styles.buttonBack}
              >Back</button>

            </div>

          </div>

          <form onSubmit={handleSendFormulary}>
            <div className={styleGlobal.containerInput}>
              <Input
                type='text'
                aboveInput='Title'
                onChange={onChange}
                className='true'
                name='title'
                placeholder='Title here'
                value={group.title}
                required
              />
              <Input
                type='text'
                aboveInput='Description'
                onChange={onChange}
                className='true'
                name='description'
                placeholder='Description here'
                value={group.description}
                required
              />
            </div>

            <div className={styleGlobal.containerButtonLower}>

              {
                handleAccessloader
                  ?
                  <AlertAndLogin
                    handleAccessLoader={handleAccessloader}
                  />
                  :
                  <Button
                    type='submit'
                    className='true'
                    Text='Create Task'
                  />
              }

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CreateTaskView;