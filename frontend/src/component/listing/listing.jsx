import React from "react";
import Sidebar from "../../component/sidebar/sidebar";
import { Api } from "../../api/api";

export default class Listing extends React.Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = {
      modal: false,
      transactionOpen: {},
      filter: {},
      email: '',
      transactions: [],
    };
    this.matchCurrency = this.matchCurrency.bind(this);
  }

  matchCurrency(currency) {
    switch (currency) {
      case "EUR":
        return "€";
      case "USD":
        return "$";
      default:
        return currency;
    }
  }

  async toggleModal(code = {}) {
    const { modal } = this.state;
    if (!modal) {
      await this.setState({ email: '', emailError: false });
    }
    await this.setState({ modal: !modal, transactionOpen: code });
  }

  async sendEmail(id) {
    const { email } = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.toLowerCase())) {
      await this.setState({ emailError: true });
      return;
    }
    try {
      await this.api.sendRequest({
        uri: 'transactions/send-email',
        method: 'GET',
        qs: {
          id,
          email,
        },
      });
      /* eslint-disable */
      alert('Email sent');
    } catch (e) {
      await this.setState({ emailError: true });
    }
  }

  renderTransactions() {
    const { transactions = [] } = this.props;
    return transactions.map(t => {
      return (
        <tr key={t.id}>
          <td>{t.action}</td>
          <td>
            {t.amount} {this.matchCurrency(t.currencyCode)}
          </td>
          <td>{t.brandId}</td>
          <td>{t.card.holderName}</td>
          <td>
            <div className="detail" onClick={() => this.toggleModal(t)}>
              Details
            </div>
          </td>
          <td>
            <div className="detail">
              <a href={this.getPdfUrl(t)}>Download</a>
            </div>
          </td>
        </tr>
      );
    });
  }

  getPdfUrl(item) {
    return `${this.api.getUrl("transactions")}/${item.id}/pdf`;
  }

  renderModal() {
    const { modal } = this.state;
    if (!modal) return null;
    const item = this.state.transactionOpen;
    return (
      <>
        <div className="modal-content-container">
          <div className="modal-content__item">
            <div className="modal-content__item__title">
              <p>Action</p>
            </div>
            <div className="modal-content__item_text">
              <p>{item.action}</p>
              <p />
            </div>
          </div>
          <div className="modal-content__item">
            <div className="modal-content__item__title">
              <p>Amount</p>
            </div>
            <div className="modal-content__item_text">
              {item.amount} {this.matchCurrency(item.currencyCode)}
            </div>
          </div>
          <div className="modal-content__item">
            <div className="modal-content__item__title">
              <p>Brand ID</p>
            </div>
            <div className="modal-content__item_text">
              <p>{item.brandId}</p>
            </div>
          </div>
          <div className="modal-content__item">
            <div className="modal-content__item__title">
              <p>Email</p>
            </div>
            <div className="modal-content__item_text">
              <input type="email" value={this.state.email} onChange={e => this.setState({ emailError: false,  email: e.target.value })}/>
              <p style={{ color: 'red' }}>{this.state.emailError && 'Invalid email'}</p>
            </div>
          </div>
          <div className="modal-content-buttons">
            <div className="modal-content__button" onClick={e => this.sendEmail(item.id)}>
              <p>Send to email</p>
            </div>
            <div className="modal-content__button">
              <a href={this.getPdfUrl(item)}>
                <p>Download as pdf</p>
              </a>
            </div>
          </div>
        </div>
        <div className="modal-content-card">
          <div className="modal-content__item_title extra">
            <p>{item.card.holderName}</p>
          </div>
          <div className="modal-content__item_text">
            <p>{item.card.details.parsedNumber} ({item.card.details.type})</p>
          </div>
        </div>
      </>
    );
  }

  async updateFilter(filter, value) {
    const { state } = this;
    state.filter[filter] = value;
    await this.setState(state);
    await this.props.update(this.state.filter.currency, this.state.filter.action);
  }

  render() {
    const { modal } = this.state;
    return (
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <header>
            <p>{this.props.title || 'Transactions list'}</p>
          </header>
          {this.props.children}
          <div className="filters">
            <div className="filters__item">
              <p>Action:</p>
              <select onChange={e => this.updateFilter("action", e.target.value)}>
                <option value="">-</option>
                <option value="payment">payment</option>
                <option value="credit">credit</option>
              </select>
            </div>
            <div className="filters__item">
              <p>Currency:</p>
              <select onChange={e => this.updateFilter("currency", e.target.value)}>
                <option value="">-</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
          <div className="main-table">
            <table>
              <tbody>
                <tr>
                  <th>Action</th>
                  <th>Amount</th>
                  <th>brand Id</th>
                  <th>Card name</th>
                  <th />
                  <th />
                </tr>
                {this.renderTransactions()}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`modal ${modal && "active"}`}>
          <div className="modal-content">
            <div className="modal-content__close" onClick={() => this.toggleModal()}>
              <p>X</p>
            </div>
            {this.renderModal()}
          </div>
        </div>
      </div>
    );
  }
}
