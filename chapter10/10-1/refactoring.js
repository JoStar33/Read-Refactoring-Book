charge = summer() ? summerCharge() : regularCharge();

// Or

if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}

// 다음과 같이 조건식과 조건식에 딸린 조건절들을 별도 함수로 추출한다.
// 확실히 조건식 함수화 or 변수화는 앞으로 많이 써야겠다는 생각을 해봄.
// 복잡한 조건식이 코드를 보기 힘들게 만들고 복잡성을 크게 높힌 경우가 많았음.
function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
