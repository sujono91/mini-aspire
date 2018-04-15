import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SendIcon from 'material-ui-icons/Send';
import { Button, Tooltip, Paper, Snackbar } from 'material-ui';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import { addLoan } from '../../api';
import { withStyles } from 'material-ui/styles';
import '../../App.css';
import './styles.css';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const errorLabel = 'This field is required';
const approvedLabel = 'Your application is approved';
const newLoanLabel = 'Successfully create a new loan';

class LoanPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      loanTerm: 1,
      loanRepayment: 1,
      isSubmit: false,
      error: '',
      success: false,
      isApproved: false
    };
  }

  handleChangeAmount = event => {
    const { value: amount } = event.target;
    this.setState({
      amount
    });
  };

  handleChangeLoanTerm = event => {
    const { value: loanTerm } = event.target;
    this.setState({
      loanTerm
    });
  };

  handleChangeLoanRepayment = event => {
    const { value: loanRepayment } = event.target;
    this.setState({
      loanRepayment
    });
  };

  requestAddLoan = async () => {
    const { amount, loanTerm, loanRepayment } = this.state;
    const { history } = this.props;

    const response = await addLoan({
      amount: parseInt(amount, 10),
      loanTerm: parseInt(loanTerm, 10),
      loanRepayment: parseInt(loanRepayment, 10),
      userId: JSON.parse(localStorage.getItem('user')).id,
      datetime: new Date().getTime()
    });

    if (response.status !== 201) {
      return this.setState({
        error: 'Failed to add new loan'
      });
    }

    this.setState(
      {
        success: true,
        isSubmit: false,
        isApproved: false,
        amount: 1,
        loanTerm: 1,
        loanRepayment: 1
      },
      () => history.push('/home')
    );
  };

  approveLoan = () => {
    this.setState({
      isApproved: true,
      success: true
    });
  };

  handleSubmit = () => {
    this.setState({
      isSubmit: true
    });

    const { amount, loanTerm, loanRepayment } = this.state;

    if (!amount || !loanTerm || !loanRepayment) {
      return;
    }

    this.approveLoan();
  };

  handleCloseSnackBar = () => {
    this.setState({
      success: false
    });
  };

  render() {
    const {
      isSubmit,
      amount,
      loanTerm,
      loanRepayment,
      error,
      success,
      isApproved
    } = this.state;

    const { classes } = this.props;

    return (
      <div className="container">
        {!success &&
          !isApproved && (
            <Paper className="paper" elevation={1}>
              <br />
              <div className="textField">
                <FormControl
                  error={isSubmit && !amount}
                  aria-describedby="amount-text">
                  <InputLabel htmlFor="amount">Amount (SGD)</InputLabel>
                  <Input
                    min="1"
                    step="1"
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={this.handleChangeAmount}
                    className="inputText"
                  />
                  {isSubmit &&
                    !amount && (
                      <FormHelperText id="amount-text">
                        {errorLabel}
                      </FormHelperText>
                    )}
                </FormControl>
              </div>
              <div className="textField">
                <FormControl
                  error={isSubmit && !loanTerm}
                  aria-describedby="loan-term-text">
                  <InputLabel htmlFor="loan-term">
                    Loan Term (Week(s))
                  </InputLabel>
                  <Input
                    min="1"
                    step="1"
                    type="number"
                    id="loan-term"
                    value={loanTerm}
                    onChange={this.handleChangeLoanTerm}
                    className="inputText"
                  />
                  {isSubmit &&
                    !loanTerm && (
                      <FormHelperText id="loan-term-text">
                        {errorLabel}
                      </FormHelperText>
                    )}
                </FormControl>
              </div>
              <span className={`error ${error ? 'visible' : 'hidden'}`}>
                {error}
              </span>
            </Paper>
          )}
        {isApproved && (
          <Paper className="paperShort" elevation={1}>
            <br />
            <div className="textField">
              <FormControl
                error={isSubmit && !loanRepayment}
                aria-describedby="loan-repayment-text">
                <InputLabel htmlFor="loan-repayment">
                  Loan Repayment (SGD)
                </InputLabel>
                <Input
                  min="1"
                  step="1"
                  type="number"
                  id="amount"
                  value={loanRepayment}
                  onChange={this.handleChangeLoanRepayment}
                  className="inputText"
                />
                {isSubmit &&
                  !loanRepayment && (
                    <FormHelperText id="loan-repayment-text">
                      {errorLabel}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
            <span className={`error ${error ? 'visible' : 'hidden'}`}>
              {error}
            </span>
          </Paper>
        )}
        <Tooltip title="Submit">
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={isApproved ? this.requestAddLoan : this.handleSubmit}>
            <SendIcon />
          </Button>
        </Tooltip>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={success}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackBar}
          message={<span>{isApproved ? approvedLabel : newLoanLabel}</span>}
        />
      </div>
    );
  }
}

LoanPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoanPage);
