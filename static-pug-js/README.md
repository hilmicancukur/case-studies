# Static pug and js

You can follow these ways to compile pug and sass.

### If you don't have sass you can download it this way.

https://sass-lang.com/install

```bash
npm install -g sass
```

### If you don't have pug-cli you can download it this way.

```bash
npm install -g pug-cli
```

### Compile Sass

https://sass-lang.com/guide

```bash
sass --watch scss/main.scss css/main.css
```

### We need to launch and compile a different terminal for each page.

```bash
pug -w views/index.pug -o . -P
```

```bash
pug -w views/create-member.pug -o . -P
```

```bash
pug -w views/member.pug -o . -P
```

### Start the server

If you want, you can use [`Live Server (Five Server)`](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) to see the project live.