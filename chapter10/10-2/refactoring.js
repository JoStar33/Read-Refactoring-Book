function disabilityAmount(anEmployee) {
  // 어차피 이 변수명을 통해, 왜 조건문을 뒀는지 인식가능.
  if (isNotEligibleForDisability()) {
    return 0;
  }

  // 동일한 값을 리턴하는 조건식은 이렇게 하나로 묶어서 관리하는게 낫다.
  function isNotEligibleForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthsDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}

function factor() {
  if (anEmployee.onVacation && anEmployee.seniority > 10) {
    return 1;
  }
  return 0.5;
}

// 절차
// 1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
// 2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
// 3. 테스트한다.
// 4. 조건에 하나만 남을때까지 2 ~ 3과정을 반복한다.
// 5. 하나의 합쳐진 조건식을 함수로 추출할지 고려해본다.
