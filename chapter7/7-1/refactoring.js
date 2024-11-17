// 객체를 만들때 다음과 같이 클래스를 만들어 사용하는걸 권장.
// 캡슐화를 하는게 핵심.
const organization = new Organization({
  name: "에크미 구스베리",
  country: "GB",
});

function getOrganization() {
  return organization;
}

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  set name(aString) {
    this._name = aString;
  }

  get name() {
    return this._name;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }

  get country() {
    return this._country;
  }
}

result += `<h1>${getOrganization().name}</h1>`;
getOrganization().name = "newName";

class CustomerData {
  constructor(data) {
    this._data = data;
  }

  setUsage(customerId, year, month, amount) {
    this._data[customerId].usages[year][month] = amount;
  }

  get rawData() {
    //이건 로데쉬 문법임 ㅇㅇ
    return this._data.cloneDeep(this._data);
  }

  usage(customerId, year, month) {
    return this._data[customerId].usages[year][month];
  }
}
