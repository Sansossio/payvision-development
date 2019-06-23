import React from "react";
import Listing from "../../component/listing/listing";
import { Api } from "../../api/api";

export default class Resume extends React.Component {
  constructor() {
    super();
    this.state = {
      report: {},
      filter: {}
    };
    this.api = new Api();
  }

  async loadTransactions(currency, action) {
    await this.setState({ report: {} });
    const report = await this.api.sendRequest({
      uri: "report",
      method: "GET",
      qs: {
        currency: currency || this.state.filter.currency || undefined,
        action: action || this.state.filter.action || undefined
      }
    });
    await this.setState({ report, filter: { currency, action } });
  }

  getReportPdfUrl() {
    const {
      report,
      filter: {
        currency,
        action,
      },
    } = this.state;
    if (!report.transactions || !report.transactions.length) {
      return '#';
    }
    let url = `${this.api.getUrl('report')}/pdf?`
    if (currency) {
      url += `&currency=${currency}`;
    }
    if (action) {
      url += `&action=${action}`;
    }
    return url;
  }

  componentDidMount() {
    this.loadTransactions();
  }

  render() {
    const { report } = this.state;
    return (
      <Listing
        transactions={this.state.report.transactions || []}
        update={(currency, action) => this.loadTransactions(currency, action)}
        title='Resume'
      >
        <div className="card-container">
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Total transactions</p>
            </div>
            <div className="card-container-item__text">
              <p>{report.totalTransactions}</p>
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Total cards</p>
            </div>
            <div className="card-container-item__text">
              <p>{report.totalCards}</p>
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Currencies</p>
            </div>
            <div className="card-container-item__text">
              <p>{(report.currencies || []).join(", ")}</p>
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Total by currencies</p>
            </div>
            <div className="card-container-item__text">
              {(report.totalByCurrencies || []).map(v => (
                <p key={v.currency}>
                  {v.currency}: {v.total}
                </p>
              ))}
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Total by action</p>
            </div>
            <div className="card-container-item__text">
              {(report.totalByActions || []).map(v => (
                <p key={`${v.action}-totaltransactions`}>
                  <b>{v.action}</b>: {v.transactions} transactions (
                  {v.amounts.map(am => `${am.currency}: ${am.total}`).join(' ')}
                  )
                </p>
              ))}
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Total sum (all amounts converted to unique currency)</p>
            </div>
            <div className="card-container-item__text">
              {(report.sumTotal || []).map(v => (
                <p key={`${v.currency}-totalsum`}>
                  {v.currency}: {v.total.toFixed(2)}
                </p>
              ))}
            </div>
          </div>
          <div className="card-container-item">
            <div className="card-container-item__title">
              <p>Pdf</p>
            </div>
            <div className="card-container-item__text">
              <a href={this.getReportPdfUrl()}>Download</a>
            </div>
          </div>
        </div>
      </Listing>
    );
  }
}
