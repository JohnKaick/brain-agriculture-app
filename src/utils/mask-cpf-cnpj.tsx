const getMaskCpf = () => [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const getMaskCnpj = () => [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

export const maskCpfCnpj = (type: string) => type === 'CPF' ? getMaskCpf() : getMaskCnpj();
