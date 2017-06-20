import React from 'react';
import {
  Router,
  Route,
  // IndexRoute,
  IndexRedirect,
} from 'dva/router';
import frame from './routes/frame';
import use from './routes/score/use';
import recharge from './routes/score/recharge';
import withdraw from './routes/score/withdraw';
import publish from './routes/score/publish';
import income from './routes/report/income';
import cost from './routes/report/cost';
import account from './routes/report/account';
import confirm from './routes/money/income/confirm';
import search from './routes/money/income/search';
import auditHandle from './routes/money/expend/audit';
import auditReview from './routes/money/expend/auditRe';
import auditSearch from './routes/money/expend/search';
import expendConfirm from './routes/money/expend/confirm';
import voucherSearch from './routes/money/voucher/search';

export default function ({ history }) { // eslint-disable-line
  return (<Router history={history}>
    <Route path="/" component={frame}>
      <IndexRedirect to="/score/use" />
      <Route path="score">
        <Route path="use" component={use} />
        <Route path="recharge" component={recharge} />
        <Route path="withdraw" component={withdraw} />
        <Route path="publish" component={publish} />
      </Route>
      <Route path="report">
        <Route path="income" component={income} />
        <Route path="cost" component={cost} />
        <Route path="account" component={account} />
      </Route>
      <Route path="money">
        <Route path="income">
          <Route path="confirm" component={confirm} />
          <Route path="search" component={search} />
        </Route>
        <Route path="expend">
          <Route path="handle" component={auditHandle} />
          <Route path="review" component={auditReview} />
          <Route path="search" component={auditSearch} />
          <Route path="confirm" component={expendConfirm} />
        </Route>
        <Route path="voucher">
          <Route path="search" component={voucherSearch} />
        </Route>
      </Route>
    </Route>
  </Router>);
}
