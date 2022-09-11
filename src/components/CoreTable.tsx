import * as React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Button, TimePicker } from "antd";
import { Table } from "antd";
import { ColumnsType } from 'antd/lib/table';

interface CoreTableProps { }

interface CoreTableState {
    columns: any;
    data: any;

    dateMonday: string;
    mondayHours: any;

    eployeeRow: EmployeeRow[];
}

interface EmployeeRow {
    key: string
    personName: string;
    day: string;
    dayDate: string;
    workHours: {
        start: string,
        end: string,
        totalHour: number
    }
}

interface DataType {
    key: string
    day: string;
    dayDate: string;
    workHours: {
        start: string,
        end: string,
        totalHour: number
    }
}

export default class CoreTable extends React.Component<CoreTableProps, CoreTableState> {
    constructor(props: any) {
        super(props);
        this.state = {
            columns: undefined,
            data: undefined,
            dateMonday: "",
            mondayHours: [],
            eployeeRow: []
        };
        this.createDataGrid = this.createDataGrid.bind(this);
    }

    componentDidMount() {
        this.createDataGrid();
        const userDoc = doc(db, 'schedule', "week1");
        getDoc(userDoc).then((user: any) => {
            console.log(user.data());//user.data().name, " - ", user.data().passwd);
        });
    }

    createDataGrid() {
        let columns: ColumnsType<DataType> = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Monday',
                dataIndex: 'Monday',
                key: 'Monday',
                render: (data: any) => (
                    <>
                        <TimePicker.RangePicker
                            showSecond={false}
                            style={{ width: "auto" }}
                            placeholder={["S", "E"]}
                            minuteStep={15}
                            suffixIcon={false}
                            separator={'-'}
                            onChange={this.handleTimePicker}
                            value={data}
                        />
                    </>
                )
            },
            {
                title: 'WEEKLY TOTAL',
                dataIndex: 'WEEKLY TOTAL',
                key: 'WEEKLY TOTAL',
            },
            {
                title: 'Action',
                key: 'action',
                render: () => (
                    <>
                        <Button
                            onClick={() => {
                                console.log(this.state);
                            }}
                        >Save</Button>
                    </>
                )
            },
        ];

        const data: DataType[] = [
            {
                "key": "monday",
                "day": "monday",
                "dayDate": "10.10.1000",
                "workHours": {
                    "start": "00.00",
                    "end": "02.00",
                    "totalHour": 8
                }
            }
        ];

        this.setState({
            columns: columns,
            data: data
        })
    }

    handleTimePicker = (values: any) => {
        console.log("E Budur: ", values);
        this.setState({
            mondayHours: values
        });
    }

    render() {
        return (
            <>
                <div style={{ padding: "50px" }}>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        bordered={true}
                        pagination={false}
                    />
                </div>
            </>
        );
    }
}