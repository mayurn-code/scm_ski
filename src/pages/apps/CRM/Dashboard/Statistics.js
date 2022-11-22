// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import StatisticsChartWidget from '../../../../components/StatisticsChartWidget';

const Statistics = ({ staticsData }): React$Element<React$FragmentType> => {
    return (
        <>
            <Row>
                {staticsData.map((item, index) => (
                    <Col md={6} xl={3}>
                        <StatisticsChartWidget
                            description={item.description}
                            title={item.title}
                            stats={item.stats}
                            icon={item.icon}
                            itemData={item.itemData}
                            // trend={{
                            //     textClass: 'text-success',
                            //     icon: 'mdi mdi-arrow-up-bold',
                            //     value: '3.27%',
                            // }}
                            colors={index % 2 === 0 ? ['#727cf5'] : ['#0acf97']}
                            data={item.data} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Statistics;
