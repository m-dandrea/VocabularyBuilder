(function () {
  const config = window.SUPABASE_CONFIG;
  const authDialog = document.querySelector('#authDialog');
  const appKey = (key) => key === 'tiOrdProfiles' || key === 'tiOrdActiveProfile' || key === 'tiOrdProgress' || key.startsWith('tiOrdProgress-') || key.startsWith('tiOrdKnown-') || key.startsWith('tiOrdExtraBatch-');
  const client = window.supabase.createClient(config.url, config.publishableKey);
  let currentUser = null;
  let saveTimer = null;

  function collectState() {
    const state = {};
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (appKey(key)) state[key] = localStorage.getItem(key);
    }
    return state;
  }

  function clearState() {
    Object.keys(localStorage).filter(appKey).forEach((key) => localStorage.removeItem(key));
    sessionStorage.removeItem('tiOrdSessionProfile');
  }

  function restoreState(state) {
    clearState();
    Object.entries(state || {}).forEach(([key, value]) => {
      if (appKey(key) && typeof value === 'string') localStorage.setItem(key, value);
    });
  }

  async function uploadState() {
    if (!currentUser) return;
    const { error } = await client.from('user_state').upsert({
      user_id: currentUser.id,
      state: collectState(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
    if (error) console.error('Cloud sync failed:', error.message);
    else sessionStorage.removeItem('tiOrdCloudPending');
  }

  window.queueCloudSave = function () {
    sessionStorage.setItem('tiOrdCloudPending', '1');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(uploadState, 350);
  };

  async function prepareUser(user) {
    currentUser = user;
    const lastOwner = localStorage.getItem('tiOrdCloudOwner');
    if (sessionStorage.getItem('tiOrdCloudPending') === '1' && lastOwner === user.id) await uploadState();
    const { data, error } = await client.from('user_state').select('state').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    if (data?.state && Object.keys(data.state).length) {
      restoreState(data.state);
    } else if (lastOwner && lastOwner !== user.id) {
      clearState();
      const name = user.email?.split('@')[0] || 'Learner';
      localStorage.setItem('tiOrdProfiles', JSON.stringify([{id:'learner-1', name, wordCount:10, difficulty:'easy'}]));
      await uploadState();
    } else {
      await uploadState();
    }
    localStorage.setItem('tiOrdCloudOwner', user.id);
    document.body.classList.remove('cloud-required');
    const accountButton = document.querySelector('#accountButton');
    accountButton.title = user.email || '';
    accountButton.onclick = async () => {
      await uploadState();
      await client.auth.signOut();
      clearState();
      location.reload();
    };
  }

  function showAuth() {
    document.body.classList.add('cloud-required');
    if (!authDialog.open) authDialog.showModal();
  }

  function authError(message, isError = true) {
    const element = document.querySelector('#authMessage');
    element.textContent = message;
    element.classList.toggle('error', isError);
  }

  window.cloudReady = (async function () {
    const { data: { session } } = await client.auth.getSession();
    if (session?.user) {
      await prepareUser(session.user);
      return;
    }

    showAuth();
    await new Promise((resolve) => {
      document.querySelector('#authForm').onsubmit = async (event) => {
        event.preventDefault();
        authError('Signing in…', false);
        const email = document.querySelector('#authEmail').value.trim();
        const password = document.querySelector('#authPassword').value;
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) return authError(error.message);
        await prepareUser(data.user);
        authDialog.close();
        resolve();
      };

      document.querySelector('#createAccount').onclick = async () => {
        authError('Creating account…', false);
        const email = document.querySelector('#authEmail').value.trim();
        const password = document.querySelector('#authPassword').value;
        if (!email || password.length < 6) return authError('Enter an email and a password of at least 6 characters.');
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: 'https://m-dandrea.github.io/VocabularyBuilder/' }
        });
        if (error) return authError(error.message);
        if (!data.session) return authError('Check your email to confirm the account, then return here to sign in.', false);
        await prepareUser(data.user);
        authDialog.close();
        resolve();
      };
    });
  })().catch((error) => {
    showAuth();
    authError(`Cloud connection failed: ${error.message}`);
  });
})();
