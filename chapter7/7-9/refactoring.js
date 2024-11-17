//알고리즘 교체하기 방식이다.
//아래와 같은 절차를 거친다.
// 1. 교체할 코드를 함수 하나에 모은다.
// 2. 이 함수만을 이용해 동작을 검증하는 테스트를 마련한다.
// 3. 대체할 알고리즘을 준비한다.
// 4. 정적 검사를 수행한다.
// 5. 기존 알고리즘과 새 알고리즘의 결과를 비교하는 테스트를 수행한다. 두 결과가 같다면 리팩터링이 끝난다.
//    그렇지 않다면 기존 알고리즘을 참고해서 새 알고리즘을 테스트하고 디버깅함.

function foundPerson1(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p)) || "";
}

//아니면 이방법은 어떨까? 위는 시간복잡도가 O(n*m)이므로 그닥 좋지않음. 따라서 아래와 같이 해보는것도 좋을듯?
function foundPerson2(people) {
  const candidates = { Don: "Don", John: "John", Kent: "Kent" };
  return people.find((p) => candidates[p]) || "";
}
const person = ["Don", "John", "Kent"];
const result = foundPerson2(person);
console.log(result);
