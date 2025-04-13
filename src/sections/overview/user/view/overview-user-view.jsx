import {ProTable, TableDropdown} from "@ant-design/pro-components";
import { message} from "antd";
import {useRef, useState} from "react";

import axios, {API_ENDPOINTS} from "@utils/axios";
import {addIfExists} from "@utils/obj";
import UserCreateFrom from "@sections/overview/user/user-create-view";

const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '用户名',
        dataIndex: 'username',
        copyable: true,
        ellipsis: true,
        tooltip: 'The title will shrink automatically if it is too long',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'This field is required',
                },
            ],
        },
    },
    {
        title: '电子邮箱',
        dataIndex: 'email',
        hideInSearch: true
    },
    {
        title: '姓名',
        dataIndex: 'realName',
    },
    {
        title: '地址',
        dataIndex: 'address',
        hideInSearch: true
    },
    {
        title: '电话',
        dataIndex: 'phone',
        hideInSearch: true
    },
    {
        title: '生日',
        dataIndex: 'birthDate',
        valueType: 'date',
        hideInSearch: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        // valueType: 'select',
        valueEnum: {
            0: {
                text: '禁用',
                status: 'Error',
            },
            1: {
                text: '启用',
                status: 'Success',
            },
        }
    },
    {
        title: '最近登录时间',
        dataIndex: 'lastLoginTime',
        valueType: 'dateTime',
        hideInSearch: true,
    },
    {
        title: '最近登录时间',
        dataIndex: 'lastLoginTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                if (value) {
                    return {
                        'fromLastLoginTime': value[0],
                        'toLastLoginTime': value[1],
                    }
                }
                return {
                    'fromLastLoginTime': null,
                    'toLastLoginTime': null,
                }
            }
        }
    },
    {
        title: 'Actions',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                Edit
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                View
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: 'Copy' },
                    { key: 'delete', name: 'Delete' },
                ]}
            />,
        ],
    },
];

function OverviewUserView() {

    const actionRef = useRef();
    const [ param, setParam ] = useState({
        pageSize: 10,
        username: '',
        realName: '',
        status: '',
        fromLastLoginTime: null,
        toLastLoginTime: null
    });
    const [messageApi, contextHolder] = message.useMessage();


    const request = async (params, sort, filter) => {
        try {
            const bodyJson = {};
            addIfExists(bodyJson, 'current', params.current)
            addIfExists(bodyJson, 'size', params.pageSize)
            addIfExists(bodyJson, 'username', params.username)
            addIfExists(bodyJson, 'realName', params.realName)
            addIfExists(bodyJson, 'status', params.status)
            addIfExists(bodyJson, 'fromLastLoginTime', params.fromLastLoginTime)
            addIfExists(bodyJson, 'toLastLoginTime', params.toLastLoginTime)
            const {data} = await axios.post(
                API_ENDPOINTS.user.page,
                bodyJson
            );
            const {data: dataArr, total} = data?.data
            return {
                success: true,
                data: dataArr,
                total: total
            }
        } catch (err) {
            console.error(err)
            messageApi.error('服务器开小差了')
        }
    };

    return (
        <>
            {contextHolder}
            <ProTable
                /* 防抖时间 */
                debounceTime={200}
                columns={columns}
                actionRef={actionRef}
                cardBordered
                params={param}
                request={request}
                /* 搜索表单的配置 */
                search={{
                    showHiddenNum: true,
                    labelWidth: 'auto',
                    defaultCollapsed:false
                }}
                /* 控制表格每列的fixed disabled order */
                columnsState={{
                    // persistenceKey: 'pro-table-singe-demos',
                    // persistenceType: 'localStorage',
                    onChange(value) {
                            console.log('value: ', value);
                    },
                }}
                /* 控制表单的多功能菜单 */
                options={{
                    density: false,
                    fullScreen: true,
                    // 控制齿轮按钮菜单的
                    setting: false,
                    // 不知道这个是干什么的
                    search: true,
                }}
                /* 多功能菜单旁新增Dom元素 */
                toolBarRender={() => [
                    <UserCreateFrom />
                ]}
                rowKey="id"
                /* 暂时不太理解 */
                form={{
                    // Since transform is configured, the submitted parameters are different from the defined ones,
                    // so they need to be transformed here
                    syncToUrl: (values, type) => {
                            if (type === 'get') {
                                return {
                                    ...values,
                                    created_at: [values.startTime, values.endTime],
                                };
                            }
                            return values;
                        },
                }}
                pagination={{
                    pageSize: param.pageSize,
                    onShowSizeChange: (current, size) => setParam( { pageSize: size })
                }}
                /* form表单时间类型自定义转换 传递给search.transform 再传递给form.syncToUrl 最后传递给request.param*/
                dateFormatter={(value, valueType) => {
                    return value.valueOf();
                }}
                headerTitle="用户信息"
            />
        </>
    )
}

export default OverviewUserView;