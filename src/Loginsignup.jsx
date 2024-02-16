import React, { useState } from "react";


const App = () => {
  const [isSignInModalVisible, setSignInModalVisible] = useState(true);

  const handleCloseModal = () => {
    setSignInModalVisible(false);
  };

  return (
    <div className="Loginsignup">
      {/* Overlay for backdrop effect */}
    
      {isSignInModalVisible && (<>
        <div className="overlay"></div>
        <div
          className="modal fade show"
      
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
              <div className="modal-wrapper">
                  <div className="img-container">
                    <img src="../svg/upsc-logo.svg" alt="" />
                  </div>
                  <div className="login-header">
                    UPSC Friend's <br />
                    Welcomes <span className="y-text">Aspirants</span>
                    <div className="para-login">
                      <p>Your Personal Mentor for Civil Services</p>
                    </div>
                  </div>

                  <div className="login-form">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-login">
                      <button type="button" className="btn btn-primary">
                        Sign in
                      </button>
                    </div>
                  </div>
                  <div className="separator">
                    <span className="separator-text">or</span>
                  </div>

                  <div className="login-btn">
                    <button className="g-login">
                      <span className="g-img">
                        <img src="../svg/google.svg" alt="" />
                      </span>
                      <span className="g-text">Sign in with Google</span>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseModal}
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div></>
      )}

      {/* Second Modal - Sign Up */}
      <div
        className="modal fade"
        id="SignUpModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
            <div className="modal-wrapper">
                <div className="img-container">
                  <img src="../svg/upsc-logo.svg" alt="" />
                </div>
                <div className="login-header">
                  UPSC Friend's <br />
                  Welcomes <span className="y-text">Aspirants</span>
                  <div className="para-login">
                    <p>Your Personal Mentor for Civil Services</p>
                  </div>
                </div>

                <div className="login-form">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-login">
                    <button type="button" className="btn btn-primary">
                      Sign up
                    </button>
                  </div>
                </div>
                <div className="separator">
                  <span className="separator-text">or</span>
                </div>

                <div className="login-btn">
                  <button className="g-login">
                    <span className="g-img">
                      <img src="../svg/google.svg" alt="" />
                    </span>
                    <span className="g-text">Sign up with Google</span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
