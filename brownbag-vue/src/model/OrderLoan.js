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
  partyId = null;
  partyName = null;


  constructor(id, qty, orderType, orderStatus, advText, asset, timestampCreate, timestampModified, user, maccLender, maccDebtor, posLoanLender, posLoanBorrower, matDate, intrRate, partyId, partyName) {
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
    this.partyId = partyId;
    this.partyName = partyName;

  }

  
  getId() { return this.id; }
  setId(id) { this.id = id; }

  getQty() { return this.qty; }
  setQty(qty) { this.qty = qty; }

  getOrderType() { return this.orderType; }
  setOrderType(orderType) { this.orderType = orderType; }

  getOrderStatus() { return this.orderStatus; }
  setOrderStatus(orderStatus) { this.orderStatus = orderStatus; }

  getAdvText() { return this.advText; }
  setAdvText(advText) { this.advText = advText; }

  getAsset() { return this.asset; }
  setAsset(asset) { this.asset = asset; }

  getTimestampCreate() { return this.timestampCreate; }
  setTimestampCreate(timestampCreate) { this.timestampCreate = timestampCreate; }

  getTimestampModified() { return this.timestampModified; }
  setTimestampModified(timestampModified) { this.timestampModified = timestampModified; }

  getUser() { return this.user; }
  setUser(user) { this.user = user; }

  getMaccLender() { return this.maccLender; }
  setMaccLender(maccLender) { this.maccLender = maccLender; }

  getMaccDebtor() { return this.maccDebtor; }
  setMaccDebtor(maccDebtor) { this.maccDebtor = maccDebtor; }

  getPosLoanLender() { return this.posLoanLender; }
  setPosLoanLender(posLoanLender) { this.posLoanLender = posLoanLender; }

  getPosLoanBorrower() { return this.posLoanBorrower; }
  setPosLoanBorrower(posLoanBorrower) { this.posLoanBorrower = posLoanBorrower; }

  getMatDate() { return this.matDate; }
  setMatDate(matDate) { this.matDate = matDate; }

  getIntrRate() { return this.intrRate; }
  setIntrRate(intrRate) { this.intrRate = intrRate; }

  getPartyId() { return this.partyId; }
  setPartyId(partyId) { this.partyId = partyId; }

  getPartyName() { return this.partyName; }
  setPartyName(partyName) { this.partyName = partyName; }





}
