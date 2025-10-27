

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let _scriptLoaded = false;
let _tokenClient = null;

function loadGisScript() {
  if (_scriptLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = () => {
      _scriptLoaded = true;
      resolve();
    };
    s.onerror = (err) => reject(err);
    document.head.appendChild(s);
  });
}

async function initTokenClient() {
  if (!CLIENT_ID) throw new Error('VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env file.');
  await loadGisScript();
  if (_tokenClient) return _tokenClient;
  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    throw new Error('Google Identity Services not available after loading script');
  }

  _tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'openid email profile',
    callback: (resp) => {
     
      if (_tokenClient && typeof _tokenClient._cb === 'function') {
        _tokenClient._cb(resp);
      }
    },
  });

  return _tokenClient;
}

export async function signInWithGoogle() {
  const client = await initTokenClient();
  return new Promise((resolve, reject) => {
    client._cb = async (tokenResp) => {
      try {
        if (!tokenResp || !tokenResp.access_token) {
          return reject(new Error('No access token received'));
        }
      
        const r = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResp.access_token}` },
        });
        if (!r.ok) throw new Error('Failed to fetch userinfo');
        const profile = await r.json();
        resolve({ tokenResponse: tokenResp, profile });
      } catch (err) {
        reject(err);
      }
    };

    try {

      client.requestAccessToken({ prompt: 'consent' });
    } catch (err) {
      reject(err);
    }
  });
}

export async function signOutGoogle() {

  return Promise.resolve();
}
