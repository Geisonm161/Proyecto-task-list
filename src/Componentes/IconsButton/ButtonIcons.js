import React from 'react'
import styles from './ButtonIcons.module.scss';
import { AiFillDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

function ButtonIcons({ removeTask, rewriteHomework, cancel }) {
    return (

        <div className={styles.containerIcons}>

            <div
                className={styles.iconoRemove}
                onClick={removeTask}>
                <AiFillDelete />
            </div>

            <div
                className={styles.iconoTask}
                onClick={rewriteHomework}>
                <BsPencilSquare />
            </div>

            <div
                className={styles.cancel}
                onClick={cancel}>
                Cancel
            </div>

        </div>

    )
}

export default ButtonIcons;