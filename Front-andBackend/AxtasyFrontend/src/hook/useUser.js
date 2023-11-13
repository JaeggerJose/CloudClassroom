import Cookies from "js-cookie"

const useUser = () => {
    return Cookies.get('id')
}

export default useUser