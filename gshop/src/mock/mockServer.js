import Mock from 'mockjs'
import data from './data'

// 暴露接口: /goods
Mock.mock('/goods', {code: 0, data: data.goods});

// 暴露接口: /ratings
Mock.mock('/ratings', {code: 0, data: data.ratings});

// 暴露接口: /info
Mock.mock('/info', {code: 0, data: data.info});

console.log('执行了mockServer');
