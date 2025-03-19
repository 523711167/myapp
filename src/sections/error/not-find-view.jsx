import { Button, Result } from "antd";

import { useRouter } from "@routes/hook/use-router";


function NotFindView() {
    const { back } = useRouter()

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => back()}>Back Home</Button>}
        />
    )
}

export default NotFindView