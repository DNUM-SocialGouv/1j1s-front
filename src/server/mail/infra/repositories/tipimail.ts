import { Mail } from '~/server/mail/domain/mail';

export interface TipimailRequest extends Mail {
  headers: TipimailRequestHeaders;
}

export type TipimailRequestHeaders = {
  'X-TM-DOMAIN': '1jeune1solution.gouv.fr';
  'X-TM-TAGS': string[];
}
