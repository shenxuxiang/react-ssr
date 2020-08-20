const path = require('path');
const img1 = '//localhost:3001/images/11.jpg';
const img2 = '//localhost:3001/images/12.jpg';
const img3 = '//localhost:3001/images/13.jpg';
const img4 = '//localhost:3001/images/14.jpg';
const img5 = '//localhost:3001/images/15.jpg';
const img6 = '//localhost:3001/images/16.png';
const img7 = '//localhost:3001/images/17.jpg';
const img8 = '//localhost:3001/images/18.jpg';
const img9 = '//localhost:3001/images/19.jpg';
const img0 = '//localhost:3001/images/20.jpg';

function getGoodsList(offset) {
  return new Promise((resolve, reject) => {
    if (typeof offset === 'undefined') return reject();
    const limit = 10;
    const len = Math.ceil(goodsList.length / limit);
    if (offset < len) {
      return resolve({
        offset: offset + 1,
        items: goodsList.slice((offset || 0) * limit, (offset + 1) * limit),
      });
    } else if (offset === len) {
      return resolve({
        offset: '',
        items: goodsList.slice((offset || 0) * limit, (offset + 1) * limit),
      });
    } else {
      return resolve({
        offset: '',
        items: [],
      })
    }
  });
}

const goodsList = [
  {
    url: img1,
    price: 9990,
    name: '接口测试-测试商品',
    goods_id: '11',
  },
  {
    url: img2,
    price: 8999,
    name: '新人专区测试无库存的情况是什么本基金覅解',
    goods_id: '22',
  },
  {
    url: img3,
    price: 1990,
    name: '【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加',
    goods_id: '33',
  },
  {
    url: img4,
    price: 3789,
    name: '售罄测试1勿动',
    goods_id: '44',
  },
  {
    url: img5,
    price: 21123,
    name: '限量1000件，抢完恢复39.9】【加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '55',
  },
  {
    url: img0,
    price: 2113,
    name: '【厚款薄款可选】男士纯棉加绒针织衫2017秋冬季新款韩版',
    goods_id: '66',
  },
  {
    url: img7,
    price: 9980,
    name: '冬季上新，品质男装】秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: '77',
  },
  {
    url: img8,
    price: 8875,
    name: '【不限年龄的百搭潮款红火新年】加绒套头卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: '88',
  },
  {
    url: img9,
    price: 2113,
    name: '【不起球，不褪色】加绒保暖冬季毛衣男装加厚男款v领打底衫青年套头男士长袖T恤青少年薄款学',
    goods_id: '100',
  },
  {
    url: img7,
    price: 1332,
    name: '【【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: '111',
  },
  {
    url: img3,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '112',
  },
  {
    url: img0,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '113',
  },
  {
    url: img7,
    price: 9980,
    name: '秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: '114',
  },
  {
    url: img8,
    price: 8875,
    name: '卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: '115',
  },
  {
    url: img9,
    price: 12111,
    name: '男士长袖T恤青少年薄款学',
    goods_id: '116',
  },
  {
    url: img1,
    price: 1332,
    name: '哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: '117',
  },
  {
    url: img3,
    price: 32322,
    name: '【加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '118',
  },
  {
    url: img0,
    price: 33332,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '119',
  },
  {
    url: img8,
    price: 8875,
    name: '【不限年龄的百搭潮款红火新年】加绒套头卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: '232323',
  },
  {
    url: img6,
    price: 2113,
    name: '【不起球，不褪色】加绒保暖冬季毛衣男装加厚男款v领打底衫青年套头男士长袖T恤青少年薄款学',
    goods_id: '2323',
  },
  {
    url: img7,
    price: 1332,
    name: '【【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: '34534',
  },
  {
    url: img3,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '23423423',
  },
  {
    url: img4,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '343435345',
  },
  {
    url: img7,
    price: 9980,
    name: '秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: '1232424',
  },
  {
    url: img4,
    price: 545456,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: '112334',
  },
  {
    url: img9,
    price: 43434,
    name: '秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: '32323',
  },
  {
    url: img8,
    price: 3434223,
    name: '卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: '3434545',
  },
  {
    url: img3,
    price: 1990,
    name: '【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加',
    goods_id: 'dfdfe',
  },
  {
    url: img4,
    price: 3789,
    name: '售罄测试1勿动',
    goods_id: 'eff23',
  },
  {
    url: img5,
    price: 21123,
    name: '限量1000件，抢完恢复39.9】【加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'fewf',
  },
  {
    url: img0,
    price: 2113,
    name: '【厚款薄款可选】男士纯棉加绒针织衫2017秋冬季新款韩版',
    goods_id: 'grgerg3',
  },
  {
    url: img7,
    price: 9980,
    name: '冬季上新，品质男装】秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: 'efewfe2f',
  },
  {
    url: img8,
    price: 8875,
    name: '【不限年龄的百搭潮款红火新年】加绒套头卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: 'fewfewfewfewfwefewff',
  },
  {
    url: img9,
    price: 2113,
    name: '【不起球，不褪色】加绒保暖冬季毛衣男装加厚男款v领打底衫青年套头男士长袖T恤青少年薄款学',
    goods_id: 'fewfewfewwww',
  },
  {
    url: img7,
    price: 1332,
    name: '【【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: 'fewfewf',
  },
  {
    url: img3,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'wefewfgbhh',
  },
  {
    url: img0,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'mnnrt',
  },
  {
    url: img7,
    price: 9980,
    name: '秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: 'qweqwrgn',
  },
  {
    url: img8,
    price: 8875,
    name: '卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: 'hbnrth',
  },
  {
    url: img9,
    price: 12111,
    name: '男士长袖T恤青少年薄款学',
    goods_id: 'fgwfgteh34',
  },
  {
    url: img1,
    price: 1332,
    name: '哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: 'egerg',
  },
  {
    url: img3,
    price: 32322,
    name: '【加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'egerhrthrth',
  },
  {
    url: img0,
    price: 33332,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'ewgwfgw34',
  },
  {
    url: img8,
    price: 8875,
    name: '【不限年龄的百搭潮款红火新年】加绒套头卫衣冬季新款青少年学生韩版潮流修身连帽外套男士',
    goods_id: 'gergergerg',
  },
  {
    url: img6,
    price: 2113,
    name: '【不起球，不褪色】加绒保暖冬季毛衣男装加厚男款v领打底衫青年套头男士长袖T恤青少年薄款学',
    goods_id: 'regerhy',
  },
  {
    url: img7,
    price: 1332,
    name: '【【PU皮裤+不裂皮+加绒加厚+防水防风】哈伦皮裤女秋冬2017新款加绒加厚羊',
    goods_id: 'rthhjtyjuyjk',
  },
  {
    url: img3,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'eghtyh',
  },
  {
    url: img4,
    price: 32322,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'rhth3t345',
  },
  {
    url: img7,
    price: 9980,
    name: '秋冬男装长袖高领渐变套头毛衣潮青少年韩版修身男',
    goods_id: '1232gegergrb424',
  },
  {
    url: img4,
    price: 545456,
    name: '加绒加厚】2017新款冬季高腰黑色加绒加',
    goods_id: 'rrgrg',
  },
];

module.exports = getGoodsList;
