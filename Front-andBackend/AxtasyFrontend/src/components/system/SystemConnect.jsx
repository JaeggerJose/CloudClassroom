import React from 'react'

function Connect({register, ftp, webtop, webide, ssh, errors}) {
    return (
        <>
            <h4 className="fs-4">連線方式</h4>

            {/* box */}
            {/* 1 */}
            <div className="box">
                <div className="input-field">
                    <input type="radio" id="ftp" {...register('connect', {
                        required: '請選擇連線方式'
                    })} value="ftp" disabled={ftp}/>
                    <label htmlFor="ftp" className={ftp ? 'deactive': ''}>FTP</label>
                </div>
             
                <div className="input-field">
                    <input type="radio" id="webtop" {...register('connect', {
                        required: '請輸入連線方式'
                    })} value="webtop" disabled={webtop}/>
                    <label htmlFor="webtop" className={webtop ? 'deactive': ''}>Webtop</label>
                </div>
                <div className="input-field">
                    <input type="radio" id="webide" {...register('connect', {
                        required: '請輸入連線方式'
                    })} value="webide" disabled={webide}/>
                    <label htmlFor="webide" className={webide ? 'deactive': ''}>WebIDE</label>
                </div>
                <div className="input-field">
                    <input type="radio" id="ssh" {...register('connect', {
                        required: '請輸入連線方式'
                    })} value="ssh" disabled={ssh}/>
                    <label htmlFor="ssh" className={ssh ? 'deactive': ''}>SSH</label>
                </div>
                {errors?.connect ? <p className="errors">{errors?.connect.message}</p> : null}
            </div>
        </>
    )
}

export default Connect