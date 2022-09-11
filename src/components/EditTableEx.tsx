import { Form, Popconfirm, Table, TimePicker, Typography } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import SelectTime from './core/SelectTime';
import "./styles.css";

interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 3; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });

}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: Item;
    index: number;
    children: React.ReactNode;
}

interface EditTableExProps extends React.HTMLAttributes<HTMLElement> {
    styleProp: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    let inputNode = <TimePicker.RangePicker
        showSecond={false}
        placeholder={["S", "E"]}
        value={[moment(new Date(), "HH:mm"), moment(new Date(), "HH:mm")]}
        suffixIcon={false}
        minuteStep={15}
    />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditTableEx: React.FC<EditTableExProps> = ({styleProp, ...restProps}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', workDays: [], ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'WeekTotal',
            dataIndex: 'age'
            /**** ANLIK DEĞİŞİMLE RENDER ET ****/
        },
        {
            title: 'Sunday',
            dataIndex: 'sunday',
            editable: true,
            render: () => (
                <>
                    <TimePicker.RangePicker
                        showSecond={false}
                        placeholder={["S", "E"]}
                        suffixIcon={false}
                        minuteStep={15} />
                </>
            )
        },
        {
            title: 'Sunday',
            dataIndex: 'sunday',
            editable: true,
            render: () => (
                <>
                    <SelectTime timeHourStartValue='5' timeHourEndValue='8'></SelectTime>
                </>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure To Cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                style={styleProp}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
    );
};

export default EditTableEx;