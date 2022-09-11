import { Button, Table } from 'antd';
import * as React from 'react';
import { Component } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: "name"
    },
    {
        title: 'Surname',
        dataIndex: "surname"
    },
    {
        title: "Actions",
        render: () => {
            return (
                <>
                    <Button>Edit</Button>
                    <Button>Save</Button>
                </>
            )
        }
    }
]

export interface EditTableExState {
    data: any;
}

export default class EditTableEx extends Component<any, EditTableExState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        for(let i = 0; i < 6; i++) {

        }
    }

    render(): React.ReactNode {
        return (
            <>
                <Table columns={columns} dataSource={this.state.data}>

                </Table>
            </>
        );
    }
}