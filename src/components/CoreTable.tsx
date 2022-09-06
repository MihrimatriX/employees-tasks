import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

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

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, new Date().getDate()),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, new Date().getDate()),
    createData('Eclair', 262, 16.0, 24, 6.0, new Date().getDate()),
    createData('Cupcake', 305, 3.7, 67, 4.3, new Date().getDate()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, new Date().getDate()),
];

export interface CoreTableProps {
    nameTitle: string;
}

export interface CoreTableState {
    nameTitle: string;
}

export default class CoreTable extends React.Component<CoreTableProps, CoreTableState> {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc: any) => {
            console.log("doc: ", doc.data().name);
            this.setState({
                nameTitle: doc.data().name
            });
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{backgroundColor: "gray"}}>
                                <TableCell>{this.state.nameTitle}</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>GUN</TableCell>
                                <TableCell>Toplam</TableCell>
                                <TableCell>Duzenle</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">Toplam</TableCell>
                                    <TableCell align="right">Toplam</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}