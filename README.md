<b>Немного о проекте:</b>
<ul>
    <li>Список категорий берётся в зависимости от города, если пользователь зашёл первый раз то по дефолту стоит Новосибирск</li>
    <li>При вводе города происходит запрос который формирует список подсказок, минимальное количество символов 3</li>
    <li>Список подкатегорий (сайт бар слева) формируется исходя из параметра роутера, т.е. страница доступна по прамой ссылке</li>
    <li>Сайт бар слева не показывается если подкатегорий меньше или равно 3</li>
    <li>Сайт бар слева в мобильной версии меняется на "select" требуется перезагрузка страницы если смотреть в DevTools</li>
    <li>Заголовок так же динамический, зависит от параметра роутера</li>
</ul>

<b>Что использовалось:</b>

<ul>
    <li>Vue</li>
    <li>VueCLI</li>
    <li>Vuex</li>
    <li>Vue router</li>
</ul>

# vue3-catalog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
