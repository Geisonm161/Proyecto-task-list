import React from 'react'
import styles from './AlertsAndLogin.module.scss';

function AlertsAndLogin({ userExist, handleAccessLoader, userInvalid, handleEmpty }) {

    return (

        <div className={styles.containerAlert}>
            {
                userExist
                && <p className={styles.error}>
                    This user already exists</p>
            }

            {
                userInvalid
                && <p className={styles.error}>
                    User and/or Password Incorrect</p>
            }

            {
                handleEmpty
                &&
                <p className={styles.containerEmpty}>
                    Empty task list</p>
            }

            <div className={styles.containerLoader}>
                {handleAccessLoader && <p className={styles.loader}></p>}
            </div>



        </div>

    )
}

export default AlertsAndLogin