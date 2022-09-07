import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TimePicker } from "antd";

import { db } from '../config/firebase';

import dummyData from "../data/dummy.json";
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    date: number
) {
    return { name, calories, fat, carbs, protein, date };
}

const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, new Date().getDate()),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, new Date().getDate()),
    createData('Eclair', 262, 16.0, 24, 6.0, new Date().getDate()),
    createData('Cupcake', 305, 3.7, 67, 4.3, new Date().getDate()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, new Date().getDate()),
];

interface CoreTableProps {
    docId: string;
}

interface CoreTableState {
    nameTitle?: string;
    load: boolean;
}

export default class CoreTable extends React.Component<CoreTableProps, CoreTableState> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount = () => {
        console.log("Tamamen Render..");
        const userDoc = doc(db, 'users', this.props.docId);
        getDoc(userDoc).then((user: any) => {
            // user.data().name;
            // user.data().passwd;
            console.log(user.data().name, " - ", user.data().passwd);
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div style={{}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "gray" }}>
                                    <TableCell align="center"> KISI</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> GUN</TableCell>
                                    <TableCell align="center"> TOTAL</TableCell>
                                    <TableCell align="center"> EDIT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dummyData.hafta1.employees.map((data) => (
                                    <TableRow key={data.kullaniciAd} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{data.kullaniciAd}</TableCell>
                                        {data.workDays.forEach((val: any) => {
                                            val.map((obj: any) => {
                                                <TableCell align="center">
                                                <TimePicker.RangePicker
                                                    value={[moment(obj.monday.workHours.start, "HH.mm"), moment(data.workDays[0].monday?.workHours.end, "HH:mm")]}
                                                    size='small'
                                                    showSecond={false}
                                                    minuteStep={15}
                                                />
                                            </TableCell>
                                            })
                                        })}
                                        <TableCell align="right">{data.weekTotal}</TableCell>
                                        <TableCell align="right">ACTION</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        );
    }
}