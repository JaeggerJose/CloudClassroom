import React from 'react'

function Loading({setIsLoading}) {
    return (
        <div className="system-loading">
            <div className="loading-box">
                <div className="wrap">
                    <div className="loader-box">
                        <div className="loader"></div>
                    </div>
                    <p className="hint">
                        啟動中
                    </p>
                    <p className="text">請靜待約十秒鐘，若無自動跳轉，請由導覽列中進入任務總覽，點擊連結</p>
                    <p className="close-loading" onClick={() => {setIsLoading(p=>!p)}}>關閉此視窗</p>
                </div>
            </div>
        </div>
    )
}

export default Loading