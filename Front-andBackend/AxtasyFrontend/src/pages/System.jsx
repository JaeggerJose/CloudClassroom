import React, {useState} from 'react'
import SystemInfo from '../components/system/SystemInfo'
import SystemConnect from '../components/system/SystemConnect'
import { useNavigate } from 'react-router-dom'
// temporary comment
// import SystemTime from '../components/system/SystemTime'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Loading from '../components/Loading'
import useAuth from '../hook/useAuth'
import useCookie from '../hook/useCookie';
import { useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';



function System() {
    const { auth } = useAuth()
    const cookie = useCookie('csrftoken')

    const { register, handleSubmit, setValue, watch, unregister, getValues, clearErrors, resetField, formState: { errors }} = useForm()
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate()


    const [expectOpenTime, setExpectOpenTime] = useState(null);
    const [expectCloseTime, setExpectCloseTime] = useState(null);

    const [dateRange, setDateRange] = useState('')

    const [scheduleType, setScheduleType] = useState(null);
    const [repeatFrequency, setRepeatFrequency] = useState(null)

    const [weekRepeat, setWeekRepeat] = useState([])
    const [monthRepeat, setMonthRepeat] = useState([])
    // submit
    // ===================
    const onSubmit = async (input, e) => {
        if (process.env.NODE_ENV === 'development') {
            

            e.target.querySelector('.btn-upload').disabled = true
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                e.target.querySelector('.btn-upload').disabled = false
            }, 2000)
            const response = await axios({
                method: 'POST',
                url: process.env.REACT_APP_CREATE,
                data: {
                    ...input,
                    username: auth.username,
                    action: 'newjob',
                    actiontype: input.schedule,
                },
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': cookie,
                }
            })

            
            navigate('/labsystem')

        } else {
            e.target.querySelector('.btn-upload').disabled = true
            setIsLoading(true)
            const response = await axios({
                method: 'POST',
                url: process.env.REACT_APP_CREATE,
                data: {
                    ...input,
                    username: auth.username,
                    action: 'newjob',
                    // targetTime: `${targetTime.getFullYear()}-${targetTime.getMonth() + 1}-${targetTime.getDate()}-${targetTime.getHours()}-${targetTime.getMinutes()}`,
                    // actiontype: input.schedule,
                    // looptime: {
                    //     period: input.looptime?.period,
                    //     time: input.looptime?.time,
                    //     month: input.looptime?.month,
                    //     week: weekRepeat,
                    // },
                },
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': cookie,
                }
            })
            
            const port = response.data.port

            // setTimeout(() => {
            //     setIsLoading(false)
            //     window.open(`http://120.126.17.200:${port}`, '_blank');
            //     e.target.querySelector('.btn-upload').disabled = false
            // }, 2000)

            setIsLoading(false)
            // window.open(`${process.env.REACT_APP_LOGINNODE}:${port}`, '_blank');
            e.target.querySelector('.btn-upload').disabled = false
            navigate('/labsystem')

        }
        
    }

    const onError = (errors, e) => {
        let errorsArray = Object.keys(errors)
        e.target.querySelector('.btn-upload').disabled = true
        if (errorsArray.length) {
           let temp = document.getElementById(errorsArray[0])
           if (temp) {
              window.scrollTo({
                'behavior': 'smooth',
                'top':  temp.offsetTop - 80,
              })
           }
        }
        e.target.querySelector('.btn-upload').disabled = false
    }
    // ===================
    // Connect State Control checkbox
    const [connect, setConnect] = useState({ftp: true, webtop: true, webide: true, ssh: true})
    const imagename = watch('imagename')

    useEffect(() => {
        setValue('connect', '')

        if (imagename === '') {
            setConnect({ftp: true, webtop: true, webide: true, ssh: true})
        } else if (imagename === 'webtop_matlab') {
            setConnect({ftp: true, webtop: false, webide: true, ssh: true})
            setValue('connect', 'webtop')
        } else if (imagename === 'webtop_orange3_CLC') {
            setConnect({ftp: true, webtop: false, webide: true, ssh: true})
            setValue('connect', 'webtop')
        } else if (imagename === 'webtop_itksnap') {
            setConnect({ftp: true, webtop: false, webide: true, ssh: true})
            setValue('connect', 'webtop')
        } else if (imagename === 'webtop_3dslicer') {
            setConnect({ftp: true, webtop: false, webide: true, ssh: true})
            setValue('connect', 'webtop')
        } else if (imagename === 'jupyter_notebook') {
            setConnect({ftp: true, webtop: false, webide: false, ssh: true})
        }
    }, [imagename])
    
    // useEffect(() => {
    //     unregister('schedule.info.expectclosetime')
    //     unregister('schedule.info.expectopentime')
    // }, [scheduleType, repeatFrequency])

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


    return (
        <form className="system" onSubmit={handleSubmit(onSubmit, onError)}>
            { isLoading ? <Loading setIsLoading={setIsLoading} /> : ''}
            <div className="container-xl">
                <div className="row">
                    {/* column 1 */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="col-12 mb-4">
                            <div className="bg-primary rounded-top h-10 top-line"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
                                <div className="system-info">
                                    <SystemInfo register={register} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* column 2 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="mb-4">
                            <div className="bg-secondary rounded-top h-10 top-line"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
                                <div id="connect" className="connect">
                                    <SystemConnect register={register} ftp={connect.ftp} webtop={connect.webtop} webide={connect.webide} ssh={connect.ssh} errors={errors} />
                                </div>
                            </div>
                        </div>

                        {/* amount */}
                        <div className="col-12 mb-4">
                            <div className="bg-green rounded-top h-10 top-line"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
                                <div className="amount">
                                    <div className="box">
                                        <h5 id="amount" className="fs-5">任務數量</h5>
                                        <p className="fs-6 mb-3">至少為1</p>
                                        <div className="input-field">
                                            <input className="box-input" placeholder="1" type="text" {...register('amount', {
                                                required: '請輸入任務數量',
                                                pattern: {
                                                    value: /^([1-9]|10)$/,
                                                    message: '請輸入1-10數值',
                                                },
                                                min: {
                                                    value: /^([1-9]|10)$/,
                                                    message: '請輸入1-10數值',
                                                },
                                                max: {
                                                    value: /^([1-9]|10)$/,
                                                    message: '請輸入1-10數值',
                                                },
                                            })} />
                                            {errors?.amount ?<p className="errors">{errors.amount.message}</p>: null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* remark task */}
                        <div className="col-12 mb-4">
                            <div className="bg-orange rounded-top h-10 top-line"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
                                <div className="task-remark">
                                    <div className="box">
                                        <h5 id="remark" className="fs-5">任務備註(選擇)(最多20字)</h5>
                                        {/* <p className="fs-6 mb-3">若無輸入，則依建立時間命名</p> */}
                                        <div className="input-field">
                                            <input className="box-input" placeholder="task remark" type="text" {...register('remark', {
                                                pattern: {
                                                    value: /^[\w-]+$/,
                                                    message: '只允許英文、數字和符號-',
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: '最多20字',
                                                }
                                            })} />
                                            {errors?.remark ? <p className="errors">{errors.remark.message}</p>: null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* sch */}
                        <div className="col-12 mb-4">
                            <div className="bg-red rounded-top h-10 top-line"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
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
                                                    scheduleType === 'looptime'
                                                        ?   <div className="looptime">
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
                                                                        if (value) {setValue('schedule.info.daterange', [`${value[0].getFullYear()}-${value[0].getMonth() + 1}-${value[0].getDate()}`, `${value[1].getFullYear()}-${value[1].getMonth() + 1}-${value[1].getDate()}`])
                                                                            clearErrors('schedule.info.daterange')
                                                                        }
                                                                        if (!value) setValue('schedule.info.daterange', '')
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
                            </div>
                        </div>
                        

                        


                        {/* execute time */}
                        {/* <div className="col-12 mb-4">
                            <div className="bg-green rounded-top h-10"></div>
                            <div className="list border border-top-0 border-1 rounded-bottom py-3 px-3">
                                <div className="execute-time">
                                    <SystemTime register={register}/>
                                </div>
                            </div>
                        </div> */}
                       
                    </div>

                    {/* column 3 */}
                    <div className="col-lg-4 col">
                        <div className="right-section">
                            <div>
                                <img alt="" src="https://fakeimg.pl/300x170/" />
                            </div>
                            <div className="system-example">
                                <h4>套用範例</h4>
                                <div className="select-part">
                                    <h5 className="fs-6">
                                        如果您不知道該怎麼設定，根據不同用途， 
                                        Axtasy有預先設定好的參數，您可以套用
                                    </h5>
                                    <p onClick={() => {
                                        setValue('gpu', '1')
                                        setValue('cpu','1')
                                        setValue('memory', '1')
                                        setValue('connect', 'webtop')
                                        setValue('amount', '1')
                                        setValue('imagename', 'webtop_matlab')
                                    }}>1.MATLAB</p>
                                    <p onClick={() => {
                                        setValue('gpu', '1')
                                        setValue('cpu','1')
                                        setValue('memory', '1')
                                        setValue('connect', 'webtop')
                                        setValue('amount', '1')
                                        setValue('imagename', 'webtop_orange3_CLC')
                                    }}>2.CLC Genomics workbench</p>
                                    <p onClick={() => {
                                        setValue('gpu', '1')
                                        setValue('cpu','1')
                                        setValue('memory', '1')
                                        setValue('connect', 'webtop')
                                        setValue('amount', '1')
                                        setValue('imagename', 'webtop_itksnap')
                                    }}>3.Webtop itksnap</p>
                                    <p onClick={() => {
                                        setValue('gpu', '1')
                                        setValue('cpu','1')
                                        setValue('memory', '1')
                                        setValue('connect', 'webtop')
                                        setValue('amount', '1')
                                        setValue('imagename', 'webtop_3dslicer')
                                    }}>4.Webtop 3dslice</p>
                                    <p onClick={() => {
                                        setValue('gpu', '1')
                                        setValue('cpu','1')
                                        setValue('memory', '1')
                                        // setValue('connect', 'webtop')
                                        setValue('amount', '1')
                                        setValue('imagename', 'jupyter_notebook')
                                    }}>5.Jupyter notebook</p>
                                    <p style={{'color': '#d6d6d6'}}>6.TensorFlow</p>
                                    <p style={{'color': '#d6d6d6'}}>7.AlphaFold</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-upload">啟動</button>
            </div>
        </form>
    )
}

export default System
