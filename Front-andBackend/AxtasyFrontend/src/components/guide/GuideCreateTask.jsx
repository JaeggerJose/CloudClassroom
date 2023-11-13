import { useRef, useImperativeHandle, forwardRef } from 'react'
import createtask from '../../assets/images/guide/newjob_all.JPG'
import webtop_clc from '../../assets/images/guide/webtop_clc.JPG'
import system_requirement from '../../assets/images/guide/system_requirement.JPG'
import connection from '../../assets/images/guide/connection.JPG'
import default_environment from '../../assets/images/guide/default_environment.JPG'


function GuideCreateTask(_, ref) {
    const ref1 = useRef()
    useImperativeHandle(ref, () => ({
        ref1,
    }))
    return (
        <section ref={ref1} className="type-admin">
            <h3>建立任務</h3>
            <div className="admin-content">
                <div className="des-field">
                    <h4>操作流程與說明</h4>
                    <div className="detail extent">
                        <img src={createtask} width={1000} alt="" />
                        <h5>操作流程：</h5>
                        <ul>
                            <li>
                                <p>
                                1. 點擊最上方導覽列的<strong>建立新任務</strong>按鈕。
                                </p></li>
                            <li>
                            <p>
                                2. 瀏覽器自動跳轉到建立新任務介面。
                                </p></li>
                            <li>
                            <p>
                                3. 填寫系統資源表單
                                </p></li>
                            <li>
                            <p>
                                4. 填寫連線方式表單
                                </p>
                                </li>
                            <li>
                            <p>
                                5. 選擇 連線方式 
                                </p>
                                </li>
                            <li>
                            <p>
                                6. 點擊”啟動”按鈕，將系統資源與連線方式表單提交到 Axtasy，Axtasy 會以此建立任務檔，當任務需要的資源足夠時，瀏覽器會以彈出式視窗的方式，進入每個任務獨立的Webtop(GUI工作環境)。
                                    若目前可用的硬體資源不足，該任務會進入等待資源模式，瀏覽器不會自動跳轉到 Webtop，可切換到“任務總覽”介面後確認任務狀態，當狀態顯示“Up”時，即可點擊超連結圖示     手動開啟Webtop
                                Webtop示意圖：
                                </p>
                                <img src={webtop_clc} width={1000} alt="" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                <div className="des-field">
                    <h4>欄位說明：系統資源</h4>
                    <div className="detail">
                        <img src={system_requirement} width={500} alt="" />
                        <p>
                            每個任務 Axtasy 都會建立一個獨立的工作環境(Container)，
                            建立 Container 時需要指定 Image 與需要的硬體資源，Image 
                            為工作環境的設計圖，由 Image 來決定工作環境的作業系統與需要
                            安裝的 Package 與應用程式。
                        </p>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                <div className="des-field">
                    <h4>連線方式</h4>
                    <div className="detail">
                        <img src={connection} width={450} alt="" />
                        <ul>
                            <li>
                                <p>
                                FTP：將本機的檔案上傳到Axtasy伺服器
                                </p>
                            </li>
                            <li>
                            <p>
                                Webtop：圖形介面的工作環境，可直接在網頁上使用Matlab、CLC genomics等工具
                                </p>
                            </li>
                            <li>
                            <p>
                                WebIDE：圖形介面的工作環境，可直接在網頁上使用jupyter notebook
                                </p>
                            </li>
                            <li>
                            <p>
                                SSH：文字模式的工作環境，可使用powershell或linux終端機直接連入工作環境。
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                <div className="des-field">
                    <h4>套用範例</h4>
                    <div className="detail">
                        <img src={default_environment} width={450} alt="" />
                        <ul>
                            <p>
                                如果您不知道該怎麼設定，根據不同用途， Axtasy有預先設定好以下7種工作環境，點選其中一列文字後，Axtasy會自動將適合的內容填寫到系統資源表單與連線方式表單。
                            </p>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default forwardRef(GuideCreateTask)