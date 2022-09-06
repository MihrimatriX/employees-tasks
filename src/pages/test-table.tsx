import * as React from 'react';
import MaterialTable from 'material-table';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const columns: any = [
    { title: 'Adı', field: 'name' },
    { title: 'Soyadı', field: 'surname' },
    { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
    { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
];

const data = [{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }];

export default class Table extends React.Component {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {

        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc: any) => {
            console.log("doc: ", doc.data().name );
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <MaterialTable
                    columns={columns}
                    data={data}
                    title="Demo Title"
                />
            </>
        );
    }
}