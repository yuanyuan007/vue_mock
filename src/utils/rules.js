// 需求  常规匹配
export function checkUsername(rule, value, callback) {
  let reg = /^[a-zA-Z0-9-\.&#?、@!^%+=*&$_/\u4e00-\u9fa5\s]{1,30}$/; //匹配所有非特殊字符，且长度在0和30之间;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可输入非法字符'));
    }
  }, 100);
}
// 只能输入汉字或数字
export function checkNumberAndChinese(rule, value, callback) {
  let reg = /^[0-9-\u4e00-\u9fa5\s]{1,20}$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('只能输入1-20位汉字或数字'));
    }
  }, 100);
}
// 文件夹匹配
export function checkFolder(rule, value, callback) {
  let reg = /^[^\^/:*?"<>|]+$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可输入 /:*?"<>|'));
    }
  }, 100);
}

export function checkPhone(rule, value, callback) {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
  if(!value) {
    // return callback(new Error('电话号码不能为空'));
    callback();
  }
  setTimeout(() => {
    if(!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'));
    } else {
      if(phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error('电话号码格式不正确'));
      }
    }
  }, 100);
}

export function checkWorkNumber(rule, value, callback) {
  let reg = /^[A-Za-z0-9]+$/;
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('工号格式不正确'));
    }
  }, 100);
}
// 匹配所有特殊字符
export function checkSpecial(rule, value, callback) {
  let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(!reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入特殊字符'));
    }
  }, 100);
}
//匹配所有非特殊字符，且长度在1和30之间;
export function checkCharacters(rule, value, callback) {
  let reg = /^[\u4E00-\u9FA5A-Za-z0-9·]{1,30}$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可输入特殊字符'));
    }
  }, 100);
}
//输入大小写英文  、数字和_   *   -
export function checkEnACharac(rule, value, callback) {
  let reg = /^[a-zA-Z0-9-\-*_/\s]{0,15}$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可输入特殊字符'));
    }
  }, 100);
}

//大小写英文和数字
export function benAndNumber(rule, value, callback) {
  let reg = /^[a-zA-Z0-9-\-*_/]*$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可输入特殊字符'));
    }
  }, 100);
}

//匹配所有非负整数

export function rightNumber(rule, value, callback) {
  let reg = /^(0|[1-9][0-9]*)$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入非负整数'));
    }
  }, 100);
}
//匹配所有不是汉字的
export function checkUrl(rule, value, callback) {
  let reg = /([\u4E00-\u9FA5])/g;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(!reg.test(value)) {
      callback();
    } else {
      callback(new Error('不可以输入汉字'));
    }
  }, 100);
}


//匹配链接
export function checkLink(rule, value, callback) {
  let reg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('地址格式不正确'));
    }
  }, 100);
}
//匹配数字和百分比
export function yearRate(rule, value, callback) {
  let reg = /^[0-9\./]{0,10}$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入非负数'));
    }
  }, 100);
}
//匹配1~10位的数字
export function price(rule, value, callback) {
  let reg = /^[0-9]{0,10}$/;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入非负整数'));
    }
  }, 100);
}
//输入大写英文
export function bigLetter(rule, value, callback) {
  let reg = /[A-Z]/g;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('密码必须包含大写英文，请重新输入！'));
    }
  }, 100);
}
//输入小写英文
export function littleLetter(rule, value, callback) {
  let reg = /[a-z]/g;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('密码必须包含小写英文，请重新输入！'));
    }
  }, 100);
}
//输入数字
export function onlyNumber(rule, value, callback) {
  let reg = /[0-9]/g;
  if(!value) {
    callback();
  }
  setTimeout(() => {
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error('密码必须包含数字，请重新输入！'));
    }
  }, 100);
}