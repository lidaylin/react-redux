import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva(
  { history: browserHistory },
);


window.apps = app;

app.use(createLoading());

// 2. Model
app.model(require('./models/frame'));
app.model(require('./models/score/recharge'));
app.model(require('./models/score/use'));
app.model(require('./models/score/withdraw'));
app.model(require('./models/score/publish'));

app.model(require('./models/report/income'));
app.model(require('./models/report/cost'));
app.model(require('./models/report/wechat'));
app.model(require('./models/report/manpan'));

app.model(require('./models/money/expend/audit'));
app.model(require('./models/money/expend/auditRe'));
app.model(require('./models/money/expend/search'));
app.model(require('./models/money/expend/confirm'));
app.model(require('./models/money/income/confirm'));
app.model(require('./models/money/income/search'));
app.model(require('./models/money/voucher/search'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#app');
