// @flow
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// component
import CardTitle from '../../../../components/CardTitle';

type PerformersProps = {
    topPerformanceData: {
        id: number,
        name: string,
        position: string,
        leads: number,
        deals: number,
        tasks: number,
    }[],
};

const Performers = ({ thead, title, topPerformanceData }: PerformersProps): React$Element<any> => {
    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title={title}
                    menuItems={[{ label: 'Settings' }, { label: 'Action' }]}
                />

                <Table hover responsive striped size="sm" className="table-centered mb-0 table-nowrap">
                    <thead>
                        <tr>
                            {(thead || []).map((item, index) => {
                                return (
                                    <th>
                                        {item.title}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {(topPerformanceData || []).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <span className="text-muted font-13">{item.id}</span>
                                        <br/>
                                        <span className="text-muted font-13">{item.date}</span>
                                    </td>
                                    <td><h5 className="font-15 mb-1 fw-normal">{item.name}</h5>
                                        <span className="text-muted font-13">{item.type}</span></td>
                                    <td>
                                        <h5 className="font-15 mb-1 fw-normal">{item.status}</h5>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Performers;
