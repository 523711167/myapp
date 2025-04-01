import {ProTable, TableDropdown} from "@ant-design/pro-components";
import {Button, Dropdown, Space, Tag} from "antd";
import {EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef} from "react";
import axios, {API_ENDPOINTS} from "@utils/axios";

export const waitTimePromise = async (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time = 100) => {
    await waitTimePromise(time);
};

const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'username',
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
    // {
    //     disable: true,
    //     title: 'Status',
    //     dataIndex: 'state',
    //     filters: true,
    //     onFilter: true,
    //     ellipsis: true,
    //     valueType: 'select',
    //     valueEnum: {
    //         all: { text: 'Very Long'.repeat(50) },
    //         open: {
    //             text: 'Unresolved',
    //             status: 'Error',
    //         },
    //         closed: {
    //             text: 'Resolved',
    //             status: 'Success',
    //             disabled: true,
    //         },
    //         processing: {
    //             text: 'In Progress',
    //             status: 'Processing',
    //         },
    //     },
    // },
    // {
    //     disable: true,
    //     title: 'Labels',
    //     dataIndex: 'labels',
    //     search: false,
    //     renderFormItem: (_, { defaultRender }) => {
    //         return defaultRender(_);
    //     },
    //     render: (_, record) => (
    //         <Space>
    //             {record.labels.map(({ name, color }) => (
    //                 <Tag color={color} key={name}>
    //                     {name}
    //                 </Tag>
    //             ))}
    //         </Space>
    //     ),
    // },
    // {
    //     title: 'Creation Time',
    //     key: 'showTime',
    //     dataIndex: 'created_at',
    //     valueType: 'date',
    //     sorter: true,
    //     hideInSearch: true,
    // },
    // {
    //     title: 'Creation Time',
    //     dataIndex: 'created_at',
    //     valueType: 'dateRange',
    //     hideInTable: true,
    //     search: {
    //         transform: (value) => {
    //             return {
    //                 startTime: value[0],
    //                 endTime: value[1],
    //             };
    //         },
    //     },
    // },
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

    return (
        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(111, params);
                    await waitTime(2000);
                    // return request<{
                    //     data: GithubIssueItem[];
                    // }>('https://proapi.azurewebsites.net/github/issues', {
                    //     params,
                    // });
                    // {
                    //  url: string;
                    //   id: number;
                    //   number: number;
                    //   title: string;
                    //   labels: {
                    //     name: string;
                    //     color: string;
                    //   }[];
                    //   state: string;
                    //   comments: number;
                    //   created_at: string;
                    //   updated_at: string;
                    //   closed_at?: string;
                    // }
                    const { data } = await axios.post(
                        API_ENDPOINTS.user.page,
                        {
                            "current": params.current,
                            "size": params.pageSize,
                        }
                    );
                    console.log(" data?.data?.data" ,data?.data);
                    return data?.data
                }}
                editable={{
                type: 'multiple',
            }}
                columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
                rowKey="id"
                search={{
                labelWidth: 'auto',
            }}
                options={{
                setting: {
                    listsHeight: 400,
                },
            }}
                form={{
                // Since transform is configured, the submitted parameters are different from the defined ones, so they need to be transformed here
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
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
                dateFormatter="string"
                headerTitle="Advanced Table"
                toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    新增
                </Button>,
                <Dropdown
                    key="menu"
                    menu={{
                        items: [
                            {
                                label: '1st item',
                                key: '1',
                            },
                            {
                                label: '2nd item',
                                key: '2',
                            },
                            {
                                label: '3rd item',
                                key: '3',
                            },
                        ],
                    }}
                >
                    <Button>
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>,
            ]}
                />
        </>
    )
}

export default OverviewUserView;