import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import useCookie from '../../hook/useCookie';
import useAuth from '../../hook/useAuth';
import { BsLink45Deg, BsSearch } from 'react-icons/bs'

function OnlineTask() {
    const cookie = useCookie('csrftoken')
    const { auth } = useAuth()
    const [labdata, setLabdata] = useState('')
    const [filterLabData, setFilterLabData] = useState()
    const [search, SetSearchValue] = useState('')

    useEffect(() => {
        const getLabData = async () => {
            if (process.env.NODE_ENV === 'development') {
                try {
                    setLabdata([
                        {imagetype: 'pytorch', createdate: '2022-09-16 01:11:50.418663', jobname: '20220916011150367', webtopurl: '16036', status: 'processing'},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', createdate: '', jobname: '20220915911150367', webtopurl: '2222', status: ''},
                        {imagetype: 'webtop', createdate: '', jobname: '20220006011150367', webtopurl: '1234', status: ''},
                    ])
                    setFilterLabData([
                        {imagetype: 'pytorch', createdate: '2022-09-16 01:11:50.418663', jobname: '20220916011150367', webtopurl: '16036', status: 'processing'},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', createdate: '', jobname: '20220915911150367', webtopurl: '2222', status: ''},
                        {imagetype: 'webtop', createdate: '', jobname: '20220006011150367', webtopurl: '1234', status: ''},
                    ])
                } catch (err) {
                }
            } else {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: process.env.REACT_APP_LABDATA,
                        data: {
                            ...auth
                        },
                        headers:{
                            'Content-type': 'application/json',
                            'X-CSRFToken': cookie,
                          },
                    })
                    
                    setLabdata(response.data)
                } catch (err) {
                }
            }
            
           
        }
        getLabData()
        
    }, [auth, cookie])

    useEffect(() => {
        if (labdata) {setFilterLabData(() => {
            return labdata.filter((i) => !search || i.imagetype.includes(search))
        })}
    }, [search])

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    執行中任務 #1
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    
                    <section className="table-section">
                        <div className="container-fluid execute">
                            <div className="d-flex">
                                {/* <h2>執行中任務</h2> */}
                                <div>
                                    <div className="input-group flex-nowrap">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <BsSearch />
                                        </span>
                                        <input type="text" value={search} onChange={(e) => SetSearchValue(e.target.value)} className="form-control" placeholder="Task Name" aria-label="taskname" aria-describedby="addon-wrapping" />
                                    </div>
                                </div>
                            </div>
                            <div className="table-wrapper">
                                <div className="table-responsive">
                                    <table className="table table-striped"  style={{tableLayout: 'fixed'}}>
                                        <thead>
                                            <tr className="">
                                                <th className="p" style={{width: '178px'}}>Image Name</th>
                                                <th className="" style={{width: '185px'}}>啟動時間</th>
                                                <th className="" style={{width: '180px'}}>Job Name</th>
                                                <th className="" style={{width: '152px'}}>webtop 連結</th>
                                                <th className="" style={{width: '150px'}}>狀態</th>
                                                <th className="" style={{width: '280px'}}>功能</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !filterLabData 
                                                    ? <></>
                                                    :filterLabData.map((item, index) => {
                                                    return (
                                                        <tr className="" key={index}>
                                                            <td className="column-imagetype" style={{'textOverflow': 'ellipsis', width: '178px'}}>
                                                                <span className="imagename" data-bs-toggle="popover" data-bs-placement="right" data-bs-trigger="hover" data-bs-content={item.imagetype}>
                                                                    {item.imagetype}
                                                                </span>
                                                            </td>
                                                            <td className="" style={{width: '185px'}}>
                                                                <p>{item.createdate.slice(0, 10)}</p>
                                                                <p>{item.createdate.slice(11, 19)}</p>
                                                            </td>
                                                            <td className="" style={{width: '180px'}}>{item.jobname}</td>
                                                            <td className="" style={{width: '152px'}}><a href={`${item.webtopurl}`} target="_blank" rel="noreferrer noopener"><BsLink45Deg color="949494" fontSize={'25px'}/></a>{/* {item.webtopurl}*/ }</td>
                                                            <td className="" style={{width: '150px'}}>{item.status}</td>
                                                            <td className="" style={{width: '280px'}}>
                                                                <button className="btn btn-danger btn-sm" onClick={() => {
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
                                                                }} data-bs-toggle="popover" data-bs-trigger="hover click" data-bs-placement="bottom"  data-bs-content="不保存環境，直接刪除任務">Delete</button>
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
                                                            </td>
                                                            {/* <td>{item.expectendtime}</td>
                                                            <td>{item.ftp}</td>
                                                            <td>{item.webtop}</td>
                                                            <td>{item.webide}</td>
                                                            <td>{item.ssh}</td>
                                                            <td>{item.status}</td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                </div>
            </div>
        </div> 
       
    )
}

export default OnlineTask