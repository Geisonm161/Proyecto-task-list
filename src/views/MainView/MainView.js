import styles from './MainView.module.scss'
import styleGlobal from '../../SASS/Global.module.scss';
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Task from '../../Componentes/Task/Task';
import Button from '../../Componentes/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getList } from '../../services';
import { setItem, getItem } from "../../services/localStorage";
import AlertsAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';

function MainView({ handleUserSession }) {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [group, setGroup] = useState([]);
  const [values, setValues] = useState('');
  const [handleLoader, setHandleLoader] = useState();
  const [alertguide, setAlertguide] = useState();

  const handleChange = async (e) => {
    const { value } = e.target;

    const newGroup = group.filter(item =>
      item.title && item.title.toLowerCase()
        .includes(value.toLocaleLowerCase())
    );

    setResults(newGroup);
    setValues(value);
  }

  const datos = getItem(process.env.REACT_APP_TASK_YEY);

  const handleSendFormulary = useCallback(async () => {
    setHandleLoader(true);

    const { data } = await getList();

    setGroup(data)
    setResults(data);
    setHandleLoader(false);

    setItem(process.env.REACT_APP_TASK_YEY, data);

  }, [])

  const handleRemoveTask = (index) => (e) => {
    e.stopPropagation();

    const taskRemovedFiltered = results.filter((gro, i) => i !== index);

    setResults(taskRemovedFiltered)
    setItem(process.env.REACT_APP_TASK_YEY, results)
  }

  const handleReturnMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    handleSendFormulary();
  }, [handleSendFormulary]);

  const handleAlertCreateTask = () => {
    if (results.length === 0) {
      setAlertguide("true");
    }
  }

  return (
    <div className={styleGlobal.containerMain}>
      <div className={styleGlobal.containerTop}>
        <div className={styleGlobal.containerImageTopLeft} >
          <img className={styleGlobal.imageTopLeft}
            alt='Logo'
            src={Imagen}
            onClick={handleReturnMainView}
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
        <div className={styles.containerSub}>
          <div className={styles.titleContainer}>
            <h1 className={styleGlobal.title}>My Task List</h1>
            <div className={styles.containerButton}>
              <Button
                Text='Create'
                onClick={() => navigate('/create')}
                alertGuide={alertguide}
              />
            </div>
          </div>

          <div className={styleGlobal.containerInput}>
            <Input
              onChange={handleChange}
              name='name'
              placeholder='Search'
              value={`${alertguide ? 'press create button' : values}`}
              handleAlertCreateTask={handleAlertCreateTask}
              alertguide={alertguide}
            />
          </div>

          <div className={styles.containerTask}>
            {results.length !== 0 ? results.map((gro, index) =>
              <Task
                key={index}
                title={gro.title}
                desc={gro.desc}
                onClick={() => navigate(`/list/${gro._id}`)}
                removeTask={handleRemoveTask(index)}
              />
            ) : <p className={styles.containerEmpty}>Empty task list</p>}
          </div>

          <AlertsAndLogin
            handleAccessLoader={handleLoader}
          />

        </div>
      </div>
    </div>
  )
}
export default MainView;