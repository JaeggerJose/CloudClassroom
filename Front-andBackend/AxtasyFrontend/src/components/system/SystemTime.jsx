import React from 'react'

function SystemTime({register}) {

    return (
        <div className="box">
            <h5 className="fs-5">執行時間</h5>
            <p className="fs-6 mb-3">input 1~12, eg: 4</p>
            <div className="">
                <div>
                    <input className="" name="time" id="unlimit" type="radio" {...register('time')} value="unlimit"/>
                    <label htmlFor="unlimit">不限時</label>
                </div>
                <div>
                    <input className="" name="time" id="auto-disconnet" type="radio" {...register('time')} value="auto-disconnect"/>
                    <label htmlFor="auto-disconnet">超時自動斷線</label>
                </div>
            </div>
        </div>
    )
}

export default SystemTime