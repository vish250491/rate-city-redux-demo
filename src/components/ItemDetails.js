import React, {Component} from 'react';
import {Table, Thead, Th} from 'reactable';


export default class ItemDetails extends Component {
    constructor() {
        super();
    }

    extractData(data) {
        let list = data && data.items && data.items.map((item, i) => {
                return {
                    Id: item && item.id,
                    Name: item && item.name,
                    Slug: item && item.slug,
                    Company_Name: item && item.company && item.company.name,
                    Extra_Repayments: item && item.extra_repayments
                }
            });
        return list || []
    }

    render() {
        return (
            <div>
                <div>
                    <div className="alert alert-success">
                        <h1>Rate City Demo Test</h1>
                        <p>Click on the table header to get the element sorted</p>
                    </div>
                </div>
                {!this.props.obj.items &&
                <h1>Loading...</h1>}

                {this.props.obj && this.props.obj.items &&
                <div>
                    <strong>{(this.props.obj.isFetching) ? <h3>Loading . . . </h3> : 'Search below :'}</strong> <Table
                    className="table table-striped table-responsive" data={this.extractData(this.props.obj)}
                    sortable={true} filterable={['Id', 'Name','Slug','Extra_Repayments','Company_Name']}/>
                </div>
                }
            </div>
        )
    }
}