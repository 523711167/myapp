import {Helmet} from "react-helmet-async";


import OverviewAppView from "@sections/overview/app/view/overview-app-view";


function IndexPage() {


    return (
        <>
            <Helmet>
                <title> Dashboard: App</title>
            </Helmet>

            <OverviewAppView/>
        </>
    )
}

export default IndexPage;