export default class OrderStex {
  id = null;
  name = null;
  technicalName = null;
  partyType = null;
  partyTypeName = null;
  legalForm = null;
  legalFormName = null;
  userId = null;
  userName = null;
  ownerPartyId = null;
  ownerPartyName = null;
  assetId = null;
  assetName = null;
  assetShareQty = null;
  shareCapital = null;

  constructor(id, name, technicalName, partyType, partyTypeName, legalForm, legalFormName, userId, userName, ownerPartyId, ownerPartyName, assetId, assetName, assetShareQty, shareCapital) {
    this.id = id;
    this.name = name;
    this.technicalName = technicalName;
    this.partyType = partyType;
    this.partyTypeName = partyTypeName;
    this.legalForm = legalForm;
    this.legalFormName = legalFormName;
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
