const Debug = () => {
  const providers = JSON.parse(localStorage.getItem('providers') || '[]');
  
  return (
    <div style={{ display: 'none' }}>
      {console.log('Current providers in localStorage:', providers)}
    </div>
  );
}; 