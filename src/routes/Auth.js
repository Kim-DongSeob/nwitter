import React, {useState} from 'react';
import {authService, firebaseInstance} from "../fbase";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target: {name, value}} = event
    if (name === "email") {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    // preventDefault : 기본행위가 실행되는 것을 원치 않는다.
    // 여기서 만약 preventDefault()을 사용하지 않는다면 새로고침이 되어버린다.
    event.preventDefault()
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (e) {
      setError(e.message)

    }
  }

  const toggleAccount = () => {
    return (
      setNewAccount((prev) => !prev)
    )
  }
  const onSocialClick = async (event) => {
    const {target:{name}} = event;
    let provider;
    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "sign in"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "sign in" : "createAccount"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
      </div>
    </div>
  );
}
export default Auth;