import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom';
import useAuth from '../hook/useAuth';
import useCookie from '../hook/useCookie';
import axios from 'axios';
import { BsLink45Deg } from 'react-icons/bs'
import { BsXSquare } from 'react-icons/bs'
import { Popover } from 'bootstrap'
import { useForm } from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import OnlineTask from '../components/systemlab/OnlineTask';

import useLabData from '../hook/useLabData';




function LabSystem() {
    const { auth } = useAuth()
    const cookie = useCookie('csrftoken')
    // const [labdata, setLabdata] = useState([])
    const {labdata, setLabdata} = useLabData()

    const [labSleepdata, setSleepdata] = useState('')
    const [taskscheduledatas, setTaskScheduleDatas] = useState(null)
    
    const [load, setLoad] = useState(false)


    const { register, handleSubmit, setValue, clearErrors, resetField, formState: { errors, }} = useForm(
        {
            defaultValues: {
                schedule: {
                    type: 'off',
                    info: null,
                }
            }
        }
    )
    
    const onSubmit = async (taskscheduledata) => {
        setScheduleEditStatus(false)
        setScheduleEditID(null)
        if (taskscheduledata.schedule.type === 'off') return;
        await axios({
            method: 'POST',
            url: process.env.REACT_APP_TASKSCHEDULEUPDATE,
            data: {
                ...taskscheduledata,
                scheduleID: scheduleEditID,
            }
        })
        
    }
    const onError = () => {

    }
    

    const [scheduleEditStatus, setScheduleEditStatus] = useState(false)
    const [scheduleEditID, setScheduleEditID] = useState(null)


    const [expectOpenTime, setExpectOpenTime] = useState(null);
    const [expectCloseTime, setExpectCloseTime] = useState(null);

    const [scheduleType, setScheduleType] = useState(null);
    const [dateRange, setDateRange] = useState('')
    const [repeatFrequency, setRepeatFrequency] = useState(null)

    // for css
    const [weekRepeat, setWeekRepeat] = useState([])
    const [monthRepeat, setMonthRepeat] = useState([])




    useEffect(() => {
        const getLabData = async () => {
            if (process.env.NODE_ENV === 'development') {
                try {
                    // await axios({
                    //     method: 'POST',
                    //     url: process.env.REACT_APP_LABDATA,
                    //     data: {
                    //         ...auth
                    //     },
                        
                    // })
                    
                    setLabdata([
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '202209160111503767', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '2022091591115022867', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '7', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '202209160111503817', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '2022091591115028727', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '2022000601115015427', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '20220916011150327', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '20220915911150276827', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '202200060111501527', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '20220916011150337', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '2022091591115332227', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '2022000601115013527', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '20220916011150367', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '2022091591115327', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '202200060111534327', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
                        {imagetype: 'pytssorch', createdate: '2022-09-16 01:11:50', jobname: '2022091601115021367', webtopurl: '16036', status: 'processing', remark: 'no delete',},
                        {imagetype: 'tensorflowxxxxxxxxxxxxxx', createdate: '2022-09-12 01:11:50', jobname: '20220915911153327', webtopurl: '2222', status: 'dwdwd', remark: 'no delete',},
                        {imagetype: 'webtop', createdate: '2022-09-11 01:11:50', jobname: '202200060111504327', webtopurl: '1234', status: 'dwwd', remark: 'no delete'},
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
        
    }, [auth, cookie, setLabdata])

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setSleepdata([
                {
                    imagetype: 'a',
                    jobname: '123456754555458'
                },
                {
                    imagetype: 'b',
                    jobname: '1233243245678'
                },
            ])
        } else {
            const getSleepData = async () => {
                const response = await axios({
                    method: 'POST',
                    url: process.env.REACT_APP_LABSLEEPDATA,
                    data: {
                        ...auth,
                    },
                    headers:{
                        'Content-type': 'application/json',
                        'X-CSRFToken': cookie,
                    },
                })
                setSleepdata(response.data)
            }
            getSleepData()
        }
    }, [auth, load, cookie])

    // get taskschedule data
    useEffect(()=> {
        const getScheduleData = async () => {
            if (process.env.NODE_ENV === 'development') {
                try {
                    setTaskScheduleDatas([
                        {imagetype: 'py', schedulename: 'sky', expectopentime: '2022-11-30 14:30', expectclosetime: '2022-12-01', repeatperiod: '每日', repeattime: 'Open 14:30 close 17:30', count: '10', scheduleid: '123456', jobid: '20221124'},
                        {imagetype: 'cc', schedulename: 'cloud', expectopentime: '2022-11-30 14:30', expectclosetime: '2022-12-01', repeatperiod: '每週一二五', repeattime: 'Open 14:30 close 17:30', count: '5', scheduleid: '67890', jobid: '20221126'},
                        {imagetype: 'xx', schedulename: 'cloud', expectopentime: '2022-11-30 14:30', expectclosetime: '2022-12-01', repeatperiod: '每月10號', repeattime: 'Open 14:30 close 17:30', count: '1', scheduleid: '1357984620', jobid: '20221130'},
                    ])
                } catch (err) {
                }
            } else {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: process.env.REACT_APP_SCHEDULETASKDATA,
                        data: {
                            ...auth,
                        },
                        headers:{
                            'Content-type': 'application/json',
                            'X-CSRFToken': cookie,
                        },
                    })
                    
                    setTaskScheduleDatas(response.data)
                } catch (err) {
                }
            }
            
            
        }
        getScheduleData()
        
    }, [auth, load, cookie])

    useEffect(()=> {
        const popoverlist = document.querySelectorAll('[data-bs-toggle="popover"], .imagename');
        [...popoverlist].map(el => new Popover(el)); 

        // document.querySelector('.sleep-task-del') && (document.querySelector('.sleep-task-del').disabled = false);
        return () => {
            if  (document.querySelector('.popover')) return document.querySelector('.popover').remove()
        }
    }, [labdata])



    function addweekday(day) {
        setWeekRepeat(p => {
            setValue('schedule.info.week', weekRepeat[weekRepeat.indexOf(day)] ? [...p].filter(i => i !== day) : [...p, day].sort())
            clearErrors('schedule.info.week')
            return weekRepeat[weekRepeat.indexOf(day)] ? [...p].filter(i => i !== day).sort() : [...p, day].sort()
        })
    }

    function addmonthday(day) {
        setMonthRepeat(p => {
            setValue('schedule.info.month', monthRepeat[monthRepeat.indexOf(day)] ? ([...p].filter(i => i !== day)).sort((i,j)=>i-j) : [...p, day].sort((i,j)=>i-j))
            clearErrors('schedule.info.month')
            return monthRepeat[monthRepeat.indexOf(day)] ? ([...p].filter(i => i !== day)).sort((i,j)=>i-j) : [...p, day].sort((i,j)=>i-j)
        })
    }

    function BtnRebuild({item, index}) {
        const [rebuildAmount, setRebuildAmount] = useState(1)
        return (
            <>
                <button className="btn btn-info btn-rebuild" type="button" id="button-addon1" onClick={() => {
                    const removejob = async () => {
                        document.querySelectorAll('.sleep-task-del')[index].disabled = true

                        await axios({
                            url: process.env.REACT_APP_LABSEELPREBUILD,
                            method: 'POST',
                            data: {
                                imagename: item.imagetype, jobname: item.jobname, username: auth.username, action: 'rebuild',
                                gpu: item.gpu, cpu: item.cpu, memory: item.memory, connect: item.connect,
                                amount: rebuildAmount, remark: item.remark
                            },
                        })
                        document.querySelectorAll('.sleep-task-del')[index].disabled = false
                        setLabdata((p) => p.filter(element => element.jobname !== item.jobname))
                        setLoad(p => !p)
                    }
                    removejob()
                }} data-bs-toggle="popover"  data-bs-trigger="hover" data-bs-placement="bottom" data-bs-content="重啟任務"
                >Rebuild</button>
                <input type="text" className="form-control input-rebuild" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"
                    onChange={(e)=> {
                    const re = /^([1-9]|[1-4][0-9]|50)$/;


                    if (!re.test(e.target.value)) {
                        if (e.target.value>50) {
                            flushSync(()=> {
                                setRebuildAmount(50)
                            })    
                        }
                        if (e.target.value === '') {
                            flushSync(()=> {
                                setRebuildAmount(1)
                            }) 
                        }
                    } else {
                        setRebuildAmount(e.target.value)
                    }
                        
                }} value={rebuildAmount}
                />
            </>
        )
    }
    
    return (
        <div className="labsystem">
            <section>
                <div className="labsystem-title">
                    <h1>任務總覽</h1>
                </div>
            </section>
            
            {/* <OnlineTask /> */}
            {/* online schedule task */}
            <section className="table-section">
                <div className="container-fluid execute">
                    <h2>執行中任務</h2>
                    <div className="table-wrapper">
                        <div className="table-responsive">
                            <table className="table table-striped"  style={{tableLayout: 'fixed'}}>
                                <thead>
                                    <tr className="">
                                        <th className="p" style={{width: '178px'}}>Image Name</th>
                                        <th className="" style={{width: '185px'}}>啟動時間</th>
                                        <th className="" style={{width: '152px'}}>webtop 連結</th>
                                        <th className="" style={{width: '150px'}}>狀態</th>
                                        <th className="" style={{width: '185px'}}>備註</th>
                                        <th className="" style={{width: '280px'}}>功能</th>
                                        <th className="" style={{width: '180px'}}>Job Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !labdata 
                                            ? <></>
                                            :labdata.map((item, index) => {
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
                                                    <td className="" style={{width: '152px'}}><a href={`${process.env.REACT_APP_LOGINNODE}:${item.webtopurl}`} target="_blank" rel="noreferrer noopener"><BsLink45Deg color="949494" fontSize={'25px'}/></a>{/* {item.webtopurl}*/ }</td>
                                                    <td className="" style={{width: '150px'}}>{item.status}</td>
                                                    <td>{item.remark}</td>
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
                                                    <td className="" style={{width: '180px'}}>{item.jobname}</td>
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

            <div className="section-sep"></div>
            
            {/* sleep task */}
            <section className="table-section">
                <div className="container-fluid sleep">
                    <h2>休眠中任務</h2>
                    <div className="table-wrapper">
                        <div className="table-responsive">
                            <table className="table table-striped"  style={{tableLayout: 'fixed'}}>
                                <thead>
                                    <tr className="">
                                        <th className="" style={{width: '178px'}}>休眠時間</th>
                                        <th className="" style={{width: '178px'}}>備註</th>
                                        <th className="" style={{width: '200px'}}>功能</th>
                                        <th className="" style={{width: '180px'}}>Job Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !labSleepdata 
                                            ? <></> 
                                            : labSleepdata.map((item, index) => {
                                                return (
                                                    <tr className="" key={index}>
                                                        <td className="column-imagetype" style={{'textOverflow': 'ellipsis', width: '178px'}}>
                                                            <span className="imagename" data-bs-toggle="popover" data-bs-placement="right" data-bs-trigger="hover" data-bs-content={item.imagetype}>
                                                                {item.sleepdate}
                                                            </span>
                                                        </td>
                                                        <td style={{'textOverflow': 'ellipsis', width: '178px'}}>
                                                            {item.remark}
                                                        </td>
                                                        <td className="" style={{width: '200px'}}>
                                                            <button className="btn btn-danger btn-sm sleep-task-del"  onClick={() => {
                                                                const removejob = async () => {
                                                                    await axios({
                                                                        url: process.env.REACT_APP_LABSEELPDELETE,
                                                                        method: 'POST',
                                                                        data: {
                                                                            jobname: item.jobname, username: auth.username,
                                                                        },
                                                                    })
                                                                    setLabdata((p) => p.filter(element => element.jobname !== item.jobname))
                                                                    setLoad(p => !p)
                                                                }
                                                                removejob()
                                                                
                                                            }} data-bs-toggle="popover" data-bs-trigger="hover click" data-bs-placement="bottom"  data-bs-content="直接刪除休眠中任務">Delete</button>
                                                            <div style={{height: '31px', width: '120px', display: 'inline-block'}}>
                                                                <div className="input-group-sm mb-3 d-flex" >
                                                                   <BtnRebuild item={item} index={index}/>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="" style={{width: '180x'}}>{item.jobname}</td>
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
            
            {/* schedule task */}
            <section className="table-section">
                <div className="container-fluid execute">
                    <h2>排程中任務</h2>
                    <div className="table-wrapper">
                        <div className="table-responsive">
                            <table className="table table-striped"  style={{tableLayout: 'fixed'}}>
                                <thead>
                                    <tr className="">
                                        <th className="" style={{width: '178px'}}>Image Name</th>
                                        <th className="" style={{width: '130px'}}>開啟時間</th>
                                        <th className="" style={{width: '130px'}}>關閉時間</th>
                                        {/* <th className="" style={{width: '80px'}}>排程屬性</th> */}
                                        <th className="" style={{width: '80px'}}>重複間隔</th>
                                        <th className="" style={{width: '130px'}}>時間</th>
                                        {/* <th className="" style={{width: '130px'}}>每日關閉時間</th> */}
                                        <th className="" style={{width: '180px'}}>shedule ID</th>
                                        <th className="" style={{width: '150px'}}>改動排程任務</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !taskscheduledatas
                                            ? <></>
                                            :taskscheduledatas.map((item, index) => {
                                            return (
                                                <tr className="" key={index}>
                                                    <td className="column-imagetype" style={{'textOverflow': 'ellipsis', width: '178px'}}>
                                                        <span className="imagename" data-bs-toggle="popover" data-bs-placement="right" data-bs-trigger="hover" data-bs-content={item.imagetype}>
                                                            {item.imagetype}
                                                        </span>
                                                    </td>
                                                    <td className="" style={{width: '130px'}}>
                                                        {item.expectopentime}
                                                    </td>
                                                    <td className="" style={{width: '130px'}}>
                                                        {item.expectclosetime}
                                                    </td>
                                                    {/* <td style={{width: '80px'}}>{item.scheduleType}</td> */}
                                                    <td style={{width: '80px'}}>{item.repeatperiod}</td>
                                                    <td style={{width: '130px'}}>{item.repeattime}</td>
                                                    {/* <td style={{width: '130px'}}>{item.expecttime}</td> */}
                                                    <td className="" style={{width: '180px'}}>{item.scheduleid}</td>
                                                    <td className="" style={{width: '150px'}}>
                                                        <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                                                        <button className="btn btn-warning" onClick={() => {
                                                            // const updateTaskSchedule = async () => {

                                                            //     await axios({
                                                            //         method: 'POST',
                                                            //         url: process.env.REACT_APP_TASKUPDATESCHEDULEDATA,
                                                            //         data: {
                                                            //             schedulename: item.schedulename,scheduleid: item.scheduleid, jobid: item.jobid,
                                                            //             username: auth.username, email: auth.email,
                                                            //         },
                                                            //         headers:{
                                                            //             'Content-type': 'application/json',
                                                            //             'X-CSRFToken': getCookie("csrftoken"),
                                                            //         },
                                                            //     })
                                                            //     setLoad(p => !p)
                                                            // }
                                                            // updateTaskSchedule()
                                                            setScheduleEditStatus(true)
                                                            setScheduleEditID(item.scheduleid)
                                                            setDateRange('')
                                                            setWeekRepeat('')
                                                            setMonthRepeat('')
                                                            setExpectOpenTime('')
                                                            setExpectCloseTime('')
                                                            resetField('schedule.info')
                                                        }}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => {
                                                            const scheduletaskdelete = async () => {
                                                                axios({
                                                                    method: 'POST',
                                                                    url: process.env.REACT_APP_TASKSCHEDULEDELETE,
                                                                    data: {
                                                                        scheduleid: item.scheduleid,
                                                                    }
                                                                })
                                                                setLoad(p=>!p)
                                                            }
                                                            scheduletaskdelete()
                                                        }}>
                                                            Delete
                                                        </button>
                                                        </div>
                                                    </td>
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

            {/*  */}
                {   scheduleEditStatus  ?   
                        <div className={`schedule-task-box-form 'schedule-task-box-form-show'}`}>
                                <form onSubmit={handleSubmit(onSubmit, onError)}>
                                    <div className="schedule">
                                        <div className="box">
                                            <h5 id="schedule" className="fs-5">任務排程</h5>
                                                <div className="input-field">
                                                    <div className="scheduletypewrapper">
                                                        <input
                                                            type="radio"
                                                            id="specifictime"
                                                            value="specifictime"
                                                            {...register('schedule.type')}
                                                            onClick={() => {
                                                                setScheduleType('specifictime')
                                                                
                                                                resetField('schedule.info')

                                                                setExpectOpenTime('')
                                                                setExpectCloseTime('')
                                                            }}
                                                        />
                                                        <label htmlFor="specifictime">指定日期</label>
                                                        <input
                                                            type="radio"
                                                            id="looptime"
                                                            value="looptime"
                                                            {...register('schedule.type')}
                                                            onClick={() => {
                                                                setScheduleType('looptime')

                                                                resetField('schedule.info')

                                                                setDateRange('')
                                                                setRepeatFrequency('')

                                                            }}
                                                            
                                                        />
                                                        <label htmlFor="looptime">循環日期</label>
                                                        <input
                                                            type="radio"
                                                            id="noneschedule"
                                                            value="off"
                                                            {...register('schedule.type')}
                                                            defaultChecked
                                                            onClick={() => {
                                                                setScheduleType('off')

                                                                resetField('schedule.info')
                                                            
                                                            }}
                                                        />
                                                        <label htmlFor="noneschedule">無</label>
                                                    </div>
                                                    
                                                    {
                                                        scheduleType === 'specifictime'
                                                            ?   <div className="specifictime">
                                                                    {/* <p className="fs-6 mb-3">指定日期</p> */}
                                                                    <input {...register('schedule.info.expectopentime', {
                                                                        required: scheduleType ==='specifictime' ? '啟動時間請填寫' : false
                                                                    })} style={{display: 'none'}}/>
                                                                    <input {...register('schedule.info.expectclosetime', {
                                                                        required: scheduleType ==='specifictime' ? '關閉時間請填寫' : false
                                                                    })} style={{display: 'none'}}/>
                                                                    <div className="datetime">
                                                                        <span>開啟時間：</span>
                                                                        <DateTimePicker 
                                                                            onChange={(value) => {
                                                                                setExpectOpenTime(value)
                                                                                if (value) setValue('schedule.info.expectopentime', `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}-${value.getHours()}-${value.getMinutes()}`)
                                                                                if (!value) setValue('schedule.info.expectopentime', '')
                                                                                clearErrors('schedule.info.expectopentime')
                                                                            }} 
                                                                            value={expectOpenTime}
                                                                            minDate={new Date()}
                                                                            disableClock={true}
                                                                        />
                                                                    </div>
                                                                    {errors?.schedule?.info?.expectopentime ? <p className="errors">{errors.schedule?.info?.expectopentime.message}</p>: null}

                                                                    <div className="datetime">
                                                                        <span>關閉時間：</span>
                                                                        <DateTimePicker 
                                                                            onChange={(value) => {
                                                                                setExpectCloseTime(value)
                                                                                if (value) setValue('schedule.info.expectclosetime', `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}-${value.getHours()}-${value.getMinutes()}`)
                                                                                if (!value) setValue('schedule.info.expectclosetime', '')
                                                                                clearErrors('schedule.info.expectclosetime')
                                                                            }} 
                                                                            value={expectCloseTime}
                                                                            minDate={new Date()}
                                                                            disableClock={true}
                                                                        />
                                                                    </div>
                                                                    {errors?.schedule?.info?.expectclosetime ? <p className="errors">{errors.schedule?.info?.expectclosetime.message}</p>: null}
                                                                </div>
                                                            : null
                                                    }
                                                        
                                                    {
                                                        scheduleType === 'looptime' ? 
                                                            <div className="looptime">
                                                                    <div className="looptime__period">
                                                                        <span>周期: </span>
                                                                        <select name="" id=""  {...register("schedule.info.frequency", {
                                                                            required: scheduleType ==='looptime' ? '請選擇週期': false,
                                                                            onChange: (e)=>  {
                                                                                resetField('schedule.info')

                                                                                setRepeatFrequency(e.target.value)
                                                                                setValue('schedule.info.frequency', e.target.value)
                                                                                clearErrors('schedule.info.frequency')

                                                                                setDateRange('')
                                                                                setWeekRepeat([])
                                                                                setMonthRepeat([])
                                                                            }
                                                                        })} value={repeatFrequency}>
                                                                            <option value=""></option>
                                                                            <option value="day">日</option>
                                                                            <option value="week">週</option>
                                                                            {/* <option value="month">月</option> */}
                                                                        </select>
                                                                        {errors?.schedule?.info?.frequency ?<p className="errors">{errors?.schedule?.info?.frequency?.message}</p>: null}
                                                                    </div>

                                                                    <div className="looptime__range">
                                                                        <p className="fs-6">選擇區間:</p>
                                                                        <input type="text" {...register('schedule.info.daterange', {required: scheduleType ==='looptime' ? '請輸入日期範圍': false,
                                                                        })} style={{display: 'none'}}/>
                                                                        <DateRangePicker onChange={(value)=> {
                                                                            setDateRange(value)
                                                                            if (value) setValue('schedule.info.daterange', [`${value[0].getFullYear()}-${value[0].getMonth() + 1}-${value[0].getDate()}`, `${value[1].getFullYear()}-${value[1].getMonth() + 1}-${value[1].getDate()}`])
                                                                            if (!value) setValue('schedule.info.daterange', '')
                                                                            clearErrors('schedule.info.daterange')
                                                                        }} value={dateRange} />
                                                                        {errors?.schedule?.info?.daterange ?<p className="errors">{errors?.schedule?.info?.daterange?.message}</p>: null}
                                                                    </div>
                                                                
                                                                    {
                                                                        repeatFrequency === 'day' 
                                                                            ?   <div className="day-box">
                                                                                    <div className="day-box-open">
                                                                                        開啟時間：<input type="time" {...register('schedule.info.expectopentime', {required: repeatFrequency === 'day' ? '請輸入啟動時間': false})}/>
                                                                                    </div>
                                                                                    {errors?.schedule?.info?.expectopentime ?<p className="errors">{errors?.schedule?.info?.expectopentime?.message}</p>: null}
                                                                                    <div>
                                                                                        關閉時間：<input type="time" {...register('schedule.info.expectclosetime', {required: repeatFrequency === 'day' ? '請輸入關閉時間': false})}/>
                                                                                    </div>
                                                                                    {errors?.schedule?.info?.expectclosetime ?<p className="errors">{errors?.schedule?.info?.expectclosetime?.message}</p>: null}
                                                                                </div>
                                                                            : null
                                                                    }
                                                                    
                                                                    {   repeatFrequency === 'week'
                                                                            ?
                                                                                <div className="week-day-box">
                                                                                    <span>每週日期</span>
                                                                                    <div className="week-day-wrapper">
                                                                                        <div className={`week-day ${weekRepeat.includes(1) ? 'hightlight': ''}`} onClick={() => {addweekday(1)}}>一</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(2) ? 'hightlight': ''}`} onClick={() => {addweekday(2)}}>二</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(3) ? 'hightlight': ''}`} onClick={() => {addweekday(3)}}>三</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(4) ? 'hightlight': ''}`} onClick={() => {addweekday(4)}}>四</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(5) ? 'hightlight': ''}`} onClick={() => {addweekday(5)}}>五</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(6) ? 'hightlight': ''}`} onClick={() => {addweekday(6)}}>六</div>
                                                                                        <div className={`week-day ${weekRepeat.includes(7) ? 'hightlight': ''}`} onClick={() => {addweekday(7)}}>日</div>
                                                                                    </div>
                                                                                    {errors?.schedule?.info?.week ? <p className="errors">{errors?.schedule?.info?.week?.message}</p>: null}
                                                                                    <input type="text" {...register('schedule.info.week', {
                                                                                        required: repeatFrequency === 'week' ? '請選擇星期': false,
                                                                                    })} style={{display: 'none'}}/>
                                                                                    <div className="week-day-box-open">
                                                                                        <span>開啟時間：</span>
                                                                                        <input type="time" {...register('schedule.info.expectopentime', {required: repeatFrequency === 'week' ? '請輸入啟動時間': false})}/>
                                                                                        {errors?.schedule?.info?.expectopentime ?<p className="errors">{errors?.schedule?.info?.expectopentime?.message}</p>: null}
                                                                                    </div>
                                                                                    <div>
                                                                                        <span>關閉時間：</span>
                                                                                        <input type="time" {...register('schedule.info.expectclosetime', {required: repeatFrequency === 'week' ? '請輸入關閉時間': false})}/>
                                                                                        {errors?.schedule?.info?.expectclosetime ?<p className="errors">{errors?.schedule?.info?.expectclosetime?.message}</p>: null}
                                                                                    </div>
                                                                                </div>
                                                                            : null
                                                                    }
                                                                    {   repeatFrequency === 'month'
                                                                        ?   
                                                                            <div className="month-day-box">
                                                                                <span>每月日期</span>
                                                                                <div className="month-day-wrapper">
                                                                                    {
                                                                                        [...Array(31).keys()].map((i, index) => {
                                                                                            return (
                                                                                                <div className={`month-day ${monthRepeat.includes(i+1) ? 'hightlight': ''}`} onClick={()=>{addmonthday(i+1)}}>{i+1}</div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    
                                                                                    {/* <div className={`month-day ${monthRepeat.includes(1) ? 'hightlight': ''}`} onClick={()=>{addmonthday(2)}}>2</div>
                                                                                    <div className={`month-day ${monthRepeat.includes(1) ? 'hightlight': ''}`} onClick={()=>{addmonthday(3)}}>3</div>
                                                                                    <div className={`month-day ${monthRepeat.includes(1) ? 'hightlight': ''}`} onClick={()=>{addmonthday(4)}}>4</div> */}
                                                                                </div>
                                                                                <div>
                                                                                    <input type="text" {...register('schedule.info.month', {
                                                                                        required: repeatFrequency === 'month' ? '請輸入日期': false,
                                                                                    })} style={{display: 'none'}}/>
                                                                                    {errors?.schedule?.info?.month ? <p className="errors">{errors?.schedule?.info?.month?.message}</p>: null}
                                                                                </div>
                                                                                
                                                                                <div className="month-day-box-open">
                                                                                    <span>啟動時間：</span>
                                                                                    <input type="time" {...register('schedule.info.expectopentime', {required: repeatFrequency === 'month' ? '請輸入啟動時間': false})}/>
                                                                                    {errors?.schedule?.info?.expectopentime ? <p className="errors">{errors?.schedule?.info?.expectopentime.message}</p>: null}
                                                                                </div>
                                                                                <div>
                                                                                    <span>關閉時間：</span>
                                                                                    <input type="time" {...register('schedule.info.expectclosetime', {required: repeatFrequency === 'month' ? '請輸入關閉時間': false})}/>
                                                                                    {errors?.schedule?.info?.expectclosetime ? <p className="errors">{errors?.schedule?.info?.expectclosetime.message}</p>: null}
                                                                                </div>
                                                                            </div>
                                                                        : null
                                                                    }
                                                                </div>
                                                            : null
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-submit">確認修改排程</button>
                                    <div className="schedule-task-box-form-close">
                                        <BsXSquare  fontSize={'35px'} onClick={()=> {
                                            setDateRange('')
                                            setWeekRepeat('')
                                            setMonthRepeat('')
                                            setExpectOpenTime('')
                                            setExpectCloseTime('')
                                            resetField('schedule.info')
                                            setScheduleEditStatus(false)
                                        }}/>
                                    </div>
                                </form>
                            </div>
                        : null
                }
        </div>
    )
}



export default LabSystem