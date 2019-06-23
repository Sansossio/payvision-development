import React from "react";
import { Api } from "../../api/api";
import Listing from '../../component/listing/listing';

export default class Table extends React.Component {
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
  }

  async loadTransactions(currency, action) {
    await this.setState({ transactions: [] });
    const transactions = await this.api.sendRequest({
      uri: "transactions",
      method: "GET",
      qs: {
        currency: currency || this.state.filter.currency || undefined,
        action: action || this.state.filter.action || undefined,
      },
    });
    await this.setState({ transactions });
  }

  componentDidMount() {
    this.loadTransactions();
  }

  render() {
    return (
      <Listing transactions={this.state.transactions} update={(currency, action) => this.loadTransactions(currency, action)} />
    );
  }
}
