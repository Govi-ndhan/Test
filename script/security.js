//Disable the Right Click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Disable keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Prevent F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+I (Chrome, Firefox, Safari)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+J (Chrome)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+U (Chrome)
    if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
  });
