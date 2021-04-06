<template>
<div id="app">
  <div class="header">
    <img class="icon" src="../public/logo.png">
    <h1 class="title">Doctor's Assistant</h1>
    <div id="nav" class="links">
      <router-link to="/">Current</router-link> |
      <router-link to="/doctor">Doctors</router-link> |
      <router-link to="/create">New Patient</router-link> |
      <router-link to="/complete">Completed</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a class="footer-text" href="https://github.com/cade25k/cp4">Github Repository</a>
  </div>
</div>
</template>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Alegreya Sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  display: flex;
  justify-content: space-between;
  background: LightSkyBlue;
  padding: 10px 100px;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: DarkViolet;
}

.content {
  padding: 10px 100px;
}

.icon {
  height: 90px;
  width: 90px;
  margin: 40px;
}

.footer {
  display: flex;
  justify-content: space-between;
  background: LightSkyBlue;
  padding: 10px 100px;
  color: white;
}

.footer-text {
  text-decoration: none;
  color: White;
}

.footer-text:hover {
  color: DarkViolet;
}

.title {
  font-size: 60px;
}

.links {
  font-size: 20px;
}
</style>
