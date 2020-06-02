export default class OrderStex {
  id = null;
  name = null;
  technicalName = null;
  partyType = null;
  legalForm = null;
  userId = null;
  userName = null;
  ownerPartyId = null;
  ownerPartyName = null;
  assetId = null;
  assetName = null;
  assetShareQty = null;
  shareCapital = null;

  constructor(id, name, technicalName, partyType, legalForm, userId, userName, ownerPartyId, ownerPartyName, assetId, assetName, assetShareQty, shareCapital) {
    this.id = id;
    this.name = name;
    this.technicalName = technicalName;
    this.partyType = partyType;
    this.legalForm = legalForm;
    this.userId = userId;
    this.userName = userName;
    this.ownerPartyId = ownerPartyId;
    this.ownerPartyName = ownerPartyName;
    this.assetId = assetId;
    this.assetName = assetName;
    this.assetShareQty = assetShareQty;
    this.shareCapital = shareCapital;
  }
}
