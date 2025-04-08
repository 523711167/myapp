import {PlusOutlined} from '@ant-design/icons';
import {
    ModalForm,
    ProForm, ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';


function UserCreateFrom() {

    const [form] = Form.useForm();

    return (
        <ModalForm
            title="Create New Form"
            trigger={
                <Button type="primary">
                    <PlusOutlined/>
                    新增
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                console.log(values.name);
                message.success('Submission successful');
                return true;
            }}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="username"
                    label="用户名"
                    tooltip="Up to 24 characters"
                    placeholder="请输入用户名"
                />
                <ProFormText
                    width="md"
                    name="realName"
                    label="真实姓名"
                    placeholder="请输入用户姓名"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText.Password
                    width="md"
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                />
                <ProFormText.Password
                    width="md"
                    name="password1"
                    label="确认密码"
                    placeholder="请输入密码"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="email"
                    label="邮箱"
                    placeholder="请输入邮箱"
                />
                <ProFormText
                    width="md"
                    name="phone"
                    label="手机号码"
                    placeholder="请输入手机号码"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormSelect
                    request={async () => [
                        {
                            value: '0',
                            label: '禁用',
                        },
                        {
                            value: '1',
                            label: '启用',
                        },
                    ]}
                    width="md"
                    name="gender"
                    label="性别"
                />
                <ProFormDatePicker
                    name="date"
                    width="md"
                    label="出生日期" />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormTextArea
                    width="md"
                    colProps={{ span: 24 }}
                    name="address"
                    label="居住地址"
                />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="Main Contract Number"/>
            <ProFormText
                name="project"
                disabled
                label="Project Name"
                initialValue="xxxx Project"
            />
            <ProFormText
                width="xs"
                name="mangerName"
                disabled
                label="Business Manager"
                initialValue="Qitu"
            />
        </ModalForm>
    );
}


export default UserCreateFrom;