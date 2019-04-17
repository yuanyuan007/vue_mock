import Mock from 'mockjs';
const Random = Mock.Random;
const domain = 'http://mockjs.com/api'
const code = 200;
const postData = req => {

  let posts = '删除成功' // 用于存放文章数据的数组

  return {
    posts,
    code
  };
}

export default Mock.mock(`${domain}/content`, 'post', postData);
