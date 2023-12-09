import { useSelector, useDispatch } from 'react-redux';
import { setUser, initialState } from 'store/auth/userSlice';
import { apiSignIn, apiSignUp } from 'services/AuthService';
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice';
import appConfig from 'configs/app.config';
import { REDIRECT_URL_KEY } from 'constants/app.constant';
import { useNavigate } from 'react-router-dom';
import useQuery from './useQuery';
import { apiUserProfile } from 'services/UserService';
import { setAuthority } from 'store/auth/authoritySlice';
import { USER } from 'constants/roles.constant';

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);
  const { id } = useSelector((state) => state.auth.user);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp.data.data.token) {
        dispatch(onSignInSuccess(resp.data.data.token));

        setTimeout(async () => {
          const profile = await apiUserProfile();

          dispatch(setUser(profile.data.data));
          dispatch(setAuthority(profile.data.data.roles));
          // const user = profile.data;
        }, 500);
        setTimeout(async () => {
          const redirectUrl = query.get(REDIRECT_URL_KEY);
          navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
          return {
            status: 'success',
            message: ''
          };
        }, 200);
      }
    } catch (errors) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString()
      };
    }
  };

  const signUp = async (values) => {
    try {
      const resp = await apiSignUp(values);
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                avatar: '',
                userName: 'Anonymous',
                authority: USER,
                email: ''
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: 'success',
          message: ''
        };
      }
    } catch (errors) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString()
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
    window.location.reload();
  };
  const signOut = async () => {
    handleSignOut();
  };

  return {
    authenticated: token && signedIn && id,
    signIn,
    signUp,
    signOut
  };
}

export default useAuth;
