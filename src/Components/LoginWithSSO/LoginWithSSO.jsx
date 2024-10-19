import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../setup/axios";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/action/accountAction";
const LoginWithSSO = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const runFirstRef = useRef(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { account, isLoading, errMessage } = useSelector(
    (state) => state.account
  );
  if (account && account.access_token) {
    navigate("/admin");
  }
  useEffect(() => {
    const ssoToken = searchParams.get("ssoToken");
    if (ssoToken && !runFirstRef.current) {
      runFirstRef.current = true;
      dispatch(doLogin(ssoToken));
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h3>
            {message && (
              <span>
                Please login again. Click here to{" "}
                <a
                  href={`${import.meta.env.REACT_APP_BACKEND_SSO}?serviceURL=${
                    import.meta.env.REACT_APP_SERVICE_URL
                  }`}
                >
                  login
                </a>
              </span>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoginWithSSO;
