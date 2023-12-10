import useAuthority from 'utils/hooks/useAuthority';

const AuthorityCheck = (props) => {
  const { userAuthority = [], authority = [], children } = props;
  const roleMatched = useAuthority(userAuthority, authority);
  console.log(userAuthority,"authority")

  return roleMatched ? children : null;
};

export default AuthorityCheck;
