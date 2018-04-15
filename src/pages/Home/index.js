import React, { PureComponent } from 'react';
import moment from 'moment';
import { CircularProgress } from 'material-ui';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

import { fetchLoans } from '../../api';
import './styles.css';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getLoans();
  }

  getLoans = async () => {
    const response = await fetchLoans();
    const loans = await response.json();

    this.setState({
      loans,
      isLoading: false
    });
  };

  render() {
    const { isLoading, loans } = this.state;

    if (isLoading) {
      return (
        <div className="fullContainer">
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Loan Term</TableCell>
            <TableCell>Loan Repayment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.length === 0 && (
            <TableRow>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No data found
              </td>
            </TableRow>
          )}
          {loans.length > 0 &&
            loans.map((loan, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {moment(loan.datetime).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>{loan.amount} SGD</TableCell>
                  <TableCell>{loan.loanTerm} Week(s)</TableCell>
                  <TableCell>{loan.loanRepayment} SGD</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }
}

export default HomePage;
