export default class CtrlVar {
    id = null;
    dataType = null;
    timestampModified = null;
    name = null;
    key = null;
    val = null;
    editable = false;

  constructor(id, dataType, timestampModified, name, key, val, editable) {
    this.id = id;
    this.dataType = dataType;
    this.timestampModified = timestampModified;
    this.name = name;
    this.key = key;
    this.val = val;
    this.editabl = editable;
  }


  getId() {
    return this.id;
  }
}
