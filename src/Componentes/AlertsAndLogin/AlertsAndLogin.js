import React from 'react'

function AlertsAndLogin({ showError, userExist, handleAccessLoader, userInvalid }) {

    return (

        <div>
            {
                showError
                && <p className='error-register'>
                    all capos are required</p>
            }

            {
                userExist
                && <p className='error-user-register'>
                    This user already exists</p>
            }

            <div className='container-loader-register'>
                {handleAccessLoader && <p className='loader'></p>}
            </div>

            {
            userInvalid 
            && <p className='error-user-login'>
              User and/or Password Incorrect</p>
              }


        </div>

    )
}

export default AlertsAndLogin