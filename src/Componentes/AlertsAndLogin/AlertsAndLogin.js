import React from 'react'
import styles from './AlertsAndLogin.module.scss';

function AlertsAndLogin({ userExist, handleAccessLoader, userInvalid }) {

    return (

        <div className={styles.containerAlert}>
            {
                userExist
                && <p className={styles.error}>
                    This user already exists</p>
            }

            <div className={styles.containerLoader}>
                {handleAccessLoader && <p className={styles.loader}></p>}
            </div>

            {
            userInvalid 
            && <p className={styles.error}>
              User and/or Password Incorrect</p>
              }


        </div>

    )
}

export default AlertsAndLogin