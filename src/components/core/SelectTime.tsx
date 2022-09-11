import { Col, Row, Select } from 'antd';
import * as React from 'react';

const { Option } = Select;

interface SelectTimeProps {
    timeHourStartValue?: string;
    timeMinuteStartValue?: string;
    timeHourEndValue?: string;
    timeMinuteEndValue?: string;
    timeDisabled?: boolean;
}

interface SelectTimeState {
    hours: object[];
    minutes: object[];
}

export default class SelectTime extends React.Component<SelectTimeProps, SelectTimeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state
        }
        this.setHours = this.setHours.bind(this);
        this.setMinutes = this.setMinutes.bind(this);
    }

    componentWillMount() {
        this.setHours();
        this.setMinutes();
    }

    setHours() {
        let hoursData: any = [];
        for (let i = 0; i <= 23; i++) {
            hoursData.push({
                key: i,
                title: i,
                value: i
            });
        }
        this.setState({ hours: hoursData });
    }

    setMinutes() {
        let minutesData: any = [];
        for (let i = 0; i <= 45; i += 15) {
            minutesData.push({
                key: i,
                title: i,
                value: i
            });
        }
        this.setState({ minutes: minutesData });
    }

    render(): React.ReactNode {
        return (
            <>
                <Row>
                    <p style={{ width: 60 }}>Start</p>{"          "}<p style={{ width: 60 }}>End</p>
                </Row>
                <Row>
                    <Select
                        placeholder="HH"
                        style={{ width: 60 }}
                        showArrow={false}
                        value={this.props.timeHourStartValue}
                    >
                        {this.state.hours.map((e: any) => (
                            <Option key={e.key}>{e.value}</Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="mm"
                        style={{ width: 60 }}
                        showArrow={false}
                        value={this.props.timeMinuteStartValue}
                    >
                        {this.state.minutes.map((e: any) => (
                            <Option key={e.key}>{e.value}</Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="HH"
                        style={{ width: 60, marginLeft: 30 }}
                        showArrow={false}
                        value={this.props.timeHourEndValue}
                    >
                        {this.state.hours.map((e: any) => (
                            <Option key={e.key}>{e.value}</Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="mm"
                        style={{ width: 60 }}
                        showArrow={false}
                        value={this.props.timeMinuteEndValue}
                    >
                        {this.state.minutes.map((e: any) => (
                            <Option key={e.key}>{e.value}</Option>
                        ))}
                    </Select>
                </Row>
            </>
        );
    }
}