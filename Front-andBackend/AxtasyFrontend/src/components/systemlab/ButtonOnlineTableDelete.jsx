import React from 'react'
import axios from 'axios'
import useAuth from '../../hook/useAuth'
import useLabData from '../../hook/useLabData'

function ButtonOnlineTableDelete({item}) {
    const { auth } = useAuth()
    const { setLabdata} = useLabData()
    return (
        <button className="btn btn-danger btn-sm"
            onClick={() => {
                const removejob = async () => {
                    await axios({
                        url: process.env.REACT_APP_TASKDELETE,
                        method: 'POST',
                        data: {
                            jobname: item.jobname, username: auth.username,
                        },
                    })
                    setLabdata((p) => p.filter(job => job.jobname !== item.jobname))
                }
                removejob()
            }} 
            data-bs-toggle="popover" data-bs-trigger="hover click" data-bs-placement="bottom"  data-bs-content="不保存環境，直接刪除任務">
            Delete
        </button>
    )
}

export default ButtonOnlineTableDelete