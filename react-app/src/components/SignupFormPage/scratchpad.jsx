<div className="signup-component-container">
<div className="signup-top-logo center">
  <a href="/">
    <img
      style={{ width: `107px` }}
      src={logo}
                    alt='DSDb logo'
    />
  </a>
</div>
{Object.values(errors).length ? (
  <div className="error-box bottom-spacing center">
    <div>
      <i style={{fontSize: `32px`}} className="error fa-solid fa-triangle-exclamation"></i>
    </div>
    <div style={{ paddingLeft: `13px` }}>
      <span
        style={{ fontSize: `22px` }}
        className="error"
      >
        There was a problem
      </span>
      <ul>
        {Object.values(errors)?.map((error, idx) => (
          <li style={{fontSize: `14px`}} className="arial" key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  </div>
) : null}
<form
  className="signup-form"
  onSubmit={handleSubmit}
  noValidate
>
  <h1>Create account</h1>
  <label>
    Your name
    <input
      type="text"
      className="bottom-spacing"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
    {/* {errors.name ? <span>{errors.name}</span> : null} */}
  </label>
  <label>
    Email
    <input
      type="text"
      className="bottom-spacing"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    {/* {errors.email ? <span>{errors.email}</span> : null} */}
  </label>
  <label>
    Password
    <input
      type="password"
      className="bottom-spacing"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </label>
  <i style={{ fontSize: `12px` }}>Password must be 8 characters</i>
  <br />
  <label>
    Re-enter Password
    <input
      type="password"
      className="bottom-spacing"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
    {/* {errors.password ? <span>{errors.password}</span> : null} */}
    {/* {errors.confirm_password ? <span>{errors.confirm_password}</span> : null} */}
  </label>
  <button
    className="green-background"
    type="submit"
  >
    Create your DSDb account
  </button>
</form>
</div>