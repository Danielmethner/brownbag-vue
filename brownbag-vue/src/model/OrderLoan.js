export default class OrderStex {
  id = null;
  qty = null;
  orderType = null;
  orderStatus = null;
  advText = null;
  asset = null;
  timestampCreate = null;
  timestampModified = null;
  user = null;
  maccLender = null;
  maccDebtor = null;
  posLoanLender = null;
  posLoanBorrower = null;
  matDate = null;
  intrRate = null;


  constructor(id, qty, orderType, orderStatus, advText, asset, timestampCreate, timestampModified, user, maccLender, maccDebtor, posLoanLender, posLoanBorrower, matDate, intrRate) {
    this.id = id;
    this.qty = qty;
    this.orderType = orderType;
    this.orderStatus = orderStatus;
    this.advText = advText;
    this.asset = asset;
    this.timestampCreate = timestampCreate;
    this.timestampModified = timestampModified;
    this.user = user;
    this.maccLender = maccLender;
    this.maccDebtor = maccDebtor;
    this.posLoanLender = posLoanLender;
    this.posLoanBorrower = posLoanBorrower;
    this.matDate = matDate;
    this.intrRate = intrRate;

  }

  getId() { return this.id; }
  setId(id) { this.id = id; }
  getOrderType() { return this.orderType; }
  setOrderType(orderType) { this.orderType = orderType; }
  getAdvText() { return this.advText; }
  setAdvText(advText) { this.advText = advText; }
  getTimestampCreate() { return this.timestampCreate; }
  setTimestampCreate(timestampCreate) { this.timestampCreate = timestampCreate; }
  getUser() { return this.user; }
  setUser(user) { this.user = user; }
  getMaccDebtor() { return this.maccDebtor; }
  setMaccDebtor(maccDebtor) { this.maccDebtor = maccDebtor; }
  getPosLoanBorrower() { return this.posLoanBorrower; }
  setPosLoanBorrower(posLoanBorrower) { this.posLoanBorrower = posLoanBorrower; }
  getIntrRate() { return this.intrRate; }
  setIntrRate(intrRate) { this.intrRate = intrRate; }

}
