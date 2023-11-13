import adminaddlabadmin from './../../assets/images/guide/admin_add_labadmin.png'
import guideadminlabadminlist from './../../assets/images/guide/admin_labadminlist.png'
import { useImperativeHandle, forwardRef, useRef } from 'react'

const GuideAdmin = ((_, ref) => {
    const ref1 = useRef(null)
    const ref2 = useRef(null)

    useImperativeHandle(ref, () => ({
        ref1,
        ref2,
    }))

    return (
        <section ref={ref1} className="type-admin">
            <h3>新增查閱管理實驗室管理者</h3>
            <div className="admin-content">
                <div className="des-field">
                    <h4 ref={ref2}>新增實驗室管理者</h4>
                    <div className="detail">
                        <img src={adminaddlabadmin} width={500} alt="" />
                        <ul>
                            <li>
                                <p>
                                1. 表單輸入實驗室管理者名稱
                                </p>
                            </li>
                            <li>
                                <p>
                                2. 表單輸入實驗室管理者電子郵件
                                </p>
                            </li>
                            <li>
                                <p>
                                3. 表單輸入實驗室管理者密碼
                                </p>
                            </li>
                            <li>
                                <p>
                                4. 提交後，即增加一位實驗室管理者
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="des-field">
                    <h4>查看實驗室管理者列表</h4>
                    <div className="detail extent">
                        <img src={guideadminlabadminlist} width={900} alt="" />
                        <ul>
                        <li>
                            <p>
                                1. 新增管理者後，可由管理者列表查看目前有哪些實驗室管理者。
                            </p>
                        </li>
                        <li>
                            <p>
                                2.  實驗室管理者名稱：新增的實驗室管理者名稱
                            </p>
                        </li>
                        <li>
                            <p>
                                3. 刪除：點擊後，可刪除該實驗室管理者
                            </p>
                        </li>
                        <li>
                            <p>
                                4. 改密碼：修改實驗室管理者密碼
                            </p>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default forwardRef(GuideAdmin)