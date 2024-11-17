// else문을 줄여서 코드의 가독성을 극대화할 수 있다.
function payment(employee) {
  if (employee.isSeparated) {
    return { amount: 0, reasonCode: "SEP" };
  }
  if (employee.isRetired) {
    return { amount: 0, reasonCode: "RET" };
  }

  return someFinalComputation();
}

function adjustedCapital(anInstrument) {
  function isInstrumentElementZero() {
    return (
      anInstrument.capital <= 0 ||
      (anInstrument.interestRate <= 0 && anInstrument.duration <= 0)
    );
  }
  // 이렇게 함수화시킨걸 써먹어볼 수도 있겠다?
  if (isInstrumentElementZero()) {
    return 0;
  }
  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );
}
