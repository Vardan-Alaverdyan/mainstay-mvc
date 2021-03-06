import React, {Component} from 'react';
import {getRoute, routes} from './routes';
import {Link} from 'react-router-dom';
import apiService from '../helpers/api-service';
import PropTypes from 'prop-types';

class LatestAttestationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            fee: 0
        };
    }

    componentDidMount() {
        this.fetchInfo();
    }

    fetchInfo = () => {
        apiService.axiosClient.get('/ctrl/latestattestationinfo')
            .then(({data}) => {
                let feeSum = 0;
                data.forEach((d, i) => {
                    if (i < data.length - 1) {
                        const feeDiff = data[i + 1].amount - d.amount;
                        // check for diffs larger than zero so that fee sum
                        // is not negative when there is a topup transaction
                        if (feeDiff > 0) {
                            feeSum += feeDiff;
                        }
                    }
                });

                this.setState({
                    data: data[0],
                    fee: feeSum / (data.length - 1)
                });
            });
    };

    render() {
        const {data, fee} = this.state;

        if (!data) {
            return (
                <>
                    <tr>
                        <td>
                            <div className="mb-3 flex-table">
                                <div className="d-flex justify-content-end header">
                                    <span className="lh1rem mr-auto">Block Hash</span>
                                    <span className="lh1rem text-right ml-1"></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </>
            );
        }
        const {blockhash, txid, time, amount} = data;
        const amountUsd = ((amount / 100000000) * this.props.priceBTC).toFixed(2);
        const feeUsd = ((fee / 100000000) * this.props.priceBTC).toFixed(2);

        return (
            <>
                <tr>
                    <th className="align-end">BTC Price</th>
                    <td colSpan="2">{this.props.priceBTC} $</td>
                </tr>
                <tr>
                    <th className="align-end">Block Hash</th>
                    <td colSpan="2">
                        <Link to={getRoute(routes.block, {value: blockhash})}>
                            <span className="hash truncate-hash">{blockhash}</span>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th className="align-end">Latest Txid</th>
                    <td colSpan="2">
                        <Link to={getRoute(routes.transation, {value: txid})}>
                            <span className="hash truncate-hash">{txid}</span>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th className="align-end">Time</th>
                    <td colSpan="2">{time}</td>
                </tr>
                <tr>
                    <th className="align-end">Staychain Balance</th>
                    <td colSpan="2">{amount / 100000000} BTC ({amountUsd} $)</td>
                </tr>
                <tr>
                    <th className="align-end">Average Fee</th>
                    <td colSpan="2">{(fee / 100000000).toFixed(8)} BTC ({feeUsd} $)</td>
                </tr>
            </>
        );
    }
}

LatestAttestationInfo.propTypes = {
    priceBTC: PropTypes.number
};

export default LatestAttestationInfo;
