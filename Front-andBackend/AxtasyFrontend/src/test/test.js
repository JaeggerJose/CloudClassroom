import { createServer } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,

        routes() {
            this.namespace = "api"

            this.get("/users", (schema) => {
                return {
                    name: 'alice'
                }
            })

            this.post("/login", (_, request) => {
                if (JSON.parse(request.requestBody).password === '1') {

                    return {
                        id: 'jijvkowjnv',
                        reply: request.requestBody,
                        email: JSON.parse(request.requestBody).email,
                        token: 'fejifojwinvihvhuaae484f',
                        username: 'Mike',
                        user: '系統管理者',
                        level: 1,
                        status: 1,
                    }
                }
                if (JSON.parse(request.requestBody).password === '12') {
                    return {
                        reply: request.requestBody,
                        email: JSON.parse(request.requestBody).email,
                        user: '使用者',
                        level: 2,
                        status: 1,
                    }
                }
               
                if (JSON.parse(request.requestBody).password === '123') {
                    return {
                        reply: request.requestBody,
                        email: JSON.parse(request.requestBody).email,
                        level: 3,
                        status: 1,
                    }
                }
                return {
                    status: 0,
                }
            })
            // 
            this.post("/create", (_, request) => {
                return {
                    ...JSON.parse(request?.requestBody)
                }
            })
        },
    })

    return server
}