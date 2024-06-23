
import * as ContentHome from './content/home/home.js';
import * as ContentLogin from './content/login/login.js';
import * as ContentRegister from './content/register/register.js';
import * as ContentProfile from './content/profile/profile.js';

export const componentModules = {
  ContentHome, ContentLogin, ContentRegister, ContentProfile
}

export const html = `
{{ if:authenticated }}
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a class="nav-link" href="./#/" data-bind="class.active:isHome">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./#/login" data-bind="class.active:isLogin">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./#/register" data-bind="class.active:isRegister">Sign up</a>
        </li>
      </ul>
    </div>
  </nav> 
{{ else: }}
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a class="nav-link" href="./#/" data-bind="class.active:isHome">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./#/editor" data-bind="class.active:isEditor"> <i class="ion-compose"></i>&nbsp;New Article </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./#/settings" data-bind="class.active:isSetting"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bind="class.active:isProfile; href:user.profileHash">
            <img class="user-pic" data-bind="src:user.picUrl"/>
            {{ user.name }}Eric Simons
          </a>
        </li>
      </ul>
    </div>
  </nav> 
{{ endif: }}
{{ if:isHome }}
  <content-home data-bind="
    props.authenticated:authenticated;
  "></content-home>
{{ endif: }}
{{ if:isEditor }}<content-editor></content-editor>{{ endif: }}
{{ if:isSettings }}<content-settings></content-settings>{{ endif: }}
{{ if:isProfile }}<content-profile></content-profile>{{ endif: }}
{{ if:isLogin }}<content-login></content-login>{{ endif: }}
{{ if:isRegister }}<content-register></content-register>{{ endif: }}
`;

const dependentProps = {};
const HASH_PREFIX = '#';
const hashed = (path) => HASH_PREFIX + path;

export class State {
  user;
  get authenticated() {
    return typeof this.user !== 'undefined';
  };
  get "user.profileHash"() {
    return `./${HASH_PREFIX}/profile/${this.user.firstName}-${this.user.lastName}`;
  }
  get "user.picUrl"() {
    return this.user.image;
  }
  get "user.name"() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
  static {
    dependentProps["authenticated"] = ["user"];
    dependentProps["user.profilePath"] = ["user.firstName", "user.lastName"];
    dependentProps["user.picUrl"] = ["user.image"];
    dependentProps["user.name"] = ["user.firstName", "user.lastName"];
  }

  currentHash;
  get isHome() {
    return this.currentHash === hashed("/") || this.currentHash === "";
  }
  get isEditor() {
    return this.currentHash === hashed("/editor");
  }
  get isSettings() {
    return this.currentHash === hashed("/settings");
  }
  get isProfile() {
    return this.currentHash.startsWith(hashed("/profile"));
  }
  get isLogin() {
    return this.currentHash === hashed("/login");
  }
  get isRegister() {
    return this.currentHash === hashed("/register");
  }
  static {
    dependentProps["isHome"] = ["currentHash"];
    dependentProps["isEditor"] = ["currentHash"];
    dependentProps["isSettings"] = ["currentHash"];
    dependentProps["isProfile"] = ["currentHash"];
    dependentProps["isLogin"] = ["currentHash"];
    dependentProps["isRegister"] = ["currentHash"];
  }

  dependentProps = dependentProps;
}

export const moduleConfig = { useShadowRoot:true, useLocalTagName:false };
