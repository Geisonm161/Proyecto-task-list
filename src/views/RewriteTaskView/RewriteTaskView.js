import './RewriteTaskView.css';
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { update } from '../../services';
import TextArea from '../../Componentes/TextArea/TextArea';
import { getItem } from '../../services/localStorage';
import AlertsAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';

function RewriteTaskView({ handleTaskViewAction, handleUserSession }) {

  const navigate = useNavigate();
  const params = useParams();
  const userTokenKey = process.env.REACT_APP_TASK_YEY
  const datosStorage = getItem(userTokenKey) ?? '[]';


  const [group, setGroup] = useState({ title: "", description: "" });
  const [handleAccessLoader, setHandleAccessLoader] = useState(false);

  const idInUse = () => {

    const newGroup = datosStorage.filter(group => group._id && group._id === params.id);

    const takeRope = newGroup[0];

    setGroup({ title: takeRope.title, description: takeRope.desc });

  }

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

    const { data } = await update(params.id, group.title, group.description);

    Back();

  }

  const Back = () => {
    handleTaskViewAction(false);
  }

  const handleAccessViewMain = () => {
    navigate('/list');
  }

  const close = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    idInUse();
  }, []);

  return (
    <div className='container-rewrite'>
      <div className='container-top-rewrite'>
        <div className='container-image-rewrite' >
          <img className='image-rewrite'
            alt='Logo'
            src={Imagen}
            onClick={handleAccessViewMain}
          />
        </div>
        <div className='container-log-out-rewrite'>
          <button className='button-log-out-rewrite' onClick={close}>Log Out</button>
        </div>

      </div>
      <div className='sub-container-rewrite'>

        <div className='container-button-back-rewrite'>
          <button
            onClick={Back}
            className='button-back-rewrite'>
            Back
          </button>
        </div>

        <form onSubmit={handleSendFormulary}>
          <div className='container-input-rewrite'>
            <Input
              required
              aboveInput='Title'
              onChange={onChange}
              className={true}
              name='title'
              placeholder='Title here'
              value={group.title} />

            <TextArea
              required
              classNameTextarea={true}
              abovetext='Description'
              onChange={onChange}
              name='description'
              placeholder='Description here'
              value={group.description}
            />
          </div>

          <AlertsAndLogin
            handleAccessLoader={handleAccessLoader}
          />

          <div className='container-button-rewrite'>
            <Button
              type='submit'
              className={true}
              Text='Actualizar'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default RewriteTaskView;