function printOwing(invoice) {
  const outstanding = calculateOutstanding();

  printBanner();
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
  // 기능별로 함수들을 작성한다.
  // 이런 발상은 못해봄. 생각해보면 함수가 엄청 길어지는 경우가 존재했는데 그 함수내에서 새로운 함수를 만들어 목적을 명확히 보여준다면
  // 추후 코드를 리팩토링하거나 유지보수하는 사람들이 보기 편하게 만들 수 있겠다.
  // useEffect에서도 이런코드가 많이 있었던것 같은데... 개선가능할듯
  function calculateOutstanding() {
    let outstanding = 0;

    for (const o of invoice.orders) {
      outstanding += o.amount;
    }

    return outstanding;
  }

  function recordDueDate() {
    const today = Clock.today; // https://martinfowler.com/bliki/ClockWrapper.html
    invoice.dueDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 30
    );
  }

  function printBanner() {
    console.log("***********");
    console.log("**고객 채무**");
    console.log("***********");
  }

  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}
