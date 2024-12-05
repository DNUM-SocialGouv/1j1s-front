type Year = string;
type Month = string;
type Day = string;
type Hour = string;
type Minute = string;
type Second = string;
type Millisecond = string;
type Timezone = string;
type ISODate = `${Year}-${Month}-${Day}`
type ISOTime = `${Hour}:${Minute}:${Second}.${Millisecond}`
export type ISODateTime = `${ISODate}T${ISOTime}${Timezone}`
