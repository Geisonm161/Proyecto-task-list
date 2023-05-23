import React from 'react'
import styles from './InformationIDView.module.scss';
import styleGlobal from '../../SASS/Global.module.scss';
import Image from '../../assets/image/Imagenes/Darlin-01.png';
import Task from '../../Componentes/Task/Task';
import ButtonIcons from '../../Componentes/IconsButton/ButtonIcons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InformationTask, removeTaskList } from '../../services';
import AlertsAndLogin from '../../Componentes/AlertsAndLogin/AlertsAndLogin';
import { setItem } from '../../services/localStorage';

function InformationID({ handleTaskViewAction, handleUserSession }) {

  const navigate = useNavigate();
  const params = useParams();

  const [handleLoadView, setHandleLoadView] = useState(false);
  const [results, setResults] = useState([]);

  const handleResponseInfoTask = async () => {

    setHandleLoadView(true);

    const { data } = await InformationTask(params.id);

    setHandleLoadView(false);

    setResults([data]);

    setItem(process.env.REACT_APP_TASK_YEY, [data]);

  }

  const removeTask = async () => {

    setHandleLoadView(true);

    const data = await removeTaskList(params.id);

    setHandleLoadView(false);

    navigate('/list');
  }

  const rewriteHomework = () => {
    handleTaskViewAction(params.id);

    navigate(`/list/${params.id}`);
  }

  const handleAccessToMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    handleResponseInfoTask();
  }, [])

  return (
    <div className={styleGlobal.containerMain}>
      <div className={styleGlobal.containerTop}>
        <div className={styleGlobal.containerImageTopLeft} >
          <img className={styleGlobal.imageTopLeft}
            alt='Logo'
            src={Image}
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
          <div className={styles.containerTitle}>
            <h1 className={styleGlobal.title}>Information ID</h1>
          </div>

          <div className={styles.containerTask}>

            {results.map((gro, index) =>
              <Task
                key={index}
                title={` ${gro.title ? gro.title : 'Not exist'}`}
                desc={` ${gro.desc ? gro.desc : 'Not exist'}`}
                id={` ${gro._id ? gro._id : 'Not exist'}`}
                access
                accessClass
              />)}

            <ButtonIcons
              removeTask={removeTask}
              cancel={handleAccessToMainView}
              rewriteHomework={rewriteHomework}
            />
          </div>

          <AlertsAndLogin
            handleAccessLoader={handleLoadView}
          />

        </div>
      </div>
    </div>
  )
}
export default InformationID;