import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import AuthGuard from "@auth/guard/auth-guard";
import DashboardLayout from "@layouts/dashboard/layout";




export const dashboardRoutes = [
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout>
                    <Suspense fallback={'正在加载中'}>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            </AuthGuard>
        ),

    },
]