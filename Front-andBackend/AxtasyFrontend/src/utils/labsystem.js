import ButtonOnlineTableDelete from "../components/systemlab/ButtonOnlineTableDelete";
import ButtonOnlineTableCommit from "../components/systemlab/ButtonOnlineTableCommit";
import ButtonOnlineTableReboot from "../components/systemlab/ButtonOnlineTableReboot";

import { createContext, useState } from 'react'
import { Divide } from "hamburger-react";

const LabDataContext = createContext({})

export const LabDataPorvider = ({children}) => {
    const [labdata, setLabdata] = useState([])
    return (
        <LabDataContext.Provider value={{labdata, setLabdata}}>
            {children}
        </LabDataContext.Provider>
    )
}

export { LabDataContext }




function rankFormatter(_, row) {
    return (
        <div className="func" style={{display: 'flex', flexWrap:'nowrap'}}>
            <ButtonOnlineTableDelete item={row}/>
            <ButtonOnlineTableCommit item={row}/>
            <ButtonOnlineTableReboot item={row}/>
        </div>
    );
}

const onlineColumns = [
    { dataField: 'imagetype', text: 'Image Name'},
    { dataField: 'createdate', text: '啟動時間'},
    { dataField: 'webtopurl', text: 'Webtop 連結'},
    { dataField: 'status', text: '狀態'},
    { dataField: 'remark', text: '備註'},
            
    { dataField: 'action', text: '功能', formatter: rankFormatter},
    { dataField: 'jobname', text: 'jobname'},
]


export {onlineColumns}