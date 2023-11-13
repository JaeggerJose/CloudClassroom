import React from 'react'
import axios from 'axios'
import useAuth from '../../hook/useAuth'
import useLabData from '../../hook/useLabData'

function ButtonOnlineTableReboot({item}) {
    const { auth } = useAuth()
    const {setLabdata} = useLabData()

    return (
        <button className="btn btn-success btn-sm" onClick={() => {
            const rebootjob = async () => {
                await axios({
                    url: process.env.REACT_APP_TASKREBOOT,
                    method: 'POST',
                    data: {
                        jobname: item.jobname, username: auth.username,
                    },
                })
                setLabdata((p) => p.filter(element => element.jobname !== item.jobname))
            }
            rebootjob()
        }} data-bs-toggle="popover"  data-bs-trigger="hover" data-bs-placement="bottom"  data-bs-content="重新啟動工作環境">Reboot</button>
    )
}

export default ButtonOnlineTableReboot