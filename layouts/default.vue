<template>
  <div>
    <header class="header">
      <img class="header-logo-image" src="/logo-example.svg" alt="example logo" />
    </header>

    <slot name="intro" />

    <slot name="teaser" />

    <slot />
    <footer class="footer">
      <ul>
        <li class="footer-link"><a target="_blank" href="https://www.example.com/de/">Zurück zur Website</a></li>
        <li class="footer-link">
          <a target="_blank" href="https://www.example.com/de/datenschutzerklaerung/">Datenschutz</a>
        </li>
        <li class="footer-link"><a target="_blank" href="https://www.example.com/de/impressum/">Impressum</a></li>
      </ul>
      <p class="footer-copyright">© 2023 example</p>
    </footer>
  </div>
</template>
