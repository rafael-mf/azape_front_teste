export const formatCPForCNPJ = (doc) => {
    if (!doc) return 'N/A'; 
  
    const docFormated = doc.replace(/\D/g, '');
  
    if (docFormated.length === 11) {
      return docFormated.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  
    if (docFormated.length === 14) {
      return docFormated.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  
    return doc;
  };