import React from 'react'
import useLabData from '../../hook/useLabData'
import useAuth from '../../hook/useAuth'
import axios from 'axios'

function ButtonOnlineTableCommit({item}) {
    const { auth } = useAuth()
    const {setLabdata} = useLabData()
    return (
        <button className="btn btn-info btn-sm" onClick={() => {
            const commitjob = async () => {
                await axios({
                    url: process.env.REACT_APP_TASKCOMMIT,
                    method: 'POST',
                    data: {
                        jobname: item.jobname, username: auth.username,
                    },
                })
                setLabdata((p) => p.filter(element => element.jobname !== item.jobname))
            }
            commitjob()
        }} data-bs-toggle="popover"  data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="保存進度，刪除任務">Commit</button>
    )
}

export default ButtonOnlineTableCommit