export default interface Campaign {
  PK: string; // CAMPAIGN
  SK: string; // STATIC#001 || SASONAL#001

  Active: boolean;
  Description: string;
  Begin: Date;
  End: Date;
}
