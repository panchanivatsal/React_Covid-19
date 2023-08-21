import React, { useEffect, useState } from "react";

const Statewise = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const Covid = async () => {
        try {
            const res = await fetch('https://data.covid19india.org/data.json');
            const record = await res.json();
            setData(record.statewise);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        Covid();
    }, []);

    const filteredData = data.filter(val =>
        val.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main">
            <div className="container-fluid mt-5">
                <div className="main-heading">
                    <h1 className="mb-4">Statewise COVID-19 Data</h1>
                    <div className="input-group mb-3 ">
                    
                        <input
                            type="text"
                            className="form-control col-3"
                            placeholder="Search by state..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                          <span className="input-group-text">
                        <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="col-2">State</th>
                                <th className="col-2">Confirmed</th>
                                <th className="col-1">Recovered</th>
                                <th className="col-1">Deaths</th>
                                <th className="col-1">Active</th>
                                <th className="col-2">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((val, i) => {
                                const { confirmed, recovered, deaths, active, lastupdatedtime } = val;
                                return (
                                    <tr key={i}>
                                        <td className="cf">{val.state}</td>
                                        <td>{val.confirmed}</td>
                                        <td>{val.recovered}</td>
                                        <td className="red">{val.deaths}</td>
                                        <td className="green">{val.active}</td>
                                        <td>{val.lastupdatedtime}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Statewise;
