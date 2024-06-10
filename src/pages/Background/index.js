import { supabase } from '../supabase';
import { ACTION, QUICK_FLL_PORT_NAME, RESPONSE } from '../utils';

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === QUICK_FLL_PORT_NAME) {
    port.onMessage.addListener((message, port) => {
      if (message.action === ACTION.SEND_OTP) {
        const { email } = message;
        supabase.auth
          .signInWithOtp({ email })
          .then((res) => port.postMessage({ action: RESPONSE.SUCCESS, res }))
          .catch((err) => port.postMessage({ action: RESPONSE.ERROR, err }));
      }

      if (message.action === ACTION.VERIFY_OTP) {
        const { email, otp } = message;
        supabase.auth
          .verifyOtp({ email, token: otp, type: 'email' })
          .then((res) => {
            port.postMessage({ action: RESPONSE.SUCCESS, res });
          })
          .catch((err) => port.postMessage({ action: RESPONSE.ERROR, err }));
      }

      if (message.action === ACTION.GET_SHORTCUTS) {
        supabase.auth.getUser().then((res) => {
          const user = res.data.user;

          supabase
            .from('Shortcuts')
            .select('data')
            .eq('user_id', user.id)
            .limit(1)
            .then((res) => port.postMessage({ action: RESPONSE.SUCCESS, res }))
            .catch((err) => port.postMessage({ action: RESPONSE.ERROR, err }));
        });
      }

      if (message.action === ACTION.EDIT_OR_ADD_SHORTCUT) {
        const { shortcutKey, shortcutValue } = message;
        supabase.auth.getUser().then((res) => {
          const user = res.data.user;

          supabase
            .rpc('update_shortcut', {
              shortcut_key: shortcutKey,
              shortcut_value: shortcutValue,
              user_id: user.id,
            })
            .then((res) => port.postMessage({ action: RESPONSE.SUCCESS, res }))
            .catch((err) => port.postMessage({ action: RESPONSE.ERROR, err }));
        });
      }
    });
  }
});
