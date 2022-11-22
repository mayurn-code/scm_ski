// @flow
import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

type BreadcrumbItems = {
    label: string,
    path: string,
    active?: boolean,
    goBack?: boolean

};

type PageTitleProps = {
    breadCrumbItems: Array<BreadcrumbItems>,
    title: string
};

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps): React$Element<any> => {
    const navigate = useNavigate()
    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            {props.breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        &nbsp; > &nbsp; {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    item.goBack ? <><button onClick={() => navigate(-1)}>{item.label}</button>
                                    </> :
                                        <NavLink key={index} to={item.path}>
                                            {index === 0 ? item.label : <>&nbsp; > &nbsp;  {item.label}</>}
                                        </NavLink>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h4 className="page-title">{props.title}</h4>
                </div>
            </Col>
        </Row>
    );
};

export default PageTitle;
