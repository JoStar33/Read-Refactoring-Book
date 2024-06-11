// 연습삼아 jsDoc을 정의해봤다.
// 유사 타입스크립트처럼 동작하는 코드가 됐다!

/** @typedef {( 'hamlet' | 'as-like' | 'othello') } playKey */

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

// 공부하면서 안 사실인데 jsDoc에 Record가 먹음...?ㅋㅋㅋㅋ신기함
/**
 * @typedef { Record<playKey, playInfo> } playElement
 */

/**
 *
 * @param { invoiceElement } invoice
 * @param { playElement } plays
 * @returns
 */
export function statement(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  // 핵심은 결국 각 함수를 추출하고 분리한다는 거다.
  /**
   *
   * @param { number } aNumber
   * @returns { number }
   */
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  /**
   *
   * @param { performanceElement } aPerformance
   * @returns { playInfo }
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  /**
   *
   * @param { performanceElement } aPerformance
   * @returns { number }
   */
  // 명확한 이름으로 리팩토링!
  function amountFor(aPerformance) {
    let result = 0;
    // 이 의견에서는 살짝 비동의함. playFor(aPerformance)의 형태는 결국 가독성을 해치는 형태 아닌가?
    // 변수를 하나 만들더라도 개발자들이 읽기 좋은 코드를 만드는게 낫지않을까?
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40_000;

        if (aPerformance.audience > 30) {
          result += 1_000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30_000;

        if (aPerformance.audience > 20) {
          result += 10_000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }
  /**
   *
   * @param { performanceElement } aPerformance
   * @returns { number }
   */
  function volumeCreditsFor(aPerformance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits() {
    let result = 0;

    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;

    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${
      perf.audience
    }석\n`;
  }

  result += `총액 ${usd(totalAmount())}\n`;
  result += `적립 포인트 ${totalVolumeCredits()}점\n`;

  return result;
}
