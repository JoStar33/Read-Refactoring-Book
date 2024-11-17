class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priorityString() {
    return this_priority.toString();
  }
  set _priority(aString) {
    this._priority = new Priority(aString);
  }
}

class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`<${value}>는 유효하지 않은 우선순위입니다.`);
    }
  }

  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }

  get priority() {
    return this._value;
  }

  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }

  higherThan(other) {
    return this._index > other._index;
  }
}

// 다음과 같이 리팩토링 가능.
// 주문을 클래스화하여 조금 더 직관적으로 코드를 만들어버림.
// 이건 생각보다 쓸일이 많을듯!
// 다만, 이렇게 사용한다면, 팀의 구성원들이 클래스 구조를 이해하고 있어야하고, 익숙하지 않은 코드구조이다보니 학습에 리소스가 들것으로 예상됨.
highPriorityCount = order.filter((o) =>
  o.priority.higherThan(new Priority("normal"))
).length;
