(function () {
  const endpoint = window.SUPABASE_CONFIG.profileEndpoint;
  const authDialog = document.querySelector('#authDialog');
  const appKey = (key) => key === 'tiOrdDataVersion' || key === 'tiOrdProfiles' || key === 'tiOrdActiveProfile' || key === 'tiOrdProgress' || key.startsWith('tiOrdProgress-') || key.startsWith('tiOrdKnown-') || key.startsWith('tiOrdSkippedTopics-') || key.startsWith('tiOrdExtraBatch-');
  let username = sessionStorage.getItem('tiOrdUsername') || '';
  let password = sessionStorage.getItem('tiOrdPassword') || '';
  let saveTimer = null;

  function collectState() {
    const state = {};
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (appKey(key)) state[key] = localStorage.getItem(key);
    }
    state.tiOrdDataVersion = '2';
    return state;
  }

  function clearState() {
    Object.keys(localStorage).filter(appKey).forEach((key) => localStorage.removeItem(key));
  }

  function restoreState(state) {
    clearState();
    Object.entries(state || {}).forEach(([key, value]) => {
      if (appKey(key) && typeof value === 'string') localStorage.setItem(key, value);
    });
  }

  async function request(action, state) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({action, username, password, state})
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Unable to connect to this profile.');
    return result;
  }

  async function uploadState() {
    if (!username) return;
    try {
      await request('save', collectState());
      sessionStorage.removeItem('tiOrdCloudPending');
    } catch (error) {
      console.error('Cloud sync failed:', error.message);
    }
  }

  window.queueCloudSave = function () {
    sessionStorage.setItem('tiOrdCloudPending', '1');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(uploadState, 350);
  };

  function rememberProfile() {
    window.currentUsername = username;
    sessionStorage.setItem('tiOrdUsername', username);
    sessionStorage.setItem('tiOrdPassword', password);
    localStorage.setItem('tiOrdCloudOwner', username);
    document.body.classList.remove('cloud-required');
    const accountButton = document.querySelector('#accountButton');
    accountButton.textContent = `${username} · Sign out`;
    accountButton.onclick = async () => {
      await uploadState();
      sessionStorage.removeItem('tiOrdUsername');
      sessionStorage.removeItem('tiOrdPassword');
      clearState();
      location.reload();
    };
  }

  async function openProfile() {
    if (sessionStorage.getItem('tiOrdCloudPending') === '1' && localStorage.getItem('tiOrdCloudOwner') === username) await uploadState();
    const result = await request('load');
    restoreState(result.state?.tiOrdDataVersion === '2' ? result.state : {});
    rememberProfile();
  }

  function showAuth() {
    document.body.classList.add('cloud-required');
    if (!authDialog.open) authDialog.showModal();
  }

  function authMessage(message, isError = true) {
    const element = document.querySelector('#authMessage');
    element.textContent = message;
    element.classList.toggle('error', isError);
  }

  function readCredentials() {
    username = document.querySelector('#authUsername').value.trim().toLowerCase();
    password = document.querySelector('#authPassword').value;
  }

  window.cloudReady = (async function () {
    if (username) {
      try {
        await openProfile();
        return {newAccount:false};
      } catch (error) {
        sessionStorage.removeItem('tiOrdUsername');
        sessionStorage.removeItem('tiOrdPassword');
        username = '';
        password = '';
        showAuth();
        authMessage(error.message);
      }
    }
    showAuth();
    await new Promise((resolve) => {
      document.querySelector('#authForm').onsubmit = async (event) => {
        event.preventDefault();
        readCredentials();
        if (password.length < 6) return authMessage('Enter a password containing at least 6 characters.');
        authMessage('Opening profile…', false);
        try {
          await openProfile();
          authMessage('Profile opened. Loading your lesson…', false);
          location.reload();
        } catch (error) { authMessage(error.message); }
      };

      document.querySelector('#createAccount').onclick = async () => {
        readCredentials();
        if (!/^[a-z0-9_-]{3,24}$/.test(username)) return authMessage('Use 3–24 letters, numbers, hyphens or underscores.');
        if (password.length < 6) return authMessage('A password must contain at least 6 characters.');
        authMessage('Creating profile…', false);
        try {
          clearState();
          const result = await request('create', collectState());
          restoreState(result.state);
          rememberProfile();
          sessionStorage.setItem('tiOrdOpenSettings', '1');
          authMessage('Profile created. Loading your setup…', false);
          location.reload();
        } catch (error) { authMessage(error.message); }
      };
    });
  })().catch((error) => {
    showAuth();
    authMessage(error.message);
    sessionStorage.removeItem('tiOrdUsername');
    sessionStorage.removeItem('tiOrdPassword');
  });
})();
