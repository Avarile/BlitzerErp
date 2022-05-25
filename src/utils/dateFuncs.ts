/**
 * 日期解析，字符串转日期
 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
 * @returns {Date} 返回对应的日期对象
 */
function dateParse(dateString: string) {
  const SEPARATOR_BAR = "-";
  let dateArray: Array<string>;
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR);
  } else dateArray = [];
  return new Date(Number(dateArray[0]),Number(dateArray[1]) - 1, Number(dateArray[2]));
}
/**
 * 日期比较大小
 * compareDateString大于dateString，返回1；
 * 等于返回0；
 * compareDateString小于dateString，返回-1
 * @param dateString 日期
 * @param compareDateString 比较的日期
 */
function dateCompare(dateString: string, compareDateString: string) {
  // if(isEmpty(dateString)){
  //     alert("dateString不能为空");
  //     return;
  // }
  // if(isEmpty(compareDateString)){
  //     alert("compareDateString不能为空");
  //     return;
  // }
  const dateTime = dateParse(dateString).getTime();
  const compareDateTime = dateParse(compareDateString).getTime();
  if (compareDateTime > dateTime) {
    return 1;
  } else if (compareDateTime == dateTime) {
    return 0;
  } else {
    return -1;
  }
}

/**
 * 判断日期是否在区间内，在区间内返回true，否返回false
 * @param dateString 日期字符串
 * @param startDateString 区间开始日期字符串
 * @param endDateString 区间结束日期字符串
 * @returns {Number}
 */
function isDateBetween(dateString: string, startDateString: string, endDateString: string) {
  // if(isEmpty(dateString)){
  //     alert("dateString不能为空");
  //     return;
  // }
  // if(isEmpty(startDateString)){
  //     alert("startDateString不能为空");
  //     return;
  // }
  // if(isEmpty(endDateString)){
  //     alert("endDateString不能为空");
  //     return;
  // }
  let flag: boolean = false;
  let startFlag = dateCompare(dateString, startDateString) < 1;
  let endFlag = dateCompare(dateString, endDateString) > -1;
  if (startFlag && endFlag) {
    flag = true;
  }
  return flag;
}
