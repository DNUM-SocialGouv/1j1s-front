import { Mail } from '~/server/mail/domain/mail';

export interface TipimailRequest extends Mail {
  headers: TipimailRequest.Headers;
}

export namespace TipimailRequest {
  export type Headers = {
    'X-TM-DOMAIN': '1jeune1solution.gouv.fr';
    'X-TM-TAGS': string[];
  }
}
