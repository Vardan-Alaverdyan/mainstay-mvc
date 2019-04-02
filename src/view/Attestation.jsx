import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import PageSpinner from './PageSpinner'

class Attestation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            isReady: false,
        };
    }

    componentDidMount() {
        this.fetchPage(1)
    }

    handlePageChange = (pageNumber) => {
        this.fetchPage(pageNumber);
    };

    fetchPage = (page) => {
        const failedArg = this.props.match.params?.value === 'showFailed' ? '&failed=true' : '';

        Axios.get(`/ctrl/latestattestation?page=${page}${failedArg}`)
            .then(({ data }) => {
                if (data?.data) {
                    this.setState({
                        data: data.data,
                        activePage: page,
                        totalItemsCount: data.total,
                        isReady: true,
                    });
                }
                this.setState({ isReady: true, activePage: page });
            });
    };

    render() {
        const { data, isReady, activePage } = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `The ${activePage} for the attestation list does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        return (
            <PageSpinner delay={100}>
            <div className="column lastAttestationPage">
                <div className="d-flex align-items-center">
                    <span className="block-title">Attestations</span>
                </div>
                <div className="mb-3 flex-table latestAttestation">
                    <table width="100%">
                        <thead>
                        <tr className="mr-auto">
                            <th>Txid</th>
                            <th>MerkleRoot</th>
                            <th>Confirmed</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(({ txid, merkle_root, confirmed, age }) =>
                            <tr key={txid}>
                                <td>
                                    <a
                                        className="hash truncate-hash keyboard-target"
                                        href={`/tx/${txid}`}
                                        title={txid}
                                    >
                                        {txid}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        className="hash truncate-hash keyboard-target"
                                        href={`/merkle_root/${merkle_root}`}
                                        title={merkle_root}
                                    >
                                        {merkle_root}
                                    </a>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{`${!!confirmed}`}</span>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{age}</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
            </PageSpinner>
        );
    }
}

export default Attestation;