import React from 'react'

function SystemInfo({register, errors}) {
    return (
        <>
            <h4 className="fs-4">系統資源</h4>
            {/* box */}
            {/* 1 */}
            <div className="box">
                <h5 id="gpu" className="fs-5">GPU cards per container</h5>
                <p className="fs-6 mb-3">借用2顆以上需評估，如有需求請聯絡管理團隊。</p>
                <select className="form-select" { ...register('gpu', {
                    required: '請輸入GPU'
                })}>
                    <option value="">請選擇</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            
            {errors?.gpu ? <p className="errors">{errors.gpu.message}</p>: null}
            <div className="box-seperate"></div>

            {/* 2 */}
            <div className="box">
                <h5 id="cpu" className="fs-5">CPU threads per container</h5>
                <p className="fs-6 mb-3">input 1~12, eg: 4</p>
                <div className="input-field">
                    <input className="box-input" placeholder="1" type="text" {...register('cpu', {
                        required: '請輸入CPU threads',
                        min: 1,
                        max: 12,
                    })} />
                </div>
            </div>
            {errors?.cpu ? <p className="errors">{errors.cpu.message}</p>: null}

            <div className="box-seperate"></div>

            {/* 3 */}
            <div className="box">
                <h5 id="memory" className="fs-5">System memory per container</h5>
                <p className="fs-6 mb-3">一顆GPU 原則上分配 8GB 記憶體，申請上限為80GB。</p>
                <div className="input-field">
                    <input className="box-input" placeholder="1" type="text" {...register('memory', {
                        required: '請輸入記憶體配制量',
                        min: 1,
                        max: 8,
                    })}/>
                </div>
            </div>
            {errors?.memory ? <p className="errors">{errors.memory.message}</p>: null}

            <div className="box-seperate"></div>
            {/* 4 */}
            <div className="box">
                <h5 id="imagename" className="fs-5">Image Name</h5>
                <p className="fs-6 mb-3">一顆GPU 原則上分配 8GB 記憶體，申請上限為80GB。</p>
                <select className="form-select" {...register('imagename', {
                    required: '請選擇image'
                })}>
                    <option value=""></option>
                    <option value="webtop_matlab">Webtop matlab</option>
                    <option value="webtop_orange3_CLC">Webtop orange3CLC</option>
                    <option value="webtop_itksnap">Webtop itksnap</option>
                    <option value="webtop_3dslicer">Webtop 3dslicer</option>
                    <option value="jupyter_notebook">Jupyter notebook</option>
                </select>
                {errors?.imagename ? <p className="errors">{errors.imagename.message}</p>: null}

            </div>
        </>
    )
}

export default SystemInfo