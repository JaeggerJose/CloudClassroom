import { useRef, forwardRef, useImperativeHandle } from 'react'
import joblist from './../../assets/images/guide/joblist.png'
import exit_code from './../../assets/images/guide/exit_code.JPG'
import action_button from './../../assets/images/guide/action_button.jpg'

function GuideUser(_, ref) {
    const ref1 = useRef(null)

    useImperativeHandle(ref, () => ({
        ref1,
    }))

    return (
        <section ref={ref1} className="type-admin">
            <h3>查看任務總覽</h3>
            <div className="admin-content">
                <div className="des-field">
                    <h4>任務總覽畫面</h4>
                    <div className="detail extent">
                        <img src={joblist} width={1100} alt="" />
                        <ul>
                            <li>
                                <p>
                                1. 點擊最上方導覽列的<strong>任務總覽</strong>按鈕。
                            </p>
                                </li>
                            
                            <li>
                            <p>
                                2. 瀏覽器自動跳轉到任務總覽介面。
                            </p>
                            </li> 
                            <li>
                                <p>
                                此介面會顯示所有運行中的任務資訊，每個任務的右側有三個功能按鈕，可以點擊功能按鈕調整指定任務的狀態。
                                點擊”Webtop連結”欄位的超連結，瀏覽器會以彈出式視窗的方式，進入每個任務獨立的 Webtop (GUI工作環境)。
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                <div className="des-field">
                    <h4>欄位說明</h4>
                    <div className="detail extent">
                        <ul>
                            <li>
                                <p>
                                1. Image Name：Axtasy會以webtop為基底開啟GUI工作環境，並在工作環境中安裝指定工具，例如：Matlab，安裝完成後會將此工作環境儲存，儲存下來的工作環境稱為Image，此欄位紀錄該任務使用的工作環境。
                                </p>    
                            </li>
                            <li>
                            <p>2. 啟動時間：從“建立新任務”頁面提交的任務會由Axtasy的排程系統管理，當有足夠的硬體資源時，Axtasy會自動啟動Webtop，並記錄啟動時間。
                            </p>
                            </li>
                            <li><p>
                            3. Job Name：每一個運行中的任務被Axtasy賦予的唯一編號。
                            </p>
                            </li>
                            <li>
                            <p>4. Webtop連結：點擊超連結圖示後，自動連入工作環境。
                            </p>
                            </li>
                            
                            <li><p>
                            5. 狀態：顯示Webtop的即時狀態，當Webtop正常運行時，會顯示“Up”並列出運行時間，當Webtop發生錯誤終止時，顯示“Exited”與錯誤代碼，並記錄終止時間。</p>
                            </li>
                        </ul>
                        <img src={exit_code} width={600} alt="" />
                    </div>
                </div>
            </div>
            <div className="admin-content">
                <div className="des-field">
                    <h4>按鈕說明：在不同的情境下，可以使用以下三種按鈕變更任務的狀態，當游標移動到按鈕上時會顯示簡短的說明文字。
                    </h4>
                    <div className="detail extent">
                        <img src={action_button} width={600} alt="" />
                        <ul>
                            <li>
                                <p>
                                    1. Delete：若使用者需要”永久”停用 Webtop 時，可以點擊 <span className="emp">Delete</span> 按鈕，Axtasy會將Webtop內的<span className="emp">所有資料刪除</span>，並將該任務從任務總覽移除。
                                </p>    
                            </li>
                            <li>
                                <p>
                                   2. Commit：若使用者需要”暫時”停用 Webtop 時，可以點擊 <span className="emp">Commit</span> 按鈕，Axtasy會將 Webtop 內的 <span className="emp">所有資料保存為壓縮檔Jobname.tar</span>，並將該任務從任務總覽移除。當使用者需要重啟工作環境時，可以從“建立新任務”頁面中根據Jobname.tar來重啟工作環境。
                                </p>
                            </li>
                            <li>
                                <p>
                                    3. Reboot：若使用者發現 Webtop 異常，例如狀態欄位顯示 <span className="emp">Exited</span> 時，可以點擊<span className="emp"> Reboot </span>按鈕重新啟動Webtop。
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default forwardRef(GuideUser)