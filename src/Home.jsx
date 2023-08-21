import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [record, setRecord] = useState(data);
    // Corrected destructuring assignment
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setData(res.data)
                setRecord(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    const Filter = (event) => {
        setRecord(data.filter(f => f.name.toLowerCase().includes(event.target.value)))
    }
    return (
        <div className='p-5 bg-light'>
            <div className=' '>
                <input type="text" className='form-control' onChange={Filter} />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
