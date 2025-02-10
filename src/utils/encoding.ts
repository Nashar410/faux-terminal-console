export const decodeBase64 = (str: string): string => {
  try {
    console.log('str:', str);
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    console.error('Erreur de décodage base64:', e);
    return '';
  }
};