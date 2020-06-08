export default class OrderStex {
  id = null;
  assetId = null;
  assetName = null;
  orderDir = null;
  orderStatus = null;
  orderType = null;
  partyId = null;
  partyName = null;
  priceLimit = null;
  qty = null;
  qtyExec = null;
  intrRate = null;
  nomVal = null;
  matDate = null;

  constructor(id, assetId, assetName, orderDir, orderStatus, ordertype, partyId, partyName, priceLimit, qty, qtyExec, intrRate, nomVal, matDate) {
    this.id = id;
    this.assetId = assetId;
    this.assetName = assetName;
    this.orderDir = orderDir;
    this.orderStatus = orderStatus;
    this.orderType = ordertype;
    this.partyId = partyId;
    this.partyName = partyName;
    this.priceLimit = priceLimit
    this.qty = qty;
    this.qtyExec = qtyExec;
    this.intrRate = intrRate;
    this.nomVal = nomVal;
    this.matDate = matDate;
  }
}
