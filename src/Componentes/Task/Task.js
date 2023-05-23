import React from 'react'
import styles from './Task.module.scss';

function Task({
  title,
  desc,
  onClick,
  accessClass,
  id,
  access
}) {

  return (

    <div className={styles.widthMedia}>

      <div className={styles.widthMedia}>

        <div className={
          accessClass
            ? styles.taskCreate
            : styles.containerTask
        } onClick={onClick}>

          <div className={styles.informationTask}>

            {access && <h4 className={styles.datos}>
              <li>Title:</li>
            </h4>}
            <p>{title}</p>

            <hr className={styles.hr} />

            {access && <h4 className={styles.datos}>
              <li>Description:</li>
            </h4>}
            <p>{desc}</p>

            {access && <hr className={styles.hr} />}

            {access && <h4 className={styles.datos}>
              <li>Id:</li>
            </h4>}
            <p>{id}</p>

          </div>

        </div>

      </div>

      <hr className={styles.hrhr} />

    </div>

  )
}

export default Task