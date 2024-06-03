export const protocol = 'https?:\\/\\/';

export const worldWideWebOptional = '(?:www.)?';

export const domain = '[a-zA-Z0-9@:%._+~#=\\-]{1,256}';

export const extension = '.[a-zA-Z0-9\\(\\)]{1,6}';

export const paramsOptional = '\\b(?:[a-zA-Z0-9\\-\\|\\(\\)@:%_+.~#?&\\/=]*)';

export const urlRegex = `${protocol}${worldWideWebOptional}${domain}${extension}${paramsOptional}`;
