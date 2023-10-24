export const getStringWithOutUnderline = (input: string): string => {
  return input.replace(/_/g, ' ');
};
