import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          const response = await fetch('https://backend-latest-in4o.onrender.com/api/oauth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code }),
          });

          const data = await response.json();
          console.log('OAuth callback response:', data); // Debug log

          if (data.success) {
            // Store the local user data, not the Google user info
            sessionStorage.setItem('user', JSON.stringify(data.user));
            navigate('/home');
          } else {
            console.error('Login failed:', data.message || data.error);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error handling OAuth callback:', error);
          navigate('/login');
        }
      } else {
        console.error('No code received');
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return <div className="loading-container">
    <div>Processing login...</div>
  </div>;
}

export default OAuthCallback;
