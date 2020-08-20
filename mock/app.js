const Koa = require('koa2');
const path = require('path');
const chalk = require('chalk');
const koaStatic = require('koa-static');
const fs = require('fs');
const getGoodsList = require('./goodsList');
const app = new Koa();
app.use(koaStatic(path.resolve(__dirname, './static')));
// 处理favicon
// app.use(favicon);
// 获取请求的参数
app.use(query);

app.use(async(ctx, next) => {
  const origin = ctx.headers.origin;
  console.log(origin);
  if (origin) {
    ctx.set('Access-Control-Allow-Origin', '*');
  }
  await next();
});

app.use(userInfo);
app.use(userContext);
app.use(navList);
app.use(goodsList);

app.listen(3001, function() {
  console.log(chalk.green('server start at localhost:3001'));
});

async function favicon(ctx, next) {
  const url = ctx.request.path;
  if (url !== '/favicon.ico') return next();
  try {
    const file = await fs.readFileSync(path.resolve('public/favicon.ico'));
    ctx.body = file;
  } catch(err) {
    ctx.status = 404;
    return ctx.body = '';
  }
}

// 获取请求的参数
function queryPromise(request) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      const buf = Buffer.concat(chunks);
      return resolve(JSON.parse(buf.toString()));
    });

    request.on('error', (err) => {
      return reject(err);
    });
  });
}

async function query(ctx, next) {
  const { method } = ctx.request;
  if (method === 'GET') {
    ctx.req.body = ctx.request.query;
  } else if (method === 'POST') {
    ctx.req.body = await queryPromise(ctx.req);
  }
  return next();
}

async function userInfo(ctx, next) {
  const url = ctx.request.path;
  if (url !== '/home/user_info') return next();
  const body = { 
    code: 0,
    data: {
      name: 'shenxuxiang',
      sex: 'man',
      age: 20,
      id: Math.random().toString().slice(2),
    },
  };
  ctx.body = JSON.stringify(body);
  await next();
}

async function userContext(ctx, next) {
  const url = ctx.request.path;
  if (url !== '/home/user_context') return next();
  const body = {
    data: {
      text: '还是倒海翻江虎岛和夫收到回复收到付款计划康师傅就会收到付款好看会分开的时候付款计划',
    }
  };
  ctx.body = JSON.stringify(body);
}

// 获取 nav 列表
async function navList(ctx, next) {
  const url = ctx.request.path;
  if (url !== '/goods/nav_list') return next();
  ctx.body = {
    code: 0,
    data: {
      items: [
        {
          label: '全部',
          value: '0',
        },
        {
          label: '精选',
          value: '1',
        },
        {
          label: '良品铺子',
          value: '2',
        },
        {
          label: '乳饮酒水',
          value: '3',
        },
        {
          label: '粮油米面',
          value: '4',
        },
        {
          label: '纸品家清',
          value: '5',
        },
        {
          label: '休闲食品',
          value: '6',
        },
        {
          label: '时令生鲜',
          value: '7',
        },
        {
          label: '美容个理',
          value: '8',
        },
      ],
    },
  };
}

// 获取商品列表
async function goodsList(ctx, next) {
  const url = ctx.request.path;
  if (url !== '/goods/goods_list') return next();
  try {
    const { offset, items } = await getGoodsList(ctx.req.body.offset);
    ctx.body = {
      code: 0,
      data: {
        items,
        offset,
      },
    };
  } catch (err) {
    ctx.status = 405;
    ctx.body = '';
  }
}





