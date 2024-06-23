/**
 * @typedef { Object } performanceElement
 * @property { playKey } playID 공연 아이디
 * @property { number } audience 관중수
 */

/**
 * @typedef { Object } invoiceElement
 * @property { string } customer 고객명
 * @property { Array<performanceElement> } performances 공연정보
 */

/**
 * @typedef { Object } playInfo
 * @property { string } name 공연명
 * @property { string } type 공연타입
 */

/**
 * @typedef { Record<playKey, playInfo> } playElement
 */

/**
 * @param { invoiceElement } invoice
 * @param { playElement } plays
 * @returns
 */
//컴파일 >> 테스트 >> 커밋은 기초중에 기초다. 꼭 명심할것.
export function createStatementData(invoice, plays) {
  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  /**
   *
   * @param { performanceElement } aPerformance
   * @returns { performanceElement }
   */
  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = { ...aPerformance };

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  //반복문을 파이프라인으로 바꿈.
  function totalAmount(data) {
    return data.performances.reduce((acc, cur) => acc + cur.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((acc, cur) => acc + cur.volumeCredits, 0);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);

    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

//일종의 추상클래스.
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error("서브클래스에서 처리하도록 설계되었습니다.");
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

/* 서브클래스 */
//서브클래스에서 동일한 작업에 대한 amount를 각각 처리하도록 만든다.
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40_000;

    if (this.performance.audience > 30) {
      result += 1_000 * (this.performance.audience - 30);
    }

    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30_000;

    if (this.performance.audience > 20) {
      result += 10_000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  //오버리이딩
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
