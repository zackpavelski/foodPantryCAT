# Simple 404 Template

## Simple.Lightweight.Responsive

![Desktop](screenshot/dekstop-ss.png)

## How to Install ?

### Apache Server (Not using Framework)
- clone this template
- add `.htaccess`
- add this code
```
ErrorDocument 404 404.html
```
- Done

### Install on Laravel
- clone this repo
- copy `assets` to your `public` folder.
- make folder `errors` at `/resources/views/`
- copy `404.html` to `/resources/views/errors/` and rename to `404.blade.php`
- done
