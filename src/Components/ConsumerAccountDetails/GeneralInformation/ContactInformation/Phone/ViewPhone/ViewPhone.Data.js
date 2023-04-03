export const TableHeaders = [
  {
    title: 'TYPE',
    property: 'type'
  },
  {
    title: 'NUMBER',
    property: 'number',
    operation: ['formatPhoneNumber']
  },
  {
    title: 'CALL CONSENT',
    property: 'callConsent'
  },
  {
    title: 'SMS CONSENT',
    property: 'smsConsent'
  },
  {
    title: 'PRE-RECORDED CONSENT',
    property: 'preRecordedMessageConsent'
  },
  {
    title: 'ARTIFICIAL VOICE CONSENT',
    property: 'artificialVoiceConsent'
  },
  {
    title: 'SOURCE',
    property: 'source'
  },
  {
    title: 'PHONE STATUS',
    property: 'status',
    operation: ['convertPhoneStatus']
  },
  {
    title: 'STATUS',
    property: 'active'
  },
  {
    title: 'PRIMARY',
    property: 'isDefault',
    defaultSorting: true,
    defaultSortingOrder: 'desc'
  }
];
