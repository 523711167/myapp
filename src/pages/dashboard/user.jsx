import {Helmet} from "react-helmet-async";


import OverviewUserView from "@sections/overview/user/view/overview-user-view";


function OverviewUserPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: user</title>
            </Helmet>

            <OverviewUserView/>
        </>
    )
}

export default OverviewUserPage