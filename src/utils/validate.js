/**
 * @description 常规正则校验表达式
 */
export const validatorsExp = {
  number: /^[0-9]*$/,
  nameLength: (n, m) => new RegExp(`^[\\u4E00-\\u9FA5]{${n},${m}}$`),
  idCard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  backCard: /^([1-9]{1})(\d{15}|\d{18})$/,
  phone: /^1[23456789]\d{9}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
};

/**
 * @description 常规正则校验方法
 */
export const validatorsFun = {
  number: val => validatorsExp.number.test(val),
  idCard: val => validatorsExp.idCard.test(val),
  backCard: val => validatorsExp.backCard.test(val),
};
