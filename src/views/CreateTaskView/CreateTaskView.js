import './CreateTaskView.css'
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
  const [handleAccessloader, setHandleAccessLoader] = useState(false);

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
    <div className='container-view-task'>
      <div className='container-top-view-task'>
        <div className='container-image-view-task' >
          <img className='image-view-task'
            alt='Logo'
            src={Imagen}
            onClick={handleAccessToMainView}
          />
        </div>

        <div className='container-log-out-view-task'>
          <button className='button-log-out-view-task'
            onClick={handleLogOut}>Log Out</button>
        </div>

      </div>

      <div className='sub-container-view-task'>
        <div className='container-title-view-task'>
          <div className='container-button-view-task'>
            <h1 className='title-view-task'>Create New Task</h1>

            <button
              onClick={Back}
              className='button-back-view-task'
            >Back</button>

          </div>

        </div>
        
        <form onSubmit={handleSendFormulary}>
          <div className='container-input-view-task'>
            <Input
              type='text'
              aboveInput='Title'
              onChange={onChange}
              className={true}
              name='title'
              placeholder='Title here'
              value={group.title}
              required
            />
            <Input
              type='text'
              aboveInput='Description'
              onChange={onChange}
              className={true}
              name='description'
              placeholder='Description here'
              value={group.description}
              required
            />
          </div>

          <AlertAndLogin
            handleAccessLoader={handleAccessloader}
          />

          <div className='container-button-create-view-task'>
            <Button
              type='submit'
              className={true}
              Text='Create Task'
            />
          
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateTaskView;