export const progressStyling = row => {
  let width, backgroundColor;
  switch (row.value) {
    case 'Applied':
      width = '25%';
      backgroundColor = '#ffbf00';
      break;
    case 'In Progress':
      width = '50%';
      backgroundColor = '#85cc00';
      break;
    case 'Rejected':
      width = '100%';
      backgroundColor = '#ff2e00';
      break;
    default:
      return { width: '100%', backgroundColor: '#85cc00' };
  }
  return { width, backgroundColor };
};
