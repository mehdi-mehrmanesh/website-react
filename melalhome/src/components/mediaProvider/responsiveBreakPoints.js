const size = {
    mobile: '450px',
    laptop: '1300px',
    desktop: '1701px',
  };
  
  const responsiveBreakPoints = {
    mobile_maxWidth: `(max-width: ${size.mobile})`,
    mobile_minWidth: `(min-width: ${size.mobile})`,
    laptop_maxWidth: `(max-width: ${size.laptop})`,
    laptop_minWidth: `(min-width: ${size.laptop})`,
    desktop_minWidth: `(min-width: ${size.desktop})`,
  };
  
  export default responsiveBreakPoints;
  