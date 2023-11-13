import { useRef, forwardRef, useImperativeHandle } from 'react'
import labadminadduser from './../../assets/images/guide/labadmin_add_user.PNG'
// import labadminuserlist from './../../assets/images/guide/admin-labadminlist.png'
import labadminuserlist from './../../assets/images/guide/labadmin_userlist.PNG'

function GuideLabadmin(_, ref) {
    const ref1 = useRef(null)

    useImperativeHandle(ref, () => ({
        ref1,
    }))

    return (
        <section ref={ref1} className="type-admin">
            <h3>新增查閱使用者</h3>
            <div className="admin-content">
                <div className="des-field">
                    <h4>新增使用者</h4>
                    <div className="detail">
                        <img src={labadminadduser} height={500} alt="" />
                        <ul>
                            <li>
                                <p>1. 表單輸入使用者名稱</p>
                            </li>
                            <li>
                                <p>
                                    2. 表單輸入使用者電子郵件
                                </p>
                            </li>
                            <li>
                                <p>
                                    3. 表單輸入使用者管理者密碼
                                </p>
                            </li>
                            <li>
                                <p>
                                    4. 提交後，即增加一位使用者
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="des-field">
                    <h4>查看實驗室使用者列表</h4>
                    <div className="detail extent">
                        <img src={labadminuserlist} width={900} alt="" />
                        <ul>
                            <li>
                                <p>
                                    1. 新增使用者後，可由管理者列表查看目前有哪些使用者。
                                </p>
                            </li>
                            <li>
                                <p>
                                    2. 使用者名稱：目前的使用者名稱
                                </p>
                            </li>
                            <li>
                                <p>
                                    3. 刪除：點擊後，可刪除該使用者
                                </p>
                            </li>
                            <li>
                                <p>
                                    4. 改密碼：修改使用者密碼
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default forwardRef(GuideLabadmin)