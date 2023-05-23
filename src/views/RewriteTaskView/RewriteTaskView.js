
import styleGlobal from '../../SASS/Global.module.scss';
import styles from './RewriteTaskView.module.scss';
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
  const [handleAccessLoader, setHandleAccessLoader] = useState();

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

    window.addEventListener('popstate', Back);

    return () => {
      window.removeEventListener('popstate', Back);
    }
  }, []);



  return (
    <div className={styleGlobal.containerMain}>
      <div className={styleGlobal.containerTop}>
        <div className={styleGlobal.containerImageTopLeft} >
          <img className={styleGlobal.imageTopLeft}
            alt='Logo'
            src={Imagen}
            onClick={handleAccessViewMain}
          />
        </div>

        <div>
          <button
            className={styleGlobal.buttonLogOutTopRight}
            onClick={close}>
            Log Out
          </button>
        </div>

      </div>

      <div className={styleGlobal.containerSubContainer}>
        <div className={styleGlobal.subContainer}>
          <div className={styles.containerTitle}>
            <h1 className={styleGlobal.title}>Rewrite Task</h1>
            <div className={styles.containerButtonBack}>
              <button
                onClick={Back}
                className={styles.buttonBack}>
                Back
              </button>
            </div>
          </div>


          <form onSubmit={handleSendFormulary}>
            <div className={styleGlobal.containerInput}>
              <Input
                required
                aboveInput='Title'
                onChange={onChange}
                className='true'
                name='title'
                placeholder='Title here'
                value={group.title} />

              <TextArea
                required
                classNameTextarea='true'
                abovetext='Description'
                onChange={onChange}
                name='description'
                placeholder='Description here'
                value={group.description}
              />
            </div>

            <div className={styleGlobal.containerButtonLower}>
              {
                handleAccessLoader
                  ?
                  <AlertsAndLogin
                    handleAccessLoader={handleAccessLoader}
                  />
                  :
                  <Button
                    type='submit'
                    className='true'
                    Text='Update'
                  />
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RewriteTaskView;