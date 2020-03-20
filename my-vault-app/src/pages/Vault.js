import React from 'react';
import './page.css';
import Sidebar from '../components/Sidebar';

export default class Vault extends React.Component {
   
  constructor() {
    super();
  }

  componentDidMount() {
    fetch("https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&range=1m&last=5&token=Tsk_1dc9a50b774c48a1935d075b55a7feeb")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            stock: result.AAPL
          });
          console.log(this.state.stock);
        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
    render() {
      return (
        <div className="main-container">
            <h2>My Transactions</h2>
            <div className="transactions">
                <div className="transaction revenue">
                    <i className="far fa-trash-alt"></i>
                    <span className="tr-date">06/05/2020</span>
                    <span className="tr-message">Tax Returns</span>
                    <span className="tr-amount">$35</span>
                </div>
                <div className="transaction expense">
                    <span className="tr-date">03/05/2020</span>
                    <span className="tr-message">Apple Store</span>
                    <span className="tr-amount">$899</span>
                </div>
                <div className="transaction expense">
                    <span className="tr-date">03/05/2020</span>
                    <span className="tr-message">Mc Donald's</span>
                    <span className="tr-amount">$12</span>
                </div>
                <div className="transaction deleted">
                    <span className="tr-date">03/05/2020</span>
                    <span className="tr-message">Cash Withdrawal</span>
                    <span className="tr-amount">$30</span>
                </div>
            </div>
            <button>+ Transaction</button>
            <button>+ Transaction</button>
            <Sidebar />
            <h2>My Events</h2>
            <h2>Analytics</h2>
        </div>
        
      );
    }
  }